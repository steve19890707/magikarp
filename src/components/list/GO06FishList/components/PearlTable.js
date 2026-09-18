import React, { useState } from "react";
import styled from "styled-components";
import { List, fromJS } from "immutable";
import media from "cssMix";
import cx from "classnames";
import { MOBILE_BREAKPOINT_WIDTH } from "cssMix";
import { useSelector } from "react-redux";

const PearlTable = ({ t, list = List(), denom, size, title }) => {
  const imgsdomain = useSelector((state) => state.props.imgsdomain);
  const [isOpen, setIsOpen] = useState(false);
  const totalPay = () => {
    let total = 0;
    list.forEach((x) => x.forEach((y) => (total += y.get("Win"))));
    return (total * (denom * 100)) / 100;
  };
  const toggleHandler = () => {
    setIsOpen(!isOpen);
  };
  return list.size ? (
    <>
      <Title className="title">{t(title)}</Title>
      <Main isOpen={isOpen}>
        <div className="left">
          <img
            src={`
${imgsdomain}/order-detail/common/GO06/40.png`}
          ></img>
        </div>
        <div className="middle">
          <ul>
            <li>
              {t("payout")}：{totalPay()}
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
                  <div className="th">{t("no")}</div>
                  <div className="th">{t("pearlCollection")}</div>
                  <div className="th">{t("payout")}</div>
                </div>
                {list.map((item, idx) => {
                  let wins = 0;
                  item.forEach((i) => (wins += i.get("Win")));
                  wins = (wins * (denom * 100)) / 100;

                  return (
                    <div className="tr" key={idx}>
                      <div className="td">#{idx + 1}</div>
                      <div className="td pearl">
                        {item.map((v, i) => (
                          <img
                            src={`${imgsdomain}/order-detail/common/GO06/pearls/${
                              v.get("Level") > 4 ? "5" : v.get("Level")
                            }.png`}
                          />
                        ))}
                      </div>
                      <div className="td">{wins}</div>
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
                let wins = 0;
                item.forEach((i) => (wins += i.get("Win")));
                wins = (wins * (denom * 100)) / 100;
                return (
                  <div key={idx}>
                    <div className="tr">
                      <h5>{t("no")}</h5>
                      <p>{`#${idx + 1}`}</p>
                    </div>
                    <div className="tr pearl">
                      <h5>{t("pearlCollection")}</h5>
                      <p>
                        {item.map((v, i) => (
                          <img
                            src={`${imgsdomain}/order-detail/common/GO06/pearls/${v.get(
                              "Level"
                            )}.png`}
                          />
                        ))}
                      </p>
                    </div>
                    <div className="tr">
                      <h5>{t("payout")}</h5>
                      <p>{wins}</p>
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
  margin-bottom: ${(props) => (props.isOpen ? "" : "20px")};
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
export default PearlTable;
