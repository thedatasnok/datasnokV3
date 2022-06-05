import { DiscoveryService } from '@golevelup/nestjs-discovery';
import { Injectable, Logger, OnModuleInit } from '@nestjs/common';
import { DISCORD_COMMANDS_META } from '../discord.constants';
import { Command } from '../interfaces/discord-commands.interface';

@Injectable()
export class DiscordCommandsService implements OnModuleInit {
  private readonly commands = new Map<string, Command>();
  private readonly logger = new Logger(DiscordCommandsService.name);

  public constructor(private readonly discoverer: DiscoveryService) {}

  /**
   * Registers all commands in the service when the module is initialized.
   */
  public onModuleInit() {
    this.discoverer
      .providersWithMetaAtKey<Command>(DISCORD_COMMANDS_META)
      .then((commands) => {
        this.logger.log(`Registering ${commands.length} commands.`);
        commands.forEach((command) => {
          this.commands.set(command.meta.name, {
            ...command.meta,
            instance: command.discoveredClass.instance,
          });
        });
      });
  }

  /**
   * Returns a list of all text commands registered in the service.
   *
   * @returns {Command[]} a list of all text commands
   */
  public getTextCommands(): Command[] {
    let textCommands: Command[] = [];

    for (const command of this.commands.values()) {
      if (command.instance.executeText) {
        textCommands.push(command);
      }
    }

    return textCommands;
  }

  /**
   * Finds a command by its name.
   *
   * @param {string} name the name of the command to find
   *
   * @returns {Command} the found command, if any
   *
   * @throws {Error} if no command was found
   */
  public findTextCommand(name: string): Command {
    let foundCommand = this.commands.get(name);

    if (!foundCommand.instance.executeText) {
      throw new Error(`Could not find a TextCommand with name: ${name}`);
    }

    return foundCommand;
  }
}
