import { writable } from 'svelte/store';
import { writable as localWritable } from 'svelte-persistent-store/dist/local';

export const screenWidth = writable(1200);
export const video_url = writable();
export const questions = writable();
export const last_question_date = localWritable('last_question_date', '');
export const chat_id = writable();
export const ws = writable();
export const session_id = localWritable('session_id', Math.round(Math.random() * 1e18).toString(16));

let raw_session_id;
session_id.subscribe((val) => {
	raw_session_id = val;
});

let raw_ws;
ws.subscribe((val) => {
	raw_ws = val;
});

let raw_last_question_date;
last_question_date.subscribe((val) => {
	raw_last_question_date = val;
});

let raw_questions;
questions.subscribe(val => {
	raw_questions = val;
});


export const connectWebSocket = () => {
	const wss = new WebSocket(`${window.location.protocol == 'https' ? 'wss' : 'ws'}://${window.location.hostname}:1337`);
	wss.onmessage = (msg) => {
		console.log('got ws data:', msg);
		const obj = JSON.parse(msg.data);
		const type = obj.type;
		const value = obj.value;
		console.log('got WS json data:', obj);
		if (type == 'video_url') {
			video_url.set(value);
		}
		else if (type == 'questions') {
			console.log('last answered date:', raw_last_question_date, 'questions date:', value?.date);
			if (value && value.date != raw_last_question_date) {
				questions.set(value);
			} else {
				console.log('Already answered this set of questions');
			}
		}
		else if (type == 'chat_id') {
			chat_id.set(value);
		}
		else {
			console.error('unknown message type');
		}
	};
	wss.onclose = () => {
		console.error('Socket closed, reconnecting in 3s...');
		setTimeout(() => connectWebSocket(), 3000);
	};
	wss.onopen = () => {
		console.info("WS successfully connected!");
	}
	ws.set(wss);
};

export const send = (key, value) => {
	raw_ws.send(JSON.stringify({ key, value, raw_session_id }));
};

export const sendAnswers = (value, date) => {
	send('answers', value);
	questions.set(undefined);
	last_question_date.set(date || '');
}

