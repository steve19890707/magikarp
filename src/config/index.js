import { fromJS } from "immutable";

export const sort = fromJS({
  1: { sort: ["UserInfo", "GameInfo", "AT01FishList"] },
  2: { sort: ["UserInfo", "GameInfo", "AT05Buffs", "AT05FishList"] },
  3: { sort: ["UserInfo", "GameInfo", "AB3Items", "AB3FishList"] },
  4: { sort: ["UserInfo", "GameInfo", "AT101Result", "AT101CarList"] },
  5: { sort: ["UserInfo", "GameInfo", "GO02FishList"] },
  6: { sort: ["UserInfo", "GameInfo", "NewAB3Items", "NewAB3List"] },
  7: {
    sort: ["UserInfo", "GameInfo", "ReframingAT05Items", "ReframingAT05List"],
  },
  8: { sort: ["UserInfo", "GameInfo", "GO05FishList"] },
  9: { sort: ["UserInfo", "GameInfo", "GO06Items", "GO06FishList"] },
  10: { sort: ["UserInfo", "GameInfo", "GO6901Items", "GO6901List"] },
  11: { sort: ["UserInfo", "GameInfo", "GO6902FishList"] },
});

export const gameDetail = fromJS({
  AT01: {
    title: {
      cn: "一炮捕鱼",
      en: "Oneshot Fishing",
      th: "ตกปลานัดเดียว",
      vn: "Một Phát Ăn Luôn",
    },
    ground_type: {
      cn: { 1: "欢乐厅", 2: "王者厅", 3: "神龙厅" },
      en: { 1: "Newbie", 2: "Expert", 3: "Master" },
      th: { 1: "ห้องมือใหม่", 2: "ห้องเซียน", 3: "ห้องมือโปร" },
      vn: { 1: "Người Mới", 2: "Sảnh chuyên gia", 3: "Sảnh bậc thầy" },
    },
    sort: "1",
  },
  GO05: {
    title: {
      cn: "一棒捕鱼",
      en: "ONESTICK FISHING",
      th: "ตกปลาฟาดเดียว",
      vn: "Một que bắt cá",
    },
    ground_type: {
      cn: { 1: "修炼殿", 2: "至尊殿", 3: "黑神殿" },
      en: { 1: "Practice Hall", 2: "Supreme Hall", 3: "Black God Hall" },
      th: { 1: "วิหารฝึกฝน", 2: "วิหารสูงสุด", 3: "วิหารเทพดำ" },
      vn: { 1: "Điện Tu Luyện", 2: "Điện Chí Tôn", 3: "Điện Hắc Thần" },
    },
    sort: "8",
  },
  AT05: {
    reframing: {
      title: {
        cn: "欢乐捕鱼",
        en: "Lucky Fishing",
        th: "ตกปลาลัคกี้",
        vn: "Bắn cá may mắn",
      },
      ground_type: {
        cn: { 1: "传说独角鲸", 2: "恐怖八爪鱼", 3: "怪兽鱼吉拉" },
        en: {
          1: "Legendary Narwhal",
          2: "Terror Octopus",
          3: "Monster Fishzilla",
        },
        th: {
          1: "วาฬเขาเดียวในตำนาน",
          2: "ปลาหมึกยักษ์สยอง",
          3: "สัตว์ประหลาดฟิชซิลล่า",
        },
        vn: {
          1: "Kỳ lân biển huyền thoại",
          2: "Bạch tuộc khủng bố",
          3: "Quái vật cá zilla",
        },
      },
      items: {
        cn: {
          1: "狂暴卡",
          2: "缓速卡",
          5: "集气卡",
          3: "黄金鱼卡",
          4: "武器鱼卡",
        },
        en: {
          1: "Berserk Card",
          2: "Slow Card",
          5: "Collect Power Card",
          3: "Goldenfish Card",
          4: "Weapon Fish Card",
        },
        th: {
          1: "การ์ดทรงพลัง",
          2: "การ์ดลดความเร็ว",
          5: "การ์ดสะสมพลัง",
          3: "การ์ดปลาทองคำ",
          4: "การ์ดปลาอาวุธ",
        },
        vn: {
          1: "Thẻ cuồng bạo",
          2: "Thẻ giảm tốc độ",
          5: "Thẻ tụ khí",
          3: "Thẻ cá vàng",
          4: "Thẻ cá vũ khí",
        },
        ko: {
          1: "광폭 카드",
          2: "완속 카드",
          5: "에너지 수집 카드",
          3: "황금물고기 카드",
          4: "무기물고기 카드",
        },
      },
      sort: "7",
    },
    title: {
      cn: "欢乐捕鱼",
      en: "Lucky Fishing",
      th: "ตกปลาลัคกี้",
      vn: "Bắn cá may mắn",
    },
    ground_type: {
      cn: { 1: "传说独角鲸", 2: "恐怖八爪鱼", 3: "怪兽鱼吉拉" },
      en: {
        1: "Legendary Narwhal",
        2: "Terror Octopus",
        3: "Monster Fishzilla",
      },
      th: {
        1: "วาฬเขาเดียวในตำนาน",
        2: "ปลาหมึกยักษ์สยอง",
        3: "สัตว์ประหลาดฟิชซิลล่า",
      },
      vn: {
        1: "Kỳ lân biển huyền thoại",
        2: "Bạch tuộc khủng bố",
        3: "Quái vật cá zilla",
      },
    },
    sort: "2",
  },
  AB3: {
    old: {
      title: {
        cn: "皇金渔场",
        en: "Paradise",
        th: "พาราไดซ์",
        vn: "Thiên đường bắn cá",
      },
      ground_type: {
        cn: {
          1: "蓝鲸探险",
          2: "深海霸王",
          3: "史前巨鳄",
          4: "功夫海牛",
        },
        en: {
          1: "Whales Journey",
          2: "Davy Jones",
          3: "Mega Crocodile",
          4: "Kungfu manatee",
        },
        th: {
          1: "ผจญภัยวาฬสีน้ำเงิน",
          2: "เดวี่โจนส์",
          3: "จระเข้ยักษ์",
          4: "พะยูนยอดกังฟู",
        },
        vn: {
          1: "Hành trình cá voi xanh",
          2: "Bá vương biển sâu",
          3: "Cá sấu khổng lồ",
          4: "Hải ngưu kungfu",
        },
      },
      items: {
        cn: { 1: "锁定卡", 2: "急冻卡", 3: "飙炮卡", 4: "全能卡", 5: "电网卡" },
        en: {
          1: "Auto Locked",
          2: "Freeze",
          3: "Speed-Up",
          4: "Powerful",
          5: "Electric Net",
        },
        th: {
          1: "ออโต้ล็อค",
          2: "แช่แข็ง",
          3: "สปีดอัพ",
          4: "ทรงพลัง",
          5: "แหไฟฟ้า",
        },
        vn: {
          1: "Thẻ khóa cố định",
          2: "Thẻ đóng băng",
          3: "Thẻ tăng tốc",
          4: "Thẻ toàn năng",
          5: "Thẻ lưới điện",
        },
      },
      sort: "3",
    },
    new: {
      title: {
        cn: "皇金渔场",
        en: "Paradise",
        th: "พาราไดซ์",
        vn: "Thiên đường bắn cá",
      },
      ground_type: {
        cn: {
          1: "欢乐厅",
          2: "富豪厅",
          3: "皇家厅",
        },
        en: {
          1: "Newbie",
          2: "Expert",
          3: "Royal",
        },
        th: {
          1: "ห้องมือใหม่",
          2: "ห้องเซียน",
          3: "รอยัล",
        },
        vn: {
          1: "Người Mới",
          2: "Phú Ông",
          3: "Sảnh Hoàng gia",
        },
        ko: {
          1: "초보자홀",
          2: "전문가홀",
          3: "로열 홀",
        },
      },
      items: {
        cn: { 1: "飙炮卡", 2: "召唤卡", 3: "冰冻卡", 4: "电网卡" },
        en: {
          1: "Speed-Up",
          2: "Summon",
          3: "Freeze",
          4: "Electric Nets",
        },
        th: {
          1: "การ์ดสปีด",
          2: "การ์ดอัญเชิญ",
          3: "การ์ดฟรีซ",
          4: "การ์ดแหไฟฟ้า",
        },
        vn: {
          1: "Thẻ Tốc Độ",
          2: "Thẻ Triệu Hồi",
          3: "Thẻ Đóng Băng",
          4: "Thẻ Lưới Điện",
        },
        ko: {
          1: "가속 카드",
          2: "소환 카드",
          3: "냉동 카드",
          4: "전력망 카드",
        },
      },
      sort: "6",
    },
  },
  AT101: {
    title: {
      cn: "奔驰宝马",
      en: "Supercars",
      th: "ซุปเปอร์คาร์",
      vn: "Siêu xe tốc độ",
    },
    sort: "4",
  },
  GO02: {
    title: {
      cn: "英雄捕鱼",
      en: "Hero Fishing",
      th: "ฮีโร่ตกปลา",
      vn: "Anh Hùng Bắn Cá",
    },
    ground_type: {
      cn: {
        1: "欢乐厅",
        2: "富豪厅",
        3: "海王厅",
      },
      en: {
        1: "Newbie",
        2: "Expert",
        3: "Royal",
      },
      th: {
        1: "ห้องมือใหม่",
        2: "ห้องเซียน",
        3: "ห้องรอยัล",
      },
      vn: {
        1: "Người Mới",
        2: "Phú Ông",
        3: "Hải Vương",
      },
    },
    sort: "5",
  },
  GO06: {
    title: {
      cn: "皇金渔场2",
      en: "Paradise 2",
      th: "แดนสวรรค์ 2",
      jp: "パラダイス 2",
      ko: "파라다이스 2",
      vn: "Trại Cá Hoàng Kim 2",
    },
    ground_type: {
      cn: {
        1: "秘境岛",
        2: "遗迹岛",
        3: "冰封岛",
        4: "熔岩岛",
        5: "财富岛",
      },
      en: {
        1: "Mystic Island",
        2: "Ruins Island",
        3: "Frozen Island",
        4: "Lava Island",
        5: "Fortune Island",
      },
      th: {
        1: "เกาะสมบัติลับ",
        2: "เกาะโบราณสถาน",
        3: "เกาะน้ำแข็ง",
        4: "เกาะลาวา",
        5: "เกาะโชคลาภ",
      },
      jp: {
        1: "秘境の島",
        2: "遺跡の島",
        3: "氷結の島",
        4: "溶岩の島",
        5: "財宝の島",
      },
      ko: {
        1: "비밀섬",
        2: "유적섬",
        3: "얼어붙은 섬",
        4: "용암섬",
        5: "포춘 섬",
      },
      vn: {
        1: "Đảo bí ẩn",
        2: "Đảo di tích",
        3: "Đảo băng",
        4: "Đảo dung nham",
        5: "Đảo tiền tài",
      },
    },
    items: {
      cn: { 1: "飙炮卡", 2: "召唤卡", 3: "冰冻卡", 4: "电网卡" },
      en: {
        1: "Speed-Up",
        2: "Summon",
        3: "Freeze",
        4: "Electric Nets",
      },
      th: {
        1: "การ์ดสปีด",
        2: "การ์ดอัญเชิญ",
        3: "การ์ดฟรีซ",
        4: "การ์ดแหไฟฟ้า",
      },
      jp: {
        1: "スピードアップ",
        2: "召喚",
        3: "フリーズ",
        4: "電気ネット",
      },
      ko: {
        1: "가속 카드",
        2: "소환 카드",
        3: "냉동 카드",
        4: "전력망 카드",
      },
      vn: {
        1: "Thẻ Tốc Độ",
        2: "Thẻ Triệu Hồi",
        3: "Thẻ Đóng Băng",
        4: "Thẻ Lưới Điện",
      },
    },
    sort: "9",
  },
  GO6901: {
    title: {
      cn: "AV鱼姬",
      en: "Sexy Mermaid",
      th: "เงือกน้อยสุดเอ็กซ์",
      vn: "Nàng tiên cá Sexy",
    },
    ground_type: {
      cn: {
        1: "诱惑房",
        2: "激情房",
        3: "爆射房",
      },
      en: {
        1: "Seduction Room",
        2: "Passion Room",
        3: "Creampie Room",
      },
      th: {
        1: "ห้องยั่วสวาท",
        2: "ห้องเร่าร้อน",
        3: "ห้องน้ำแตก",
      },
      vn: {
        1: "Phòng khiêu gợi",
        2: "Phòng đam mê",
        3: "Phòng bắn xả",
      },
      ko: {
        1: "유혹의 방",
        2: "열정의 방",
        3: "크림파이 방",
      },
    },
    items: {
      cn: { 1: "飙射卡", 2: "破膜卡", 3: "油冻卡", 4: "电绽卡" },
      en: { 1: "Speed-Up", 2: "Summon", 3: "Oil Gel", 4: "Electric Nets" },
      th: {
        1: "การ์ดสปีด",
        2: "การ์ดอัญเชิญ",
        3: "เจลน้ำมัน",
        4: "การ์ดแหไฟฟ้า",
      },
      vn: {
        1: "Thẻ Tốc Độ",
        2: "Thẻ Triệu Hồi",
        3: "Gel Dầu",
        4: "Thẻ Lưới Điện",
      },
      ko: { 1: "가속 카드", 2: "소환 카드", 3: "오일 젤", 4: "전력망 카드" },
    },
    sort: "10",
  },
  GO6902: {
    title: {
      cn: "西游姬 - 湿主别停",
      en: "西游姬 - 湿主别停",
      th: "西游姬 - 湿主别停",
      vn: "西游姬 - 湿主别停",
    },
    ground_type: {
      cn: { 1: "挑逗殿", 2: "魅惑殿", 3: "极乐殿" },
      en: { 1: "挑逗殿", 2: "魅惑殿", 3: "极乐殿" },
      th: { 1: "挑逗殿", 2: "魅惑殿", 3: "极乐殿" },
      vn: { 1: "挑逗殿", 2: "魅惑殿", 3: "极乐殿" },
    },
    sort: "11",
  },
});

export const setDocumentTitle = (lang = "") => {
  switch (lang) {
    case "cn":
    case "zh-cn":
      return "CQ9细单";
    case "en":
    default:
      return "CQ9 GAMES";
  }
};
