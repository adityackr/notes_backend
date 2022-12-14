require('dotenv').config();
const express = require('express');
const cors = require('cors');

const app = express();
const Note = require('./models/note');

app.use(express.json());
app.use(express.static('build'));
app.use(cors());

let notes = [
	{
		id: 1,
		content: 'HTML is easy',
		date: '2022-05-30T17:30:31.098Z',
		important: true,
	},
	{
		id: 2,
		content: 'Browser can execute only Javascript',
		date: '2022-05-30T18:39:34.091Z',
		important: false,
	},
	{
		id: 3,
		content: 'GET and POST are the most important methods of HTTP protocol',
		date: '2022-05-30T19:20:14.298Z',
		important: true,
	},
];

app.get('/', (req, res) => {
	res.send(`<h1>Hello World!</h1>`);
});

app.get('/api/notes', (req, res) => {
	Note.find({}).then((notes) => res.json(notes));
});

app.post('/api/notes', (req, res) => {
	const body = req.body;

	if (body.content === undefined) {
		return res.status(400).json({
			error: 'content missing',
		});
	}

	const note = {
		content: body.content,
		important: body.important || false,
		date: new Date(),
	};

	note.save().then((savedNote) => res.json(savedNote));
});

app.get('/api/notes/:id', (req, res) => {
	Note.findById(req.params.id).then((note) => res.json(note));
});

app.delete('/api/notes/:id', (req, res) => {
	const id = Number(req.params.id);
	notes = notes.filter((note) => note.id !== id);

	res.status(204).end();
});

const PORT = process.env.PORT || 3001;
app.listen(PORT, () => {
	console.log(`Server running on port ${PORT}`);
});

// const app = http.createServer((req, res) => {
// 	res.writeHead(200, { 'Content-Type': 'application/json' });
// 	res.end(JSON.stringify(notes));
// });

// const PORT = 3001;
// app.listen(PORT);
// console.log(`Server running on port ${PORT}`);
