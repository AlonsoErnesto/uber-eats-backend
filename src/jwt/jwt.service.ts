import { Inject, Injectable } from '@nestjs/common';
import * as jwt from 'jsonwebtoken';
import { JwtModuleOptions } from './jwt.interfaces';
import { CONFIG_OPTIONS } from 'src/common/common.constants';

@Injectable()
export class JwtService {
  constructor(
    @Inject(CONFIG_OPTIONS) private readonly options: JwtModuleOptions
  ) {
     console.log("constructor:", this.options.privateKey);
  }

  sign(userId: number): string {
     console.log("PrivateKey al firmar:", this.options.privateKey);
    return jwt.sign({ id: userId }, this.options.privateKey);
  }

  verify(token: string) {
     console.log("PrivateKey al verificar:", this.options.privateKey);
    return jwt.verify(token, this.options.privateKey);
  }
}
