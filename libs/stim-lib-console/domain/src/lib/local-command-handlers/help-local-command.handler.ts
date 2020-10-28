import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';

import { CommandParserService } from '../infrastructure/command-parser.service';
import { LocalCommandHandler } from './local-command.handler';

@Injectable({ providedIn: 'root' })
export class HelpLocalCommandHandler implements LocalCommandHandler {
  constructor(private readonly parser: CommandParserService) {}

  handle(): Observable<string | undefined> {
    const descriptions = this.parser.commands.map((cmd) => cmd.getName() + ' - ' + cmd.description()).join('\n');
    return of(descriptions);
  }
}
