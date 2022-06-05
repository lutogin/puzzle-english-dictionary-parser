import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { PeParserModule } from './pe-parser/pe-parser.module';
import { PeClientModule } from './pe-client/pe-client.module';
import { JsDomModule } from './js-dom/js-dom.module';
import { ConfigModule } from '@nestjs/config';

@Module({
  imports: [
    PeParserModule,
    PeClientModule,
    JsDomModule,
    ConfigModule.forRoot({
      isGlobal: true,
      envFilePath: ['.env'],
    }),
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
