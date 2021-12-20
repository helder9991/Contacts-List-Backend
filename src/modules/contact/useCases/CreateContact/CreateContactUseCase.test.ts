import 'reflect-metadata';
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

  it('Should not be able to create a contact with a invalid params', async () => {
    try {
      await createContact.execute({
        nome: '',
        idade: 0,
        telefones: [],
      });
    } catch (err: any) {
      expect(err.message).toBe('Validation fails');
    }
  });
});
