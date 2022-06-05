import { ClientOptions, Guild, User } from 'discord.js';

export interface DiscordModuleOptions extends ClientOptions {
  token: string;
  prefix?: string | ((guild: Guild) => string) | ((user: User) => string);
}
