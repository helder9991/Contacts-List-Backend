import express from 'express';
import contacts from './contacts.router';

const router = express.Router();

router.use(contacts);

export default router;
