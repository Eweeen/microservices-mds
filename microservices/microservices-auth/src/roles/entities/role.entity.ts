import { User } from '../../users/entities/user.entity';
import { Entity, PrimaryGeneratedColumn, Column, OneToMany } from 'typeorm';
import { config } from 'dotenv';

config({ path: 'encrypt-db.env' });

@Entity('roles')
export class Role {
  @PrimaryGeneratedColumn({ unsigned: true, type: 'tinyint' })
  id: number;

  @Column({ name: 'label', type: 'varchar' })
  label: string;

  //====================================================
  // Relations
  //====================================================

  //+++++++++++++++
  // One To Many
  //+++++++++++++++
  @OneToMany(() => User, (user) => user.role)
  users: User[];
}
