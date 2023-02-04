import {
  BeforeInsert,
  Column,
  CreateDateColumn,
  Entity,
  OneToMany,
  PrimaryGeneratedColumn,
} from 'typeorm';

import * as bcrypt from 'bcrypt';
import { Wallet } from '../wallet/wallet.entity';

@Entity({
  name: 'users',
})
export class User {
  @PrimaryGeneratedColumn()
  userId: number;
  @Column()
  firstname: string;
  @Column()
  lastname: string;
  @Column({ unique: true })
  email: string;
  @Column({ type: 'decimal', precision: 10, scale: 3 })
  balance = 0.0;
  @Column()
  password: string;
  @Column()
  @CreateDateColumn()
  createdAt: Date;
  @OneToMany(() => Wallet, (wallet: Wallet) => wallet.user, {
    cascade: ['insert', 'update'],
  })
  wallets: Wallet[];
  @BeforeInsert()
  async hashPassword() {
    this.password = await bcrypt.hash(this.password, 8);
  }
}
