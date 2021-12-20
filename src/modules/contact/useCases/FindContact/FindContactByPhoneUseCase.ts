import { IFindContactDTO } from '../../dtos/IFindContactDTO';
import { Contact } from '../../entities/Contact';
import { IContactsRepository } from '../../repositories/IContactsRepository';

class FindContactByPhoneUseCase {
  constructor(
          private contactsRepository: IContactsRepository,
  ) {}

  async execute({ telefone }: IFindContactDTO) : Promise<Contact | undefined> {
    const contact = this.contactsRepository.findByPhone(telefone);

    return contact;
  }
}

export { FindContactByPhoneUseCase };
