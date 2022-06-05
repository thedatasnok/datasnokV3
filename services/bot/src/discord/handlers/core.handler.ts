import { Injectable, Logger } from '@nestjs/common';
import { On } from '../decorators/discord-listeners.decorator';

@Injectable()
export class CoreHandler {
  private readonly logger = new Logger(CoreHandler.name);

  @On('ready')
  public handleReady() {
    this.logger.log('Discord emitted a ready state!');
  }
}
