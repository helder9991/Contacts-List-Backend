import 'reflect-metadata';
import { FakeContactsRepository } from '../../repositories/fake/FakeContactRepository';
import { CreateContactUseCase } from '../CreateContact/CreateContactUseCase';
import { FindContactByPhoneUseCase } from './FindContactByPhoneUseCase';

let fakeContactRepository: FakeContactsRepository;
let findContact: FindContactByPhoneUseCase;
let createContact: CreateContactUseCase;

describe('FindContact', () => {
  beforeAll(async () => {
    fakeContactRepository = new FakeContactsRepository();
    findContact = new FindContactByPhoneUseCase(fakeContactRepository);
    createContact = new CreateContactUseCase(fakeContactRepository);
    await createContact.execute({
      nome: 'John',
      idade: 17,
      telefones: ['(00)00000-0000'],
    });
  });

  it('Should be able to find a existing contact by phone number', async () => {
    const contact = await findContact.execute({
      telefone: '(00)00000-0000',
    });

    expect(contact).toHaveProperty('id');
  });

  it('Should not be able to find a non existing contact by phone number', async () => {
    const contact = await findContact.execute({
      telefone: '(11)11111-1111',
    });

    expect(contact).toBeUndefined();
  });
});
