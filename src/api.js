import axios from "axios";
import { API_URL } from "./config/getUrl";
import { fetchGapiDomain } from "./common-lib/config/gapidomain";

axios.defaults.withCredentials = true;
const PROTOCOL = window.location.protocol;

export const apiGetDetail = (token, gameCode, roundid) => {
  return axios.get(
    `${PROTOCOL}${API_URL}/order_detail/detail_content?token=${token}&game_type=odgo&gamecode=${gameCode}&roundid=${roundid}`,
    {
      headers: {
        token:
          "d2777be739f7674d1299bdafa8050f36d1c0cfd3904e241d6a756c08c5b6bfdf",
      },
    }
  );
};

export const apiGetImgsDomain = (query = "imgbaseon") => {
  return axios.get(
    `${fetchGapiDomain({})}/domain/?type=${query}
  `,
    {
      headers: {
        token:
          "d2777be739f7674d1299bdafa8050f36d1c0cfd3904e241d6a756c08c5b6bfdf",
      },
    }
  );
};
