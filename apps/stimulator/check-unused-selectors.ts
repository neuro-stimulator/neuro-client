import * as fs from 'fs';

const root = `${__dirname}/src`;
const componentFileExtention = 'component.ts';
const htmlFileExtention = '.html';
const selectorRegex = /selector: '[\w+-]+'/;
const classNameRegex = /export class [a-zA-Z]+Component/;
const selectorPrefix = 'stim-';

function pascalCaseToDash(myStr: string) {
  // https://medium.com/javascript-in-plain-english/convert-string-to-different-case-styles-snake-kebab-camel-and-pascal-case-in-javascript-da724b7220d7
  return myStr.match( /[A-Z]{2,}(?=[A-Z][a-z]+[0-9]*|\b)|[A-Z]?[a-z]+[0-9]*|[A-Z]|[0-9]+/g).map(x => x.toLowerCase()).join('-');
}

/**
 * Rekurzivně projde zadanou složku a vyhledá veškeré HTML soubory
 *
 * @param dir Složka, která se má procházet
 * @param fileExtention Koncovka souboru, který se má vyfiltrovat
 */
function readDirectoryRecursive(dir: string, fileExtention: string): string[] {
  const files = [];
  const entries: string[] = fs.readdirSync(dir, {encoding: 'utf-8'}) as string[];
  for (const entry of entries) {
    const path = `${dir}/${entry}`;
    const stats = fs.lstatSync(path);
    if (stats.isDirectory()) {
      files.push(...readDirectoryRecursive(path, fileExtention));
    } else if (stats.isFile() && entry.endsWith(fileExtention)) {
      files.push(path);
    }
  }

  return files;
}

const components: string[] = readDirectoryRecursive(root, componentFileExtention);
const componentSelectors: {[component: string]: { count: number, valid: boolean }} = {};

for (const component of components) {
  const content = fs.readFileSync(component, { encoding: 'utf-8' });

  const classNameIndex = content.search(classNameRegex);
  let className = content.substring(classNameIndex + 13);
  className = className.substring(0, className.indexOf('Component'));
  const expectedSelector = selectorPrefix + pascalCaseToDash(className);

  const componentSelectorIndex = content.search(selectorRegex);
  if (componentSelectorIndex === -1) {
    continue;
  }
  console.log(`Checking component: ${component.replace(__dirname, '')}.`);
  console.log(`\tExpected selector: '${expectedSelector}'`);

  let componentSelector = content.substring(componentSelectorIndex + 11);
  componentSelector = componentSelector.substring(0, componentSelector.indexOf('\''));
  console.log(`\tFound component selector: ${componentSelector}.`);

  componentSelectors[componentSelector] = {
    count: 0,
    valid: componentSelector === expectedSelector
  };
}

const invalidSelectors = Object.keys(componentSelectors).filter(value => !componentSelectors[value].valid);

if (invalidSelectors.length !== 0) {
  console.log('V aplikaci se vyskytují následující nevalidní selectory, které neodpovídají názvu třídy:');
  console.log(invalidSelectors.join(', '));
  process.exit(-1);
}

const htmlFiles = readDirectoryRecursive(root, htmlFileExtention);

for (const htmlFile of htmlFiles) {
  const content = fs.readFileSync(htmlFile, { encoding: 'utf-8' });

  for (const selector of Object.keys(componentSelectors)) {
    if (content.search(selector) !== -1) {
      componentSelectors[selector].count++;
    }
  }
}
const unusedSelectors = Object.keys(componentSelectors).filter(value => componentSelectors[value].count === 0);

fs.unlinkSync(`${__dirname}/check-unused-selectors.js`);

if (unusedSelectors.length === 0) {
  process.exit(0);
}

console.log('Byly nalezeny následující nepoužité selectory:');
console.log(`${unusedSelectors.join(', ')}`);

process.exit(-1);
