import React from "react";
import styled from "styled-components";
import { useTranslation } from "react-i18next";
import { useSelector } from "react-redux";

const ErrorStyled = styled.div`
  width: 100%;
  height: 100vh;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  text-align: center;
  .img {
    width: 330px;
    height: 330px;
    & img {
      width: 100%;
      height: 100%;
      object-fit: contain;
    }
  }
  & h4 {
    font-size: 22px;
    color: #fff;
    margin-top: 30px;
  }
  & p {
    color: #888d9f;
    margin-top: 15px;
    font-size: 16px;
  }
`;
const Error = () => {
  const { t } = useTranslation();
  const imgsdomain = useSelector((state) => state.props.imgsdomain);
  return (
    <ErrorStyled>
      <div className="img">
        <img src={`${imgsdomain}/order-detail/error.png`} alt="" />
      </div>
      <div>
        <h4>{t("tokenExpired")}</h4>
        <p>{t("tokenExpiredSub")}</p>
      </div>
    </ErrorStyled>
  );
};

export default Error;
