import { IListContactsDTO } from '../../dtos/IListContactsDTO';
import { Contact } from '../../entities/Contact';
import { IContactsRepository } from '../../repositories/IContactsRepository';

class ListContactsByNameUseCase {
  constructor(
    private contactRepository: IContactsRepository,
  ) {}

  async execute({ name }: IListContactsDTO): Promise<Contact[]> {
    const contacts = this.contactRepository.listByName(name);

    return contacts;
  }
}

export { ListContactsByNameUseCase };
