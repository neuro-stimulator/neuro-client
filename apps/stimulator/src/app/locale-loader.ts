export function getLocaleLoader(locale: string): Promise<unknown> {
  switch (locale) {
    case 'en': // <-- tato konstanta vychází ze souboru environment.supportedLanguages.value
      return import('@angular/common/locales/en-GB');
    default:
      return import('@angular/common/locales/cs');
  }
}
