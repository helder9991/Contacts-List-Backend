import { inject, injectable } from 'tsyringe';
import AppError from '../../../../middlewares/AppError';
import { IUpdateContactDTO } from '../../dtos/IUpdateContactDTO';
import { Contact } from '../../entities/Contact';
import { IContactsRepository } from '../../repositories/IContactsRepository';

@injectable()
class UpdateContactUseCase {
  constructor(
    @inject('ContactsRepository')
          private contactRepository: IContactsRepository,
  ) {}

  async execute({
    id, name, yearsOld, phoneNumbers,
  }: IUpdateContactDTO): Promise<Contact> {
    const contact = await this.contactRepository.update({
      id,
      name,
      yearsOld,
      phoneNumbers,
    });

    if (!contact) throw new AppError('Contact does not exists', 404);

    return contact;
  }
}

export { UpdateContactUseCase };
