import React from "react";
import styled from "styled-components";
import { useTranslation } from "react-i18next";
import Area from "components/areaStyled";
import { useSelector } from "react-redux";

export default ({ data, gameId }) => {
  const { t } = useTranslation();
  const imgsdomain = useSelector((state) => state.props.imgsdomain);
  return (
    <Buffs>
      <div className="skill-column">
        <img
          alt="skill"
          src={`${imgsdomain}/order-detail/common/${gameId}/${data.getIn([
            "Detail",
            "winner",
          ])}.png`}
        />
      </div>
      <div className="skill-column">
        <div>
          <p>
            {t("minBet")}：
            {(data.getIn(["Detail", "ground_ante"]) * 1).toFixed(1)}
          </p>
          <p>
            {t("totalBet")}：{data.getIn(["Detail", "bet_amount"])}
          </p>
          <p>
            {t("totalPayout")}：{data.getIn(["Detail", "bet_result"])}
          </p>
        </div>
      </div>
    </Buffs>
  );
};

const Buffs = styled(Area)`
  display: flex;
  margin: 10px 0 20px;
  & .skill-column {
    display: flex;
    flex-direction: column;
    flex: 1;
    border: 1px solid #373737;
    align-items: center;
    justify-content: center;
    padding: 10px;
    & img {
      margin-bottom: 10px;
    }
  }
`;
