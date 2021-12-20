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

  async execute({ nome, idade, telefones }: ICreateContactDTO) : Promise<Contact> {
    const promiseContactExists = telefones.map((telefone) => {
      const phoneExists = this.contactsRepository.findByPhone(telefone);
      return phoneExists;
    });

    const resolvedContactExists = await Promise.all(promiseContactExists);

    const contactExists = resolvedContactExists.find((telefone) => telefone);

    if (contactExists) throw new AppError('This phone number already exists', 400);

    const contact = await this.contactsRepository.create({ nome, idade, telefones });

    return contact;
  }
}

export { CreateContactUseCase };
