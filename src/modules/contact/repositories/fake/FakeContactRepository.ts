import { v4 } from 'uuid';
import { Phone } from '../../entities/Phone';
import { Contact } from '../../entities/Contact';
import { ICreateContactDTO } from '../../dtos/ICreateContactDTO';
import { IContactsRepository } from '../IContactsRepository';

class FakeContactsRepository implements IContactsRepository {
  contacts: Array<Contact> = [];

  async create({ name, yearsOld, phoneNumbers }: ICreateContactDTO): Promise<Contact> {
    const contact = new Contact();

    Object.assign(contact, {
      id: v4(),
      name,
      yearsOld,
      phones: phoneNumbers.map((phoneNumber) => {
        const phone = new Phone();

        Object.assign(phone, { id: v4(), number: phoneNumber });

        return phone;
      }),
    });

    this.contacts.push(contact);

    return contact;
  }

  async findByPhone(phone: string): Promise<Contact | undefined> {
    const contactExists = this.contacts.find((contact) => {
      const phoneExists = contact.phones.find(
        (phoneNumbers) => phoneNumbers.number === phone,
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
