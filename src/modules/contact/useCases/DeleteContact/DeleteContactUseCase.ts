import { inject, injectable } from 'tsyringe';
import { IDeleteContactDTO } from '../../dtos/IDeleteContactDTO';
import { IContactsRepository } from '../../repositories/IContactsRepository';

@injectable()
class DeleteContactUseCase {
  constructor(
    @inject('ContactsRepository')
          private contactsRepository: IContactsRepository,
  ) {}

  async execute({ id }: IDeleteContactDTO) : Promise<Boolean> {
    const contactDeleted = await this.contactsRepository.delete(id);

    return contactDeleted;
  }
}

export { DeleteContactUseCase };
