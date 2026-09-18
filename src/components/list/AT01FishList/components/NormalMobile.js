import React, { useState, useEffect } from "react";
import styled from "styled-components";
import { Map, List } from "immutable";
import cx from "classnames";
import { ratios } from "config/ratios";
import { useSelector } from "react-redux";

const NormalMobile = ({
  antesValue,
  fish,
  title,
  expand = Map(),
  denom,
  setIsBgFixed,
  t,
  isPopup,
  setIsPopup,
  isSecondPopup,
  setIsSecondPopup,
  popupList,
  popupHandler,
  popupSecondHandler,
  moreMultiplierList,
  specialFishesOnlyList,
}) => {
  const imgsdomain = useSelector((state) => state.props.imgsdomain);
  const [isOpen, setIsOpen] = useState(false);
  const toggleHandler = () => {
    setIsOpen(!isOpen);
  };
  useEffect(() => {
    setIsOpen(expand.get(title));
  }, [expand]);
  const payInfos = fish[1].get("PayInfos");
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
    <>
      <NormalMobileWrapper>
        <div className="img">
          <img
            className="fish-img"
            src={`
            ${imgsdomain}/order-detail/common/AT01_v2/${fish[0]}.png`}
          />
        </div>
        <div className="toggle-btn" onClick={toggleHandler}>
          <div className={cx("cross1", { open: isOpen })}></div>
          <div className={cx("cross2", { open: isOpen })}></div>
        </div>
      </NormalMobileWrapper>
      {isOpen && (
        <Table>
          {title !== "weaponFish" && (
            <div className="tr">
              <h5>{t("multiplier")}</h5>
              <p>
                {ratios.getIn(["AT01", fish[0], "ratio"]).map((v, k) => (
                  <span key={k}>{v}</span>
                ))}
              </p>
            </div>
          )}
          <div className="tr">
            <h5>{t("bulletsT2")}</h5>
            <p>{fish[1].get("HitCount")}</p>
          </div>
          <div className="tr">
            <h5>{t("kills")}</h5>
            <p>{kills}</p>
          </div>
          <div className="tr">
            <h5>{t("payout")}</h5>
            <p>{wins}</p>
            {(antesValue === "all" || fish[1].get("PayInfos")) && (
              <div
                className="more"
                onClick={() => {
                  const isSpFishesOnly =
                    specialFishesOnlyList.includes(fish[0]) &&
                    antesValue !== "all";
                  isSpFishesOnly
                    ? popupSecondHandler(fish[1].set("fishId", fish[0]))
                    : popupHandler(fish[0], antesValue);
                }}
              >
                {t("more")}
              </div>
            )}
          </div>
        </Table>
      )}
      {isPopup && (
        <Popup>
          <PopupTable>
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
            <div className="title-area">
              <div className="title">
                <h3>
                  {t(
                    ratios.getIn([
                      "AT01",
                      popupList.getIn([0, "fishId"]),
                      "title",
                    ])
                  )}
                  {ratios.getIn([
                    "AT01",
                    popupList.getIn([0, "fishId"]),
                    "ratio",
                  ]).size
                    ? " ( " +
                      ratios
                        .getIn([
                          "AT01",
                          popupList.getIn([0, "fishId"]),
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
                  ${imgsdomain}/order-detail/common/AT01_v2/${popupList.getIn([
                    0,
                    "fishId",
                  ])}.png`}
                />
              </div>
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
                      ? arrayInfos.getIn([i, 1, "CannonSkillKillCounts", "3"])
                      : 0) +
                    (arrayInfos.getIn([i, 1, "CannonSkillKillCounts", "4"])
                      ? arrayInfos.getIn([i, 1, "CannonSkillKillCounts", "4"])
                      : 0);
                  wins = wins + arrayInfos.getIn([i, 1, "Win"]);
                }
                wins = (wins * (denom * 100)) / 100;
                return (
                  <div className="popup-item" key={idx}>
                    <div className="tr">
                      <h5>{t("minBet")}</h5>
                      <p>{(item.get("betMultiple") * (denom * 100)) / 100}</p>
                    </div>
                    <div className="tr">
                      <h5>{t("bulletsT2")}</h5>
                      <p>{item.get("HitCount")}</p>
                    </div>
                    <div className="tr">
                      <h5>{t("kills")}</h5>
                      <p>{normalKills}</p>
                    </div>
                    {!moreMultiplierList.includes(item.get("fishId")) && (
                      <div className="tr">
                        <h5>{t("fortKills")}</h5>
                        <p>{fortKills}</p>
                      </div>
                    )}
                    <div className="tr">
                      <h5>{t("payout")}</h5>
                      <p>{wins}</p>
                      {moreMultiplierList.includes(item.get("fishId")) &&
                        item.get("PayInfos") && (
                          <div
                            className="more"
                            onClick={() => popupSecondHandler(item)}
                          >
                            {t("more")}
                          </div>
                        )}
                    </div>
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
            <div className="title-area">
              <div className="title">
                <h3>
                  {t(
                    ratios.getIn([
                      "AT01",
                      popupList.getIn([0, "fishId"]),
                      "title",
                    ])
                  )}
                  {ratios.getIn([
                    "AT01",
                    popupList.getIn([0, "fishId"]),
                    "ratio",
                  ]).size
                    ? " ( " +
                      ratios
                        .getIn([
                          "AT01",
                          popupList.getIn([0, "fishId"]),
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
                  ${imgsdomain}/order-detail/common/AT01_v2/${popupList.getIn([
                    0,
                    "fishId",
                  ])}.png`}
                />
              </div>
            </div>
            <div className="tbody">
              {popupList.map((item, idx) => {
                let wins = (item.get("Win") * (denom * 100)) / 100;
                return (
                  <div className="popup-item" key={idx}>
                    <div className="tr">
                      <h5>{t("multiplier")}</h5>
                      <p>{item.get("multiplier")}</p>
                    </div>
                    <div className="tr">
                      <h5>{t("kills")}</h5>
                      <p>
                        {(item.get("KillCount") || 0) +
                          (item.getIn(["WeaponKillCounts", "1"]) || 0) +
                          (item.getIn(["CannonSkillKillCounts", "3"]) || 0) +
                          (item.getIn(["CannonSkillKillCounts", "4"]) || 0)}
                      </p>
                    </div>
                    <div className="tr">
                      <h5>{t("payout")}</h5>
                      <p>{wins}</p>
                    </div>
                  </div>
                );
              })}
            </div>
          </PopupTable>
        </Popup>
      )}
    </>
  );
};

const NormalMobileWrapper = styled.div`
  width: 100%;
  height: 60px;
  display: flex;
  align-content: center;
  justify-content: space-between;
  padding: 10px 15px;
  border: solid 1px #474747;
  box-sizing: border-box;
  .img {
    height: 90%;
    .fish-img {
      height: 100%;
      object-fit: contain;
    }
  }
  .toggle-btn {
    width: 100%;
    height: 100%;
    display: flex;
    align-items: center;
    justify-content: end;
    -webkit-align-items: center;
    -webkit-justify-content: flex-end;
    cursor: pointer;
    .cross1 {
      position: absolute;
      width: 15px;
      height: 2px;
      background-color: #fff;
      transform: rotate(180deg);
      transition: all ease 0.3s;
      &.open {
        transform: rotate(45deg);
      }
    }
    .cross2 {
      position: absolute;
      width: 15px;
      height: 2px;
      background-color: #fff;
      transform: rotate(90deg);
      transition: all ease 0.3s;
      &.open {
        transform: rotate(-45deg);
      }
    }
  }
`;

const Table = styled.div`
  display: flex;
  flex-direction: column;
  .tr {
    display: flex;
    align-items: center;
    flex-wrap: wrap;
    justify-content: space-between;
    padding: 15px;
    border: solid 1px #474747;
    background-color: #373737;
    box-sizing: border-box;
    font-size: 13px;
    & .awake-img {
      height: 45px;
    }
    .more {
      width: 100%;
      background-color: #3cabff;
      padding: 15px;
      text-align: center;
      margin-top: 10px;
      cursor: pointer;
    }
    h5 {
      color: #8e8e8e;
      margin: 0;
    }
    &.awake {
      padding: 0 15px;
      height: 48px;
    }
    & > p {
      display: flex;
      flex-direction: column;
      align-items: flex-end;
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
    justify-content: end;
    -webkit-align-items: center;
    -webkit-justify-content: flex-end;
    padding: 20px;
    padding-right: 0;
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
  .popup-item {
    margin-bottom: 5px;
  }
`;

export default NormalMobile;
