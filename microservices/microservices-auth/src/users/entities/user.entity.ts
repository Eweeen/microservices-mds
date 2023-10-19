import { config } from 'dotenv';
import { Role } from '../../roles/entities/role.entity';
import {
  Column,
  Entity,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';

config({ path: 'encrypt-db.env' });

@Entity('users')
export class User {
  @PrimaryGeneratedColumn({ unsigned: true, type: 'int' })
  id: number;

  @Column({ name: 'email', type: 'varchar', unique: true })
  email: string;

  @Column({ name: 'password', type: 'varchar', select: false })
  password: string;

  //====================================================
  // Relations
  //====================================================

  //+++++++++++++++
  // Many To One
  //+++++++++++++++
  @ManyToOne(() => Role, (role) => role)
  @JoinColumn({ name: 'role_id' })
  role: Role;
}
