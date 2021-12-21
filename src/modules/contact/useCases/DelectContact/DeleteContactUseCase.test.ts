import 'reflect-metadata';
import { FakeContactsRepository } from '../../repositories/fake/FakeContactRepository';
import { CreateContactUseCase } from '../CreateContact/CreateContactUseCase';
import { ListContactsByNameUseCase } from '../ListContacts/ListContactsByNameUseCase';
import { DeleteContactUseCase } from './DeleteContactUseCase';

let fakeContactRepository: FakeContactsRepository;
let deleteContact: DeleteContactUseCase;
let createContact: CreateContactUseCase;
let listContacts: ListContactsByNameUseCase;

describe('FindContact', () => {
  beforeAll(async () => {
    fakeContactRepository = new FakeContactsRepository();
    deleteContact = new DeleteContactUseCase(fakeContactRepository);
    createContact = new CreateContactUseCase(fakeContactRepository);
    listContacts = new ListContactsByNameUseCase(fakeContactRepository);

    await createContact.execute({
      name: 'John',
      yearsOld: 17,
      phoneNumbers: ['(00)00000-0000'],
    });
  });

  it('Should be able to delete a contact', async () => {
    const contact = await listContacts.execute({ name: '' });
    const deleted = await deleteContact.execute({ id: contact[0].id });
    expect(deleted).toBeTruthy();
  });

  it('Should not be able to delete a non existing contact', async () => {
    const deleted = await deleteContact.execute({ id: 123 });
    expect(deleted).toBeFalsy();
  });
});
