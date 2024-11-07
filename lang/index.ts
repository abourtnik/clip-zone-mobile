
import i18n from 'i18next';
import ICU from 'i18next-icu';
import { initReactI18next } from 'react-i18next';
import { Platform, NativeModules } from 'react-native'


import fr from "./fr";
import en from "./en";

const deviceLanguage =
    Platform.OS === 'ios'
        ? NativeModules.SettingsManager.settings.AppleLocale ||
        NativeModules.SettingsManager.settings.AppleLanguages[0] //iOS 13
        : NativeModules.I18nManager.localeIdentifier;

//console.log(deviceLanguage); //en_US

//console.log(savedLanguage())

i18n
    .use(initReactI18next)
    .use(ICU)
    .init({
        detection: () => {
            console.log('detection')
        },
        compatibilityJSON: 'v3',
        resources: {
            en: {
                translation: en
            },
            fr: {
                translation: fr
            }
        },
        fallbackLng: 'en',
        lng: 'en',
        interpolation: {
            escapeValue: false
        }
});

export default i18n;
