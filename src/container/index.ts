import { container } from 'tsyringe';
import { FakeContactsRepository } from '../modules/contact/repositories/fake/FakeContactRepository';
import { IContactsRepository } from '../modules/contact/repositories/IContactsRepository';

container.registerSingleton<IContactsRepository>('ContactsRepository', FakeContactsRepository);
