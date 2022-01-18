import { i18n } from './i18n';
import { I18nextProvider, useTranslation } from 'react-i18next';
import { Sample } from '@/components/layouts/Sample';

const Localization = () => {
  const { t, i18n } = useTranslation();

  return (
    <div>
      <div className="btn-group">
        <button type="button" className="btn btn-primary" onClick={() => i18n.changeLanguage('en')}>
          en
        </button>
        <button type="button" className="btn btn-primary" onClick={() => i18n.changeLanguage('ger')}>
          get
        </button>
        <button type="button" className="btn btn-primary" onClick={() => i18n.changeLanguage('it')}>
          it
        </button>
      </div>
      <div>{t('some')}</div>
      <div>{t('other')}</div>
    </div>
  );
};

const LocalizationSample: React.FC = () => {
  return (
    <I18nextProvider i18n={i18n}>
      <Sample>
        <Localization />
      </Sample>
    </I18nextProvider>
  );
};

LocalizationSample.displayName = 'LocalizationSample';

export { LocalizationSample };
