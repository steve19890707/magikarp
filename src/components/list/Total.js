import React, { useState, useEffect } from "react"
import Area from "components/areaStyled"
import { useTranslation } from "react-i18next"
import styled from "styled-components"
import { Map } from "immutable"

const pathName = window.location.pathname.split("/")
const StyledTotal = styled(Area)`
  text-align: right;
`
const Total = ({ antesValue, data = Map(), antesDetail }) => {
  const { t } = useTranslation()
  const [shootCount, setShootCount] = useState(0)
  useEffect(() => {
    if (antesValue === "all") {
      if (data.size && data.getIn(["Detail", "Antes"])) {
        const list = data.getIn(["Detail", "Antes"]).toList()
        let count = 0
        list.forEach((i) => (count += i.get("ShootCount")))
        setShootCount(count)
      }
    } else setShootCount(antesDetail.get("ShootCount"))
  }, [antesValue, data, antesDetail])
  return (
    <StyledTotal>
      {antesValue === "all" ? (
        <p className="title">
          {t("totalBet")} <span className="pink">{data.get("Bet")}</span>{" "}
          {t("totalPayout")} <span className="blue">{data.get("Pay")}</span>{" "}
          {pathName[1] === "odgo" && (
            <>
              {t("shootingTimes")} <span className="pink">{shootCount}</span>
            </>
          )}
        </p>
      ) : (
        <p className="title">
          {t("totalBet")} <span className="pink">{antesDetail.get("Bet")}</span>{" "}
          {t("totalPayout")}{" "}
          <span className="blue">{antesDetail.get("Pay")}</span>{" "}
          {pathName[1] === "odgo" && (
            <>
              {t("shootingTimes")} <span className="pink">{shootCount}</span>
            </>
          )}
        </p>
      )}
    </StyledTotal>
  )
}

export default Total
