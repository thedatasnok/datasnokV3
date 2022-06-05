import { DiscoveryService } from '@golevelup/nestjs-discovery';
import { Injectable, Logger, OnModuleInit } from '@nestjs/common';
import { ApplicationCommand, Client } from 'discord.js';
import { DISCORD_LISTENERS_META } from '../discord.constants';
import { ListenerMeta } from '../interfaces/discord-listener.interface';

@Injectable()
export class DiscordListenersService implements OnModuleInit {
  private readonly logger = new Logger(DiscordListenersService.name);

  public constructor(
    private readonly client: Client,
    private readonly discoverer: DiscoveryService,
  ) {}

  public onModuleInit() {
    this.discoverer
      .providerMethodsWithMetaAtKey<ListenerMeta>(DISCORD_LISTENERS_META)
      .then((listeners) => {
        this.logger.log(
          `Registering ${listeners.length} Discord event listeners`,
        );

        listeners.forEach((listener) => {
          this.client[listener.meta.type](listener.meta.event, (...args) =>
            listener.discoveredMethod.handler.call(
              listener.discoveredMethod.parentClass.instance,
              ...args,
            ),
          );
        });
      });
  }
}
