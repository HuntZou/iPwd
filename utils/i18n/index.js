import zh from "./zh-cn.json";
import en from "./en.json";
import {
  AsyncStorage
} from "react-native";

const string = {};
const {
  defineProperty
} = Object;

Object.keys(zh).forEach(key => {
  defineProperty(string, key, {
    get: () => {
      var language_key;
      if (!global.language) {
        AsyncStorage.getItem('language').then(language => {
          language_key = language ? language.val : 'en';
        })
      } else {
        language_key = global.language.val;
      }
      switch (language_key) {
        case "en":
          return en[key];
        default:
          return zh[key];
      }
    }
  });
});
export default string;