import { Injectable } from '@nestjs/common';
import { ZapierWebHook } from './zapier_webhook.entity';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { HttpService } from '@nestjs/axios';
import { firstValueFrom } from 'rxjs';

@Injectable()
export class ZapierService {
  constructor(
    private httpService: HttpService,
    @InjectRepository(ZapierWebHook)
    private readonly zapierRepo: Repository<ZapierWebHook>,
  ) {}

  async subscribe(zapierId: string, targetUrl: string){
    const hook = ZapierWebHook.create(zapierId, targetUrl)
    await this.zapierRepo.save(hook)
  }

  async unsubscribe(zapierId: string){
    await this.zapierRepo.delete(zapierId)
  }

  async handleWebhook(payload: any){
    const webhooks = await this.zapierRepo.find()
    for (const webhook of webhooks) {
      try {
        await firstValueFrom(this.httpService.post(webhook.targetUrl, payload));
      } catch (error) {
        console.error(error);
      }
    }
  }
}
