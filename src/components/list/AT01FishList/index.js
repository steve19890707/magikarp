import React, { useEffect, useState } from "react";
import styled from "styled-components";
import { Map, List } from "immutable";
import Area from "components/areaStyled";
import AT01AntesSelectBar from "components/list/AT01AntesSelectBar";
import { gameDetail } from "config";
import { getInitLang } from "Utils";
import { useTranslation } from "react-i18next";
import useWindowSize from "userHook/useWindowSize";

//components
import NormalTable from "./components/NormalTable";
import SubWeaponsTable from "./components/SubWeaponsTable";

export default ({ data, list = List() }) => {
  const { t } = useTranslation();
  const lang = getInitLang();
  const size = useWindowSize();
  const [antes, setAntes] = useState(List()); // 有資料的押注
  const [antesValue, setAntesValue] = useState("all"); // all 0.10 0.20 ...
  const [groundType, setGroundType] = useState("");
  const denom = data.getIn(["Wager", "PlayerDenom"]);
  const [expand, setExpand] = useState(
    Map({ ordinaryFish: false, specialFish: false })
  );
  const [isBgFixed, setIsBgFixed] = useState(false);
  // 魚種分類
  const [normalFish, setNormalFish] = useState(List());
  const [specialFish, setSpecialFish] = useState(List());
  const [bossFish, setBossFish] = useState(List());
  const changeValueHandler = (e) => {
    setAntesValue(e.target.value);
  };
  const expandHandler = (category) => {
    switch (category) {
      case "ordinaryFish":
        setExpand(expand.set("ordinaryFish", !expand.get("ordinaryFish")));
        break;
      case "specialFish":
        setExpand(expand.set("specialFish", !expand.get("specialFish")));
        break;
      default:
        break;
    }
  };
  useEffect(() => {
    if (list.size) {
      list.get("GroundType") &&
        setGroundType(
          gameDetail.getIn([
            "AT01",
            "ground_type",
            lang,
            list.get("GroundType").toString(),
          ])
        );
    }
  }, [list]);
  // select bar

  useEffect(() => {
    if (list.size) {
      const bets = Object.values(list.get("Bets").toJS());
      setAntes(bets.map((elm) => (elm["BetMultiple"] * (denom * 100)) / 100));
    }
  }, [list]);

  useEffect(() => {
    const rootStyle = document.documentElement.style;
    rootStyle.overflowY = isBgFixed ? "hidden" : "auto";
  }, [isBgFixed]);

  useEffect(() => {
    if (antesValue === "all") {
      // 合併魚種資料
      let combineData = Map();
      const bets = List(list.get("Bets"));
      if (bets) {
        for (let i = 0; i < bets.size; i++) {
          combineData = combineData.mergeDeepWith(
            (oldVal, newVal) => oldVal + newVal,
            bets.getIn([i, 1, "Fishes"])
          );
        }
        setNormalFish(
          List(combineData)
            .filter(
              (v) =>
                v[0] <= 20 &&
                (v[1].get("PayInfos") || v[1].get("HitCount") !== 0)
            )
            .sort((a, b) => a[0] - b[0])
        );
        setSpecialFish(
          List(combineData)
            .filter(
              (v) =>
                (v[0] == 21 ||
                  v[0] == 22 ||
                  v[0] == 26 ||
                  v[0] == 27 ||
                  v[0] == 28) &&
                (v[1].get("PayInfos") || v[1].get("HitCount") !== 0)
            )
            .sort((a, b) => a[0] - b[0])
        );
        setBossFish(
          List(combineData)
            .filter(
              (v) =>
                (v[0] == 23 || v[0] == 29) &&
                (v[1].get("PayInfos") || v[1].get("HitCount") !== 0)
            )
            .sort((a, b) => a[0] - b[0])
        );
      }
    } else {
      // 單一底注
      const bets = list.getIn(["Bets", antesValue, "Fishes"]);
      if (bets) {
        setNormalFish(
          List(bets)
            .filter(
              (v) =>
                v[0] <= 20 &&
                (v[1].get("PayInfos") || v[1].get("HitCount") !== 0)
            )
            .sort((a, b) => a[0] - b[0])
        );
        setSpecialFish(
          List(bets)
            .filter(
              (v) =>
                (v[0] == 21 ||
                  v[0] == 22 ||
                  v[0] == 26 ||
                  v[0] == 27 ||
                  v[0] == 28) &&
                (v[1].get("PayInfos") || v[1].get("HitCount") !== 0)
            )
            .sort((a, b) => a[0] - b[0])
        );
        setBossFish(
          List(bets)
            .filter(
              (v) =>
                (v[0] == 23 || v[0] == 29) &&
                (v[1].get("PayInfos") || v[1].get("HitCount") !== 0)
            )
            .sort((a, b) => a[0] - b[0])
        );
      }
    }
  }, [list, antesValue]);
  return (
    <FishList>
      <AT01AntesSelectBar
        changeValueHandler={changeValueHandler}
        antes={antes}
        antesValue={antesValue}
        groundType={groundType}
        denom={denom}
      />
      <NormalTable
        antesValue={antesValue}
        list={normalFish}
        denom={denom}
        expand={expand}
        size={size}
        t={t}
        expandHandler={expandHandler}
        setIsBgFixed={setIsBgFixed}
        bets={list.get("Bets")}
        title={"ordinaryFish"}
      />
      <NormalTable
        antesValue={antesValue}
        list={specialFish}
        denom={denom}
        expand={expand}
        size={size}
        t={t}
        expandHandler={expandHandler}
        setIsBgFixed={setIsBgFixed}
        bets={list.get("Bets")}
        title={"specialFish"}
      />
      <NormalTable
        antesValue={antesValue}
        list={bossFish}
        denom={denom}
        size={size}
        t={t}
        setIsBgFixed={setIsBgFixed}
        bets={list.get("Bets")}
        title={"bossFish"}
      />
      <SubWeaponsTable
        t={t}
        size={size}
        map={list.getIn(["SubWeapons", "1"]) || Map()}
        denom={denom}
        type={"01"}
        title={"secondMech"}
      />
      <SubWeaponsTable
        t={t}
        size={size}
        map={list.getIn(["SubWeapons", "2"]) || Map()}
        denom={denom}
        type={"02"}
        title={"dragonPower"}
      />
    </FishList>
  );
};

const FishList = styled(Area)`
  margin-top: 0;
  & > .box {
    margin-bottom: 20px;
    .expand {
      display: flex;
      justify-content: space-between;
      align-items: center;
      margin-bottom: 20px;
      .expand-btn {
        user-select: none;
        font-size: 12px;
        border: solid 1px #fff;
        padding: 4px 8px;
        border-radius: 30px;
        cursor: pointer;
      }
    }
    & > .title {
      margin-bottom: 20px;
    }
  }
`;
