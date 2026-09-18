import React, { useState } from "react";
import styled from "styled-components";
import { List } from "immutable";
import numeral from "numeral";
import cx from "classnames";
import { useSelector } from "react-redux";

const NormalMobile = ({
  totalCount,
  totalWin,
  cannon,
  popupCannonNumber,
  cannonThirdKey,
  antesValue,
  denom,
  setIsBgFixed,
  t,
  isPopup,
  setIsPopup,
  isSecondPopup,
  setIsSecondPopup,
  popupHandler,
  popupSecondHandler,
  fetachFortKind,
  getListDatas,
  getFloorLayList,
  decimalCheck,
}) => {
  const imgsdomain = useSelector((state) => state.props.imgsdomain);
  const [isOpen, setIsOpen] = useState(false);
  const toggleHandler = () => {
    setIsOpen(!isOpen);
  };
  return (
    <>
      <NormalMobileWrapper>
        <div className="img">
          <img
            className="fish-img"
            src={`${imgsdomain}/order-detail/common/AT05_v2/cannon/${cannon[0]}.png`}
          />
        </div>
        <div className="toggle-btn" onClick={toggleHandler}>
          <div className={cx("cross1", { open: isOpen })}></div>
          <div className={cx("cross2", { open: isOpen })}></div>
        </div>
      </NormalMobileWrapper>
      {isOpen && (
        <Table>
          <div className="tr">
            <h5>{t("triggerTimes")}</h5>
            <p>{totalCount}</p>
          </div>
          <div className="tr">
            <h5>{t("payout")}</h5>
            <p>
              {numeral(Number(totalWin) * Number(denom)).format(
                decimalCheck(Number(totalWin) * Number(denom)) ? "0.1" : "0"
              )}
            </p>
            <div
              className="more"
              onClick={() =>
                antesValue === "all"
                  ? popupHandler(cannon[0])
                  : popupSecondHandler()
              }
            >
              {t("more")}
            </div>
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
                <h3>{t(fetachFortKind(popupCannonNumber))}</h3>
                <img
                  className="fish-img"
                  src={`${imgsdomain}/order-detail/common/AT05_v2/cannon/${cannon[0]}.png`}
                />
              </div>
            </div>
            <div className="tbody">
              {getFloorLayList("second").map((val, key) => {
                const { totalCount: secondTC, totalWin: secondTW } =
                  getListDatas(List([getFloorLayList("second").get(key)]));
                return (
                  <div className="popup-item" key={val[0]}>
                    <div className="tr">
                      <h5>{t("minBet")}</h5>
                      <p>
                        {numeral(Number(val[0]) * Number(denom)).format(
                          decimalCheck(Number(val[0]) * Number(denom))
                            ? "0.1"
                            : "0"
                        )}
                      </p>
                    </div>
                    <div className="tr">
                      <h5>{t("triggerTimes")}</h5>
                      <p>{secondTC}</p>
                    </div>
                    <div className="tr">
                      <h5>{t("payout")}</h5>
                      <p>
                        {numeral(Number(secondTW) * Number(denom)).format(
                          decimalCheck(Number(secondTW) * Number(denom))
                            ? "0.1"
                            : "0"
                        )}
                      </p>
                      {antesValue === "all" && (
                        <div
                          className="more"
                          onClick={() => popupSecondHandler(key)}
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
                <h3>{t(fetachFortKind(popupCannonNumber))}</h3>
                <img
                  className="fish-img"
                  src={`${imgsdomain}/order-detail/common/AT05_v2/cannon/${cannon[0]}.png`}
                />
              </div>
            </div>
            <div className="tbody">
              {getFloorLayList("third", cannonThirdKey).map((val) => {
                return (
                  <div className="popup-item" key={val[0]}>
                    <div className="tr">
                      <h5>{t("multiplier")}</h5>
                      <p>{val[0]}</p>
                    </div>
                    <div className="tr">
                      <h5>{t("triggerTimes")}</h5>
                      <p>{val[1].getIn(["Count"])}</p>
                    </div>
                    <div className="tr">
                      <h5>{t("payout")}</h5>
                      <p>
                        {numeral(
                          Number(val[1].getIn(["Win"])) * Number(denom)
                        ).format(
                          decimalCheck(
                            Number(val[1].getIn(["Win"])) * Number(denom)
                          )
                            ? "0.1"
                            : "0"
                        )}
                      </p>
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
