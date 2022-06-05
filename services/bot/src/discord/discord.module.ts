import { DiscoveryModule } from '@golevelup/nestjs-discovery';
import {
  DynamicModule,
  Inject,
  Logger,
  Module,
  OnApplicationBootstrap,
  OnApplicationShutdown,
} from '@nestjs/common';
import { Client } from 'discord.js';
import { DISCORD_MODULE_OPTIONS } from './discord.constants';
import { DiscordClientProvider } from './discord.provider';
import { DiscordModuleOptions } from './interfaces/discord-options.interface';

import * as Handlers from './handlers';
import * as Services from './services';
import * as Commands from './commands';

@Module({
  imports: [DiscoveryModule],
  providers: [
    DiscordClientProvider,
    Logger,
    ...Object.values(Services),
    ...Object.values(Handlers),
    ...Object.values(Commands),
  ],
  exports: [],
})
export class DiscordModule
  implements OnApplicationBootstrap, OnApplicationShutdown
{
  private readonly logger = new Logger(DiscordModule.name);

  public constructor(
    private readonly client: Client,
    @Inject(DISCORD_MODULE_OPTIONS)
    private readonly options: DiscordModuleOptions,
  ) {}

  public onApplicationBootstrap() {
    return this.client.login(this.options.token);
  }

  public onApplicationShutdown(_signal?: string) {
    this.logger.log('Shutting down...');
  }

  /**
   * Instantiates the module with a given set of options.
   *
   * @param {DiscordModuleOptions} options the options to use for the discord module
   *
   * @returns {DynamicModule} the instantiated discord module
   */
  public static forRoot(options: DiscordModuleOptions): DynamicModule {
    return {
      module: DiscordModule,
      providers: [
        {
          provide: DISCORD_MODULE_OPTIONS,
          useValue: options,
        },
      ],
    };
  }
}
