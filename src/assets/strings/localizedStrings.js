import LocalizedStrings from 'react-native-localization';
import strings_en from './en';
import strings_zh from './zh';

const localizedStrings = new LocalizedStrings({
	'en': {...strings_en},
	'zh': {...strings_zh},
});

export default localizedStrings;
