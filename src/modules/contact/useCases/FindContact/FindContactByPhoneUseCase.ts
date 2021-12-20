import { inject, injectable } from 'tsyringe';
import { IFindContactDTO } from '../../dtos/IFindContactDTO';
import { Contact } from '../../entities/Contact';
import { IContactsRepository } from '../../repositories/IContactsRepository';

@injectable()
class FindContactByPhoneUseCase {
  constructor(
      @inject('ContactsRepository')
      private contactsRepository: IContactsRepository,
  ) {}

  async execute({ phoneNumber }: IFindContactDTO) : Promise<Contact | undefined> {
    const contact = this.contactsRepository.findByPhone(phoneNumber);

    return contact;
  }
}

export { FindContactByPhoneUseCase };
