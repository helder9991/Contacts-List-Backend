import {
  Column, Entity, JoinColumn, ManyToOne, PrimaryGeneratedColumn,
} from 'typeorm';

import { Contact } from './Contact';

@Entity('phones')
class Phone {
  @PrimaryGeneratedColumn()
    id: number;

  @Column()
    idContact: string;

  @ManyToOne(() => Contact, (contact) => contact.phones)
  @JoinColumn({ name: 'idContact' })
    contact: Contact;

  @Column()
    number: string;
}

export { Phone };
