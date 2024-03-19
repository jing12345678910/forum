import { initReactI18next } from "react-i18next";

import en_US from "./locales/en-US.json";

import zh_TW from "./locales/zh-TW.json";

import i18n from "i18next";

const resources = {
  en_US: {
    translation: en_US,
  },

  zh_TW: {
    translation: zh_TW,
  },
};

i18n.use(initReactI18next).init({
  resources, // 會是所有翻譯資源
  fallbackLng: "en_US", // 如果當前切換的語言沒有對應的翻譯則使用這個語言
  lng: "zh_TW", // 預設語言
  // debug: true,
  interpolation: {
    // 是否要讓字詞 escaped 來防止 xss 攻擊，這裡因為 React.js 已經做了，就設成 false即可
    escapeValue: false,
  },
});

export default i18n;
