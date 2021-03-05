import sirv from 'sirv';
import express from 'express';
import compression from 'compression';
import * as sapper from '@sapper/server';
import WebSocket from 'ws';
import bodyParser from 'body-parser';

const { PORT, NODE_ENV } = process.env;
const dev = NODE_ENV === 'development';

const admin_key = process.env.ADMIN_KEY || 'efdb12ef3b6dc0';
const ip_log = {};
let activeQuestions = false;
let questionsLog = [];
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
	console.log('got ws connection', ws._socket.remoteAddress);
	ws.on('message', msg => {
		try {
			msg = JSON.parse(msg);
			console.log('-> ', msg);
			let key, value;
			({ key, value } = msg);
			if (key == 'answers') {
				if (activeQuestions && value in activeQuestions) {
					activeQuestions[value] += 1;
				}
			} else {
				console.log(`got unknown WS data from ${ws}:`, msg);
			}
		} catch (error) {
			console.error('Error parsing incomming WS data:', error, msg);
		}
	});

	Object.keys(messages).forEach(key => {
		const obj = messages[key];
		ws.send(JSON.stringify({ type: key, value: obj }));
	})
});

const setVideo = url => {
	sendWS('video_url', url);
};

const setChatID = id => {
	sendWS('chat_id', id);
}

const setQuestions = (questions) => {
	console.log('Old question answers:', activeQuestions);
	if (activeQuestions) {
		questionsLog.push(activeQuestions);
	}
	if (!questions) {
		activeQuestions = undefined;
		sendWS('questions', null);
		return;
	}
	activeQuestions = { date: new Date(), questions: [] };

	questions.forEach(q => {
		const aq = { title: q.title };
		q.options.forEach(option => {
			aq[option] = 0;
		});
		activeQuestions.questions.push(aq);
	});
	sendWS('questions', { date: activeQuestions.date, questions });
}

setVideo('https://www.youtube-nocookie.com/embed/VuawhGK55kI');
setChatID('VuawhGK55kI')
setQuestions();

app.get('/questionResults', (req, res) => {
	res.send(activeQuestions);
});

app.post('/newQuestions', (req, res) => {
	if (req.body?.token != admin_key) {
		res.status(401).send({ error: 'Permission denied' });
		return;
	}

	if (Array.isArray(req.body.questions)) {
		const arr = [];
		for (let q of req.body.questions) {
			if (typeof q.title === 'string' && Array.isArray(q.options)) {
				arr.push({ title: q.title, options: q.options });
			} else {
				res.status(400).send({ error: `Array contains invalid question: ${JSON.stringify(q)}` });
			}
		}
		setQuestions(arr);
		res.send({ msg: 'ok' });
	} else if (req.body.questions == 'none') {
		setQuestions();
		res.send({ msg: 'ok' });
	} else {
		res.status(400).send({ error: 'Invalid request, expected key "questions" to be array objects on the form [{"title": "...", options: ["ans1", "ans2", "ans3"]}] or "none"' });
	}
}
);

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

app.post('/newChat', (req, res) => {
	if (req.body?.token != admin_key) {
		res.status(401).send({ error: 'Permission denied' });
		return;
	}
	if (typeof req.body.chat === 'string') {
		setChatID(req.body.chat);
		res.send({ msg: 'ok' });
	} else {
		res.status(400).send({ error: 'Expected "chat" to be a string' });
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