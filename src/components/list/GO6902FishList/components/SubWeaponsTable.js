import React, { useState } from "react";
import styled from "styled-components";
import cx from "classnames";
import { Map } from "immutable";
import { MOBILE_BREAKPOINT_WIDTH } from "cssMix";
import { useSelector } from "react-redux";

const SubWeaponsTable = ({
  t,
  size,
  map = Map(),
  type = "01",
  title,
  denom,
}) => {
  const imgsdomain = useSelector((state) => state.props.imgsdomain);
  const [isOpen, setIsOpen] = useState(false);
  const toggleHandler = () => {
    setIsOpen(!isOpen);
  };
  return map.size ? (
    <>
      <Title className="title">{t(title)}</Title>
      {size.width > MOBILE_BREAKPOINT_WIDTH ? (
        <Table>
          <div className="tr title">
            <div className="th">{t("spells")}</div>
            <div className="th">{t("payout")}</div>
          </div>
          <div className="tr">
            <div className="td">
              <img
                className="img"
                src={`
                ${imgsdomain}/order-detail/common/GO6902/item_${type}.png`}
              ></img>
            </div>
            <div className="td">
              <p>{(Number(map.get("Win")) * (denom * 100)) / 100}</p>
            </div>
          </div>
        </Table>
      ) : (
        <>
          <MobileTable>
            <div className="img">
              <img
                className="fish-img"
                src={`
                ${imgsdomain}/order-detail/common/GO6902/item_${type}.png`}
              />
            </div>
            <div className="toggle-btn" onClick={toggleHandler}>
              <div className={cx("cross1", { open: isOpen })}></div>
              <div className={cx("cross2", { open: isOpen })}></div>
            </div>
          </MobileTable>
          {isOpen && (
            <OpenTable>
              <div className="tr">
                <h5>{t("payout")}</h5>
                <p>{(Number(map.get("Win")) * (denom * 100)) / 100}</p>
              </div>
            </OpenTable>
          )}
        </>
      )}
    </>
  ) : (
    <></>
  );
};
const Title = styled.p`
  margin: 20px 0;
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
    .th {
      text-align: center;
      display: flex;
      justify-content: center;
      align-items: center;
      box-sizing: border-box;
      &:first-child {
        width: calc(100% / 6);
      }
      &:last-child {
        width: calc(100% - 100% / 6);
        justify-content: flex-start;
        padding-left: calc(100% / 4.2);
      }
    }
    .td {
      display: flex;
      justify-content: center;
      align-items: center;
      box-sizing: border-box;
      height: 60px;
      font-size: 13px;
      .img {
        max-height: 100%;
      }
      &:first-child {
        width: calc(100% / 6);
      }
      &:last-child {
        width: calc(100% - 100% / 6);
        justify-content: flex-start;
        padding-left: calc(100% / 4.2);
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
const MobileTable = styled.div`
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
const OpenTable = styled.div`
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
    h5 {
      color: #8e8e8e;
      margin: 0;
    }
    & > p {
      display: flex;
      flex-direction: column;
      align-items: flex-end;
    }
  }
`;
export default SubWeaponsTable;
