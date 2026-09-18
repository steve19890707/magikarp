import React, { useState, useEffect } from "react";
import styled from "styled-components";
import { List, Map } from "immutable";
import Area from "components/areaStyled";
import GO06AntesSelectBar from "components/list/GO06AntesSelectBar";
import { gameDetail } from "config";
import { getInitLang } from "Utils";
import { useTranslation } from "react-i18next";
// import { MOBILE_BREAKPOINT_WIDTH } from "cssMix";
import useWindowSize from "userHook/useWindowSize";

//components
import NormalTable from "./components/NormalTable";
import PearlTable from "./components/PearlTable";
import ElectricTable from "./components/ElectricTable";

const GO06FishList = ({ data, list = List() }) => {
  const { t } = useTranslation();
  const lang = getInitLang();
  const size = useWindowSize();
  const [antes, setAntes] = useState([]); // 有資料的押注
  const [antesValue, setAntesValue] = useState("all"); // all 0.10 0.20 ...
  const [groundType, setGroundType] = useState("");
  const denom = data.getIn(["Wager", "PlayerDenom"]);
  const [expand, setExpand] = useState(
    Map({ ordinaryFish: false, specialFish: false }),
  );
  const [isBgFixed, setIsBgFixed] = useState(false);
  // 魚種分類
  const [normalFish, setNormalFish] = useState(List());
  const [specialFish, setSpecialFish] = useState(List());
  const [particularFish, setParticularFish] = useState(List());
  const [gameFish, setGameFish] = useState(List());
  const [weaponFish, setWeaponFish] = useState(List());
  const [bossFish, setBossFish] = useState(List());
  const pearlList = list.get("TapOutputs");
  const [electricList, setElectricList] = useState(List());
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
            "GO06",
            "ground_type",
            lang,
            list.get("GroundType").toString(),
          ]),
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
            bets.getIn([i, 1, "Fishes"]),
          );
        }
        setNormalFish(
          List(combineData)
            .filter(
              (v) =>
                v[0] <= 19 &&
                (v[1].get("PayInfos") || v[1].get("HitCount") !== 0),
            )
            .sort((a, b) => a[0] - b[0]),
        );
        setSpecialFish(
          List(combineData)
            .filter(
              (v) =>
                v[0] >= 20 &&
                v[0] <= 27 &&
                (v[1].get("PayInfos") || v[1].get("HitCount") !== 0),
            )
            .sort((a, b) => a[0] - b[0]),
        );
        setParticularFish(
          List(combineData)
            .filter(
              (v) =>
                v[0] == 30 ||
                (v[0] == 40 &&
                  (v[1].get("PayInfos") || v[1].get("HitCount") !== 0)),
            )
            .sort((a, b) => a[0] - b[0]),
        );
        setGameFish(
          List(combineData)
            .filter(
              (v) =>
                v[0] >= 28 &&
                v[0] <= 29 &&
                (v[1].get("PayInfos") || v[1].get("HitCount") !== 0),
            )
            .sort((a, b) => a[0] - b[0]),
        );
        setWeaponFish(
          List(combineData)
            .filter(
              (v) =>
                v[0] >= 31 &&
                v[0] <= 33 &&
                (v[1].get("PayInfos") || v[1].get("HitCount") !== 0),
            )
            .sort((a, b) => a[0] - b[0]),
        );
        setBossFish(
          List(combineData)
            .filter(
              (v) =>
                v[0] >= 34 &&
                v[0] <= 39 &&
                (v[1].get("PayInfos") || v[1].get("HitCount") !== 0),
            )
            .sort((a, b) => a[0] - b[0]),
        );
        setElectricList(
          List(list.get("Bets")).filter((v) => v[1].get("WeaponInfos")),
        );
      }
    } else {
      // 單一底注
      const bets = list.getIn(["Bets", antesValue, "Fishes"]);
      const multiplierList = List(list.get("Bets")).filter(
        (v) => v[0] === antesValue && v[1].get("WeaponInfos"),
      );
      if (bets) {
        setNormalFish(
          List(bets)
            .filter(
              (v) =>
                v[0] <= 19 &&
                (v[1].get("PayInfos") || v[1].get("HitCount") !== 0),
            )
            .sort((a, b) => a[0] - b[0]),
        );
        setSpecialFish(
          List(bets)
            .filter(
              (v) =>
                v[0] >= 20 &&
                v[0] <= 27 &&
                (v[1].get("PayInfos") || v[1].get("HitCount") !== 0),
            )
            .sort((a, b) => a[0] - b[0]),
        );
        setParticularFish(
          List(bets)
            .filter(
              (v) =>
                v[0] == 30 ||
                (v[0] == 40 &&
                  (v[1].get("PayInfos") || v[1].get("HitCount") !== 0)),
            )
            .sort((a, b) => a[0] - b[0]),
        );
        setGameFish(
          List(bets)
            .filter(
              (v) =>
                v[0] >= 28 &&
                v[0] <= 29 &&
                (v[1].get("PayInfos") || v[1].get("HitCount") !== 0),
            )
            .sort((a, b) => a[0] - b[0]),
        );
        setWeaponFish(
          List(bets)
            .filter(
              (v) =>
                v[0] >= 31 &&
                v[0] <= 33 &&
                (v[1].get("PayInfos") || v[1].get("HitCount") !== 0),
            )
            .sort((a, b) => a[0] - b[0]),
        );
        setBossFish(
          List(bets)
            .filter(
              (v) =>
                v[0] >= 34 &&
                v[0] <= 39 &&
                (v[1].get("PayInfos") || v[1].get("HitCount") !== 0),
            )
            .sort((a, b) => a[0] - b[0]),
        );
        setElectricList(multiplierList);
      }
    }
  }, [list, antesValue]);

  return (
    <>
      <FishList>
        <GO06AntesSelectBar
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
          list={gameFish}
          denom={denom}
          size={size}
          t={t}
          setIsBgFixed={setIsBgFixed}
          bets={list.get("Bets")}
          title={"gameFish"}
        />
        <NormalTable
          antesValue={antesValue}
          list={weaponFish}
          denom={denom}
          size={size}
          t={t}
          setIsBgFixed={setIsBgFixed}
          bets={list.get("Bets")}
          title={"weaponFish"}
        />
        <NormalTable
          antesValue={antesValue}
          list={particularFish}
          denom={denom}
          expand={expand}
          size={size}
          t={t}
          expandHandler={expandHandler}
          setIsBgFixed={setIsBgFixed}
          bets={list.get("Bets")}
          title={"particularFish"}
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
        {/* <PearlTable
          t={t}
          list={pearlList}
          denom={denom}
          size={size}
          title={"fivePearls"}
        /> */}
        <ElectricTable
          antesValue={antesValue}
          t={t}
          list={electricList}
          denom={denom}
          size={size}
          title={"electricNets"}
        />
      </FishList>
    </>
  );
};
const FishList = styled(Area)`
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
export default GO06FishList;
