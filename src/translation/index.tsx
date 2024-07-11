
import en from './languages/en';
import ar from './languages/ar';
import I18n from 'i18n-js';

I18n.fallbacks = true;
I18n.translations = {ar, en};

const Trans: (string: string, variables?: {} | undefined) => string = (string, variables) => I18n.t(string, variables);

export {Trans};

export default I18n;
