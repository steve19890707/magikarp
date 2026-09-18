import styled from "styled-components";
import produce from "Utils/produce";
import { useState, useEffect } from "react";
import { useDispatch } from "react-redux";
import { setImgsDomain } from "./reducer/props";
import { sort, gameDetail, setDocumentTitle } from "config/";
import { Map, List, fromJS } from "immutable";
import { getInitLang, getGameId } from "Utils";
import { useTranslation } from "react-i18next";
import { apiGetImgsDomain, apiGetDetail } from "./api";
import { getData } from "common-lib/lib";
import packageJson from "../package.json";

const AppStyled = styled.div`
  width: 90%;
  max-width: 1200px;
  margin: 0 auto;
`;

const App = () => {
  const dispatch = useDispatch();
  const [setting, setSetting] = useState(List([]));
  const [data, setData] = useState(Map());
  const [list, setList] = useState(Map());
  const { i18n } = useTranslation();
  const lang = getInitLang();
  const { gameId: queryGameId, token, roundid } = getGameId();
  const gameId = queryGameId || "AT01";
  useEffect(() => {
    apiGetImgsDomain()
      .then((res) => {
        const src = getData(res, ["data", "result"]);
        dispatch(setImgsDomain(src));
      })
      .catch((error) => console.error(error));
  }, [dispatch]);
  useEffect(() => {
    if (gameId) {
      apiGetDetail(token, gameId, roundid).then((res) => {
        const roundCode = fromJS(res.data.result).get("RoundCode") || "";
        if (roundCode && gameId === "AT01") {
          const domain = window.location.href;
          const replaceLink = `https://fdetail-old.myzsj${
            domain.split("https://fdetail.myzsj")[1]
          }`;
          window.location.replace(replaceLink);
        } else if (res.data.error_code === 1) {
          setData(fromJS(res.data.result));
        }
      });
    }
  }, []);
  useEffect(() => {
    if (data.size) {
      const dataType = data.get("Type") || 1;
      if (gameId !== "AB3" || (gameId !== "AT05" && dataType === 2)) {
        setSetting(sort.getIn([gameDetail.getIn([gameId, "sort"]), "sort"]));
      }
      if (
        gameId == "GO02" ||
        gameId == "AT01" ||
        gameId == "GO05" ||
        gameId == "GO6902" ||
        gameId == "GO06"
      ) {
        setList(fromJS(JSON.parse(data.getIn(["Wager", "Proof"]))));
      }
      if (gameId == "AB3") {
        if (data.get("Wager")) {
          setList(fromJS(JSON.parse(data.getIn(["Wager", "Proof"]))));
          setSetting(
            sort.getIn([gameDetail.getIn(["AB3", "new", "sort"]), "sort"]),
          );
        } else {
          setSetting(
            sort.getIn([gameDetail.getIn(["AB3", "old", "sort"]), "sort"]),
          );
        }
      }
      if (gameId === "AT05" && dataType === 2) {
        setList(fromJS(JSON.parse(data.getIn(["Wager", "Proof"]))));
        setSetting(
          sort.getIn([gameDetail.getIn(["AT05", "reframing", "sort"]), "sort"]),
        );
      }
      if (gameId == "GO6901") {
        setList(fromJS(JSON.parse(data.getIn(["Wager", "Proof"]))));
        setSetting(sort.getIn([gameDetail.getIn(["GO6901", "sort"]), "sort"]));
      }
    }
  }, [data]);

  useEffect(() => {
    i18n.changeLanguage(lang);
    document.title = setDocumentTitle(lang);
  }, [i18n, lang]);
  return (
    <AppStyled data-version={packageJson.version}>
      {setting.map((item, idx) => produce(item, data, idx, list, gameId))}
    </AppStyled>
  );
};
export default App;
