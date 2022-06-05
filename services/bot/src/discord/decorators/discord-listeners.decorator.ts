import { SetMetadata } from '@nestjs/common';
import { ClientEvents } from 'discord.js';
import { DISCORD_LISTENERS_META } from '../discord.constants';
import { ListenerMeta } from '../interfaces/discord-listener.interface';

export const createDiscordListenerDecorator =
  <E extends keyof ClientEvents>(type: ListenerMeta['type']) =>
  (event: E): MethodDecorator =>
    SetMetadata<string, ListenerMeta>(DISCORD_LISTENERS_META, {
      type,
      event,
    });

export const On = createDiscordListenerDecorator('on');

export const Once = createDiscordListenerDecorator('once');
