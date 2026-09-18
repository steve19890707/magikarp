import React, { useState } from "react";
import styled from "styled-components";
import { useTranslation } from "react-i18next";
import media from "cssMix";
import { Map } from "immutable";
import { useSelector } from "react-redux";

const CarItem = ({ item, data = Map(), gameId }) => {
  const { t } = useTranslation();
  const imgsdomain = useSelector((state) => state.props.imgsdomain);
  const [open, setOpen] = useState(false);
  const openHandler = () => {
    setOpen(!open);
  };
  return (
    <>
      <Box>
        <p>
          {t("multiplier")} : {item.getIn([1, "multiplier"]) * 1}
        </p>
        <img
          alt="gamePic"
          src={`
              ${imgsdomain}/order-detail/common/${gameId}/${item.get(0)}.png`}
        />
        <div className="detail">
          <p>
            {t("bet")} : {item.getIn([1, "amount"]) * 1}
          </p>
          <p>
            {t("payout")} : {item.getIn([1, "wincredit"]) * 1}
          </p>
          {item.getIn([1, "bonuses"]) && (
            <>
              <p style={{ display: "flex", color: "#ffda0c" }}>
                <BonusIcon
                  src={`${imgsdomain}/order-detail/common/AT101/bonus.png`}
                />
                ：
                {item.getIn([1, "totalcredit"]) - item.getIn([1, "wincredit"])}
              </p>
              <p className="pink">
                {t("totalPayout")}：{item.getIn([1, "totalcredit"]) * 1}
              </p>
            </>
          )}
        </div>
        {item.getIn([1, "bonuses"]) && (
          <p className="square-column-more" onClick={openHandler}>
            {t("more")}
          </p>
        )}
      </Box>
      {open && (
        <>
          <Popup>
            <img
              alt="car"
              src={`
              ${imgsdomain}/order-detail/common/${gameId}/${item.get(0)}.png`}
            />

            <Table>
              {item.getIn([1, "bonuses"]).map((item, idx) => (
                <Tr key={idx}>
                  <Td className="textLeft">{`Bonus Round ${item.get(
                    "round",
                  )}`}</Td>
                  <Td className="textRight">
                    <div className="bonus">
                      <BonusIcon
                        src={`${imgsdomain}/order-detail/common/AT101/bonus.png`}
                      />
                      :{item.get("bonus") * 1}
                    </div>
                  </Td>
                </Tr>
              ))}
              <Tr>
                <Td className="textLeft">Total:</Td>
                <Td className="textCenter textPink">
                  {item.getIn([1, "totalcredit"]) -
                    item.getIn([1, "wincredit"])}
                </Td>
              </Tr>
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
  & .detail {
    display: flex;
    flex-direction: column;
    align-items: center;
  }
  &:hover {
    background-color: #373737;
    transition: all 0.3s ease;
  }
  & > img {
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
  & > img {
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
  & .textCenter {
    text-align: center;
  }
  & .textBlue {
    color: #64b3f9;
  }
  & .textPink {
    color: #ff3f85;
  }
`;
const Tr = styled.div`
  display: table-row;
  border: 1px solid #ddd;
`;

const Td = styled.div`
  display: table-cell;
  padding: 0.625em;
  & .bonus {
    display: flex;
    align-items: center;
    justify-content: center;
  }
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

const BonusIcon = styled.img`
  height: 22px;
  margin-right: 4px;
  width: 22px;
`;
export default CarItem;
