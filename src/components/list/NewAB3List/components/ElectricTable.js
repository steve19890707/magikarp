import React, { useState } from "react";
import styled from "styled-components";
import { List, fromJS } from "immutable";
import media from "cssMix";
import cx from "classnames";
import { MOBILE_BREAKPOINT_WIDTH } from "cssMix";
import { useSelector } from "react-redux";

const ElectricTable = ({
  t,
  list = List(),
  antesValue,
  denom,
  size,
  title,
}) => {
  const [isOpen, setIsOpen] = useState(false);
  const imgsdomain = useSelector((state) => state.props.imgsdomain);
  const totalBet = () => {
    let total = 0;
    list.forEach((i) => (total += i[1].getIn(["WeaponInfos", "2", "Bet"])));
    return (total * (denom * 100)) / 100;
  };
  const toggleHandler = () => {
    setIsOpen(!isOpen);
  };
  return list.size ? (
    <>
      <Title className="title">{t(title)}</Title>
      <Main>
        <div className="left">
          <img
            src={`
            ${imgsdomain}/order-detail/common/AB3_new/props/4.png`}
          ></img>
        </div>
        <div className="middle">
          <ul>
            <li>
              {t("bet")}：{totalBet()}
            </li>
          </ul>
        </div>
        <div className="right">
          <div className="toggle-btn" onClick={toggleHandler}>
            <div className={cx("cross1", { open: isOpen })}></div>
            <div className={cx("cross2", { open: isOpen })}></div>
          </div>
        </div>
      </Main>
      {size.width > MOBILE_BREAKPOINT_WIDTH ? (
        <>
          <Table>
            {isOpen && (
              <>
                <div className="tr title">
                  <div className="th">{t("minBet")}</div>
                  <div className="th">{t("electricBullets")}</div>
                </div>
                {list.map((item, idx) => {
                  return (
                    <div className="tr" key={idx}>
                      <div className="td">
                        {(item[0] * (denom * 100)) / 100}
                      </div>
                      <div className="td">
                        {item[1].getIn(["WeaponInfos", "2", "ShootCount"])}
                      </div>
                    </div>
                  );
                })}
              </>
            )}
          </Table>
        </>
      ) : (
        isOpen && (
          <>
            <MobileTable>
              {list.map((item, idx) => {
                return (
                  <div key={idx}>
                    <div className="tr">
                      <h5>{t("minBet")}</h5>
                      <p>{(item[0] * (denom * 100)) / 100}</p>
                    </div>
                    <div className="tr">
                      <h5>{t("electricBullets")}</h5>
                      <p>{item[1].getIn(["WeaponInfos", "2", "ShootCount"])}</p>
                    </div>
                  </div>
                );
              })}
            </MobileTable>
          </>
        )
      )}
    </>
  ) : (
    <></>
  );
};
const Title = styled.p`
  margin-bottom: 20px;
`;
const Main = styled.div`
  border-collapse: collapse;
  display: flex;
  box-sizing: border-box;
  width: 100%;
  height: 210px;
  padding: 30px;
  border: solid 1px #474747;
  margin: 20px 0 0 0;
  ${media.mobile`
    flex-wrap:wrap;
    height:auto;
    padding:15px;
  `}
  .left {
    width: 45%;
    max-width: 330px;
    height: 150px;
    border: solid 1px #474747;
    background-color: #373737;
    display: flex;
    align-items: center;
    justify-content: center;
    ${media.mobile`
      width:100%;
      max-width: none;
      margin-bottom:15px;
  `}
    & img {
      width: 100%;
      height: 100%;
      object-fit: contain;
    }
  }
  .middle {
    flex: 1;
    display: flex;
    align-items: center;
    ${media.mobile`
  width: calc(100% -100px);
  `}
  }
  .right {
    display: flex;
    align-items: center;
    justify-content: center;
    width: 100px;
    border-left: 1px solid #474747;
    height: 150px;
    ${media.mobile`
    height: 70px;
  `}
    .toggle-btn {
      width: 100%;
      height: 100%;
      display: flex;
      align-items: center;
      justify-content: center;
      cursor: pointer;
      .cross1 {
        position: absolute;
        width: 30px;
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
        width: 30px;
        height: 2px;
        background-color: #fff;
        transform: rotate(90deg);
        transition: all ease 0.3s;
        &.open {
          transform: rotate(-45deg);
        }
      }
    }
  }
`;
const Table = styled.div`
  margin: 0 0 20px 0;
  width: 100%;
  display: table;
  border-collapse: collapse;
  user-select: none;
  .tr {
    display: flex;
    box-sizing: border-box;
    width: 100%;
    border: solid 1px #474747;
    background-color: #373737;
    &:hover {
      background-color: #474747;
    }
    .th {
      flex: 1;
      text-align: center;
      display: flex;
      justify-content: center;
      align-items: center;
    }
    .td {
      flex: 1;
      text-align: center;
      line-height: 60px;
      height: 60px;
      font-size: 13px;
      .fish-img {
        height: 70%;
        object-fit: contain;
        margin-top: 9px;
      }
      &.serial {
        color: #3dabff;
      }
      &.more {
        display: flex;
        align-items: center;
        justify-content: center;
        cursor: pointer;
        &:hover .dot {
          background-color: #3dabff;
        }
        & .dot {
          width: 4px;
          height: 4px;
          border-radius: 100%;
          background-color: #fff;
          margin: 2px;
        }
      }
      &.pearl {
        display: flex;
        align-items: center;
        justify-content: center;
        & > img {
          height: 70%;
          max-width: 20%;
        }
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
  margin-bottom: 20px;
  & > div:not(:last-child) {
    border-bottom: 1px solid #8e8e8e;
  }
  & .serial {
    text-align: center;
    padding: 15px 0;
    border: solid 1px #474747;
    color: #3dabff;
    font-size: 13px;
  }
  & .tr {
    display: flex;
    align-items: center;
    flex-wrap: wrap;
    justify-content: space-between;
    font-size: 13px;
    padding: 15px;
    border: solid 1px #474747;
    background-color: #373737;
    &.pearl {
      flex-wrap: nowrap;
      p {
        display: flex;
        align-items: center;
        justify-content: flex-end;
        width: 30%;
      }
      & img {
        max-width: 20%;
      }
    }
    & .awake-img {
      height: 45px;
    }
    &.awake {
      padding: 0 15px;
      height: 48px;
    }
    &.img {
      padding: 0;
      justify-content: center;
      height: 60px;
      background-color: #2a2a2a;
      img {
        height: 50%;
        object-fit: contain;
      }
    }
    h5 {
      margin: 0;
      color: #8e8e8e;
    }
    .more {
      width: 100%;
      background-color: #3cabff;
      padding: 15px;
      text-align: center;
      margin-top: 10px;
      cursor: pointer;
    }
  }
`;
export default ElectricTable;
