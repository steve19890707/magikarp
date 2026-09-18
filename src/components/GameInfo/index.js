import React, { useState, useEffect } from "react";
import { gameDetail } from "config/";
import { useTranslation } from "react-i18next";
import styled from "styled-components";
import media from "cssMix";
import { getInitLang } from "Utils";
import Area from "components/areaStyled";

export default ({ data, list, gameId }) => {
  const [groundType, setGroundType] = useState("");
  const [dataType, setDataType] = useState("");
  const { t } = useTranslation();
  const lang = getInitLang();
  useEffect(() => {
    if (data.size) {
      data.getIn(["Detail", "GroundType"]) &&
        setGroundType(data.getIn(["Detail", "GroundType"]).toString());
      setDataType(data.get("Type") || 1);
    }
  }, [data]);
  useEffect(() => {
    if (list.size) {
      list.get("RoomType") && setGroundType(list.get("RoomType").toString());
      list.get("GroundType") &&
        setGroundType(list.get("GroundType").toString());
    }
  }, [list]);

  return (
    <>
      {gameId === "AT01" ||
      gameId === "GO05" ||
      gameId === "GO6902" ||
      (gameId === "AT05" && dataType === 2) ? (
        <GameInfoType2>
          <p className="title">
            {gameDetail.getIn([
              data.get("GameCode"),
              "ground_type",
              lang,
              groundType,
            ]) ||
              gameDetail.getIn([
                data.getIn(["Wager", "GameCode"]),
                "ground_type",
                lang,
                groundType,
              ])}
          </p>
          <ul>
            <li>
              <span>{t("totalBet")}</span>
              <span className="blue">
                {data.get("Pay") || data.getIn(["Wager", "TotalBet"])}
              </span>
            </li>
            <li>
              <span>{t("totalPayout")}</span>
              <span className="blue">
                {data.get("Pay") || data.getIn(["Wager", "TotalWin"])}
              </span>
            </li>
          </ul>
        </GameInfoType2>
      ) : (
        <GameInfo>
          <p className="title">
            {gameId === "AB3"
              ? list.size
                ? gameDetail.getIn([
                    "AB3",
                    "new",
                    "ground_type",
                    lang,
                    groundType,
                  ])
                : gameDetail.getIn([
                    "AB3",
                    "old",
                    "ground_type",
                    lang,
                    groundType,
                  ])
              : gameDetail.getIn([
                  data.get("GameCode"),
                  "ground_type",
                  lang,
                  groundType,
                ]) ||
                gameDetail.getIn([
                  data.getIn(["Wager", "GameCode"]),
                  "ground_type",
                  lang,
                  groundType,
                ])}
          </p>
          <p className="title">
            {t("totalBet")}{" "}
            <span className="pink">
              {data.get("Bet") || data.getIn(["Wager", "TotalBet"])}
            </span>{" "}
            {t("totalPayout")}{" "}
            <span className="blue">
              {data.get("Pay") || data.getIn(["Wager", "TotalWin"])}
            </span>
          </p>
          <ul>
            <li>
              {t("startTime")} :{" "}
              {data.get("BeginTime") || data.getIn(["Wager", "StartTime"])}{" "}
              (UTC-4)
            </li>
            <li>
              {t("endTime")} :{" "}
              {data.get("EndTime") || data.getIn(["Wager", "EndTime"])} (UTC-4)
            </li>
            <li>
              {t("establishedTime")} :{" "}
              {data.get("OrderTime") || data.getIn(["Wager", "OrderTime"])}{" "}
              (UTC-4)
            </li>
          </ul>
        </GameInfo>
      )}
    </>
  );
};

const GameInfo = styled(Area)`
  & ul {
    margin: 0;
    padding: 0;
    color: #8e8e8e;
    font-size: 14px;
    display: block;
    overflow: hidden;
    width: 100%;
    margin-top: 5px;
    & li {
      font-size: 15px;
      display: inline-block;
      list-style: none;
      border-left: 1px solid rgba(255, 255, 255, 0.2);
      ${media.mobile`
      border-left:none;
      padding-left: 0;

  `}
      padding: 0 10px;
      &:first-child {
        border-left: none;
        padding-left: 0;
      }
    }
  }
`;

const GameInfoType2 = styled(Area)`
  margin-bottom: 0;
  & ul {
    width: 100%;
    background-color: #373737;
    color: #8e8e8e;
    padding: 15px;
    box-sizing: border-box;
    margin-bottom: 0;
    display: flex;
    align-items: center;
    flex-wrap: wrap;
    & li {
      font-size: 15px;
      display: inline-block;
      list-style: none;
      box-sizing: border-box;
      width: 50%;
      .blue {
        padding-left: 20px;
      }
      ${media.mobile`
        width: 100%;
        border-bottom: 1px solid rgba(255, 255, 255, 0.2);
        padding: 15px 0;
        &:first-child{
          padding-top: 0;
        }
        &:last-child {
          border-bottom: 0;
          padding-bottom: 0;
        }
        span {
          display: inline-block;
          &:first-child {
            min-width:65px;
          }
        }
      `}
    }
  }
`;
