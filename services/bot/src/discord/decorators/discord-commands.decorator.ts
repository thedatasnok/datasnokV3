import { SetMetadata } from '@nestjs/common';
import { DISCORD_COMMANDS_META } from '../discord.constants';
import { Command } from '../interfaces/discord-commands.interface';

export const Commands = (options: Command) =>
  SetMetadata<string, Command>(DISCORD_COMMANDS_META, options);
