import { inject, injectable } from 'tsyringe';
import { IListContactsDTO } from '../../dtos/IListContactsDTO';
import { Contact } from '../../entities/Contact';
import { IContactsRepository } from '../../repositories/IContactsRepository';

@injectable()
class ListContactsByNameUseCase {
  constructor(
    @inject('ContactsRepository')
    private contactRepository: IContactsRepository,
  ) {}

  async execute({ name }: IListContactsDTO): Promise<Contact[]> {
    const contacts = this.contactRepository.listByName(name);

    return contacts;
  }
}

export { ListContactsByNameUseCase };
