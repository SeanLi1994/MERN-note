import express from 'express';

import { getAllNotes, createNewNote, updateNote, deleteNote } from '../controllers/notesController.js';
import verifyJWY from '../middleware/verifyJWT.js';
const router = express.Router();

router.use(verifyJWY);


router.route('/')
    .get(getAllNotes)
    .post(createNewNote)
    .patch(updateNote)
    .delete(deleteNote)

export default router;