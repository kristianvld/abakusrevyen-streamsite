import sirv from 'sirv';
import express from 'express';
import compression from 'compression';
import * as sapper from '@sapper/server';
import WebSocket from 'ws';
import bodyParser from 'body-parser';

const { PORT, NODE_ENV } = process.env;
const dev = NODE_ENV === 'development';

const admin_key = 'efdb12ef3b6dc019e9f683050911abcb706d9ded82e5bc8f8b06b3cb630a';
const ip_log = {};
let activeQuestion = {};
const messages = {};

const app = express();
app.use(bodyParser.json())

const wss = new WebSocket.Server({ port: 1337 });

const sendWS = (key, obj) => {
	messages[key] = obj;
	obj = JSON.stringify({ type: key, value: obj });
	wss.clients.forEach(ws => {
		ws.send(obj);
	})
}

wss.on('connection', ws => {
	console.log('got ws connection');
	ws.on('message', msg => {
		console.log('-> ' + msg);
		try {
			let key, value;
			({ key, value } = JSON.parse(msg));
			if (key == 'answer') {
				if (activeQuestion && value in activeQuestion) {
					activeQuestion[value] += 1;
				}
			} else {
				console.log(`got unknown WS data from ${ws}:`, msg);
			}
		} catch (error) {
			console.error('Error parsing incomming WS data:', error);
		}
		ws.send('pong');
	});

	Object.keys(messages).forEach(key => {
		const obj = messages[key];
		ws.send(JSON.stringify({ type: key, value: obj }));
	})
});

const setVideo = url => {
	sendWS('video_url', url);
};

const setQuestion = (title, options) => {
	if (!title || !options) {
		activeQuestion = undefined;
		sendWS('question', activeQuestion);
		return;
	}
	activeQuestion = { title };
	options.forEach(option => activeQuestion[option] = 0);
	sendWS('question', { title, options });
}

setVideo('https://www.youtube-nocookie.com/embed/n_XySsY2ZOU');
setQuestion();

app.get('/questionResults', (req, res) => {
	res.send(activeQuestion);
});

app.post('/newQuestion', (req, res) => {
	if (req.body?.token != admin_key) {
		res.status(401).send({ error: 'Permission denied' });
		return;
	}

	if (typeof req.body.question?.title === 'string' && typeof Array.isArray(req.body.question?.options)) {
		setQuestion(req.body.question.title, req.body.question.options);
		res.send({ msg: 'ok' });
	} else if (req.body.question == 'none') {
		setQuestion();
		res.send({ msg: 'ok' });
	} else {
		res.status(400).send({ error: 'Invalid request, expected key "question" to be object on the form {"title": "...", options: ["ans1", "ans2", "ans3"]} or "none"' });
	}
});

app.post('/newURL', (req, res) => {
	if (req.body?.token != admin_key) {
		res.status(401).send({ error: 'Permission denied' });
		return;
	}
	if (typeof req.body.url === 'string') {
		setVideo(req.body.url);
		res.send({ msg: 'ok' });
	} else {
		res.status(400).send({ error: 'Expected "url" to be a string' });
	}
});

app.use(
	compression({ threshold: 0 }),
	sirv('static', { dev }),
	sapper.middleware()
)
	.listen(PORT, err => {
		if (err) console.log('error', err);
	});