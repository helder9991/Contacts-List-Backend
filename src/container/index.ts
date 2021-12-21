import { container } from 'tsyringe';
import { ContactRepository } from '../modules/contact/repositories/typeorm/ContactsRepository';
import { IContactsRepository } from '../modules/contact/repositories/IContactsRepository';

container.registerSingleton<IContactsRepository>('ContactsRepository', ContactRepository);
