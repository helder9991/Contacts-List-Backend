import express from 'express';
import CreateContactController from '../modules/contact/controllers/CreateContactController';
import FindContactByPhoneController from '../modules/contact/controllers/FindContactByPhoneController';
import ListContactsByNameController from '../modules/contact/controllers/ListContactsByNameController';

const router = express.Router();

router.post('/contacts', (req, res) => CreateContactController.handle(req, res));
router.get('/contacts', (req, res) => ListContactsByNameController.handle(req, res));
router.get('/contact', (req, res) => FindContactByPhoneController.handle(req, res));

export default router;
