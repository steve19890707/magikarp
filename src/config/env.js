const host = window.location.host
let env = ""
switch(host){
  case "rd3-dev-fdetail.guardians.one":
    env = "develope"
    break
  case "rd3-qa-fdetail.guardians.one":
    env = "qa"
    break
  case "fdetail.cqgame.games":
    env = "int"
    break
  default:
    env = "pord"
    break
}

export default env