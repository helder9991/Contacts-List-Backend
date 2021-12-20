import { inject, injectable } from 'tsyringe';
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
    const contact = this.contactsRepository.create({ nome, idade, telefones });

    return contact;
  }
}

export { CreateContactUseCase };
