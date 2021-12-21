import { v4 } from 'uuid';
import { Phone } from '../../entities/Phone';
import { Contact } from '../../entities/Contact';
import { ICreateContactDTO } from '../../dtos/ICreateContactDTO';
import { IContactsRepository } from '../IContactsRepository';
import { IUpdateContactDTO } from '../../dtos/IUpdateContactDTO';

class FakeContactsRepository implements IContactsRepository {
  contacts: Array<Contact> = [];

  async create({ name, yearsOld, phoneNumbers }: ICreateContactDTO): Promise<Contact> {
    const contact = new Contact();
    const id = v4();
    Object.assign(contact, {
      id: v4(),
      name,
      yearsOld,
      phones: phoneNumbers.map((phoneNumber) => {
        const phone = new Phone();

        Object.assign(phone, { id: v4(), idContact: id, number: phoneNumber });

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
    if (!name) return this.contacts;
    const contacts = this.contacts.filter((contact) => contact.name === name);

    return contacts;
  }

  async delete(id: number): Promise<Boolean> {
    const contactIndex = this.contacts.findIndex((contact) => contact.id === id);

    if (contactIndex > -1) this.contacts.splice(contactIndex, 1);

    return contactIndex > -1;
  }

  async update({
    id, name, yearsOld, phoneNumbers,
  }: IUpdateContactDTO): Promise<Contact | undefined> {
    const contactIndex = this.contacts.findIndex((contact) => contact.id === id);

    if (contactIndex === -1) return undefined;

    Object.assign(this.contacts[contactIndex], {
      name,
      yearsOld,
      phones: phoneNumbers.map((phoneNumber, index) => {
        const phone = this.contacts[contactIndex].phones[index];

        Object.assign(phone, { number: phoneNumber.number });

        return phone;
      }),
    });

    return this.contacts[contactIndex];
  }
}

export { FakeContactsRepository };
