import { v4 } from 'uuid';

class Phone {
  public readonly id;

  public idContato: string;

  public telefone: string;

  constructor({ idContato, telefone }: Omit<Phone, 'id'>) {
    Object.assign(this, { idContato, telefone });
    this.id = v4();
  }
}

export { Phone };
