import 'reflect-metadata';
import { FakeContactsRepository } from '../../repositories/fake/FakeContactRepository';
import { CreateContactUseCase } from '../CreateContact/CreateContactUseCase';
import { ListContactsByNameUseCase } from './ListcontactsByNameUseCase';

let fakeContactRepository: FakeContactsRepository;
let createContact: CreateContactUseCase;
let listContacts: ListContactsByNameUseCase;

describe('ListContacts', () => {
  beforeAll(async () => {
    fakeContactRepository = new FakeContactsRepository();
    listContacts = new ListContactsByNameUseCase(fakeContactRepository);
    createContact = new CreateContactUseCase(fakeContactRepository);

    await createContact.execute({
      name: 'John',
      yearsOld: 25,
      phoneNumbers: ['(00)00000-0000', '(11)11111-1111'],
    });

    await createContact.execute({
      name: 'John',
      yearsOld: 35,
      phoneNumbers: ['(22)22222-2222', '(33)33333-3333'],
    });
  });

  it('Should be able to list contacts by name', async () => {
    const contacts = await listContacts.execute({
      name: 'John',
    });

    expect(contacts).toEqual(
      expect.arrayContaining([
        expect.objectContaining({
          yearsOld: 35,
        }),
        expect.objectContaining({
          yearsOld: 25,
        }),
      ]),
    );
  });

  it('Should not be able to list non existing contact', async () => {
    const contacts = await listContacts.execute({
      name: 'Mary',
    });

    expect(contacts).toHaveLength(0);
  });
});
