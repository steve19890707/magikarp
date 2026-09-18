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
  const changeValueHandler = (e) => {
    setAntesValue(e.target.value)
  }

  // create lists of select bar
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
          // 合併相同魚種資料
          const index = newArr.findIndex((i) => i[0] === item[0])
          if (index !== -1) {
            const count = newArr[index][1]["Count"] + item[1]["Count"]
            const pay =
              (newArr[index][1]["Pay"] * 10 + item[1]["Pay"] * 10) / 10
            newArr[index][1]["Count"] = count
            newArr[index][1]["Pay"] = pay.toFixed(2)
          } else {
            // 合併一網打盡資料
            if (
              item[0] === "101" ||
              item[0] === "102" ||
              item[0] === "103" ||
              item[0] === "104" ||
              item[0] === "105" 
            ) {
              const index = newArr.findIndex((i) => i[0] === "101")
              if (index !== -1) {
                const count = newArr[index][1]["Count"] + item[1]["Count"]
                const pay =
                  (newArr[index][1]["Pay"] * 10 + item[1]["Pay"] * 10) / 10
                newArr[index][1]["Count"] = count
                newArr[index][1]["Pay"] = pay.toFixed(2)
              } else {
                item[0] = "101"
                newArr.push(item)
              }
            } else {
              newArr.push(item)
            }
          }
        })
      setFishList(
        fromJS(newArr.filter((item) => item[1]["Count"] !== 0)).sortBy((fish) =>
          parseInt(fish.get(0))
        )
      )
    }
    if (antesDetail.size) {
      if (antesValue !== "all") {
        setFishList(
          fromJS(
            antesDetail
              .get("KillFishes")
              .toArray()
              .filter((item) => item[1].get("Count") !== 0)
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
      <Total data={data} antesDetail={antesDetail} antesValue={antesValue}/>
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
