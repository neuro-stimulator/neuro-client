import { MessageCodes } from '@stechy1/diplomka-share';

const _MESSAGE_CODE_TRANSLATOR = {}

for (const key of Object.keys(MessageCodes)) {
  _MESSAGE_CODE_TRANSLATOR[MessageCodes[key]] = key;
}

export const MESSAGE_CODE_TRANSLATOR = _MESSAGE_CODE_TRANSLATOR;
export const SERVER_MESSAGE_CODE_PREFIX = 'SERVER_MESSAGE_CODES.';
