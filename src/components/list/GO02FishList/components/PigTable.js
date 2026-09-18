import React, { useState, useEffect } from "react";
import styled from "styled-components";
import cx from "classnames";
import { useTranslation } from "react-i18next";
import { List, Map, fromJS } from "immutable";
import media from "cssMix";
import { MOBILE_BREAKPOINT_WIDTH } from "cssMix";
import { useSelector } from "react-redux";

const PigTable = ({ antesValue, list = List(), denom, size, setIsBgFixed }) => {
  const { t } = useTranslation();
  const imgsdomain = useSelector((state) => state.props.imgsdomain);
  const [isOpen, setIsOpen] = useState(false);
  const [isPopup, setIsPopup] = useState(false);
  const [pigList, setPigList] = useState(List());
  const [displayList, setDisplayList] = useState(List());
  const [popupList, setPopupList] = useState(Map());
  const toggleHandler = () => {
    setIsOpen(!isOpen);
  };

  const popupSecondHandler = (item) => {
    setIsPopup(true);
    setIsBgFixed(true);
    const arr = List();
    setPopupList(arr.set(0, item));
  };
  const popupHandler = (id) => {
    const newList = list.filter((i) => i.get("FishSpecies") == id);
    const newArr = [];
    newList.toJS().forEach((item) => {
      const index = newArr.findIndex(
        (i) =>
          i["BetMultiple"] === item["BetMultiple"] &&
          i["Win"] === item["Win"] &&
          i["Win"] === 0
      );
      if (index !== -1) {
        const bullets = newArr[index]["Bullets"] + item["Bullets"];
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
    if (list.size > 0) {
      const array1 = list.filter((i) => i.get("FishSpecies") == 24);
      const array2 = list.filter((i) => i.get("FishSpecies") == 30);
      const array3 = list.filter((i) => i.get("FishSpecies") == 31);
      const array4 = list.filter((i) => i.get("FishSpecies") == 32);
      const array5 = list.filter((i) => i.get("FishSpecies") == 33);
      setPigList(array1.concat(array2, array3, array4, array5));
    }
  }, [list]);

  const totalPay = () => {
    let total = 0;
    pigList.forEach(
      (i) =>
        (total +=
          i.get("BetMultiple") * i.get("Bullets") +
          i.get("BetMultiple") * i.get("BulletsAwake1") * 3 +
          i.get("BetMultiple") * i.get("BulletsAwake2") * 4 +
          i.get("BetMultiple") * i.get("BulletsAwake3") * 5 +
          i.get("BetMultiple") * i.get("BulletsAwake4") * 6)
    );
    return (total * (denom * 100)) / 100;
  };

  const totalWin = () => {
    let total = 0;
    pigList.forEach((i) => (total += i.get("Win")));
    return (total * (denom * 100)) / 100;
  };

  // create pig display list
  useEffect(() => {
    if (antesValue === "all") {
      const newArr = [];
      pigList.toJS().forEach((item) => {
        const index = newArr.findIndex(
          (i) => i["FishSpecies"] === item["FishSpecies"]
        );
        if (index !== -1) {
          const bullets = newArr[index]["Bullets"] + item["Bullets"];
          const bulletsAwake1 =
            newArr[index]["BulletsAwake1"] + item["BulletsAwake1"];
          const bulletsAwake2 =
            newArr[index]["BulletsAwake2"] + item["BulletsAwake2"];
          const bulletsAwake3 =
            newArr[index]["BulletsAwake3"] + item["BulletsAwake3"];
          const bulletsAwake4 =
            newArr[index]["BulletsAwake4"] + item["BulletsAwake4"];
          const thumperKill =
            newArr[index]["ThumperKill"] + item["ThumperKill"];
          const kills = newArr[index]["Kills"] + item["Kills"];
          const win = newArr[index]["Win"] + item["Win"];
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
      setDisplayList(fromJS(newArr));
    }
    if (antesValue !== "all") {
      setDisplayList(pigList);
    }
  }, [antesValue, pigList]);

  return (
    <>
      <Main>
        <div className="left">
          <img src={`${imgsdomain}/order-detail/common/GO02/24_1.png`}></img>
        </div>
        <div className="middle">
          <ul>
            <li>
              {t("bet")}：{totalPay()}
            </li>
            <li>
              {t("payout")}：{totalWin()}
            </li>
          </ul>
        </div>
        <div className="right">
          <div className="toggle-btn" onClick={toggleHandler}>
            <div className={cx("cross1", { open: isOpen })}></div>
            <div className={cx("cross2", { open: isOpen })}></div>
          </div>
        </div>
      </Main>
      {size.width > MOBILE_BREAKPOINT_WIDTH ? (
        <>
          <Table>
            {isOpen && (
              <>
                <div className="tr title">
                  <div className="th"></div>
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
                  <div className="th">{t("more")}</div>
                </div>
                {displayList.map((item, idx) => (
                  <div className="tr" key={idx}>
                    <div className="td serial">#{idx + 1}</div>
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
                    {antesValue === "all" || item.get("Win") > 0 ? (
                      <div
                        className="td more"
                        onClick={() => {
                          if (antesValue === "all") {
                            popupHandler(item.get("FishSpecies"));
                          } else {
                            popupSecondHandler(item);
                          }
                        }}
                      >
                        <div className="dot"></div>
                        <div className="dot"></div>
                        <div className="dot"></div>
                      </div>
                    ) : (
                      <div className="td"></div>
                    )}
                  </div>
                ))}
              </>
            )}
          </Table>
          {isPopup && (
            <Popup>
              <PopupTable>
                <div className="title-area">
                  <div className="title">
                    <h3>{t("luckyPiggy")}</h3>
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
                  <div className="th">{t("punchKills")}</div>
                  <div className="th">{t("multiplier")}</div>
                  <div className="th">{t("payout")}</div>
                </div>
                <div className="tbody">
                  {popupList.map((item, idx) => (
                    <div className="tr" key={idx}>
                      <div className="td">
                        {(item.get("BetMultiple") * (denom * 100)) / 100}
                      </div>
                      <div className="td">{item.get("Bullets")}</div>
                      <div className="td">{item.get("BulletsAwake1")}</div>
                      <div className="td">{item.get("BulletsAwake2")}</div>
                      <div className="td">{item.get("BulletsAwake3")}</div>
                      <div className="td">{item.get("BulletsAwake4")}</div>
                      <div className="td">{item.get("ThumperKill")}</div>
                      <div className="td">{item.get("Multiplier")}</div>
                      <div className="td">
                        {(item.get("Win") * (denom * 100)) / 100}
                      </div>
                    </div>
                  ))}
                </div>
              </PopupTable>
            </Popup>
          )}
        </>
      ) : (
        isOpen && (
          <>
            <MobileTable>
              {displayList.map((item, idx) => (
                <div key={idx}>
                  <div className="serial">#{idx + 1}</div>
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
                    {(antesValue === "all" || item.get("Win") > 0) && (
                      <div
                        className="more"
                        onClick={() => {
                          if (antesValue === "all") {
                            popupHandler(item.get("FishSpecies"));
                          } else {
                            popupSecondHandler(item);
                          }
                        }}
                      >
                        {t("more")}
                      </div>
                    )}
                  </div>
                </div>
              ))}
            </MobileTable>
            {isPopup && (
              <Popup>
                <MobilePopupTable>
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
                      <h3>{t("luckyPiggy")}</h3>
                    </div>
                  </div>
                  <div className="tbody">
                    {popupList.map((item, idx) => (
                      <div className="popup-item" key={idx}>
                        <div className="tr">
                          <h5>{t("minBet")}</h5>
                          <p>
                            {(item.get("BetMultiple") * (denom * 100)) / 100}
                          </p>
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
                          <h5>{t("punchKills")}</h5>
                          <p>{item.get("ThumperKill")}</p>
                        </div>
                        <div className="tr">
                          <h5>{t("multiplier")}</h5>
                          <p>{item.get("Multiplier")}</p>
                        </div>
                        <div className="tr">
                          <h5>{t("payout")}</h5>
                          <p>{(item.get("Win") * (denom * 100)) / 100}</p>
                        </div>
                      </div>
                    ))}
                  </div>
                </MobilePopupTable>
              </Popup>
            )}
          </>
        )
      )}
    </>
  );
};
const MobileTable = styled.div`
  & .serial {
    text-align: center;
    padding: 15px 0;
    border: solid 1px #474747;
    color: #3dabff;
    font-size: 13px;
  }
  & .tr {
    display: flex;
    align-items: center;
    flex-wrap: wrap;
    justify-content: space-between;
    font-size: 13px;
    padding: 15px;
    border: solid 1px #474747;
    background-color: #373737;
    & .awake-img {
      height: 45px;
    }
    &.awake {
      padding: 0 15px;
      height: 48px;
    }
    &.img {
      padding: 0;
      justify-content: center;
      height: 60px;
      background-color: #2a2a2a;
      img {
        height: 50%;
        object-fit: contain;
      }
    }
    h5 {
      margin: 0;
      color: #8e8e8e;
    }
    .more {
      width: 100%;
      background-color: #3cabff;
      padding: 15px;
      text-align: center;
      margin-top: 10px;
      cursor: pointer;
    }
  }
`;
const MobilePopupTable = styled(MobileTable)`
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
const Table = styled.div`
  margin: 0 0 20px 0;
  width: 100%;
  display: table;
  border-collapse: collapse;
  user-select: none;
  .tr {
    display: flex;
    box-sizing: border-box;
    width: 100%;
    border: solid 1px #474747;
    background-color: #373737;
    &:hover {
      background-color: #474747;
    }
    & .awake-img {
      height: 45px;
    }
    &.awake {
      padding: 0 15px;
      height: 48px;
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
      &.serial {
        color: #3dabff;
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

const Main = styled.div`
  border-collapse: collapse;
  display: flex;
  box-sizing: border-box;
  width: 100%;
  height: 210px;
  padding: 30px;
  border: solid 1px #474747;
  margin: 20px 0 0 0;
  ${media.mobile`
    flex-wrap:wrap;
    height:auto;
    padding:15px;
  `}
  .left {
    width: 45%;
    max-width: 330px;
    height: 150px;
    border: solid 1px #474747;
    background-color: #373737;
    display: flex;
    align-items: center;
    justify-content: center;
    ${media.mobile`
      width:100%;
      max-width: none;
      margin-bottom:15px;
  `}
  }
  .middle {
    flex: 1;
    ${media.mobile`
  width: calc(100% -100px);
  `}
  }
  .right {
    display: flex;
    align-items: center;
    justify-content: center;
    width: 100px;
    border-left: 1px solid #474747;
    height: 150px;
    ${media.mobile`
    height: 70px;
  `}
    .toggle-btn {
      width: 100%;
      height: 100%;
      display: flex;
      align-items: center;
      justify-content: center;
      cursor: pointer;
      .cross1 {
        position: absolute;
        width: 30px;
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
        width: 30px;
        height: 2px;
        background-color: #fff;
        transform: rotate(90deg);
        transition: all ease 0.3s;
        &.open {
          transform: rotate(-45deg);
        }
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
export default PigTable;
