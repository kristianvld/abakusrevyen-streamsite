import { writable } from 'svelte/store';

export const screenWidth = writable(1200);
export const video_url = writable();
export const question = writable();
export const ws = writable();


export const connectWebSocket = () => {
	const wss = new WebSocket(`wss://${window.location.hostname}:1337`);
	wss.onmessage = (msg) => {
		const obj = JSON.parse(msg.data);
		const type = obj.type;
		const value = obj.value;
		console.log('got WS json data:', obj);
		if (type == 'video_url') {
			video_url.set(value);
		}
		else if (type == 'question') {
			question.set(value);
		}
		else {
			console.error('unknown message type');
		}
	};
	ws.set(wss);
};

export const send = (ws, key, value) => {
	ws.send(JSON.stringify({ key, value }));
};

export const sendAnswer = (ws, value) => {
	send(ws, 'answer', value);
	question.set(undefined);
}

