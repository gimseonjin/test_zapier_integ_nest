import { Body, Controller, Delete, Get, Inject, Param, Post, Headers } from '@nestjs/common';
import { ZapierService } from './zapier.service';
import { v4 } from 'uuid';

@Controller('/zapier')
export class ZapierController {
  constructor(
    @Inject(ZapierService) private readonly zapierService: ZapierService
  ){ }

  @Get('/me')
  async check(@Headers('x-api-key') apiKey: string){
    return {authentication : 'ok'}
  }

  @Post('/hook')
  async sub(@Body() body: any){
    const {zapierId, targetUrl} = body;
    await this.zapierService.subscribe(zapierId, targetUrl)
    return {zapierId, targetUrl}
  }

  @Delete('/hook/:id')
  async unsub(@Param('id') id: string){
    await this.zapierService.unsubscribe(id)
  }

  @Get('/settings')
  async setting(){
    try{
      await this.zapierService.handleWebhook({
        id: 1,
        title : 'title',
        updated_at: '06-10',
        confirmed_at: '06-10',
        organizer: 'organizer',
        email: 'test@test.com',
        company: 'company',
        invitee_email: 'invitee@test.com',
        invitee_name: 'invitee',
        phone_number: '010-010-0232',
        content: 'hihi bro'
      })
      return {result : 'success'}
    }catch(e){
      return {result : 'fail'}
    }
  }

  @Get('/perfoms')
  async perfoms(){
    return [{
      id: v4(),
      title : 'title',
      updated_at: '06-10',
      confirmed_at: '06-10',
      organizer: 'organizer',
      email: 'test@test.com',
      company: 'company',
      invitee_email: 'invitee@test.com',
      invitee_name: 'invitee',
      phone_number: '010-010-0232',
      content: 'hihi bro'
    }]
  }
}
