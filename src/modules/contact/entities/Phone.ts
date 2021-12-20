import { v4 } from 'uuid';

class Phone {
  public readonly id;

  public idContact: string;

  public phoneNumber: string;

  constructor({ idContact, phoneNumber }: Omit<Phone, 'id'>) {
    Object.assign(this, { idContact, phoneNumber });
    this.id = v4();
  }
}

export { Phone };
