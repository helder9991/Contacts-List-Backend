import { Contact } from '../../entities/Contact';
import { ICreateContactDTO } from '../../dtos/ICreateContactDTO';
import { IContactsRepository } from '../IContactsRepository';

class FakeContactsRepository implements IContactsRepository {
  contacts: Array<Contact> = [];

  async create({ nome, idade, telefones }: ICreateContactDTO): Promise<Contact> {
    const contact = new Contact({ nome, idade, telefones });

    this.contacts.push(contact);

    return contact;
  }
}

export { FakeContactsRepository };
