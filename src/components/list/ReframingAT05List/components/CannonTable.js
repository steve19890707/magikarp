import React, { useState } from "react";
import styled from "styled-components";
import { MOBILE_BREAKPOINT_WIDTH } from "cssMix";
import { List } from "immutable";
import numeral from "numeral";
import CannonMobile from "./CannonMobile";
import { useSelector } from "react-redux";

const CannonTable = ({
  antesValue,
  list = List(),
  denom,
  size,
  t,
  setIsBgFixed,
  title,
}) => {
  const imgsdomain = useSelector((state) => state.props.imgsdomain);
  const [isPopup, setIsPopup] = useState(false);
  const [isSecondPopup, setIsSecondPopup] = useState(false);
  const [popupCannonNumber, setPopupCannonNumber] = useState("1");
  const [cannonThirdKey, setCannonThirdKey] = useState(0);
  const decimalCheck = (n) => {
    let result = n - Math.floor(n) !== 0;
    if (result) return true;
    else return false;
  };
  const popupHandler = (num = "1") => {
    setPopupCannonNumber(String(num));
    setIsPopup(true);
    setIsBgFixed(true);
  };
  const popupSecondHandler = (thirdKey = 0) => {
    setCannonThirdKey(thirdKey);
    setIsPopup(false);
    setIsSecondPopup(true);
    setIsBgFixed(true);
  };
  const fetachFortKind = (type = "1") => {
    switch (String(type)) {
      case "2":
        return "thunderFort";
      case "3":
        return "beamFort";
      case "1":
      default:
        return "missileFort";
    }
  };
  // list datas
  const getListDatas = (betsList = List()) => {
    let totalCount = 0;
    let totalWin = 0;
    betsList.forEach((element) => {
      const multiplys = Object.keys(element[1].toJS());
      for (let i = 0; i < multiplys.length; i++) {
        totalCount = totalCount += Number(
          element[1].getIn([multiplys[i], "Count"])
        );
        totalWin = totalWin += Number(element[1].getIn([multiplys[i], "Win"]));
      }
    });
    return { totalCount, totalWin };
  };
  const getFloorLayList = (floor = "second", thirdKey = 0) => {
    const filterCannonType = list.filter(
      (v) => String(v[0]) === popupCannonNumber
    );
    const secondFloorList = filterCannonType.getIn([0, 1, "Bets"]);
    const thirdFloorList = secondFloorList.get(
      Object.keys(secondFloorList.toJS())[thirdKey]
    );
    switch (floor) {
      case "third":
        return List(thirdFloorList);
      case "second":
      default:
        return List(secondFloorList);
    }
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
                <div className="th">{t("advanceFort")}</div>
                <div className="th">{t("triggerTimes")}</div>
                <div className="th">{t("payout")}</div>
                <div className="th">{t("more")}</div>
              </div>
              {list.map((v) => {
                const { totalCount, totalWin } = getListDatas(
                  List(v[1].get("Bets"))
                );
                return (
                  <div className="tr" key={v[0]}>
                    <div className="td">
                      <img
                        className="fish-img"
                        src={`${imgsdomain}/order-detail/common/AT05_v2/cannon/${v[0]}.png`}
                      />
                    </div>
                    <div className="td">
                      <p>{totalCount}</p>
                    </div>
                    <div className="td">
                      <p>
                        {numeral(Number(totalWin) * Number(denom)).format(
                          decimalCheck(Number(totalWin) * Number(denom))
                            ? "0.1"
                            : "0"
                        )}
                      </p>
                    </div>
                    <div className="td more" onClick={() => popupHandler(v[0])}>
                      <div className="dot"></div>
                      <div className="dot"></div>
                      <div className="dot"></div>
                    </div>
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
                    <h3>{t(fetachFortKind(popupCannonNumber))}</h3>
                    <img
                      className="fish-img"
                      src={`${imgsdomain}/order-detail/common/AT05_v2/cannon/${popupCannonNumber}.png`}
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
                  <div className="th">
                    {t(antesValue === "all" ? "minBet" : "multiplier")}
                  </div>
                  <div className="th">{t("triggerTimes")}</div>
                  <div className="th">{t("payout")}</div>
                  {antesValue === "all" && (
                    <div className="th">{t("more")}</div>
                  )}
                </div>
                <div className="tbody">
                  {antesValue === "all" ? (
                    <>
                      {getFloorLayList("second").map((val, key) => {
                        const { totalCount, totalWin } = getListDatas(
                          List([getFloorLayList("second").get(key)])
                        );
                        return (
                          <div className="tr" key={val[0]}>
                            <div className="td">
                              {numeral(Number(val[0]) * Number(denom)).format(
                                decimalCheck(Number(val[0]) * Number(denom))
                                  ? "0.1"
                                  : "0"
                              )}
                            </div>
                            <div className="td">{totalCount}</div>
                            <div className="td">
                              {numeral(Number(totalWin) * Number(denom)).format(
                                decimalCheck(Number(totalWin) * Number(denom))
                                  ? "0.1"
                                  : "0"
                              )}
                            </div>
                            <div
                              className="td more"
                              onClick={() => popupSecondHandler(key)}
                            >
                              <div className="dot"></div>
                              <div className="dot"></div>
                              <div className="dot"></div>
                            </div>
                          </div>
                        );
                      })}
                    </>
                  ) : (
                    <>
                      {getFloorLayList("third").map((val) => {
                        return (
                          <div className="tr" key={val[0]}>
                            <div className="td">{val[0]}</div>
                            <div className="td">{val[1].getIn(["Count"])}</div>
                            <div className="td">
                              {numeral(
                                Number(val[1].getIn(["Win"])) * Number(denom)
                              ).format(
                                decimalCheck(
                                  Number(val[1].getIn(["Win"])) * Number(denom)
                                )
                                  ? "0.1"
                                  : "0"
                              )}
                            </div>
                          </div>
                        );
                      })}
                    </>
                  )}
                </div>
              </PopupTable>
            </Popup>
          )}
          {isSecondPopup && (
            <Popup>
              <PopupTable>
                <div className="title-area">
                  <div className="title">
                    <h3>{t(fetachFortKind(popupCannonNumber))}</h3>
                    <img
                      className="fish-img"
                      src={`${imgsdomain}/order-detail/common/AT05_v2/cannon/${popupCannonNumber}.png`}
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
                  <div className="th">{t("triggerTimes")}</div>
                  <div className="th">{t("payout")}</div>
                </div>
                <div className="tbody">
                  {getFloorLayList("third", cannonThirdKey).map((val) => {
                    return (
                      <div className="tr" key={val[0]}>
                        <div className="td">{val[0]}</div>
                        <div className="td">{val[1].getIn(["Count"])}</div>
                        <div className="td">
                          {numeral(
                            Number(val[1].getIn(["Win"])) * Number(denom)
                          ).format(
                            decimalCheck(
                              Number(val[1].getIn(["Win"])) * Number(denom)
                            )
                              ? "0.1"
                              : "0"
                          )}
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
        <Area>
          <div className="expand">
            <p className="title">{t(title)}</p>
          </div>
          {list.map((item, idx) => {
            const { totalCount, totalWin } = getListDatas(
              List(item[1].get("Bets"))
            );
            return (
              <CannonMobile
                totalCount={totalCount}
                totalWin={totalWin}
                key={idx}
                cannon={item}
                popupCannonNumber={popupCannonNumber}
                cannonThirdKey={cannonThirdKey}
                antesValue={antesValue}
                denom={denom}
                setIsBgFixed={setIsBgFixed}
                t={t}
                isPopup={isPopup}
                setIsPopup={setIsPopup}
                isSecondPopup={isSecondPopup}
                setIsSecondPopup={setIsSecondPopup}
                popupHandler={popupHandler}
                popupSecondHandler={popupSecondHandler}
                fetachFortKind={fetachFortKind}
                getListDatas={getListDatas}
                getFloorLayList={getFloorLayList}
                decimalCheck={decimalCheck}
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
export default CannonTable;
