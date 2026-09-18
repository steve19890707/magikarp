import React, { useState } from "react";
import styled from "styled-components";
import { useTranslation } from "react-i18next";
import media from "cssMix";
import { getInitLang } from "Utils";
import { ratios } from "config/ratios";
import { useSelector } from "react-redux";

const FishItem = ({ item, data = Map(), gameId }) => {
  const { t } = useTranslation();
  const imgsdomain = useSelector((state) => state.props.imgsdomain);
  const lang = getInitLang();
  const ratio = ratios.getIn([data.get("GameCode"), item.get(0)]);
  const [open, setOpen] = useState(false);
  const swimmingTubeList = ["101", "102", "103", "104", "105"];
  const fishId = () => {
    if (swimmingTubeList.includes(item.get(0))) {
      return "swimming_tube";
    } else return item.get(0);
  };

  return (
    <>
      <Box>
        <p>
          {t("multiplier")} :{" "}
          {ratio && ratio.size
            ? ratios.getIn([data.get("GameCode"), item.get(0), lang])
            : ratio}
        </p>
        <img
          alt="gamePic"
          src={`
              ${imgsdomain}/order-detail/common/${gameId}/${fishId()}.png`}
        />
        <div>
          <p>
            {t("kills")} : {item.getIn([1, "Count"])}
          </p>
          <p>
            {t("payout")} : {item.getIn([1, "Pay"]) * 1}
          </p>
        </div>
        {/* {item.getIn([1, "BonusInfos"]) && (
          <p class="square-column-more" onClick={openHandler}>
            {t("more")}
          </p>
        )} */}
      </Box>
      {open && (
        <>
          <Popup>
            <img
              alt="fish"
              src={`
              ${imgsdomain}/order-detail/common/${gameId}/${item.get(0)}.png`}
            />
            <p>
              {t("multiplier")} :{" "}
              {ratios.getIn([data.get("GameCode"), item.get(0)])}
            </p>
            <Table>
              <Tr>
                <Th className="textLeft">{t("multiplier")}</Th>
                <Th className="textRight">{t("payout")}</Th>
              </Tr>
              {item.getIn([1, "BonusInfos"]).map((item, idx) => (
                <Tr key={idx}>
                  <Td className="textLeft">{item.get("Ratio") * 1}</Td>
                  <Td className="textRight textBlue">{item.get("Pay") * 1}</Td>
                </Tr>
              ))}
            </Table>
            <Close
              onClick={() => {
                setOpen(false);
              }}
            />
          </Popup>
          <Mask
            onClick={() => {
              setOpen(false);
            }}
          />
        </>
      )}
    </>
  );
};

const Box = styled.div`
  box-sizing: border-box;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  align-items: center;
  padding: 20px 10px;
  width: calc(100% / 7);
  min-height: 180px;
  border: 2px solid rgba(255, 255, 255, 0.2);
  border-radius: 6px;
  ${media.tablet`
  width: calc(100% / 5);
  `}
  ${media.mobile`
  width: calc(100% / 3);
  `}
  &:hover {
    background-color: #373737;
    transition: all 0.3s ease;
  }
  & img {
    width: 60px;
    height: 60px;
    margin: 5px;
    object-fit: scale-down;
  }
  & .square-column-more {
    align-items: center;
    border: 1px solid;
    border-radius: 4px;
    display: flex;
    height: 25px;
    justify-content: center;
    margin-top: 10px;
    width: 80%;
    cursor: pointer;
  }
  & .extra-payout-column {
    color: #ffda0c;
  }
`;

const Popup = styled.div`
  position: fixed;
  display: block;
  flex-direction: column;
  width: 90%;
  background-color: #fff;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  background: #fff;
  border-radius: 0.25em 0.25em 0.4em 0.4em;
  box-shadow: 0 0 20px rgb(0 0 0 / 20%);
  max-width: 400px;
  max-height: 500px;
  overflow: hidden;
  padding: 10px 0;
  text-align: center;
  z-index: 1;
  & img {
    width: 80px;
  }
  & p {
    color: #000;
  }
`;
const Mask = styled.div`
  position: fixed;
  width: 100%;
  height: 100%;
  opacity: 0.6;
  left: 0;
  top: 0;
  background: #12110f;
  cursor: pointer;
`;

const Table = styled.div`
  display: table;
  position: relative;
  width: 80%;
  margin: 10px auto;
  color: #000;
  border-collapse: collapse;
  & .textRight {
    text-align: right;
  }
  & .textLeft {
    text-align: left;
  }
  & .textBlue {
    color: #64b3f9;
  }
`;
const Tr = styled.div`
  display: table-row;
  border: 1px solid #ddd;
`;
const Th = styled.div`
  display: table-cell;
  background-color: #f8f8f8;
  font-size: 13px;
  padding: 0.625em;
  font-weight: bold;
`;

const Td = styled.div`
  display: table-cell;
  padding: 0.625em;
`;

const Close = styled.div`
  height: 30px;
  position: absolute;
  top: 8px;
  right: 8px;
  width: 30px;
  cursor: pointer;
  &::before {
    background-color: #8f9cb5;
    content: "";
    height: 3px;
    position: absolute;
    top: 12px;
    width: 14px;
    left: 8px;
    transform: rotate(45deg);
  }
  &::after {
    background-color: #8f9cb5;
    content: "";
    height: 3px;
    position: absolute;
    top: 12px;
    width: 14px;
    right: 8px;
    transform: rotate(-45deg);
  }
`;
export default FishItem;
