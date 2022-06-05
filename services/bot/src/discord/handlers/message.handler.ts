import { Inject, Injectable } from '@nestjs/common';
import { Message } from 'discord.js';
import { On } from '../decorators/discord-listeners.decorator';
import { DISCORD_MODULE_OPTIONS } from '../discord.constants';
import { DiscordModuleOptions } from '../interfaces/discord-options.interface';
import { DiscordCommandsService } from '../services';

@Injectable()
export class MessageHandler {
  public constructor(
    private readonly commands: DiscordCommandsService,
    @Inject(DISCORD_MODULE_OPTIONS)
    private readonly options: DiscordModuleOptions,
  ) {}

  @On('messageCreate')
  public textCommandHandler(message: Message) {
    let commandPhrase = message.content.split(' ')[0];

    if (commandPhrase[0] === this.options.prefix) {
      try {
        let commandName = commandPhrase.slice(1, commandPhrase.length);
        let command = this.commands.findTextCommand(commandName).instance;
        command.executeText(message);
      } catch (error) {
        // do nothing
      }
    }
  }
}
