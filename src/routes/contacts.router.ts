import express from 'express';
import CreateContactController from '../modules/contact/controllers/CreateContactController';
import DeleteContactController from '../modules/contact/controllers/DeleteContactController';
import FindContactByPhoneController from '../modules/contact/controllers/FindContactByPhoneController';
import ListContactsByNameController from '../modules/contact/controllers/ListContactsByNameController';
import UpdateContactController from '../modules/contact/controllers/UpdateContactController';

const router = express.Router();

router.post('/contacts', (req, res) => CreateContactController.handle(req, res));
router.get('/contacts', (req, res) => ListContactsByNameController.handle(req, res));
router.get('/contact', (req, res) => FindContactByPhoneController.handle(req, res));
router.delete('/contact/:id', (req, res) => DeleteContactController.handle(req, res));
router.put('/contact/:id', (req, res) => UpdateContactController.handle(req, res));

export default router;
