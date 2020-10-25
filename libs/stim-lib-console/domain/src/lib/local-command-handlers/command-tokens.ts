import { HelpLocalCommandHandler } from "./help-local-command.handler";

export const TRANSLATE_COMMAND_TOKENS = {
  help: HelpLocalCommandHandler
};

export const LOCAL_COMMAND_HANDLER_PROVIDERS = [HelpLocalCommandHandler];
