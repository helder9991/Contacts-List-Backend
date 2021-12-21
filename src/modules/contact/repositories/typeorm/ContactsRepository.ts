import { getRepository, Like } from 'typeorm';
import { ICreateContactDTO } from '../../dtos/ICreateContactDTO';
import { IUpdateContactDTO } from '../../dtos/IUpdateContactDTO';
import { Contact } from '../../entities/Contact';
import { Phone } from '../../entities/Phone';
import { IContactsRepository } from '../IContactsRepository';

class ContactsRepository implements IContactsRepository {
  repository;

  constructor() {
    this.repository = getRepository(Contact);
  }

  async create({ name, phoneNumbers, yearsOld }: ICreateContactDTO): Promise<Contact> {
    let contact = new Contact();

    Object.assign(contact, { name, yearsOld });

    contact = await this.repository.save(contact);

    const phoneRepository = getRepository(Phone);
    const phone = new Phone();

    phoneNumbers.forEach(async (phoneNumber) => {
      Object.assign(phone, { idContact: contact.id, number: phoneNumber });
      await phoneRepository.save(phone);
    });

    return contact;
  }

  async findByPhone(phone: string): Promise<Contact | undefined> {
    const contact = await this.repository.findOne({
      join: {
        alias: 'contact',
        innerJoinAndSelect: {
          phones: 'contact.phones',
        },
      },
      where: (qb: any) => {
        qb.where({}).andWhere('phones.number = :number', { number: phone });
      },
    });

    return contact;
  }

  async listByName(name: string): Promise<Contact[]> {
    const contacts = await this.repository.find({
      relations: ['phones'],
      where: {
        name: Like(`%${name}%`),
      },
      order: {
        name: 'ASC',
      },
    });

    return contacts;
  }

  async delete(id: number): Promise<Boolean> {
    const contact = await this.repository.delete(id);

    return !!contact.affected;
  }

  async update({
    id, name, phoneNumbers, yearsOld,
  }: IUpdateContactDTO): Promise<Contact | undefined> {
    const contact = await this.repository.update({ id }, {
      name,
      yearsOld,
    });

    const phoneRepository = getRepository(Phone);

    phoneNumbers.forEach(async (phoneNumber) => {
      const phone = await phoneRepository.find({
        where: {
          id: phoneNumber.id,
          idContact: id,
        },
      });

      await phoneRepository.save({
        ...phone[0],
        number: phoneNumber.number,
      });
    });

    if (!contact.affected) return undefined;

    return contact.raw;
  }
}

export { ContactsRepository as ContactRepository };
