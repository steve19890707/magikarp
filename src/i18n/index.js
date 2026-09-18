import i18n from "i18next";
import { initReactI18next } from "react-i18next";
import en from "./en";
import cn from "./cn";
import th from "./th";
import vn from "./vn";
import ko from "./ko";
const resources = {
  cn: {
    translation: cn,
  },
  en: {
    translation: en,
  },
  th: {
    translation: th,
  },
  vn: {
    translation: vn,
  },
  ko: {
    translation: ko,
  },
};

i18n.use(initReactI18next).init({
  resources,
  lng: "cn", //預設語言
  fallbackLng: "cn", //如果當前切換的語言沒有對應的翻譯則使用這個語言，
  interpolation: {
    escapeValue: false,
  },
});

export default i18n;
