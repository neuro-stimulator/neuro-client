/* SOURCE: https://github.com/facebook/jest/issues/2418#issuecomment-478932514 */
/* tslint:disable:no-console */
/*
ts-node ./merge-coverage.ts --report ./coverage0/coverage-final.json --report ./coverage1/coverage-final.json
*/

import * as fs from 'fs';
import { createReporter } from 'istanbul-api';
import { createCoverageMap } from 'istanbul-lib-coverage';

main().catch((err) => {
  console.error(err);
  process.exit(1);
});

/**
 * Pomocná rekurzivní funkce pro nalezení všech částečných výsledků s code-coverage.
 *
 * @param coverageDirectory Složka, ve které se mají výslekdy hledat
 */
async function findPartialCoverageResults(coverageDirectory: string): Promise<string[]> {
  // Vytvořím pole, do kterého se budou ukládat nalezené soubory
  const files: string[] = [];
  // Přečtu obsah aktuální složky
  const entries: string[] = await fs.promises.readdir(coverageDirectory);
  // Projdu soubory ve složce
  for (const entry of entries) {
    // Složím cestu "složka/soubor"
    const path = `${coverageDirectory}/${entry}`;
    // Přečtu si informace o souboru
    const stats = fs.lstatSync(path);
    // Pokud se jedná o složku
    if (stats.isDirectory()) {
      // Vložím do výsledného pole všechny složky, které najdu rekurzivně
      files.push(...await findPartialCoverageResults(path));
    // Jinak, pokud se jedná o jeden konkrétní soubor
    } else if (stats.isFile() && entry === 'coverage-final.json') {
      // Přidám ho do výsledného pole
      files.push(path);
    }
  }

  // Nakonec vrátím všechny nalezené soubory
  return files;
}

async function main() {
  // Nadefinuji nejdříve všechny soubory s parciálními výsledky coverage
  const reportFiles = await findPartialCoverageResults('coverage');
  // Nadefinuji typ reporteru
  const reporters = ['json', 'lcov'];
  // Vytvořím novou coverage mapu
  const map = createCoverageMap();

  // Projdu jednotlivé výsledky coverage
  reportFiles.forEach((file) => {
    // Načtu obsah souboru
    const r = JSON.parse(fs.readFileSync(file, { encoding: 'utf-8'}));
    // Zamerguji ho do výsledné mapy
    map.merge(r);
  });

  // Vytvořím nového reportera
  const reporter = createReporter();
  // Přidám vlastní typ
  await reporter.addAll(reporters);
  // Zapíšu výsledky do souboru
  reporter.write(map);
  console.log('Created a merged coverage report in ./coverage');
}

fs.unlinkSync(`${__dirname}/merge-coverage.js`);
