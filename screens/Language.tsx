import {ScrollView} from 'react-native';
import {List} from "react-native-paper";
import CountryFlag from "react-native-country-flag";
import i18n from "../lang";
import AsyncStorage from "@react-native-async-storage/async-storage";

const LANGUAGES = [
    {
        'code' : 'fr',
        'iso_code' : 'fr',
        'label' : 'Français',
    },
    {
        'code' : 'en',
        'iso_code' : 'gb',
        'label' : 'English',
    }
];

export default function Language({navigation}) {

    const updateLanguage = async (code: string) => {
        await i18n.changeLanguage(code)
        await AsyncStorage.setItem('LANGUAGE', code);
        navigation.goBack();
    }

    return (
        <ScrollView style={{ flex: 1}}>
            {
                LANGUAGES.map((language) => (
                    <List.Item
                        key={language.code}
                        title={language.label}
                        left={() => <CountryFlag isoCode={language.iso_code} size={18} />}
                        right={() => i18n.language === language.code ? <List.Icon icon="check" /> : null}
                        style={{borderBottomWidth: 1, borderColor: 'lightgrey', paddingHorizontal: 10}}
                        onPress={() => updateLanguage(language.code)}
                    />
                ))
            }
        </ScrollView>
    );
}