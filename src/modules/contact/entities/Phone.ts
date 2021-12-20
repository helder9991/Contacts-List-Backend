import {
  Column, Entity, ManyToOne, PrimaryGeneratedColumn,
} from 'typeorm';

import { Contact } from './Contact';

@Entity('Phones')
class Phone {
  @PrimaryGeneratedColumn()
  public readonly id: number;

  @ManyToOne(() => Contact, (contact) => contact.id)
  public idContact: string;

  @Column()
  public phoneNumber: string;
}

export { Phone };
