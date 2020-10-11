/**
 * Cílem tohoto skriptu je ověření validity překladů v celé aplikaci.
 *
 * 1. Nejdříve se rekurzivně projde celá složka 'app', ve které se vyhledají veškeré HTML soubory.
 * 2. V každém HTML souboru se najdou všechny překlady pomocí regulátního výrazu 'translateREGEX'.
 * 3. Z překladu se najde podřetězec obsahující klíč překládaného slova.
 * 4. Klíč se rozloží na jednotlivé tokeny.
 * 5. Přes tokeny se projdou soubory s překladem aplikace.
 * 6. Ověři se, že překlad pro daný klíč existuje ve všech jazykových mutacích.
 */
import * as fs from 'fs';
import * as path from 'path';

import { environment } from '../apps/stimulator/src/environments/environment';
import { readDirectoryRecursive } from './tools-helper';

const stimulatorRoot = path.join('apps', 'stimulator');
const libsRoot = 'libs';
const appRoot = path.join(stimulatorRoot, 'src', 'app');
const translationsRoot = path.join(stimulatorRoot, 'src', 'assets', 'i18n');

// const root = `${__dirname}/src/app`;
// // {{ 'EXPERIMENTS.EXPERIMENT.ERP.OUTPUT.DISTRIBUTION' | translate }}
const translateREGEX = /{{[ ]?'[A-Z._]+'[ ]?\|[ ]?translate[ ]?}}/gm;
const routerTitleREGEX = /title: '[A-Z.]+'/gm;
const supportedTranslations = environment.supportedLanguages.map(
  (language) => language.value
);
const translations = {};
for (const language of supportedTranslations) {
  translations[language] = JSON.parse(
    // fs.readFileSync(`${__dirname}/src/assets/i18n/${language}.json`, {
    fs.readFileSync(path.join(translationsRoot, `${language}.json`), {
      encoding: 'utf-8',
    })
  );
}

function checkTranslations(key: string[]) {
  const results = {};
  // Projdu všechny překlady
  for (const translationKey of Object.keys(translations)) {
    let obj = translations[translationKey];
    // Postupně projdu všechny tokeny v klíči
    for (const k of key) {
      obj = obj[k];
      // Pokud nějaký token klíče není nalezen v překladu
      if (!obj) {
        // Přidám informaci o nenalezeném klíči
        results[translationKey] = results[translationKey] || [];
        results[translationKey].push(key);
        // Vypíšu informaci do konzole
        console.log(
          `Nemůžu najít překlad pro: ${key.join(
            '.'
          )} pro jazyk: ${translationKey}!`
        );
        // Pokračuji dál
        break;
      }
    }
  }
  return results;
}

function checkLibraryFiles(files: string[], regex) {
  let results = {};
  // Postupně projdu jeden HTML soubor za druhým
  for (const file of files) {
    // Přečtu jeho obsah
    const content = fs.readFileSync(file, { encoding: 'utf-8' });
    // Proženu regulárním výrazem
    const matchArray: RegExpMatchArray = content.match(regex);
    // Pokud se v HTML souboru nenachází žádný překlad
    if (!matchArray) {
      // Budu pokračovat dalším souborem
      continue;
    }

    console.log(`Checking file: ${file}.`);
    // Projdu všechny dostupné překlady v souboru
    for (const matchArrayElement of matchArray) {
      // Pomocí podřetězce získám tokeny klíče překladu
      const key = matchArrayElement
        .substring(
          matchArrayElement.indexOf("'") + 1,
          matchArrayElement.lastIndexOf("'")
        )
        .split('.');

      results = { ...results, ...checkTranslations(key) };
    }
  }
  return results;
}

// Získám seznam všech HTML souborů
const htmlFiles = readDirectoryRecursive(libsRoot, '.html', '');
const routingModules = readDirectoryRecursive(
  libsRoot,
  'routing.module.ts',
  ''
);
let results = {};
results = { ...results, ...checkLibraryFiles(htmlFiles, translateREGEX) };
results = {
  ...results,
  ...checkLibraryFiles(routingModules, routerTitleREGEX),
};

if (Object.keys(results).length !== 0) {
  console.log('Vyskytla se nekonzistence v překladech!');
  process.exit(-1);
}
