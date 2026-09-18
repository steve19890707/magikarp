import React, { useState, useEffect } from "react";
import styled from "styled-components";
import { useTranslation } from "react-i18next";
import { List, fromJS } from "immutable";
import { ratios } from "config/ratios";
import { MOBILE_BREAKPOINT_WIDTH } from "cssMix";
import NormalMobile from "./NormalMobile";
import { useSelector } from "react-redux";

const NormalTable = ({
  antesValue,
  list = List(),
  expand,
  denom,
  size,
  setIsBgFixed,
}) => {
  const { t } = useTranslation();
  const imgsdomain = useSelector((state) => state.props.imgsdomain);
  const [isPopup, setIsPopup] = useState(false);
  const [isSecondPopup, setIsSecondPopup] = useState(false);
  const [popupList, setPopupList] = useState(List());
  const [fishList, setFishList] = useState(List());
  const popupSecondHandler = (item) => {
    const newList = list.filter(
      (i) =>
        i.get("FishSpecies") == item.get("FishSpecies") &&
        i.get("BetMultiple") == item.get("BetMultiple")
    );

    setPopupList(
      newList.sort((a, b) => a.get("Multiplier") - b.get("Multiplier"))
    );
    setIsPopup(false);
    setIsSecondPopup(true);
    setIsBgFixed(true);
  };
  const popupHandler = (id) => {
    const newList = list.filter((i) => i.get("FishSpecies") == id);
    const newArr = [];
    newList.toJS().forEach((item) => {
      const index = newArr.findIndex(
        (i) =>
          i["FishSpecies"] === item["FishSpecies"] &&
          i["BetMultiple"] === item["BetMultiple"]
      );
      if (index !== -1) {
        const bullets = newArr[index]["Bullets"] + item["Bullets"];
        const kills = newArr[index]["Kills"] + item["Kills"];
        const win = newArr[index]["Win"] + item["Win"];
        const bulletsAwake1 =
          newArr[index]["BulletsAwake1"] + item["BulletsAwake1"];
        const bulletsAwake2 =
          newArr[index]["BulletsAwake2"] + item["BulletsAwake2"];
        const bulletsAwake3 =
          newArr[index]["BulletsAwake3"] + item["BulletsAwake3"];
        const bulletsAwake4 =
          newArr[index]["BulletsAwake4"] + item["BulletsAwake4"];
        const thumperKill = newArr[index]["ThumperKill"] + item["ThumperKill"];
        newArr[index]["Bullets"] = bullets;
        newArr[index]["BulletsAwake1"] = bulletsAwake1;
        newArr[index]["BulletsAwake2"] = bulletsAwake2;
        newArr[index]["BulletsAwake3"] = bulletsAwake3;
        newArr[index]["BulletsAwake4"] = bulletsAwake4;
        newArr[index]["ThumperKill"] = thumperKill;
        newArr[index]["Kills"] = kills;
        newArr[index]["Win"] = win;
      } else {
        newArr.push(item);
      }
    });
    setIsPopup(true);
    setIsBgFixed(true);
    setPopupList(
      fromJS(newArr).sort((a, b) => a.get("BetMultiple") - b.get("BetMultiple"))
    );
  };

  // create fish list
  useEffect(() => {
    const newArr = [];
    list.toJS().forEach((item) => {
      const index = newArr.findIndex(
        (i) => i["FishSpecies"] === item["FishSpecies"]
      );
      if (index !== -1) {
        const bullets = newArr[index]["Bullets"] + item["Bullets"];
        const kills = newArr[index]["Kills"] + item["Kills"];
        const win = newArr[index]["Win"] + item["Win"];
        const bulletsAwake1 =
          newArr[index]["BulletsAwake1"] + item["BulletsAwake1"];
        const bulletsAwake2 =
          newArr[index]["BulletsAwake2"] + item["BulletsAwake2"];
        const bulletsAwake3 =
          newArr[index]["BulletsAwake3"] + item["BulletsAwake3"];
        const bulletsAwake4 =
          newArr[index]["BulletsAwake4"] + item["BulletsAwake4"];
        const thumperKill = newArr[index]["ThumperKill"] + item["ThumperKill"];
        newArr[index]["Bullets"] = bullets;
        newArr[index]["BulletsAwake1"] = bulletsAwake1;
        newArr[index]["BulletsAwake2"] = bulletsAwake2;
        newArr[index]["BulletsAwake3"] = bulletsAwake3;
        newArr[index]["BulletsAwake4"] = bulletsAwake4;
        newArr[index]["ThumperKill"] = thumperKill;
        newArr[index]["Kills"] = kills;
        newArr[index]["Win"] = win;
      } else {
        newArr.push(item);
      }
    });
    setFishList(fromJS(newArr));
  }, [antesValue, list]);
  return (
    <>
      {size.width > MOBILE_BREAKPOINT_WIDTH ? (
        <>
          <Table>
            <div className="tr title">
              <div className="th">{t("fishes")}</div>
              <div className="th">{t("multiplier")}</div>
              <div className="th">{t("bullets")}</div>
              <div className="th">
                <img
                  className="awake-img"
                  src={`
${imgsdomain}/order-detail/common/GO02/character1_pc.png`}
                />
              </div>
              <div className="th">
                <img
                  className="awake-img"
                  src={`
${imgsdomain}/order-detail/common/GO02/character2_pc.png`}
                />
              </div>
              <div className="th">
                <img
                  className="awake-img"
                  src={`
${imgsdomain}/order-detail/common/GO02/character3_pc.png`}
                />
              </div>
              <div className="th">
                <img
                  className="awake-img"
                  src={`
${imgsdomain}/order-detail/common/GO02/character4_pc.png`}
                />
              </div>
              <div className="th">{t("kills")}</div>
              <div className="th">{t("punchKills")}</div>
              <div className="th">{t("payout")}</div>
              {(antesValue === "all" ||
                fishList.some(
                  (v) =>
                    v.get("FishSpecies") === 17 ||
                    v.get("FishSpecies") === 18 ||
                    v.get("FishSpecies") === 19
                )) && <div className="th">{t("more")}</div>}
            </div>
            {fishList.map((item, idx) => (
              <div className="tr" key={idx}>
                <div className="td">
                  <img
                    className="fish-img"
                    src={`
${imgsdomain}/order-detail/common/GO02/fish/${item.get("FishSpecies")}.png`}
                  />
                </div>
                <div className="td">
                  {ratios.getIn(["GO02", item.get("FishSpecies").toString()])}
                </div>
                <div className="td">{item.get("Bullets")}</div>
                <div className="td">{item.get("BulletsAwake1")}</div>
                <div className="td">{item.get("BulletsAwake2")}</div>
                <div className="td">{item.get("BulletsAwake3")}</div>
                <div className="td">{item.get("BulletsAwake4")}</div>
                <div className="td">{item.get("Kills")}</div>
                <div className="td">{item.get("ThumperKill")}</div>
                <div className="td">
                  {(item.get("Win") * (denom * 100)) / 100}
                </div>
                {antesValue === "all" ? (
                  <div
                    className="td more"
                    onClick={() => {
                      popupHandler(item.get("FishSpecies"));
                    }}
                  >
                    <div className="dot"></div>
                    <div className="dot"></div>
                    <div className="dot"></div>
                  </div>
                ) : fishList.some(
                    (v) =>
                      v.get("FishSpecies") === 17 ||
                      v.get("FishSpecies") === 18 ||
                      v.get("FishSpecies") === 19
                  ) ? (
                  (item.get("FishSpecies") === 17 ||
                    item.get("FishSpecies") === 18 ||
                    item.get("FishSpecies") === 19) &&
                  item.get("Win") > 0 ? (
                    <div
                      className="td more"
                      onClick={() => {
                        popupSecondHandler(item);
                      }}
                    >
                      <div className="dot"></div>
                      <div className="dot"></div>
                      <div className="dot"></div>
                    </div>
                  ) : (
                    <td className="td" />
                  )
                ) : (
                  <></>
                )}
              </div>
            ))}
          </Table>
          {isPopup && (
            <Popup>
              <PopupTable>
                <div className="title-area">
                  <div className="title">
                    <h3>
                      {t("ordinaryFish")}(
                      {ratios.getIn([
                        "GO02",
                        popupList.getIn([0, "FishSpecies"]).toString(),
                      ])}
                      x)
                    </h3>
                    <img
                      className="fish-img"
                      src={`
${imgsdomain}/order-detail/common/GO02/fish/${popupList.getIn([
                        0,
                        "FishSpecies",
                      ])}.png`}
                    />
                  </div>

                  <div
                    className="close"
                    onClick={() => {
                      setIsPopup(false);
                      setIsBgFixed(false);
                    }}
                  >
                    <div className="cross1"></div>
                    <div className="cross2"></div>
                  </div>
                </div>
                <div className="tr title">
                  <div className="th">{t("minBet")}</div>
                  <div className="th">{t("bullets")}</div>
                  <div className="th">
                    <img
                      className="awake-img"
                      src={`
${imgsdomain}/order-detail/common/GO02/character1_pc.png`}
                    />
                  </div>
                  <div className="th">
                    <img
                      className="awake-img"
                      src={`
${imgsdomain}/order-detail/common/GO02/character2_pc.png`}
                    />
                  </div>
                  <div className="th">
                    <img
                      className="awake-img"
                      src={`
${imgsdomain}/order-detail/common/GO02/character3_pc.png`}
                    />
                  </div>
                  <div className="th">
                    <img
                      className="awake-img"
                      src={`
${imgsdomain}/order-detail/common/GO02/character4_pc.png`}
                    />
                  </div>
                  <div className="th">{t("kills")}</div>
                  <div className="th">{t("punchKills")}</div>
                  <div className="th">{t("payout")}</div>
                  {(popupList.getIn([0, "FishSpecies"]) === 17 ||
                    popupList.getIn([0, "FishSpecies"]) === 18 ||
                    popupList.getIn([0, "FishSpecies"]) === 19) && (
                    <div className="th">{t("more")}</div>
                  )}
                </div>
                <div className="tbody">
                  {popupList.map((item, idx) => {
                    return (
                      <div className="tr" key={idx}>
                        <div className="td">
                          {(item.get("BetMultiple") * (denom * 100)) / 100}
                        </div>
                        <div className="td">{item.get("Bullets")}</div>
                        <div className="td">{item.get("BulletsAwake1")}</div>
                        <div className="td">{item.get("BulletsAwake2")}</div>
                        <div className="td">{item.get("BulletsAwake3")}</div>
                        <div className="td">{item.get("BulletsAwake4")}</div>
                        <div className="td">{item.get("Kills")}</div>
                        <div className="td">{item.get("ThumperKill")}</div>
                        <div className="td">
                          {(item.get("Win") * (denom * 100)) / 100}
                        </div>
                        {item.get("FishSpecies") === 17 ||
                        item.get("FishSpecies") === 18 ||
                        item.get("FishSpecies") === 19 ? (
                          item.get("Win") > 0 ? (
                            <div
                              className="td more"
                              onClick={() => {
                                popupSecondHandler(item);
                              }}
                            >
                              <div className="dot"></div>
                              <div className="dot"></div>
                              <div className="dot"></div>
                            </div>
                          ) : (
                            <div className="td" />
                          )
                        ) : (
                          <></>
                        )}
                      </div>
                    );
                  })}
                </div>
              </PopupTable>
            </Popup>
          )}
          {isSecondPopup && (
            <Popup>
              <PopupTable>
                <div className="title-area">
                  <div className="title">
                    <h3>
                      {t("ordinaryFish")}(
                      {ratios.getIn([
                        "GO02",
                        popupList.getIn([0, "FishSpecies"]).toString(),
                      ])}
                      x)
                    </h3>
                    <img
                      className="fish-img"
                      src={`
${imgsdomain}/order-detail/common/GO02/fish/${popupList.getIn([
                        0,
                        "FishSpecies",
                      ])}.png`}
                    />
                  </div>

                  <div
                    className="close"
                    onClick={() => {
                      setIsSecondPopup(false);
                      setIsBgFixed(false);
                    }}
                  >
                    <div className="cross1"></div>
                    <div className="cross2"></div>
                  </div>
                </div>
                <div className="tr title">
                  <div className="th">{t("multiplier")}</div>
                  <div className="th">{t("kills")}</div>
                  <div className="th">{t("punchKills")}</div>
                  <div className="th">{t("payout")}</div>
                </div>
                <div className="tbody">
                  {popupList.map((item, idx) => {
                    return (
                      <div className="tr" key={idx}>
                        <div className="td">{item.get("Multiplier")}</div>
                        <div className="td">{item.get("Kills")}</div>
                        <div className="td">{item.get("ThumperKill")}</div>
                        <div className="td">
                          {(item.get("Win") * (denom * 100)) / 100}
                        </div>
                      </div>
                    );
                  })}
                </div>
              </PopupTable>
            </Popup>
          )}
        </>
      ) : (
        <>
          <MobileTable>
            {fishList.map((item, idx) => (
              <NormalMobile
                key={idx}
                item={item}
                list={list}
                antesValue={antesValue}
                expand={expand}
                denom={denom}
                isPopup={isPopup}
                isSecondPopup={isSecondPopup}
                setIsPopup={setIsPopup}
                setIsSecondPopup={setIsSecondPopup}
                popupList={popupList}
                setPopupList={setPopupList}
                setIsBgFixed={setIsBgFixed}
              />
            ))}
          </MobileTable>
        </>
      )}
    </>
  );
};

const Table = styled.div`
  margin: 20px 0;
  width: 100%;
  display: table;
  border-collapse: collapse;
  user-select: none;
  .tr {
    display: flex;
    width: 100%;
    border: solid 1px #474747;
    background-color: #373737;
    box-sizing: border-box;
    &:hover {
      background-color: #474747;
    }
    .th {
      flex: 1;
      text-align: center;
      display: flex;
      justify-content: center;
      align-items: center;
    }
    .td {
      flex: 1;
      text-align: center;
      line-height: 60px;
      height: 60px;
      font-size: 13px;
      .fish-img {
        height: 70%;
        object-fit: contain;
        margin-top: 9px;
      }
      &.more {
        display: flex;
        align-items: center;
        justify-content: center;
        cursor: pointer;
        &:hover .dot {
          background-color: #3dabff;
        }
        & .dot {
          width: 4px;
          height: 4px;
          border-radius: 100%;
          background-color: #fff;
          margin: 2px;
        }
      }
    }
    &.title {
      height: 60px;
      background-color: #2a2a2a;
      font-size: 13px;
      color: #8e8e8e;
      & img {
        height: 50px;
      }
    }
  }
`;

const Popup = styled.div`
  position: fixed;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  left: 0;
  top: 0;
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, 0.8);
  z-index: 9999;
`;

const PopupTable = styled(Table)`
  width: 90%;
  max-width: 1200px;
  .tbody {
    max-height: 70vh;
    overflow-y: overlay;
  }
  .title-area {
    display: flex;
    align-items: center;
    justify-content: space-between;
    .title {
      display: flex;
      align-items: center;
      height: 50px;
      & > h3 {
        margin-right: 20px;
      }
      & .fish-img {
        height: 90%;
        object-fit: contain;
      }
    }
  }
  .close {
    display: flex;
    align-items: center;
    justify-content: center;
    padding: 20px;
    cursor: pointer;
    .cross1 {
      position: absolute;
      width: 30px;
      height: 2px;
      background-color: #fff;
      transform: rotate(45deg);
    }
    .cross2 {
      position: absolute;
      width: 30px;
      height: 2px;
      background-color: #fff;
      transform: rotate(-45deg);
    }
  }
`;
const MobileTable = styled.div``;
export default NormalTable;
