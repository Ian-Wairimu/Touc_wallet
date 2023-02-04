import {
  Column,
  CreateDateColumn,
  Entity,
  Index,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { User } from '../users/users.entity';

@Entity({
  name: 'wallets',
})
export class Wallet {
  @PrimaryGeneratedColumn()
  walletId: number;
  @Column({ type: 'decimal', precision: 10, scale: 3 })
  balance = 0.0;
  @Column({ unique: true })
  businessName: string;
  @Column({ default: ' ' })
  businessDescription: string;
  @Column({ unique: true })
  businessEmail: string;
  @Column()
  @CreateDateColumn()
  createdAt: Date;
  @Index()
  @ManyToOne(() => User, (user: User) => user.wallets)
  @JoinColumn({ name: 'userId' })
  user: User;
}
