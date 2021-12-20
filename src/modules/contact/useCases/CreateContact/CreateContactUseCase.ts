import { inject, injectable } from 'tsyringe';
import AppError from '../../../../middlewares/AppError';
import { ICreateContactDTO } from '../../dtos/ICreateContactDTO';
import { Contact } from '../../entities/Contact';
import { IContactsRepository } from '../../repositories/IContactsRepository';

@injectable()
class CreateContactUseCase {
  constructor(
    @inject('ContactsRepository')
    private contactsRepository: IContactsRepository,
  ) {}

  async execute({ name, yearsOld, phoneNumbers }: ICreateContactDTO) : Promise<Contact> {
    const promiseContactExists = phoneNumbers.map((phoneNumber) => {
      const phoneExists = this.contactsRepository.findByPhone(phoneNumber);
      return phoneExists;
    });

    const resolvedContactExists = await Promise.all(promiseContactExists);

    const contactExists = resolvedContactExists.find((phoneNumber) => phoneNumber);

    if (contactExists) throw new AppError('This phone number already exists', 400);

    // Remove numeros duplicados
    const noDuplicatedPhones = [...new Set(phoneNumbers)];

    const contact = await this.contactsRepository.create({
      name,
      yearsOld,
      phoneNumbers: noDuplicatedPhones,
    });

    return contact;
  }
}

export { CreateContactUseCase };
