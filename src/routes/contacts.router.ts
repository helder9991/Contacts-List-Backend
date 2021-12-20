import express from 'express';
import CreateContactController from '../modules/contact/controllers/CreateContactController';
import FindContactByPhoneController from '../modules/contact/controllers/FindContactByPhoneController';

const router = express.Router();

router.post('/contacts', (req, res) => CreateContactController.handle(req, res));
router.get('/contacts', (req, res) => FindContactByPhoneController.handle(req, res));

export default router;
