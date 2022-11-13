import { ELanguages, i18n } from "./i18n";
import { I18nextProvider, useTranslation } from "react-i18next";
import { Button } from "@/vendors/bootstrap";

const Localization = () => {
  const { t, i18n } = useTranslation();

  return (
    <div>
      <div className='btn-group'>
        {Object.values(ELanguages).map((langName) => (
          <Button key={langName} type='button' onClick={() => i18n.changeLanguage(langName)} variant='light'>
            {langName}
          </Button>
        ))}
      </div>
      <div>{t("some")}</div>
      <div>{t("other")}</div>
    </div>
  );
};

const LocalizationSample: RFC = () => {
  return (
    <I18nextProvider i18n={i18n}>
      <Localization />
    </I18nextProvider>
  );
};

LocalizationSample.displayName = "LocalizationSample";

export { LocalizationSample };
