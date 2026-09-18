import React from "react";
import styled from "styled-components";
import { List } from "immutable";
import { useTranslation } from "react-i18next";
import { gameDetail } from "config/";
import { getInitLang } from "Utils";
import media from "cssMix";
import Area from "components/areaStyled";
import { useSelector } from "react-redux";

export default ({ data, gameId }) => {
  const { t } = useTranslation();
  const imgsdomain = useSelector((state) => state.props.imgsdomain);
  const lang = getInitLang();
  return (
    <>
      {data.getIn(["Detail", "Items"]) && (
        <Items>
          {List(data.getIn(["Detail", "Items"])).map((item, idx) => (
            <div key={idx} className="skill-column">
              <p className="item-pic">
                <img
                  alt="skill"
                  src={`${imgsdomain}/order-detail/common/${gameId}/props/${item[0]}.png`}
                />
                <span>
                  {gameDetail.getIn([gameId, "items", lang, item[0]])}
                </span>
              </p>
              <p>
                {t("gain")} : {item[1].get("GetCount")}
              </p>
              <p>
                {t("used")} : {item[1].get("UseCount")}
              </p>
            </div>
          ))}
        </Items>
      )}
    </>
  );
};

const Items = styled(Area)`
  display: flex;
  margin: 10px 0 20px;
  flex-wrap: wrap;
  & .skill-column {
    display: flex;
    flex-direction: column;
    flex: 1;
    border: 1px solid #373737;
    align-items: center;
    justify-content: center;
    padding: 10px;
    ${media.tablet`
      width:calc(100%/3);
    `}
  }
  & .item-pic {
    display: flex;
    align-items: center;
    margin-bottom: 10px;
    & img {
      width: 60px;
      padding-right: 10px;
    }
    ${media.mobile`
      flex-direction:column-reverse;
    `}
  }
`;
