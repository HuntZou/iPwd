import zh from "./zh-cn.json";
import en from "./en.json";

const string = {};
const { defineProperty } = Object;

Object.keys(zh).forEach(key => {
  defineProperty(string, key, {
    get: () => {
      switch (global.language) {
        case "en":
          return en[key];
        default:
          return zh[key];
      }
    }
  });
});
export default string;
