const { Schema, model, connect, connection } = require('mongoose');

if (process.argv.length < 3) {
	console.log(
		'Please provide the password as an argument: node mongo.js <password>'
	);
	process.exit(1);
}

const password = process.argv[2];

const uri = `mongodb+srv://aditya:${password}@cluster0.usjbg.mongodb.net/noteApp?retryWrites=true&w=majority`;

const notesSchema = new Schema({
	content: String,
	date: Date,
	important: Boolean,
});

const Note = model('Note', notesSchema);

connect(uri)
	.then(() => {
		// console.log('Connected');

		// const note = new Note({
		// 	content: 'HTML is Easy',
		// 	date: new Date(),
		// 	important: true,
		// });

		return Note.find({});
	})
	.then((result) => {
		result.forEach((note) => {
			console.log(note);
		});
		connection.close();
	})
	.catch((e) => console.log(e));
