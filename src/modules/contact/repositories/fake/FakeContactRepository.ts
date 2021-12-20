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

  async findByPhone(phone: string): Promise<Contact | undefined> {
    const contactExists = this.contacts.find((contact) => {
      const phoneExists = contact.telefones.find((telefones) => telefones.telefone === phone);

      return !!phoneExists;
    });

    return contactExists;
  }

  async listByName(name: string): Promise<Contact[]> {
    const contacts = this.contacts.filter((contact) => contact.nome === name);

    return contacts;
  }
}

export { FakeContactsRepository };
