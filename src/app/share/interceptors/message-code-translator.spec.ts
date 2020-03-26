import { MessageCodes } from '@stechy1/diplomka-share';

import { environment } from '../../../environments/environment';
import { MESSAGE_CODE_TRANSLATOR } from './message-code-translator';

function objectKeys(...objects) {

  function recursiveKeys(object) {
    if (typeof object !== 'object') {
      return '';
    }

    return Object.keys(object).reduce((prev, curr) => {
      return `${prev}.${curr}.${recursiveKeys(object[curr])}`;
    });
  }

  return objects.map(value => recursiveKeys(value));
  // const equal = keys.every(v => v === keys[0]);
  // if (!equal) {
  //   console.log(keys);
  // }
  //
  // return equal;
}

describe('MessageCodeTranslator', () => {

  const supportedLanguages = environment.supportedLanguages.map(language => language.value);

  const translations = {};
  for (const language of supportedLanguages) {
    translations[language] = require(`../../../assets/i18n/${language}.json`);
  }

  describe('should contains message for each message code', () => {

    const keys = Object.keys(MessageCodes);

    for (const key of keys) {
      it(`${key} should be defined`, () => {
        const index = MessageCodes[key];
        const translationCode = MESSAGE_CODE_TRANSLATOR[index];
        expect(translationCode).toBeDefined();
        for (const language of supportedLanguages) {
          expect(translations[language]['SERVER_MESSAGE_CODES'][translationCode])
          .toBeDefined(`translation for language: ${language} is missing!`);
        }
      });
    }
  });

  it('translations should contains same message keys', () => {
    const keys = objectKeys(...Object.values(translations));
    console.log(keys);
    keys.forEach(v => {
      expect(v).toBe(keys[0]);
    });
  });
});
