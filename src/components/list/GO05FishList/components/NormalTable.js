import React, { useState } from "react";
import styled from "styled-components";
import { MOBILE_BREAKPOINT_WIDTH } from "cssMix";
import { List, fromJS } from "immutable";
import { ratios } from "config/ratios";
import NormalMobile from "./NormalMobile";
import { useSelector } from "react-redux";

const checkMobile = () => {
  const isMobile =
    navigator.userAgent.match(/Android|webOS|iPhone|iPod|Blackberry/i) || [];
  return isMobile.length > 0 ? true : false;
};

const stageTypeFetch = (fishId = "", stageType = 1) => {
  if (fishId == 21 || fishId == 26) {
    return `${fishId}_${stageType}`;
  } else return fishId;
};

const NormalTable = ({
  size,
  t,
  expandHandler,
  denom,
  list = List(),
  antesValue,
  expand,
  setIsBgFixed,
  bets,
  title,
  stageType,
}) => {
  const imgsdomain = useSelector((state) => state.props.imgsdomain);
  const [isPopup, setIsPopup] = useState(false);
  const [isSecondPopup, setIsSecondPopup] = useState(false);
  const [popupList, setPopupList] = useState(List());
  const moreMultiplierList = [
    "21",
    "22",
    "26",
    "27",
    "28",
    "23",
    "24",
    "29",
    "30",
  ];
  const specialFishesOnlyList = ["21", "22", "26", "27", "28"];
  const expandList = ["ordinaryFish", "specialFish"];
  const popupHandler = (id, antesValue) => {
    const newArr = [];
    List(bets).forEach((item) => {
      item[1].getIn(["Fishes", id]) &&
        newArr.push(
          item[1]
            .getIn(["Fishes", id])
            .set("betMultiple", item[0])
            .set("fishId", id)
        );
    });
    setPopupList(
      antesValue !== "all"
        ? fromJS(
            newArr.filter(
              (v) =>
                (v.get("PayInfos") || v.get("HitCount") !== 0) &&
                v.get("betMultiple") === antesValue
            )
          )
        : fromJS(
            newArr.filter((v) => v.get("PayInfos") || v.get("HitCount") !== 0)
          )
    );
    setIsPopup(true);
    setIsBgFixed(true);
  };
  const popupSecondHandler = (item) => {
    const payInfos = item.get("PayInfos");
    const arrayInfos = List(payInfos);
    const newArr = [];
    arrayInfos.forEach((v) => {
      newArr.push(
        v[1].set("multiplier", v[0]).set("fishId", item.get("fishId"))
      );
    });
    setPopupList(fromJS(newArr));
    setIsPopup(false);
    setIsSecondPopup(true);
    setIsBgFixed(true);
  };
  return list.size ? (
    <>
      {size.width > MOBILE_BREAKPOINT_WIDTH ? (
        <>
          <Area>
            <div className="expand">
              <p className="title">{t(title)}</p>
            </div>
            <Table>
              <div className="tr title">
                <div className="th">{t("fishes")}</div>
                {title !== "weaponFish" && (
                  <div className="th">{t("multiplier")}</div>
                )}
                <div className="th">{t("bulletsT2")}</div>
                <div className="th">{t("kills")}</div>
                <div className="th">{t("payout")}</div>
                {/* {(antesValue === "all" ||
                  list.some((v) => moreMultiplierList.includes(v[0]))) && (
                  <div className="th">{t("more")}</div>
                )} */}
                <div className="th">{t("more")}</div>
              </div>
              {list.map((v) => {
                const payInfos = v[1].get("PayInfos");
                const arrayInfos = List(payInfos);
                let kills = 0;
                let wins = 0;
                for (let i = 0; i < arrayInfos.size; i++) {
                  kills =
                    kills +
                    arrayInfos.getIn([i, 1, "KillCount"]) +
                    (arrayInfos.getIn([i, 1, "WeaponKillCounts", "1"])
                      ? arrayInfos.getIn([i, 1, "WeaponKillCounts", "1"])
                      : 0) +
                    (arrayInfos.getIn([i, 1, "CannonSkillKillCounts", "3"])
                      ? arrayInfos.getIn([i, 1, "CannonSkillKillCounts", "3"])
                      : 0) +
                    (arrayInfos.getIn([i, 1, "CannonSkillKillCounts", "4"])
                      ? arrayInfos.getIn([i, 1, "CannonSkillKillCounts", "4"])
                      : 0);
                  wins = wins + arrayInfos.getIn([i, 1, "Win"]);
                }
                wins = (wins * (denom * 100)) / 100;
                return (
                  <div className="tr" key={v[0]}>
                    <div className="td">
                      <img
                        className="fish-img"
                        src={`
${imgsdomain}/order-detail/common/GO05/${stageTypeFetch(v[0], stageType)}.png`}
                      />
                    </div>
                    {title !== "weaponFish" && (
                      <div className="td">
                        {ratios
                          .getIn([
                            "GO05",
                            stageTypeFetch(v[0], stageType),
                            "ratio",
                          ])
                          .map((v, k) => (
                            <p key={k}>{v}</p>
                          ))}
                      </div>
                    )}
                    <div className="td">
                      <p>{v[1].get("HitCount")}</p>
                    </div>
                    <div className="td">
                      <p>{kills}</p>
                    </div>
                    <div className="td">
                      <p>{wins}</p>
                    </div>
                    {antesValue === "all" || wins > 0 ? (
                      <div
                        className="td more"
                        onClick={() => {
                          list.some((v) =>
                            specialFishesOnlyList.includes(v[0])
                          ) && antesValue !== "all"
                            ? popupSecondHandler(v[1].set("fishId", v[0]))
                            : popupHandler(v[0], antesValue);
                        }}
                      >
                        <div className="dot"></div>
                        <div className="dot"></div>
                        <div className="dot"></div>
                      </div>
                    ) : list.some((v) => moreMultiplierList.includes(v[0])) ? (
                      v[1].get("PayInfos") ? (
                        <div
                          className="td more"
                          onClick={() => {
                            popupSecondHandler(v[1].set("fishId", v[0]));
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
                      <div className="td" />
                    )}
                  </div>
                );
              })}
            </Table>
          </Area>
          {isPopup && (
            <Popup>
              <PopupTable>
                <div className="title-area">
                  <div className="title">
                    <h3>
                      {t(
                        ratios.getIn([
                          "GO05",
                          stageTypeFetch(
                            popupList.getIn([0, "fishId"]),
                            stageType
                          ),
                          "title",
                        ])
                      )}
                      {ratios.getIn([
                        "GO05",
                        stageTypeFetch(
                          popupList.getIn([0, "fishId"]),
                          stageType
                        ),
                        "ratio",
                      ]).size
                        ? " ( " +
                          ratios
                            .getIn([
                              "GO05",
                              stageTypeFetch(
                                popupList.getIn([0, "fishId"]),
                                stageType
                              ),
                              "ratio",
                            ])
                            .toJS()
                            .map((v) => `${v}X`) +
                          " )"
                        : ""}
                    </h3>
                    <img
                      className="fish-img"
                      src={`
                      ${imgsdomain}/order-detail/common/GO05/${stageTypeFetch(
                        popupList.getIn([0, "fishId"]),
                        stageType
                      )}.png`}
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
                  <div className="th">{t("bulletsT2")}</div>
                  <div className="th">{t("kills")}</div>
                  {!moreMultiplierList.includes(
                    popupList.getIn([0, "fishId"])
                  ) && <div className="th">{t("fortKills")}</div>}
                  <div className="th">{t("payout")}</div>
                  {moreMultiplierList.includes(
                    popupList.getIn([0, "fishId"])
                  ) && <div className="th">{t("more")}</div>}
                </div>
                <div className="tbody">
                  {popupList.map((item, idx) => {
                    const payInfos = item.get("PayInfos");
                    const arrayInfos = List(payInfos);
                    let normalKills = 0;
                    let fortKills = 0;
                    let wins = 0;
                    for (let i = 0; i < arrayInfos.size; i++) {
                      normalKills =
                        normalKills + arrayInfos.getIn([i, 1, "KillCount"]);
                      fortKills =
                        fortKills +
                        (arrayInfos.getIn([i, 1, "WeaponKillCounts", "1"])
                          ? arrayInfos.getIn([i, 1, "WeaponKillCounts", "1"])
                          : 0) +
                        (arrayInfos.getIn([i, 1, "CannonSkillKillCounts", "3"])
                          ? arrayInfos.getIn([
                              i,
                              1,
                              "CannonSkillKillCounts",
                              "3",
                            ])
                          : 0) +
                        (arrayInfos.getIn([i, 1, "CannonSkillKillCounts", "4"])
                          ? arrayInfos.getIn([
                              i,
                              1,
                              "CannonSkillKillCounts",
                              "4",
                            ])
                          : 0);
                      wins = wins + arrayInfos.getIn([i, 1, "Win"]);
                    }
                    wins = (wins * (denom * 100)) / 100;
                    return (
                      <div className="tr" key={idx}>
                        <div className="td">
                          {(item.get("betMultiple") * (denom * 100)) / 100}
                        </div>
                        <div className="td">{item.get("HitCount")}</div>
                        <div className="td">{normalKills}</div>
                        {!moreMultiplierList.includes(
                          popupList.getIn([0, "fishId"])
                        ) && <div className="th">{fortKills}</div>}
                        <div className="td">{wins}</div>
                        {moreMultiplierList.includes(item.get("fishId")) ? (
                          item.get("PayInfos") ? (
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
                            <div className="td"></div>
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
                      {t(
                        ratios.getIn([
                          "GO05",
                          stageTypeFetch(
                            popupList.getIn([0, "fishId"]),
                            stageType
                          ),
                          "title",
                        ])
                      )}
                      {ratios.getIn([
                        "GO05",
                        stageTypeFetch(
                          popupList.getIn([0, "fishId"]),
                          stageType
                        ),
                        "ratio",
                      ]).size
                        ? " ( " +
                          ratios
                            .getIn([
                              "GO05",
                              stageTypeFetch(
                                popupList.getIn([0, "fishId"]),
                                stageType
                              ),
                              "ratio",
                            ])
                            .toJS()
                            .map((v) => `${v}X`) +
                          " )"
                        : ""}
                    </h3>
                    <img
                      className="fish-img"
                      src={`
                      ${imgsdomain}/order-detail/common/GO05/${stageTypeFetch(
                        popupList.getIn([0, "fishId"]),
                        stageType
                      )}.png`}
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
                  {/* <div className="th">{t("fortKills")}</div> */}
                  <div className="th">{t("payout")}</div>
                </div>
                <div className="tbody">
                  {popupList.map((item, idx) => {
                    let wins = (item.get("Win") * (denom * 100)) / 100;
                    return (
                      <div className="tr" key={idx}>
                        <div className="td">{item.get("multiplier")}</div>
                        <div className="td">
                          {(item.get("KillCount") || 0) +
                            (item.getIn(["WeaponKillCounts", "1"]) || 0) +
                            (item.getIn(["CannonSkillKillCounts", "3"]) || 0) +
                            (item.getIn(["CannonSkillKillCounts", "4"]) || 0)}
                        </div>
                        <div className="td">{wins}</div>
                      </div>
                    );
                  })}
                </div>
              </PopupTable>
            </Popup>
          )}
        </>
      ) : (
        <Area>
          <div className="expand">
            <p className="title">{t(title)}</p>
            {expandList.includes(title) && (
              <p className="expand-btn" onClick={() => expandHandler(title)}>
                {expand.get(title) ? t("collapseAll") : t("expandAll")}
              </p>
            )}
          </div>
          {list.map((item, idx) => {
            return (
              <NormalMobile
                key={idx}
                fish={item}
                title={title}
                antesValue={antesValue}
                expand={expand}
                denom={denom}
                setIsBgFixed={setIsBgFixed}
                t={t}
                isPopup={isPopup}
                setIsPopup={setIsPopup}
                isSecondPopup={isSecondPopup}
                setIsSecondPopup={setIsSecondPopup}
                popupList={popupList}
                popupHandler={popupHandler}
                popupSecondHandler={popupSecondHandler}
                moreMultiplierList={moreMultiplierList}
                specialFishesOnlyList={specialFishesOnlyList}
                stageType={stageType}
                stageTypeFetch={stageTypeFetch}
              />
            );
          })}
        </Area>
      )}
    </>
  ) : (
    <></>
  );
};
const Area = styled.div`
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
`;
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
      background-color: ${checkMobile() ? "none" : "#474747"};
    }
    .th {
      flex: 1;
      text-align: center;
      display: flex;
      justify-content: center;
      align-items: center;
    }
    .td {
      display: flex;
      flex: 1;
      justify-content: space-evenly;
      align-items: center;
      flex-direction: column;
      height: 60px;
      font-size: 13px;
      .fish-img {
        height: 70%;
        object-fit: contain;
      }
      &.more {
        display: flex;
        flex-direction: row;
        align-items: center;
        justify-content: center;
        cursor: pointer;
        &:hover .dot {
          background-color: ${checkMobile() ? "none" : "#3dabff"};
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
export default NormalTable;
