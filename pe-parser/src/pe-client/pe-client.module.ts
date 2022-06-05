import { Module } from '@nestjs/common';
import { PeClientService } from './pe-client.service';
import { HttpModule } from '@nestjs/axios';
import { ConfigModule } from '@nestjs/config';

@Module({
  imports: [
    HttpModule.register({
      timeout: 5000,
      maxRedirects: 5,
    }),
    ConfigModule,
  ],
  providers: [PeClientService],
  exports: [PeClientService],
})
export class PeClientModule {}
