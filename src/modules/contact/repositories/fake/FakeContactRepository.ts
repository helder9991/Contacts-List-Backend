import { Contact } from '../../entities/Contact';
import { ICreateContactDTO } from '../../dtos/ICreateContactDTO';
import { IContactsRepository } from '../IContactsRepository';

class FakeContactsRepository implements IContactsRepository {
  contacts: Array<Contact> = [];

  async create({ name, yearsOld, phoneNumbers }: ICreateContactDTO): Promise<Contact> {
    const contact = new Contact({ name, yearsOld, phoneNumbers });

    this.contacts.push(contact);

    return contact;
  }

  async findByPhone(phone: string): Promise<Contact | undefined> {
    const contactExists = this.contacts.find((contact) => {
      const phoneExists = contact.phoneNumbers.find(
        (phoneNumbers) => phoneNumbers.phoneNumber === phone,
      );

      return !!phoneExists;
    });

    return contactExists;
  }

  async listByName(name: string): Promise<Contact[]> {
    const contacts = this.contacts.filter((contact) => contact.name === name);

    return contacts;
  }
}

export { FakeContactsRepository };
