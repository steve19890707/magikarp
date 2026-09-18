import React from "react";
import { Map } from "immutable";
// Components
import UserInfo from "../components/UserInfo";
import GameInfo from "../components/GameInfo";
import AT05Buffs from "../components/secondary/AT05Buffs";
import AT01FishList from "../components/list/AT01FishList";
import AT05FishList from "../components/list/AT05FishList";
import AB3FishList from "../components/list/AB3FishList";
import AB3Items from "../components/secondary/AB3Items";
import NewAB3Items from "../components/secondary/NewAB3Items";
import NewAB3List from "../components/list/NewAB3List";
import AT101CarList from "../components/list/AT101CarList";
import AT101Result from "../components/secondary/AT101Result";
import GO02FishList from "components/list/GO02FishList";
import ReframingAT05List from "components/list/ReframingAT05List";
import ReframingAT05Items from "components/secondary/ReframingAT05Items";
import GO05FishList from "components/list/GO05FishList";
import GO06Items from "../components/secondary/GO06Items";
import GO06FishList from "../components/list/GO06FishList";
import GO6901Items from "../components/secondary/GO6901Items";
import GO6901List from "../components/list/GO6901List";
import GO6902FishList from "../components/list/GO6902FishList";

const components = {
  UserInfo: UserInfo,
  GameInfo: GameInfo,
  AT05Buffs: AT05Buffs,
  AT01FishList: AT01FishList,
  AT05FishList: AT05FishList,
  AB3FishList: AB3FishList,
  AB3Items: AB3Items,
  NewAB3Items: NewAB3Items,
  AT101CarList: AT101CarList,
  AT101Result: AT101Result,
  GO02FishList: GO02FishList,
  NewAB3List: NewAB3List,
  ReframingAT05List: ReframingAT05List,
  ReframingAT05Items: ReframingAT05Items,
  GO05FishList: GO05FishList,
  GO06Items: GO06Items,
  GO06FishList: GO06FishList,
  GO6901Items: GO6901Items,
  GO6901List: GO6901List,
  GO6902FishList: GO6902FishList,
};

const produce = (area, data = Map(), idx, list, gameId) => {
  const Component = components[area];
  return <Component key={idx} data={data} list={list} gameId={gameId} />;
};

export default produce;
