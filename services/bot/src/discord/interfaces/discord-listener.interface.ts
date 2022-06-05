import { ClientEvents } from 'discord.js';

export interface ListenerMeta {
  type: 'once' | 'on';
  event: keyof ClientEvents;
}
