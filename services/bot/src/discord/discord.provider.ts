import { Provider } from '@nestjs/common';
import { Client, ClientOptions } from 'discord.js';
import { DISCORD_MODULE_OPTIONS } from './discord.constants';

export const DiscordClientProvider: Provider<Client> = {
  provide: Client,
  useFactory: (options: ClientOptions) => new Client(options),
  inject: [DISCORD_MODULE_OPTIONS],
};
