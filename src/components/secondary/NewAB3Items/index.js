import React from "react";
import styled from "styled-components";
import { useTranslation } from "react-i18next";
import { gameDetail } from "config/";
import { getInitLang } from "Utils";
import media from "cssMix";
import Area from "components/areaStyled";
import { useSelector } from "react-redux";

export default ({ data, gameId, list }) => {
  const { t } = useTranslation();
  const imgsdomain = useSelector((state) => state.props.imgsdomain);
  const lang = getInitLang();
  const skillCard = list.get("SkillCards");
  const listArray = ["1", "2", "3", "4"];
  return (
    <Items>
      {listArray.map((item, idx) => (
        <div key={idx} className="skill-column">
          <div className="item-pic">
            <img
              alt="skill"
              src={`${imgsdomain}/order-detail/common/AB3_new/props/${item}.png`}
            />
          </div>
          <div className="card-info">
            <p className="card-name">
              {gameDetail.getIn(["AB3", "new", "items", lang, item])}
            </p>
            <ul>
              <li>
                {t("gain")} : {skillCard.getIn([item, "AddCount"]) || 0}
              </li>
              <li>
                {t("used")} : {skillCard.getIn([item, "UseCount"]) || 0}
              </li>
            </ul>
          </div>
        </div>
      ))}
    </Items>
  );
};

const Items = styled(Area)`
  display: flex;
  margin: 10px 0 20px;
  flex-wrap: wrap;
  background: #373737;
  & .cautions {
    display: flex;
    width: 100%;
    height: 50px;
    border: 1px solid #474747;
    align-items: center;
    justify-content: center;
    & > span {
      font-size: 13px;
      color: #eb5f74;
    }
  }
  & .skill-column {
    box-sizing: border-box;
    display: flex;
    flex-direction: row;
    width: calc(100% / 4);
    border: 1px solid #474747;
    align-items: center;
    justify-content: center;
    padding: 10px;

    ${media.tablet`
      width:calc(100%/2);
    `}
    ${media.mobile`
      width:100%;
    `}
  }
  & .item-pic {
    width: 40%;
    display: flex;
    justify-content: center;
    align-items: center;
    & img {
      width: 100px;
      ${media.mobile`
      width:80px;
    `}
    }
  }
  & .card-info {
    width: 60%;
    & .card-name {
      font-size: 15px;
      margin-bottom: 15px;
    }
    ul {
      padding-inline-start: 20px;
    }
    ul > li {
      font-size: 13px;
    }
  }
`;
