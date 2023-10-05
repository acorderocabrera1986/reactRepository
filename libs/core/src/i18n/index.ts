import * as moment from 'moment';

const DEFAULT_LANGUAGE = 'es';
const storageName = '@locale';

export class i18n {
  setLocale(language: string) {
    const lng = language || DEFAULT_LANGUAGE;
    const momentlng = lng === 'en' ? 'en-gb' : lng; // "EN" DOESNT EXIST :/, WEIRD
    // eslint-disable-next-line global-require
    require(`moment/locale/${momentlng}`); // MOMENT BUG TO SET LOCALE
    moment.locale(momentlng); // Set Moment Locale

    localStorage.setItem(storageName, lng);
  }

  getCurrentLanguage(): string {
    return localStorage.getItem(storageName) || DEFAULT_LANGUAGE;
  }

  i18(locales: Record<string, Record<string, string>>) {
    const language = this.getCurrentLanguage();
    const localizations = locales[language];

    return (label: string, replacements: Record<string, string> = {}) => {
      try {
        let labelValue: string = localizations[label];
        if (!labelValue) {
          throw new Error(`The label ${label} is not defined in the locale resource`);
        }

        Object.keys(replacements).forEach((key) => {
          labelValue = labelValue.replace(new RegExp(`{${key}}`, 'ig'), replacements[key]);
        });

        return labelValue;
      } catch (ex) {
        console.error(ex);
        return '';
      }
    };
  }

}


export default (new i18n());