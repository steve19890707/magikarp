export const getInitLang = (lang) => {
  const searchUrl = window.location.search.split("?");
  const joinQuery = searchUrl.slice(1, searchUrl.length).join("");
  const query = new URLSearchParams(joinQuery);
  let queryLang = query.get("language");
  let userLang = navigator.language || navigator.userLanguage;
  const naviLang = transToLowercaseAndTrim(userLang);

  switch (naviLang) {
    case "zh-cn":
      lang = "cn";
      break;
    case "cn":
      lang = "cn";
      break;
    case "zh":
      lang = "cn";
      break;
    case "tw":
      lang = "cn";
      break;
    case "th":
      lang = "th";
      break;
    case "vn":
      lang = "vn";
      break;
    case "ko":
      lang = "ko";
      break;
    default:
      lang = "en";
      break;
  }

  switch (queryLang) {
    case "zh-cn":
      queryLang = "cn";
      break;
    case "cn":
      queryLang = "cn";
      break;
    case "zh":
      queryLang = "cn";
      break;
    case "tw":
      queryLang = "cn";
      break;
    case "th":
      queryLang = "th";
      break;
    case "vn":
      queryLang = "vn";
      break;
    case "ko":
      lang = "ko";
      break;
    default:
      queryLang = "en";
      break;
  }

  return queryLang || lang;
};

export const gameLinkLang = (lang) => {
  lang = transToLowercaseAndTrim(lang);
  if (lang === "cn") lang = "zh-cn";
  return lang;
};

export const transToLowercaseAndTrim = (str) => str.toLowerCase().trim();

export const getGameId = () => {
  const url = window.location;
  const searchUrl = url.search.split("?");
  const joinQuery = searchUrl.slice(1, searchUrl.length).join("");
  const query = new URLSearchParams(joinQuery);
  const token = query.get("token");
  const roundid = query.get("roundid");
  const gamecode = query.get("gamecode");
  const gameId = gamecode;
  return { gameId, token, roundid };
};
