import { Inject, Injectable } from '@nestjs/common';
import axios from 'axios';
import * as FormData from 'form-data';
import { CONFIG_OPTIONS } from 'src/common/common.constants';
import { MailModuleOptions } from './mail.interfaces';

@Injectable()
export class MailService {
  constructor(
    @Inject(CONFIG_OPTIONS) private readonly options: MailModuleOptions
  ) {
    this.sendEmail('Hola', 'como estas?');
  }

  private async sendEmail(subject: string, content: string) {
    const form = new FormData();
    form.append('from', `Excited User <mailgun@${this.options.domain}>`);
    form.append('to', `ernesto134alonso123@gmail.com`);
    form.append('subject', subject);
    form.append('text', content);

    try {
      const res = await axios.post(
        `https://api.mailgun.net/v3/${this.options.domain}/messages`,
        form,
        {
          headers: {
            ...form.getHeaders(), // Importante: Obtén los encabezados del FormData
            authorization: `Basic ${Buffer.from(`api:${this.options.apiKey}`).toString('base64')}`,
          },
        }
      );
      console.log(res.data);
    } catch (error) {
      console.error(
        'Error sending email:',
        error.response?.data || error.message
      );
    }
  }
}