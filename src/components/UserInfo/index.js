import React, { useState } from "react";
import { gameDetail } from "config/";
import { getInitLang } from "Utils";
import { useTranslation } from "react-i18next";
import { fromJS, List, Map } from "immutable";
import styled from "styled-components";
import media from "cssMix";
import Area from "components/areaStyled";
import cx from "classnames";
import numeral from "numeral";
import { useSelector } from "react-redux";

const lang = getInitLang();
const pathName = window.location.pathname.split("/");
export default ({ data, list, gameId }) => {
  const imgsdomain = useSelector((state) => state.props.imgsdomain);
  const dataType = data.get("Type") || 1;
  const redPackets = data.getIn(["Wager", "Proof"]);
  const parseRedPackets = redPackets ? fromJS(JSON.parse(redPackets)) : Map({});
  const checkRedPackets = () => {
    let amount = 0;
    const list = parseRedPackets.get("RedPackets") || List();
    const denom = data.getIn(["Wager", "PlayerDenom"]) || "0.1";
    for (let i = 0; i < list.size; i++) {
      amount += Number(list.getIn([i, "Amount"]) * Number(denom));
    }
    return numeral(amount).format("0.00");
  };
  const { t } = useTranslation();
  const [isToast, setIsToast] = useState(false);
  // 特例切片顯示
  const isGCOW = (currency = "") => {
    if (currency === "GCOW(0.001)") {
      return currency.split("(")[0];
    } else return currency;
  };
  const showToast = () => {
    setIsToast(true);
    setTimeout(() => {
      setIsToast(false);
    }, 2000);
  };
  const copyText = () => {
    const text = data.get("RoundCode") || data.getIn(["Wager", "SerialNumber"]);
    navigator.clipboard.writeText(text);
    showToast();
  };
  return (
    <>
      {gameId === "AT01" ||
      gameId === "GO05" ||
      gameId === "GO6902" ||
      (gameId === "AT05" && dataType === 2) ? (
        <UserInfoType2>
          <p className="title od-title">{t("orderDetailTitle")}</p>
          <p className={cx("toast", { open: isToast })}>{t("copy")}!</p>
          <p className="title">
            <div>
              <span>{t("gameName")}</span>
              <span> : </span>
              <span>
                {gameDetail.getIn([data.get("GameCode"), "title", lang]) ||
                  gameDetail.getIn([
                    data.getIn(["Wager", "GameCode"]),
                    "title",
                    lang,
                  ])}
              </span>
            </div>
            {parseRedPackets.get("RedPackets") && (
              <div className="redpackets">
                <img
                  alt=""
                  src={`${imgsdomain}/order-detail/common/AT01_v2/redPackets.png`}
                />
                <span>
                  {t("redpackets")}：{checkRedPackets()}
                </span>
              </div>
            )}
          </p>
          <div className="detail-caption">
            <div className="column">
              <div className="grid">
                <span>{t("orderNo")}</span>
                <span className="blue">
                  {data.get("RoundCode") ||
                    data.getIn(["Wager", "SerialNumber"])}
                </span>
                {(data.get("RoundCode") ||
                  data.getIn(["Wager", "SerialNumber"])) && (
                  <img
                    src={`${imgsdomain}/order-detail/copy_icon.png`}
                    onClick={copyText}
                  ></img>
                )}
              </div>
              <div className="grid">
                <span>{t("playerId")}</span>
                <span className="blue">
                  {data.get("UserName") || data.get("Account")}
                </span>
              </div>
            </div>
            <div className="column">
              <div className="grid">
                <span>{t("currency")}</span>
                <span className="blue">
                  {isGCOW(data.get("Currency")) ||
                    isGCOW(data.getIn(["Wager", "Currency"]))}
                </span>
              </div>
              <div className="grid">
                <span>{t("totalPayout")} </span>
                <span className="blue">
                  {data.get("Pay") || data.getIn(["Wager", "TotalWin"])}
                </span>
              </div>
            </div>
            <div className="column">
              <div className="grid">
                <span>{t("startTime")}</span>
                <span className="blue">
                  {data.get("BeginTime") || data.getIn(["Wager", "StartTime"])}{" "}
                  (UTC-4)
                </span>
              </div>
              <div className="grid">
                <span>{t("endTime")}</span>
                <span className="blue">
                  {data.get("EndTime") || data.getIn(["Wager", "EndTime"])}{" "}
                  (UTC-4)
                </span>
              </div>
            </div>
            <div className="column">
              <div className="grid">
                <span>{t("establishedTime")}</span>
                <span className="blue">
                  {data.get("OrderTime") || data.getIn(["Wager", "OrderTime"])}{" "}
                  (UTC-4)
                </span>
              </div>
              {pathName[1] === "odgo" && (
                <div className="grid">
                  <span>{t("proxyId")}</span>
                  <span className="blue">
                    {data.get("AgentName") || data.get("PAccount")}
                  </span>
                </div>
              )}
            </div>
          </div>
        </UserInfoType2>
      ) : (
        <UserInfo>
          <p className={cx("toast", { open: isToast })}>{t("copy")}!</p>
          <p className="title">
            {t("gameName")} :{" "}
            <span className="blue">
              {gameId === "AB3"
                ? gameDetail.getIn(["AB3", "old", "title", lang])
                : gameDetail.getIn([data.get("GameCode"), "title", lang]) ||
                  gameDetail.getIn([
                    data.getIn(["Wager", "GameCode"]),
                    "title",
                    lang,
                  ])}
            </span>
          </p>
          <div className="orderNo">
            <p className="title">
              {t("orderNo")} :{" "}
              <span className="blue">
                {data.get("RoundCode") || data.getIn(["Wager", "SerialNumber"])}
              </span>
            </p>
            {(data.get("RoundCode") ||
              data.getIn(["Wager", "SerialNumber"])) && (
              <img
                src={`${imgsdomain}/order-detail/copy_icon.png`}
                onClick={copyText}
              ></img>
            )}
          </div>
          <ul>
            {pathName[1] === "odgo" && (
              <li>
                {t("proxyId")} :{" "}
                <span>{data.get("AgentName") || data.get("PAccount")}</span>
              </li>
            )}
            <li>
              {t("playerId")} :{" "}
              <span>{data.get("UserName") || data.get("Account")}</span>
            </li>
            <li>
              {t("currency")} :{" "}
              <span>
                {isGCOW(data.get("Currency")) ||
                  isGCOW(data.getIn(["Wager", "Currency"]))}
              </span>
            </li>
            {data.get("Balance") && (
              <li>
                {t("credit")} : <span>{data.get("Balance")}</span>
              </li>
            )}
          </ul>
        </UserInfo>
      )}
    </>
  );
};

const UserInfo = styled(Area)`
  .toast {
    position: fixed;
    display: flex;
    align-items: center;
    justify-content: center;
    left: 50%;
    transform: translate(-50%, -100%);
    border-radius: 5px;
    padding: 10px 50px;
    background-color: #3dabff;
    transition: all 0.5s ease;
    opacity: 0;
    z-index: 9999;
    box-shadow: 0px 10px 20px rgba(0, 0, 0, 0.5);
    &.open {
      transform: translate(-50%, 0%);
      opacity: 1;
    }
  }
  .orderNo {
    display: flex;
    align-items: center;
    img {
      margin-left: 10px;
      box-sizing: border-box;
      height: 28px;
      padding: 3px;
      background-color: #3dabff;
      border-radius: 4px;
      cursor: pointer;
    }
  }
  & ul {
    width: 100%;
    background-color: #373737;
    color: #8e8e8e;
    padding: 10px;
    box-sizing: border-box;
    & li {
      font-size: 15px;
      display: inline-block;
      list-style: none;
      border-left: 1px solid rgba(255, 255, 255, 0.2);
      padding: 5px 15px;
      ${media.mobile`
      border-left:none;
      `}
      & span {
        color: #fff;
      }
      &:first-child {
        border-left: none;
      }
    }
  }
`;

const UserInfoType2 = styled(Area)`
  .toast {
    position: fixed;
    display: flex;
    align-items: center;
    justify-content: center;
    left: 50%;
    transform: translate(-50%, -100%);
    border-radius: 5px;
    padding: 10px 50px;
    background-color: #3dabff;
    transition: all 0.5s ease;
    opacity: 0;
    z-index: 9999;
    box-shadow: 0px 10px 20px rgba(0, 0, 0, 0.5);
    &.open {
      transform: translate(-50%, 0%);
      opacity: 1;
    }
  }
  .od-title {
    margin-bottom: 2em;
  }
  .detail-caption {
    margin-top: 1em;
  }
  .column {
    width: 100%;
    background-color: #373737;
    color: #8e8e8e;
    padding: 15px;
    box-sizing: border-box;
    margin-bottom: 0;
    display: flex;
    align-items: center;
    flex-wrap: wrap;
    border-top: 1px solid rgba(255, 255, 255, 0.2);
    &:first-child {
      border-top: 0;
    }
    ${media.mobile`
      border-top:0;
      padding: 0;
      &:first-child .grid:first-child{
        border-top: 0;
      }
    `}
  }
  .grid {
    font-size: 15px;
    display: inline-block;
    list-style: none;
    box-sizing: border-box;
    width: 50%;
    img {
      margin-left: 10px;
      box-sizing: border-box;
      vertical-align: middle;
      height: 22px;
      padding: 3px 5px;
      background-color: #3dabff;
      border-radius: 4px;
      cursor: pointer;
    }
    .blue {
      color: #3cabff;
      padding-left: 20px;
    }
    ${media.mobile`
      width: 100%;
      border-top: 1px solid rgba(255, 255, 255, 0.2);
      padding: 15px;
      display: flex;
      align-items:center;
      span {
        &:first-child {
          min-width:65px;
        }
      }
    `}
  }
  .title {
    display: flex;
    align-items: center;
    justify-content: space-between;
    ${media.mobile`
      display: block;
    `}
  }
  .redpackets {
    display: flex;
    align-items: center;
    img {
      width: 40px;
      height: 40px;
    }
    span {
      margin-left: 5px;
      color: #dcc38a;
    }
    ${media.mobile`
      margin-top:10px;
    `}
  }
`;
