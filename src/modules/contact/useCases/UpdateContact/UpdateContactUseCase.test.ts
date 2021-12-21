import 'reflect-metadata';
import { FakeContactsRepository } from '../../repositories/fake/FakeContactRepository';
import { CreateContactUseCase } from '../CreateContact/CreateContactUseCase';
import { ListContactsByNameUseCase } from '../ListContacts/ListContactsByNameUseCase';
import { UpdateContactUseCase } from './UpdateContactUseCase';

let fakeContactRepository: FakeContactsRepository;
let createContact: CreateContactUseCase;
let listContacts: ListContactsByNameUseCase;
let updateContact: UpdateContactUseCase;

describe('ListContacts', () => {
  beforeAll(async () => {
    fakeContactRepository = new FakeContactsRepository();
    listContacts = new ListContactsByNameUseCase(fakeContactRepository);
    createContact = new CreateContactUseCase(fakeContactRepository);
    updateContact = new UpdateContactUseCase(fakeContactRepository);

    await createContact.execute({
      name: 'John',
      yearsOld: 35,
      phoneNumbers: ['(22)22222-2222', '(33)33333-3333'],
    });
  });

  it('Should be able to update a contact', async () => {
    const contacts1 = await listContacts.execute({
      name: 'John',
    });

    await updateContact.execute({
      id: contacts1[0].id,
      name: 'Mary',
      phoneNumbers: [{
        id: contacts1[0].phones[0].id,
        number: '(11)11111-22222',
      }],
      yearsOld: 18,
    });

    const contacts2 = await listContacts.execute({
      name: 'Mary',
    });

    expect(contacts2[0]).toEqual(
      expect.objectContaining({
        name: 'Mary',
        phones: expect.arrayContaining([
          expect.objectContaining({
            number: '(11)11111-22222',
          }),
        ]),
        yearsOld: 18,
      }),
    );
  });

  it('Should not be able to update a non existing contact', async () => {
    await expect(updateContact.execute({
      id: 1,
      name: 'Mary',
      phoneNumbers: [{
        id: 10,
        number: '(11)11111-22222',
      }],
      yearsOld: 18,
    })).rejects.toHaveProperty('message', 'Contact does not exists');
  });
});
