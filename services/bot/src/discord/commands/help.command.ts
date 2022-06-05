import { Injectable, Logger } from '@nestjs/common';
import { Interaction, Message } from 'discord.js';
import { Commands } from '../decorators/discord-commands.decorator';
import { DiscordCommand } from '../interfaces/discord-commands.interface';
import { DiscordCommandsService } from '../services';

@Injectable()
@Commands({
  name: 'help',
  description: 'A help command',
})
export class HelpCommand implements DiscordCommand {
  private readonly logger = new Logger(HelpCommand.name);

  public constructor(private readonly commands: DiscordCommandsService) {}

  public executeText(message: Message) {
    let textCommands = this.commands.getTextCommands().length;
    message.channel.send(`We have ${textCommands} text commands registered`);
  }

  public executeSlash(interaction: Interaction) {
    this.logger.log('Help slash command');
    this.logger.log(interaction);
  }
}
