import {
  Column,
  CreateDateColumn,
  Entity,
  JoinColumn,
  Index,
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
  @ManyToOne(() => User, (user: User) => user.wallets, {
    onUpdate: 'CASCADE',
    onDelete: 'CASCADE',
  })
  @JoinColumn({ name: 'user_wallets' })
  user: User;
}
