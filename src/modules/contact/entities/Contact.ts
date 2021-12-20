import { v4 } from 'uuid';
import { Phone } from './Phone';

interface IContact {
  telefones: string[];
}

class Contact {
  public readonly id;

  public nome: string;

  public idade: number;

  public telefones: Phone[];

  constructor({ nome, idade, telefones }: Pick<Contact, 'nome'| 'idade'> & IContact) {
    Object.assign(this, { nome, idade });
    this.id = v4();

    this.telefones = telefones.map((telefone) => new Phone({
      idContato: this.id,
      telefone,
    }));
  }
}

export { Contact };
