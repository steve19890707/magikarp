import React, { useEffect, useState } from "react"
import { Map, List, fromJS } from "immutable"
import { useTranslation } from "react-i18next"
import FishItem from "./components/FishItem"
import styled from "styled-components"
import AntesSelectBar from "components/list/AntesSelectBar"
import Area from "components/areaStyled"
import { gameDetail } from "config"
import { getInitLang } from "Utils"
import Total from "components/list/Total"

export default ({ data }) => {
  const { t } = useTranslation()
  const lang = getInitLang()
  const [antesDetail, setAntesDetail] = useState(Map())
  const [antes, setAntes] = useState(Map()) // 有資料的押注
  const [antesValue, setAntesValue] = useState("all") // all 0.10 0.20 ...
  const [fishList, setFishList] = useState(List())
  const gameId = data.get("GameCode")
  const [groundType, setGroundType] = useState("")

  const changeValueHandler = (e) => {
    setAntesValue(e.target.value)
  }
  useEffect(() => {
    if (data.size) {
      data.getIn(["Detail", "GroundType"]) &&
        setGroundType(
          gameDetail.getIn([
            data.get("GameCode"),
            "ground_type",
            lang,
            data.getIn(["Detail", "GroundType"]).toString(),
          ])
        )
    }
  }, [data])
  // select bar
  useEffect(() => {
    const allAntes = data.getIn(["Detail", "Antes"])
    allAntes &&
      setAntes(allAntes.filter((value) => value.get("ShootCount") !== 0))
  }, [data])

  // select antes
  useEffect(() => {
    if (antes.size) {
      if (antesValue !== "all") {
        const select = antes.get(antesValue)
        setAntesDetail(select)
      }
    }
  }, [antesValue, antes])

  // create fish list
  useEffect(() => {
    if (antesValue === "all") {
      const arr = []
      const newArr = []
      antes.map((v) =>
        v
          .get("KillFishes")
          .toArray()
          .map((v) => arr.push(v))
      )
      fromJS(arr)
        .toJS()
        .forEach((item) => {
          const index = newArr.findIndex((i) => i[0] === item[0])
          if (index !== -1) {
            const count = newArr[index][1]["Count"] + item[1]["Count"]
            const pay =
              (newArr[index][1]["Pay"] * 10 + item[1]["Pay"] * 10) / 10
            const payEx =
              (newArr[index][1]["PayEx"] * 10 + item[1]["PayEx"] * 10) / 10
            newArr[index][1]["Count"] = count
            newArr[index][1]["Pay"] = pay.toFixed(2)
            newArr[index][1]["PayEx"] = payEx.toFixed(2)
            const bonus = []
            if (newArr[index][1]["BonusInfos"] && item[1]["BonusInfos"]) {
              newArr[index][1]["BonusInfos"] = bonus.concat(
                newArr[index][1]["BonusInfos"],
                item[1]["BonusInfos"]
              )
            } else if (
              !newArr[index][1]["BonusInfos"] &&
              item[1]["BonusInfos"]
            ) {
              newArr[index][1]["BonusInfos"]=[]
              newArr[index][1]["BonusInfos"] = bonus.concat(
                newArr[index][1]["BonusInfos"],
                item[1]["BonusInfos"]
              )
            }
          } else {
            newArr.push(item)
          }
        })
      setFishList(
        fromJS(
          newArr.filter(
            (item) => item[1]["Count"] !== 0 || item[1]["BonusInfos"]
          )
        ).sortBy((fish) => parseInt(fish.get(0)))
      )
    }
    if (antesDetail.size) {
      if (antesValue !== "all") {
        setFishList(
          fromJS(
            antesDetail
              .get("KillFishes")
              .toArray()
              .filter(
                (item) =>
                  item[1].get("Count") !== 0 || item[1].get("BonusInfos")
              )
          ).sortBy((fish) => parseInt(fish.get(0)))
        )
      }
    }
  }, [antesDetail, antesValue, antes])

  return (
    <>
      <FishList>
        {antes.size !== 0 && (
          <AntesSelectBar
            changeValueHandler={changeValueHandler}
            antes={antes}
            antesValue={antesValue}
            groundType={groundType}
          />
        )}
        <TableContainer>
          {fishList.map((item, idx) => (
            <FishItem key={idx} item={item} gameId={gameId} data={data} />
          ))}
        </TableContainer>
      </FishList>
      <Total data={data} antesDetail={antesDetail} antesValue={antesValue} />
    </>
  )
}

const FishList = styled(Area)`
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
