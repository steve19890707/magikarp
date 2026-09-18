import React, { useState, useEffect } from "react";
import styled from "styled-components";
import cx from "classnames";
import { useTranslation } from "react-i18next";
import { Map, List, fromJS } from "immutable";
import { ratios } from "config/ratios";
import { useSelector } from "react-redux";

const NormalMobile = ({
  antesValue,
  item = Map(),
  list = List(),
  expand,
  denom,
  size,
  setIsBgFixed,
}) => {
  const imgsdomain = useSelector((state) => state.props.imgsdomain);
  const [isOpen, setIsOpen] = useState(false);
  const [isPopup, setIsPopup] = useState(false);
  const [isSecondPopup, setIsSecondPopup] = useState(false);
  const [popupList, setPopupList] = useState(List());
  const { t } = useTranslation();
  const toggleHandler = () => {
    setIsOpen(!isOpen);
  };
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

  useEffect(() => {
    setIsOpen(expand);
  }, [expand]);
  return (
    <>
      <Main>
        <div className="img">
          <img
            className="fish-img"
            src={`
${imgsdomain}/order-detail/common/GO02/fish/${item.get("FishSpecies")}.png`}
          />
        </div>
        <div className="toggle-btn" onClick={toggleHandler}>
          <div className={cx("cross1", { open: isOpen })}></div>
          <div className={cx("cross2", { open: isOpen })}></div>
        </div>
      </Main>
      {isOpen && (
        <Table>
          <div className="tr">
            <h5>{t("multiplier")}</h5>
            <p>{ratios.getIn(["GO02", item.get("FishSpecies").toString()])}</p>
          </div>
          <div className="tr">
            <h5>{t("bullets")}</h5>
            <p>{item.get("Bullets")}</p>
          </div>
          <div className="tr awake">
            <img
              className="awake-img"
              src={`
${imgsdomain}/order-detail/common/GO02/character1_mobile.png`}
            />
            <p>{item.get("BulletsAwake1")}</p>
          </div>
          <div className="tr awake">
            <img
              className="awake-img"
              src={`
${imgsdomain}/order-detail/common/GO02/character2_mobile.png`}
            />
            <p>{item.get("BulletsAwake2")}</p>
          </div>
          <div className="tr awake">
            <img
              className="awake-img"
              src={`
${imgsdomain}/order-detail/common/GO02/character3_mobile.png`}
            />
            <p>{item.get("BulletsAwake3")}</p>
          </div>
          <div className="tr awake">
            <img
              className="awake-img"
              src={`
${imgsdomain}/order-detail/common/GO02/character4_mobile.png`}
            />
            <p>{item.get("BulletsAwake4")}</p>
          </div>
          <div className="tr">
            <h5>{t("kills")}</h5>
            <p>{item.get("Kills")}</p>
          </div>
          <div className="tr">
            <h5>{t("punchKills")}</h5>
            <p>{item.get("ThumperKill")}</p>
          </div>
          <div className="tr">
            <h5>{t("payout")}</h5>
            <p>{(item.get("Win") * (denom * 100)) / 100}</p>
            {(antesValue === "all" ||
              ((item.get("FishSpecies") === 17 ||
                item.get("FishSpecies") === 18 ||
                item.get("FishSpecies") === 19) &&
                item.get("Win") > 0)) && (
              <div
                className="more"
                onClick={() =>
                  antesValue === "all"
                    ? popupHandler(item.get("FishSpecies"))
                    : popupSecondHandler(item)
                }
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
${imgsdomain}/order-detail/common/GO02/fish/${item.get("FishSpecies")}.png`}
                />
              </div>
            </div>
            <div className="tbody">
              {popupList.map((listItem, idx) => (
                <div className="popup-item" key={idx}>
                  <div className="tr">
                    <h5>{t("minBet")}</h5>
                    <p>{(listItem.get("BetMultiple") * (denom * 100)) / 100}</p>
                  </div>
                  <div className="tr">
                    <h5>{t("bullets")}</h5>
                    <p>{listItem.get("Bullets")}</p>
                  </div>
                  <div className="tr awake">
                    <img
                      className="awake-img"
                      src={`
${imgsdomain}/order-detail/common/GO02/character1_mobile.png`}
                    />
                    <p>{listItem.get("BulletsAwake1")}</p>
                  </div>
                  <div className="tr awake">
                    <img
                      className="awake-img"
                      src={`
${imgsdomain}/order-detail/common/GO02/character2_mobile.png`}
                    />
                    <p>{listItem.get("BulletsAwake2")}</p>
                  </div>
                  <div className="tr awake">
                    <img
                      className="awake-img"
                      src={`
${imgsdomain}/order-detail/common/GO02/character3_mobile.png`}
                    />
                    <p>{listItem.get("BulletsAwake3")}</p>
                  </div>
                  <div className="tr awake">
                    <img
                      className="awake-img"
                      src={`
${imgsdomain}/order-detail/common/GO02/character4_mobile.png`}
                    />
                    <p>{listItem.get("BulletsAwake4")}</p>
                  </div>
                  <div className="tr">
                    <h5>{t("kills")}</h5>
                    <p>{listItem.get("Kills")}</p>
                  </div>
                  <div className="tr">
                    <h5>{t("punchKills")}</h5>
                    <p>{listItem.get("ThumperKill")}</p>
                  </div>
                  <div className="tr">
                    <h5>{t("payout")}</h5>
                    <p>{(listItem.get("Win") * (denom * 100)) / 100}</p>
                    {(listItem.get("FishSpecies") === 17 ||
                      listItem.get("FishSpecies") === 18 ||
                      listItem.get("FishSpecies") === 19) &&
                      listItem.get("Win") > 0 && (
                        <div
                          className="more"
                          onClick={() => popupSecondHandler(listItem)}
                        >
                          {t("more")}
                        </div>
                      )}
                  </div>
                </div>
              ))}
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
${imgsdomain}/order-detail/common/GO02/fish/${item.get("FishSpecies")}.png`}
                />
              </div>
            </div>
            <div className="tbody">
              {popupList.map((listItem, idx) => (
                <div className="popup-item" key={idx}>
                  <div className="tr">
                    <h5>{t("multiplier")}</h5>
                    <p>{listItem.get("Multiplier")}</p>
                  </div>
                  <div className="tr">
                    <h5>{t("kills")}</h5>
                    <p>{listItem.get("Kills")}</p>
                  </div>
                  <div className="tr">
                    <h5>{t("punchKills")}</h5>
                    <p>{listItem.get("ThumperKill")}</p>
                  </div>
                  <div className="tr">
                    <h5>{t("payout")}</h5>
                    <p>{(listItem.get("Win") * (denom * 100)) / 100}</p>
                  </div>
                </div>
              ))}
            </div>
          </PopupTable>
        </Popup>
      )}
    </>
  );
};

const Main = styled.div`
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
    justify-content: flex-end;
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
    justify-content: flex-end;
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
