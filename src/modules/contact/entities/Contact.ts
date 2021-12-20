import {
  Column, Entity, OneToMany, PrimaryGeneratedColumn,
} from 'typeorm';
import { Phone } from './Phone';

@Entity('contacts')
class Contact {
  @PrimaryGeneratedColumn()
    id: number;

  @Column()
    name: string;

  @Column()
    yearsOld: number;

  @OneToMany(() => Phone, (phone) => phone.idContact)
    phoneNumbers: Phone[];
}

export { Contact };
