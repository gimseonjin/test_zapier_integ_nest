import { Entity, PrimaryGeneratedColumn, Column, Unique } from 'typeorm';

@Entity()
export class ZapierWebHook {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({unique: true})
  targetUrl: string;

  @Column({unique: true})
  zapierId: string;

  static create(zapierId: string, targetUrl: string): ZapierWebHook{
    const entity = new ZapierWebHook()
    entity.zapierId = zapierId
    entity.targetUrl = targetUrl
    return entity
  }
}
