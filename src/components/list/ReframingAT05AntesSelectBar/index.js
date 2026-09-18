import React, { useEffect, useState } from "react";
import styled from "styled-components";
import { useTranslation } from "react-i18next";
import useScrollTop from "userHook/useScrollTop";
import { useSelector } from "react-redux";

export default ({
  changeValueHandler,
  antes = [],
  antesValue,
  groundType,
  denom,
}) => {
  const [isSticky, setIsSticky] = useState(false);
  const [barDistance, setBarDistance] = useState(0);
  const { t } = useTranslation();
  const imgsdomain = useSelector((state) => state.props.imgsdomain);
  const scrollTop = useScrollTop();
  const bar = document.getElementById("select-bar");
  useEffect(() => {
    bar && setBarDistance(bar.offsetTop);
  }, [bar]);
  useEffect(() => {
    if (scrollTop > barDistance) {
      setIsSticky(true);
    } else {
      setIsSticky(false);
    }
  }, [scrollTop]);
  return (
    <>
      <AntesSelectBar id="select-bar" isSticky imgsdomain={imgsdomain}>
        <select
          name="antes"
          id="antes"
          value={antesValue}
          onChange={(e) => changeValueHandler(e)}
        >
          <option value="all">
            {t("bet")}：{t("all")}
          </option>
          {antes
            .sort((a, b) => a - b)
            .map((item, idx) => {
              return (
                <option
                  key={idx}
                  value={((item / (denom * 100)) * 100).toFixed(0)}
                >
                  {t("bet")}：{item}
                </option>
              );
            })}
        </select>
      </AntesSelectBar>
      {isSticky && (
        <StickyBar>
          <h3>{groundType}</h3>
          <select
            name="antes"
            id="antes2"
            value={antesValue}
            onChange={(e) => changeValueHandler(e)}
          >
            <option value="all">
              {t("bet")}：{t("all")}
            </option>
            {antes.map((item, idx) => {
              return (
                <option
                  key={idx}
                  value={((item / (denom * 100)) * 100).toFixed(0)}
                >
                  {t("bet")}：{item}
                </option>
              );
            })}
          </select>
        </StickyBar>
      )}
    </>
  );
};

const AntesSelectBar = styled.div`
  position: relative;
  top: 0;
  width: 100%;
  border-radius: 0.25em;
  height: 40px;
  margin: 5px auto 20px;
  overflow: hidden;
  & select {
    appearance: none;
    box-shadow: none;
    border: 0 !important;
    background: #373737;
    background-image: none;
    color: #fff;
    cursor: pointer;
    font-size: 15px;
    height: 100%;
    margin: 0;
    outline: 0;
    padding: 0 0 0 1em;
    width: 100%;
  }
  &::before {
    bottom: 0;
    background: #3cabff;
    content: "";
    line-height: 40px;
    right: 0;
    padding: 0 1.5em;
    position: absolute;
    pointer-events: none;
    top: 0;
  }
  &::after {
    bottom: 0;
    width: 20px;
    height: 20px;
    background: ${({ imgsdomain }) =>
        `url("${imgsdomain}/order-detail/down-arrow.png")`}
      no-repeat;
    background-size: 100%;
    content: "";
    line-height: 40px;
    right: 14px;
    position: absolute;
    pointer-events: none;
    top: 10px;
  }
`;

const StickyBar = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  box-sizing: border-box;
  position: fixed;
  top: 0;
  left: 0;
  height: 60px;
  width: 100%;
  background-color: #373737;
  padding: 0 33px;
  box-shadow: 0 3px 6px 0 rgba(0, 0, 0, 0.16), 0 3px 6px 0 rgba(0, 0, 0, 0.23);
  z-index: 999;
  & select {
    box-shadow: none;
    border: 0 !important;
    background: #373737;
    background-image: none;
    color: #fff;
    cursor: pointer;
    font-size: 15px;
    height: 100%;
    margin: 0;
    outline: 0;
    width: 10%;
    min-width: 150px;
  }
`;
