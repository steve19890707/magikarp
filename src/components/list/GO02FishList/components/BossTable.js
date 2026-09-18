import React, { useState, useEffect } from "react";
import styled from "styled-components";
import cx from "classnames";
import { useTranslation } from "react-i18next";
import { List, Map, fromJS } from "immutable";
import media from "cssMix";
import { MOBILE_BREAKPOINT_WIDTH } from "cssMix";
import { useSelector } from "react-redux";

const BossTable = ({
  type,
  list = List(),
  antesValue,
  denom,
  size,
  setIsBgFixed,
}) => {
  const { t } = useTranslation();
  const imgsdomain = useSelector((state) => state.props.imgsdomain);
  const [isOpen, setIsOpen] = useState(false);
  const [isPopup, setIsPopup] = useState(false);
  const [bossList, setBossList] = useState(List());
  const [finalPopup, setFinalPopup] = useState(false);
  const [popupList, setPopupList] = useState(Map());
  // console.log(bossList.toJS())
  // console.log(list.toJS())
  const name = () => {
    switch (type) {
      case "Octopus":
        return t("octopusKing");
      case "Toad":
        return t("toadKing");
      default:
        return;
    }
  };

  const closePopupHandler = () => {
    setIsPopup(false);
    setFinalPopup(false);
    setIsBgFixed(false);
  };
  const finalPopupHandler = (item) => {
    setIsPopup(false);
    setFinalPopup(true);
    setIsBgFixed(true);
    setPopupList(item);
  };
  const toggleHandler = () => {
    setIsOpen(!isOpen);
  };
  const popupHandler = (id) => {
    // 2.3版本 boss尾刀改為1~3次表演 1次以上表演時只要取最後一筆的資料來顯示就好
    const lastKill27 = list.filter((i) => i.get("FishSpecies") == 27);
    const lastKill29 = list.filter((i) => i.get("FishSpecies") == 29);
    const newList =
      id == 29 && lastKill29.size > 1
        ? List([lastKill29.get(lastKill29.size - 1)])
        : id == 27 && lastKill27.size > 1
        ? List([lastKill27.get(lastKill27.size - 1)])
        : list.filter((i) => i.get("FishSpecies") == id);
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
  const fishImg = (type) => {
    if (type == "Octopus") {
      return `${imgsdomain}/order-detail/common/GO02/25.png`;
    } else {
      return `${imgsdomain}/order-detail/common/GO02/28_2.png`;
    }
  };

  useEffect(() => {
    if (list.size > 0) {
      if (type == "Octopus") {
        const array1 = list.filter((i) => i.get("FishSpecies") == 25);
        const array2 = list.filter((i) => i.get("FishSpecies") == 26);
        // 2.3版本 boss尾刀改為1~3次表演 1次以上表演時只要取最後一筆的資料來顯示就好
        const lastKill = list.filter((i) => i.get("FishSpecies") == 27);
        const array3 =
          lastKill.size > 1
            ? List([lastKill.get(lastKill.size - 1)])
            : list.filter((i) => i.get("FishSpecies") == 27);
        const arr = array1.concat(array2, array3);
        const newArr = [];
        arr.toJS().forEach((item) => {
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
        setBossList(fromJS(newArr));
      } else {
        const array1 = list.filter((i) => i.get("FishSpecies") == 28);
        // 2.3版本 boss尾刀改為1~3次表演 1次以上表演時只要取最後一筆的資料來顯示就好
        const lastKill = list.filter((i) => i.get("FishSpecies") == 29);
        const array2 =
          lastKill.size > 1
            ? List([lastKill.get(lastKill.size - 1)])
            : list.filter((i) => i.get("FishSpecies") == 29);
        const arr = array1.concat(array2);
        const newArr = [];
        arr.toJS().forEach((item) => {
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
        setBossList(fromJS(newArr));
      }
    }
  }, [list]);
  const totalPay = () => {
    let total = 0;
    if (type == "Octopus") {
      const array1 = list.filter((i) => i.get("FishSpecies") == 25);
      const array2 = list.filter((i) => i.get("FishSpecies") == 26);
      // 2.3版本 boss尾刀改為1~3次表演 1次以上表演時只要取最後一筆的資料來顯示就好
      const lastKill = list.filter((i) => i.get("FishSpecies") == 27);
      const array3 =
        lastKill.size > 1
          ? List([lastKill.get(lastKill.size - 1)])
          : list.filter((i) => i.get("FishSpecies") == 27);
      const arr = array1.concat(array2, array3);
      arr.forEach(
        (i) =>
          (total +=
            i.get("BetMultiple") * i.get("Bullets") +
            i.get("BetMultiple") * i.get("BulletsAwake1") * 3 +
            i.get("BetMultiple") * i.get("BulletsAwake2") * 4 +
            i.get("BetMultiple") * i.get("BulletsAwake3") * 5 +
            i.get("BetMultiple") * i.get("BulletsAwake4") * 6)
      );
      return (total * (denom * 100)) / 100;
    } else {
      const array1 = list.filter((i) => i.get("FishSpecies") == 28);
      // 2.3版本 boss尾刀改為1~3次表演 1次以上表演時只要取最後一筆的資料來顯示就好
      const lastKill = list.filter((i) => i.get("FishSpecies") == 29);
      const array2 =
        lastKill.size > 1
          ? List([lastKill.get(lastKill.size - 1)])
          : list.filter((i) => i.get("FishSpecies") == 29);
      const arr = array1.concat(array2);
      arr.forEach(
        (i) =>
          (total +=
            i.get("BetMultiple") * i.get("Bullets") +
            i.get("BetMultiple") * i.get("BulletsAwake1") * 3 +
            i.get("BetMultiple") * i.get("BulletsAwake2") * 4 +
            i.get("BetMultiple") * i.get("BulletsAwake3") * 5 +
            i.get("BetMultiple") * i.get("BulletsAwake4") * 6)
      );
      return (total * (denom * 100)) / 100;
    }
  };

  const totalWin = () => {
    let total = 0;
    bossList.forEach((i) => (total += i.get("Win")));
    return (total * (denom * 100)) / 100;
  };

  return (
    <>
      <Main>
        <div className="left">
          <img src={fishImg(type)}></img>
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
                {bossList.map((item, idx) => (
                  <div className="tr" key={idx}>
                    <div className="td serial">
                      #{idx + 1}
                      {item.get("FishSpecies") == 27 ||
                      item.get("FishSpecies") == 29
                        ? ` - ${t("lastKill")}`
                        : ` - ${t("processKill")}`}
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
                    <div
                      className="td more"
                      onClick={() => {
                        if (
                          antesValue !== "all" &&
                          (item.get("FishSpecies") == 27 ||
                            item.get("FishSpecies") == 29)
                        ) {
                          finalPopupHandler(item);
                        } else {
                          popupHandler(item.get("FishSpecies"));
                        }
                      }}
                    >
                      <div className="dot"></div>
                      <div className="dot"></div>
                      <div className="dot"></div>
                    </div>
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
                    <h3>{name()}</h3>
                  </div>
                  <div className="close" onClick={closePopupHandler}>
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
                  {popupList.getIn([0, "FishSpecies"]) !== 27 &&
                    popupList.getIn([0, "FishSpecies"]) !== 29 && (
                      <>
                        <div className="th">{t("punchKills")}</div>
                        <div className="th">{t("multiplier")}</div>
                      </>
                    )}
                  <div className="th">{t("payout")}</div>
                  {(popupList.getIn([0, "FishSpecies"]) == 27 ||
                    popupList.getIn([0, "FishSpecies"]) == 29) && (
                    <div className="th">{t("more")}</div>
                  )}
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
                      {item.get("FishSpecies") !== 27 &&
                        item.get("FishSpecies") !== 29 && (
                          <>
                            <div className="td">{item.get("ThumperKill")}</div>
                            <div className="td">{item.get("Multiplier")}</div>
                          </>
                        )}
                      <div className="td">
                        {(item.get("Win") * (denom * 100)) / 100}
                      </div>
                      {item.get("FishSpecies") == 27 ||
                      item.get("FishSpecies") == 29 ? (
                        <>
                          {item.get("Win") > 0 ? (
                            <div
                              className="td more"
                              onClick={() => {
                                finalPopupHandler(item);
                              }}
                            >
                              <div className="dot"></div>
                              <div className="dot"></div>
                              <div className="dot"></div>
                            </div>
                          ) : (
                            <div className="td"></div>
                          )}
                        </>
                      ) : (
                        <></>
                      )}
                    </div>
                  ))}
                </div>
              </PopupTable>
            </Popup>
          )}
          {finalPopup && (
            <Popup>
              <PopupTable>
                <div className="title-area">
                  <div className="title">
                    <h3>{name()}</h3>
                  </div>
                  <div className="close" onClick={closePopupHandler}>
                    <div className="cross1"></div>
                    <div className="cross2"></div>
                  </div>
                </div>
                <div className="tr title">
                  <div className="th">{t("fishes")}</div>
                  <div className="th">{t("minBet")}</div>
                  <div className="th">{t("multiplier")}</div>
                  <div className="th">{t("kills")}</div>
                  <div className="th">{t("payout")}</div>
                </div>
                <div className="tbody">
                  {popupList
                    .get("BossKill")
                    ?.sort(
                      (a, b) => a.get("FishSpecies") - b.get("FishSpecies")
                    )
                    .map((item, idx) => (
                      <div className="tr" key={idx}>
                        <div className="td">
                          <img
                            className="fish-img"
                            src={`
${imgsdomain}/order-detail/common/GO02/fish/${item.get("FishSpecies")}.png`}
                          />
                        </div>
                        <div className="td">
                          {(item.get("BetMultiple") * (denom * 100)) / 100}
                        </div>
                        <div className="td">{item.get("Multiplier")}</div>
                        <div className="td">{item.get("Kills")}</div>
                        <div className="td">
                          {(item.get("Win") * (denom * 100)) / 100}
                        </div>
                      </div>
                    ))}
                  <div className="tr">
                    <div className="td">
                      <img
                        className="fish-img"
                        src={`
${imgsdomain}/order-detail/common/GO02/fish/${popupList.get(
                          "FishSpecies"
                        )}.png`}
                      />
                    </div>
                    <div className="td">
                      {(popupList.get("BetMultiple") * (denom * 100)) / 100}
                    </div>
                    <div className="td">{popupList.get("Multiplier")}</div>
                    <div className="td">{popupList.get("Kills")}</div>
                    <div className="td">
                      {(popupList.get("BetMultiple") *
                        denom *
                        popupList.get("Multiplier") *
                        100) /
                        100}
                    </div>
                  </div>
                </div>
              </PopupTable>
            </Popup>
          )}
        </>
      ) : (
        isOpen && (
          <>
            <MobileTable>
              {bossList.map((item, idx) => (
                <div key={idx}>
                  <div className="serial">
                    #{idx + 1}
                    {item.get("FishSpecies") == 27 ||
                    item.get("FishSpecies") == 29
                      ? ` - ${t("lastKill")}`
                      : ` - ${t("processKill")}`}
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
                    <div
                      className="more"
                      onClick={() => {
                        if (
                          antesValue !== "all" &&
                          (item.get("FishSpecies") == 27 ||
                            item.get("FishSpecies") == 29)
                        ) {
                          finalPopupHandler(item);
                        } else {
                          popupHandler(item.get("FishSpecies"));
                        }
                      }}
                    >
                      {t("more")}
                    </div>
                  </div>
                </div>
              ))}
            </MobileTable>
            {isPopup && (
              <Popup>
                <MobilePopupTable>
                  <div className="close" onClick={closePopupHandler}>
                    <div className="cross1"></div>
                    <div className="cross2"></div>
                  </div>
                  <div className="title-area">
                    <div className="title">
                      <h3>{name()}</h3>
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
                        {item.get("FishSpecies") !== 27 &&
                          item.get("FishSpecies") !== 29 && (
                            <>
                              <div className="tr">
                                <h5>{t("punchKills")}</h5>
                                <p>{item.get("ThumperKill")}</p>
                              </div>
                              <div className="tr">
                                <h5>{t("multiplier")}</h5>
                                <p>{item.get("Multiplier")}</p>
                              </div>
                            </>
                          )}
                        <div className="tr">
                          <h5>{t("payout")}</h5>
                          <p>{(item.get("Win") * (denom * 100)) / 100}</p>
                          {(item.get("FishSpecies") == 27 ||
                            item.get("FishSpecies") == 29) && (
                            <div
                              className="more"
                              onClick={() => {
                                finalPopupHandler(item);
                              }}
                            >
                              {t("more")}
                            </div>
                          )}
                        </div>
                      </div>
                    ))}
                  </div>
                </MobilePopupTable>
              </Popup>
            )}
            {finalPopup && (
              <Popup>
                <MobilePopupTable>
                  <div className="close" onClick={closePopupHandler}>
                    <div className="cross1"></div>
                    <div className="cross2"></div>
                  </div>
                  <div className="title-area">
                    <div className="title">
                      <h3>{name()}</h3>
                    </div>
                  </div>
                  <div className="tbody">
                    {popupList.get("BossKill").map((item, idx) => (
                      <div className="popup-item" key={idx}>
                        <div className="tr img">
                          <img
                            className="fish-img"
                            src={`
${imgsdomain}/order-detail/common/GO02/fish/${item.get("FishSpecies")}.png`}
                          />
                        </div>
                        <div className="tr">
                          <h5>{t("minBet")}</h5>
                          <p>
                            {(item.get("BetMultiple") * (denom * 100)) / 100}
                          </p>
                        </div>
                        <div className="tr">
                          <h5>{t("multiplier")}</h5>
                          <p>{item.get("Multiplier")}</p>
                        </div>
                        <div className="tr">
                          <h5>{t("kills")}</h5>
                          <p>{item.get("Kills")}</p>
                        </div>
                        <div className="tr">
                          <h5>{t("payout")}</h5>
                          <p>{(item.get("Win") * (denom * 100)) / 100}</p>
                        </div>
                      </div>
                    ))}
                    <div className="popup-item">
                      <div className="tr img">
                        <img
                          className="fish-img"
                          src={`
${imgsdomain}/order-detail/common/GO02/fish/${popupList.get(
                            "FishSpecies"
                          )}.png`}
                        />
                      </div>
                      <div className="tr">
                        <h5>{t("minBet")}</h5>
                        <p>
                          {(popupList.get("BetMultiple") * (denom * 100)) / 100}
                        </p>
                      </div>
                      <div className="tr">
                        <h5>{t("multiplier")}</h5>
                        <p>{popupList.get("Multiplier")}</p>
                      </div>
                      <div className="tr">
                        <h5>{t("kills")}</h5>
                        <p>{popupList.get("Kills")}</p>
                      </div>
                      <div className="tr">
                        <h5>{t("payout")}</h5>
                        <p>
                          {(popupList.get("BetMultiple") *
                            denom *
                            popupList.get("Multiplier") *
                            100) /
                            100}
                        </p>
                      </div>
                    </div>
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
      &.serial {
        color: #3dabff;
        overflow: overlay;
        white-space: nowrap;
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
    & img {
      width: 100%;
      height: 100%;
      object-fit: contain;
    }
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
export default BossTable;
