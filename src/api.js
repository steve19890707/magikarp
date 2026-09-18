import axios from "axios";
import { API_URL } from "./config/getUrl";
import { fetchGapiDomain } from "./common-lib/config/gapidomain";
import apiGetDetailMock from "./mock/apiGetDetail";

axios.defaults.withCredentials = true;
const PROTOCOL = window.location.protocol;

export const apiGetDetail = (token, gameCode, roundid) => {
  return Promise.resolve({
    data: {
      error_code: 1,
      result: apiGetDetailMock,
    },
  });
};

export const apiGetImgsDomain = (query = "imgbaseon") => {
  return Promise.resolve({
    data: {
      result: `${process.env.PUBLIC_URL}`,
    },
  });
};
