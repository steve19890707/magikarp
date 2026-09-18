import React from "react";
import styled from "styled-components";
import { List } from "immutable";
import { useTranslation } from "react-i18next";
import Area from "components/areaStyled";
import { useSelector } from "react-redux";

export default ({ data, gameId }) => {
  const { t } = useTranslation();
  const imgsdomain = useSelector((state) => state.props.imgsdomain);
  return (
    <>
      {data.getIn(["Detail", "Buffs"]) && (
        <Buffs>
          {List(data.getIn(["Detail", "Buffs"])).map((item, idx) => (
            <div key={idx} className="skill-column">
              <img
                alt="skill"
                src={`${imgsdomain}/order-detail/common/${gameId}/props/${item[0]}.png`}
              />
              <p>
                {t("gain")} : {item[1]}
              </p>
            </div>
          ))}
        </Buffs>
      )}
    </>
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
