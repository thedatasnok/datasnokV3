import { Message } from 'discord.js';

export enum CommandType {
  TEXT = 'TextCommand',
  SLASH = 'SlashCommand',
}

export interface Command {
  name: string;
  description: string;
  instance?: DiscordCommand;
}

export interface DiscordCommand {
  executeText?: (message: Message, ...args: any[]) => void;
  executeSlash?: (...args: any[]) => void;
}
