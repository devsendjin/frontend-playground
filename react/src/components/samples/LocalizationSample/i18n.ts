import i18n from 'i18next';
import LanguageDetector from 'i18next-browser-languagedetector';

i18n.use(LanguageDetector).init({
  resources: {
    en: {
      translations: {
        some: 'en <div>Introduction</div>',
        other: 'en Advantages',
      },
    },
    ger: {
      translations: {
        some: 'ger Einführung',
        other: 'ger Vorteile',
      },
    },
    it: {
      translations: {
        some: 'it some',
        other: 'it other',
      },
    },
  },
  debug: false,
  fallbackLng: 'it',
  ns: ['translations'],
  defaultNS: 'translations',
  keySeparator: false,

  // https://www.i18next.com/translation-function/interpolation
  interpolation: {
    // escape: (str) => str,
    // useRawValueToEscape: true,
    escapeValue: false,
    formatSeparator: ',',
  },
});

export { i18n };
