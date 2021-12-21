import { Contact } from '../entities/Contact';
import { ICreateContactDTO } from '../dtos/ICreateContactDTO';
import { IUpdateContactDTO } from '../dtos/IUpdateContactDTO';

interface IContactsRepository {
    create(data: ICreateContactDTO): Promise<Contact>;
    findByPhone(phone: string): Promise<Contact | undefined>;
    listByName(name: string): Promise<Contact[]>;
    delete(id: number): Promise<Boolean>;
    update(data: IUpdateContactDTO): Promise<Contact | undefined>;
}

export { IContactsRepository };
