import React, { useState, useEffect } from "react"
import styled from "styled-components"
import { List } from "immutable"
import Area from "components/areaStyled"
import GO02AntesSelectBar from "components/list/GO02AntesSelectBar"
import NormalTable from "./components/NormalTable"
import WeaponTable from "./components/WeaponTable"
import PigTable from "./components/PigTable"
import ElephantTable from "./components/ElephantTable"
import GemTable from "./components/GemTable"
import BossTable from "./components/BossTable"
import EnergyTable from "./components/EnergyTable"
import ThumperTable from "./components/ThumperTable"
import { gameDetail } from "config"
import { getInitLang } from "Utils"
import { useTranslation } from "react-i18next"
import { MOBILE_BREAKPOINT_WIDTH } from "cssMix"
import useWindowSize from "userHook/useWindowSize"

const GO02FishList = ({ data, list = List() }) => {
  const { t } = useTranslation()
  const lang = getInitLang()
  const size = useWindowSize()
  const [antes, setAntes] = useState([]) // 有資料的押注
  const [antesValue, setAntesValue] = useState("all") // all 0.10 0.20 ...
  const [groundType, setGroundType] = useState("")
  //fish list
  const [bossResult, setBossResult] = useState(List())
  const [featureResult, setFeatureResult] = useState(List())
  const [fishResult, setFishResult] = useState(List())
  const [weaponResult, setWeaponResult] = useState(List())
  const [energyResult, setEnergyResult] = useState(List())
  const [thumperResult, setThumperResult] = useState(List())
  const [expand, setExpand] = useState(false)
  const [isBgFixed, setIsBgFixed] = useState(false)
  const denom = data.getIn(["Wager", "PlayerDenom"])
  const findMultiple = (list = List()) => {
    const array = []
    list.toJS().forEach((item) => {
      const isInclude = array.includes(item["BetMultiple"])
      if (isInclude) {
        return
      } else {
        array.push(item["BetMultiple"])
      }
    })
    return array
  }
  const searchBetAntes = () => {
    const bossList = list.get("BossResult")
    const featureList = list.get("FeatureResult")
    const weaponList = list.get("WeaponResult")
    const normalList = list.get("FishResult")
    const energyList = list.get("EnergyBarResult")
    const thumperList = list.get("ThumperResult")
    const bossArr = (bossList && findMultiple(bossList)) || []
    const featureArr = (featureList && findMultiple(featureList)) || []
    const weaponArr = (weaponList && findMultiple(weaponList)) || []
    const normalArr = (normalList && findMultiple(normalList)) || []
    const EnergyArr = (energyList && findMultiple(energyList)) || []
    const ThumperArr = (thumperList && findMultiple(thumperList)) || []
    const newArr =
      bossArr.concat(featureArr, weaponArr, normalArr, EnergyArr, ThumperArr) ||
      []
    const result = newArr.filter((element, index, arr) => {
      return arr.indexOf(element) === index
    })
    return result
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

  useEffect(() => {
    if (list.size) {
      list.get("RoomType") &&
        setGroundType(
          gameDetail.getIn([
            data.getIn(["Wager", "GameCode"]),
            "ground_type",
            lang,
            list.get("RoomType").toString(),
          ])
        )
    }
  }, [list])

  const changeValueHandler = (e) => {
    setAntesValue(e.target.value)
  }

  const expandHandler = () => {
    setExpand(!expand)
  }
  // select bar
  useEffect(() => {
    const arr = searchBetAntes()
    setAntes(arr.map((elm) => (elm * (denom * 100)) / 100))
  }, [data, list])

  //set fish list
  useEffect(() => {
    if (antesValue == "all") {
      setBossResult(list.get("BossResult"))
      setFeatureResult(list.get("FeatureResult"))
      setFishResult(list.get("FishResult"))
      setWeaponResult(list.get("WeaponResult"))
      setEnergyResult(list.get("EnergyBarResult"))
      setThumperResult(list.get("ThumperResult"))
    } else {
      list.get("BossResult") &&
        setBossResult(
          list
            .get("BossResult")
            .filter((item) => item.get("BetMultiple") == antesValue)
        )
      list.get("FeatureResult") &&
        setFeatureResult(
          list
            .get("FeatureResult")
            .filter((item) => item.get("BetMultiple") == antesValue)
        )
      list.get("FishResult") &&
        setFishResult(
          list
            .get("FishResult")
            .filter((item) => item.get("BetMultiple") == antesValue)
        )
      list.get("WeaponResult") &&
        setWeaponResult(
          list
            .get("WeaponResult")
            .filter((item) => item.get("BetMultiple") == antesValue)
        )
      list.get("EnergyBarResult") &&
        setEnergyResult(
          list
            .get("EnergyBarResult")
            .filter((item) => item.get("BetMultiple") == antesValue)
        )
      list.get("ThumperResult") &&
        setThumperResult(
          list
            .get("ThumperResult")
            .filter((item) => item.get("BetMultiple") == antesValue)
        )
    }
  }, [antesValue, list])
  
  useEffect(() => {
    const rootStyle = document.documentElement.style
    rootStyle.overflow = isBgFixed ? "hidden" : "auto"
    rootStyle.position = isBgFixed ? "fixed" : ""
    rootStyle.width = isBgFixed ? "100%" : ""
    rootStyle.height = isBgFixed ? "100%" : ""
  }, [isBgFixed])

  return (
    <>
      <FishList>
        <GO02AntesSelectBar
          changeValueHandler={changeValueHandler}
          antes={antes}
          antesValue={antesValue}
          groundType={groundType}
          denom={denom}
        />
        {fishResult && fishResult.size > 0 && (
          <div className="box">
            <div className="expand">
              <p className="title">{t("ordinaryFish")}</p>
              {size.width <= MOBILE_BREAKPOINT_WIDTH && (
                <p className="expand-btn" onClick={expandHandler}>
                  {expand ? t("collapseAll") : t("expandAll")}
                </p>
              )}
            </div>

            <NormalTable
              antesValue={antesValue}
              list={fishResult}
              expand={expand}
              denom={denom}
              size={size}
              setIsBgFixed={setIsBgFixed}
            />
          </div>
        )}
        {weaponResult &&
          weaponResult.filter((i) => i.get("FishSpecies") == 23).size > 0 && (
            <div className="box">
              <p className="title">{t("thorsHammer")}</p>
              <WeaponTable
                type="Hammer"
                list={weaponResult.filter((i) => i.get("FishSpecies") == 23)}
                antesValue={antesValue}
                denom={denom}
                size={size}
                setIsBgFixed={setIsBgFixed}
              />
            </div>
          )}
        {weaponResult &&
          weaponResult.filter((i) => i.get("FishSpecies") == 22).size > 0 && (
            <div className="box">
              <p className="title">{t("steelGlove")}</p>
              <WeaponTable
                type="Glove"
                list={weaponResult.filter((i) => i.get("FishSpecies") == 22)}
                antesValue={antesValue}
                denom={denom}
                size={size}
                setIsBgFixed={setIsBgFixed}
              />
            </div>
          )}
        {featureResult &&
          (featureResult.filter((i) => i.get("FishSpecies") == 24).size > 0 ||
            featureResult.filter((i) => i.get("FishSpecies") == 30).size > 0 ||
            featureResult.filter((i) => i.get("FishSpecies") == 31).size > 0 ||
            featureResult.filter((i) => i.get("FishSpecies") == 32).size > 0 ||
            featureResult.filter((i) => i.get("FishSpecies") == 33).size >
              0) && (
            <div className="box">
              <p className="title">{t("luckyPiggy")}</p>
              <PigTable
                list={featureResult}
                antesValue={antesValue}
                denom={denom}
                size={size}
                setIsBgFixed={setIsBgFixed}
              />
            </div>
          )}

        {featureResult &&
          featureResult.filter((i) => i.get("FishSpecies") == 20).size > 0 && (
            <div className="box">
              <p className="title">{t("ganesha")}</p>
              <ElephantTable
                list={featureResult.filter((i) => i.get("FishSpecies") == 20)}
                antesValue={antesValue}
                denom={denom}
                size={size}
                setIsBgFixed={setIsBgFixed}
              />
            </div>
          )}

        {featureResult &&
          featureResult.filter((i) => i.get("FishSpecies") == 21).size > 0 && (
            <div className="box">
              <p className="title">{t("gemstoneWheel")}</p>
              <GemTable
                list={featureResult.filter((i) => i.get("FishSpecies") == 21)}
                antesValue={antesValue}
                denom={denom}
                size={size}
                setIsBgFixed={setIsBgFixed}
              />
            </div>
          )}
        {bossResult &&
          (bossResult.filter((i) => i.get("FishSpecies") == 28).size > 0 ||
            bossResult.filter((i) => i.get("FishSpecies") == 29).size > 0) && (
            <div className="box">
              <p className="title">{t("toadKing")}</p>
              <BossTable
                type={"Toad"}
                list={bossResult}
                antesValue={antesValue}
                denom={denom}
                size={size}
                setIsBgFixed={setIsBgFixed}
              />
            </div>
          )}
        {bossResult &&
          (bossResult.filter((i) => i.get("FishSpecies") == 25).size > 0 ||
            bossResult.filter((i) => i.get("FishSpecies") == 26).size > 0 ||
            bossResult.filter((i) => i.get("FishSpecies") == 27).size > 0) && (
            <div className="box">
              <p className="title">{t("octopusKing")}</p>
              <BossTable
                type={"Octopus"}
                list={bossResult}
                antesValue={antesValue}
                denom={denom}
                size={size}
                setIsBgFixed={setIsBgFixed}
              />
            </div>
          )}
        {energyResult && energyResult.size > 0 && (
          <div className="box">
            <p className="title">{t("energy")}</p>
            <EnergyTable
              list={energyResult}
              antesValue={antesValue}
              denom={denom}
              size={size}
              setIsBgFixed={setIsBgFixed}
            />
          </div>
        )}
        {thumperResult && thumperResult.size > 0 && (
          <div className="box">
            <p className="title">{t("punchSkill")}</p>
            <ThumperTable
              list={thumperResult}
              antesValue={antesValue}
              denom={denom}
              size={size}
            />
          </div>
        )}
      </FishList>
    </>
  )
}

const FishList = styled(Area)`
  & > .box {
    margin-bottom: 20px;
    .expand {
      display: flex;
      justify-content: space-between;
      align-items: center;
      margin-bottom: 20px;
      .expand-btn {
        user-select: none;
        font-size: 12px;
        border: solid 1px #fff;
        padding: 4px 8px;
        border-radius: 30px;
        cursor: pointer;
      }
    }
    & > .title {
      margin-bottom: 20px;
    }
  }
`

export default GO02FishList
