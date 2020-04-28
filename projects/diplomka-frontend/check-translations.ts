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
import { environment } from './src/environments/environment';

const root = `${__dirname}/src/app`;
// {{ 'EXPERIMENTS.EXPERIMENT.ERP.OUTPUT.DISTRIBUTION' | translate }}
const translateREGEX = /{{[ ]?'[A-Z._]+'[ ]?\|[ ]?translate[ ]?}}/gm;
const supportedTranslations = environment.supportedLanguages.map(language => language.value);
const translations = {};
for (const language of supportedTranslations) {
  translations[language] = JSON.parse(fs.readFileSync(`${__dirname}/src/assets/i18n/${language}.json`, { encoding: 'utf-8'}));
}

/**
 * Rekurzivně projde zadanou složku a vyhledá veškeré HTML soubory
 *
 * @param dir Složka, která se má procházet
 */
function readDirectoryRecursive(dir: string): string[] {
  const files = [];
  const entries: string[] = fs.readdirSync(dir, {encoding: 'utf-8'});
  for (const entry of entries) {
    const path = `${dir}/${entry}`;
    const stats = fs.lstatSync(path);
    if (stats.isDirectory()) {
      files.push(...readDirectoryRecursive(path));
    } else if (stats.isFile() && entry.endsWith('.html')) {
      files.push(path);
    }
  }

  return files;
}

// Získám seznam všech HTML souborů
const htmlFiles = readDirectoryRecursive(root);
const results = {};

// Postupně projdu jeden HTML soubor za druhým
for (const htmlFile of htmlFiles) {
  // Přečtu jeho obsah
  const content = fs.readFileSync(htmlFile, { encoding: 'utf-8'});
  // Proženu regulárním výrazem
  const matchArray: RegExpMatchArray = content.match(translateREGEX);
  // Pokud se v HTML souboru nenachází žádný překlad
  if (!matchArray) {
    // Budu pokračovat dalším souborem
    continue;
  }

  console.log(`Checking file: ${htmlFile}.`);
  // Projdu všechny dostupné překlady v souboru
  for (const matchArrayElement of matchArray) {
    // Pomocí podřetězce získám tokeny klíče překladu
    const key = matchArrayElement.substring(
      matchArrayElement.indexOf('\'') + 1,
      matchArrayElement.lastIndexOf('\'')
    ).split('.');

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
          console.log(`Nemůžu najít překlad pro: ${key.join('.')} pro jazyk: ${translationKey}!`);
          // Pokračuji dál
          break;
        }
      }
    }
  }
}

if (Object.keys(results).length !== 0) {
  console.log('Vyskytla se nekonzistence v překladech!');
  process.exit(-1);
}

fs.unlinkSync(`${__dirname}/check-translations.js`);
