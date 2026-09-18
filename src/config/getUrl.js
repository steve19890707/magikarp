const host = window.location.host;
const env = () => {
  let url = "";
  switch (host) {
    case "rd3-dev-fdetail.guardians.one":
      url = "develope";
      break;
    case "rd3-qa-fdetail.guardians.one":
      url = "qa";
      break;
    case "fdetail.cqgame.games":
      url = "int";
      break;
    default:
      url = "pord";
      break;
  }
  return url;
};

const domain = {
  develope: `rd3-dev-gapi.guardians.one`,
  qa: `rd3-qa-gapi.guardians.one`,
  int: `gapi.cqgame.games`,
  pord: `gapi.cypghg.com`,
};

export const API_URL =
  host.includes("localhost") || host.includes(":")
    ? "/proxy/api"
    : `//${domain[env()]}/api`;
