import React, { useEffect, useState } from "react"
import { List, fromJS } from "immutable"
import { useTranslation } from "react-i18next"
import CarItem from "./components/CarItem"
import styled from "styled-components"
import Area from "components/areaStyled"

export default ({ data }) => {
  const { t } = useTranslation()

  const [carList, setCarList] = useState(List())
  const gameId = data.get("GameCode")

  // create fish list
  useEffect(() => {
    const list = data.getIn(["Detail","bet_table"])
    list && setCarList(fromJS(list.toArray()))
  }, [data])

  return (
    <>
      <CarList>
        <TableContainer>
          {carList.map((item,idx) => (
            <CarItem key={idx} item={item} gameId={gameId} data={data} />
          ))}
        </TableContainer>
      </CarList>
      <Area className="total">
        {
          <p className="title">
            {t("totalBet")} <span className="pink">{data.get("Bet")}</span>{" "}
            {t("totalPayout")} <span className="blue">{data.get("Pay")}</span>
          </p>
        }
      </Area>
    </>
  )
}

const CarList = styled(Area)`
  display: flex;
  flex-wrap: wrap;
  box-sizing: border-box;
`

const TableContainer = styled.div`
  width: 100%;
  display: flex;
  flex-wrap: wrap;
  justify-content: flex-start;
  padding: 30px 0;
`
