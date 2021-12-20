import express from 'express';
import CreateContactController from '../modules/contact/controllers/CreateContactController';

const router = express.Router();

router.post('/contacts', (req, res) => CreateContactController.handle(req, res));

export default router;
