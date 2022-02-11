import { ELanguages, i18n } from './i18n';
import { I18nextProvider, useTranslation } from 'react-i18next';

const Localization = () => {
  const { t, i18n } = useTranslation();

  return (
    <div>
      <div className="btn-group">
        {Object.values(ELanguages).map((langName) => (
          <button
            key={langName}
            type="button"
            className="btn btn-primary"
            onClick={() => i18n.changeLanguage(langName)}
          >
            {langName}
          </button>
        ))}

        {/*
        <button type="button" className="btn btn-primary" onClick={() => i18n.changeLanguage('ger')}>
          ger
        </button>
        <button type="button" className="btn btn-primary" onClick={() => i18n.changeLanguage('it')}>
          it
        </button> */}
      </div>
      <div>{t('some')}</div>
      <div>{t('other')}</div>
    </div>
  );
};

const LocalizationSample: React.FC = () => {
  return (
    <I18nextProvider i18n={i18n}>
      <Localization />
    </I18nextProvider>
  );
};

LocalizationSample.displayName = 'LocalizationSample';

export { LocalizationSample };
