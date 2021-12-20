import { v4 } from 'uuid';
import { Phone } from './Phone';

interface IContact {
  phoneNumbers: string[];
}

class Contact {
  public readonly id;

  public name: string;

  public yearsOld: number;

  public phoneNumbers: Phone[];

  constructor({ name, yearsOld, phoneNumbers }: Pick<Contact, 'name'| 'yearsOld'> & IContact) {
    Object.assign(this, { name, yearsOld });
    this.id = v4();

    this.phoneNumbers = phoneNumbers.map((phoneNumber) => new Phone({
      idContact: this.id,
      phoneNumber,
    }));
  }
}

export { Contact };
