import { Contact } from '../entities/Contact';
import { ICreateContactDTO } from '../dtos/ICreateContactDTO';

interface IContactsRepository {
    create(data: ICreateContactDTO): Promise<Contact>;
    findByPhone(phone: string): Promise<Contact | undefined>;
}

export { IContactsRepository };