const mongoose = require('mongoose');

const uri = process.env.MONGODB_URI;

mongoose
	.connect(uri)
	.then((result) => {
		console.log('Connecting to MongoDB');
	})
	.catch((error) => {
		console.log('error connecting to MongoDB:', error.message);
	});

const notesSchema = new mongoose.Schema({
	content: String,
	date: Date,
	important: Boolean,
});

notesSchema.set('toJSON', {
	transform: (document, returnedObject) => {
		returnedObject.id = returnedObject._id.toString();
		delete returnedObject._id;
		delete returnedObject.__v;
	},
});

module.exports = mongoose.model('Note', notesSchema);
