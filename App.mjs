import express from 'express';
import mongoose from 'mongoose';
import cors from 'cors';
import dotenv from 'dotenv'; 

dotenv.config();  

const app = express();

app.use(express.static('public'));
app.use(cors());
app.use(express.json());

const url = process.env.MONGO_URI;


mongoose.connect(url)
    .then(() => console.log('MongoDB connected'))
    .catch(err => console.error('MongoDB connection error:', err));

const noteSchema = new mongoose.Schema({
    title: String,
    content: String,
});
const Note = mongoose.model('Note', noteSchema);

app.post('/notes', async (req, res) => {
    const { title, content } = req.body;

    if (!title || !content) {
        return res.status(400).json({ error: 'Title and content are required' });
    }

    try {
        const newNote = new Note({
            title,
            content
        });

        await newNote.save();

        res.status(201).json(newNote);
    } catch (err) {
        res.status(500).json({ error: 'Failed to save note' });
    }
});

app.get('/notes', async (req, res) => {
    try {
        const notes = await Note.find();
        res.json(notes);
    } catch (err) {
        if (!res.headersSent) {
            res.status(500).json({ error: 'Failed to fetch notes' });
        }
    }
});

app.delete('/notes/:id', async (req, res) => {
    try {
        const { id } = req.params;
        const deletedNote = await Note.findByIdAndDelete(id);

        if (!deletedNote) {
            return res.status(404).json({ error: 'Note not found' });
        }

        res.status(200).json({ message: 'Note deleted successfully' });
    } catch (err) {
        console.error('Error deleting note:', err);
        res.status(500).json({ error: 'Failed to delete note' });
    }
});

let PORT = process.env.PORT;
if (PORT == null || port == undefined || port == " ") {
    PORT = 5001;
}
app.listen(PORT, () => {
    console.log(`App listening on port ${PORT}`);
});
