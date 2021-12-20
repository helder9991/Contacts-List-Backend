import 'reflect-metadata';
import AppError from '../../../../middlewares/AppError';
import { FakeContactsRepository } from '../../repositories/fake/FakeContactRepository';
import { CreateContactUseCase } from './CreateContactUseCase';

let fakeContactRepository: FakeContactsRepository;
let createContact: CreateContactUseCase;

describe('CreateContact', () => {
  beforeEach(() => {
    fakeContactRepository = new FakeContactsRepository();
    createContact = new CreateContactUseCase(fakeContactRepository);
  });

  it('Should be able to create a new contact', async () => {
    const contact = await createContact.execute({
      nome: 'John',
      idade: 17,
      telefones: ['(00)00000-0000'],
    });

    expect(contact).toHaveProperty('id');
  });

  it('Should not be able to create a contact with a existing phone number', async () => {
    await createContact.execute({
      nome: 'John',
      idade: 17,
      telefones: ['(00)00000-0000'],
    });

    await expect(createContact.execute({
      nome: 'Mary',
      idade: 22,
      telefones: ['(00)00000-0000'],
    })).rejects.toBeInstanceOf(AppError);

    await expect(createContact.execute({
      nome: 'Mary',
      idade: 22,
      telefones: ['(00)00000-0000'],
    })).rejects.toHaveProperty('message', 'This phone number already exists');
  });

  it('Should be able to remove a duplicated phone number before create a contact', async () => {
    const contact = await createContact.execute({
      nome: 'John',
      idade: 17,
      telefones: ['(00)00000-0000', '(00)00000-0000', '(11)11111-1111'],
    });

    expect(contact.telefones[0]).toHaveProperty('telefone', '(00)00000-0000');
    expect(contact.telefones[1]).toHaveProperty('telefone', '(11)11111-1111');
  });
});
