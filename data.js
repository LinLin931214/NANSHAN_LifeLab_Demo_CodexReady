window.APP_DATA = {
  "meta": {
    "version": "10.0.0",
    "updated": "2026-10-28",
    "productInfoUpdated": "2026-10-27",
    "currency": "NT$"
  },
  "events": [
    {
      "id": "accident",
      "monthlyPremium": 500,
      "age": 24,
      "stage": "20+｜啟程",
      "emoji": "🛵",
      "title": "通勤路上的意外",
      "story": "上班／上課途中發生意外，造成骨折、短期住院與復健，原本的打工與行程也被迫暫停。",
      "impact": "醫療支出、復健、自費項目與收入中斷可能同時出現。",
      "baseCost": 520000,
      "preparedCost": 360000,
      "prepInvestment": 28000,
      "product": {
        "category": "意外傷害保障",
        "example": "南山人壽溢帆風順2保險（HWPA2）",
        "note": "南山官網 2026 年商品簡介顯示，此商品包含壽險保障、意外傷害與健康管理等設計。實際是否適合仍須依投保資格、保額、條款與個人需求評估。",
        "url": "https://www.nanshanlife.com.tw/nanshanlife/products-health/"
      },
      "coverages": {
        "accident": 135000,
        "hospital": 20000,
        "daily": 5000
      }
    },
    {
      "id": "hospital",
      "monthlyPremium": 1500,
      "age": 33,
      "stage": "30+｜成長",
      "emoji": "🏥",
      "title": "突然需要住院手術",
      "story": "某次身體不適檢查後需要接受住院與手術。除了健保外，仍可能出現自費醫材、病房差額與休養期間支出。",
      "impact": "醫療費不是唯一成本，請假與休養也可能影響現金流。",
      "baseCost": 760000,
      "preparedCost": 475000,
      "prepInvestment": 95000,
      "product": {
        "category": "實支實付／住院醫療",
        "example": "南山人壽實踐幸福住院醫療健康保險附約（1HS）",
        "note": "南山官網現行醫療保障資訊包含實支實付、住院日額與手術醫療等類型；1HS 為官網可查之實支實付商品範例。實際給付仍依保單條款與理賠認定。",
        "url": "https://www.nanshanlife.com.tw/nanshanlife/products-health/"
      },
      "coverages": {
        "hospital": 235000,
        "surgery": 40000,
        "daily": 10000
      }
    },
    {
      "id": "critical",
      "monthlyPremium": 1500,
      "age": 46,
      "stage": "40+｜承擔",
      "emoji": "🫀",
      "title": "重大傷病打亂生活",
      "story": "健康檢查後進一步確診需要長期治療的重大傷病，治療之外，工作安排與家庭責任也同步受到影響。",
      "impact": "一次性的醫療費、長期治療、生活費與收入中斷可能疊加。",
      "baseCost": 2080000,
      "preparedCost": 1350000,
      "prepInvestment": 210000,
      "product": {
        "category": "特定傷病／重大疾病保障",
        "example": "南山人壽精選傷病定期保險(2)（TED）",
        "note": "南山官網 2026 年商品資訊顯示，TED 針對 41 項精選傷病依不同程度提供保障。實際承保與給付內容以正式條款為準。",
        "url": "https://www.nanshanlife.com.tw/nanshanlife/metabolic-product/"
      },
      "coverages": {
        "critical": 640000,
        "hospital": 80000,
        "daily": 10000
      }
    },
    {
      "id": "retirement",
      "monthlyPremium": 500,
      "age": 65,
      "stage": "60+｜轉變",
      "emoji": "🌅",
      "title": "退休生活的額外資金需求",
      "story": "退休階段需要一筆額外資金，用於無障礙住家調整與額外照護安排。這筆事件費用不包含已按月計入的基本生活費、旅費或一般住宅維護費。",
      "impact": "長壽本身就是一種需要規劃的財務風險。",
      "baseCost": 1440000,
      "preparedCost": 890000,
      "prepInvestment": 420000,
      "product": {
        "category": "年金保險／退休規劃",
        "example": "南山高齡退休規劃專區（年金保險類）",
        "note": "南山官網將『健康醫療、退休年金、長期照顧』列為老年保險規劃重點。年金商品涉及幣別、利率與資金運用，應依自身需求審慎評估。",
        "url": "https://www.nanshanlife.com.tw/nanshanlife/features-elderly-product/"
      },
      "coverages": {
        "retirement": 550000
      }
    },
    {
      "id": "ltc",
      "monthlyPremium": 1000,
      "age": 78,
      "stage": "80-｜長壽",
      "emoji": "🧓",
      "title": "需要長期照顧的那一天",
      "story": "因疾病、意外或老化而長期需要他人協助日常生活，除了照護費用，也可能讓家人投入大量時間與工作調整。",
      "impact": "長照常是長期、反覆、家庭共同承擔的風險。",
      "baseCost": 2560000,
      "preparedCost": 2000000,
      "prepInvestment": 260000,
      "product": {
        "category": "長期照顧保障",
        "example": "南山人壽輕鬆陪伴長期照顧健康保險（FLTC）",
        "note": "南山官網現行資訊顯示，FLTC 提供完全失能、長期照顧與豁免保險費等保障項目。實際承保年齡與給付條件以最新商品條款為準。",
        "url": "https://www.nanshanlife.com.tw/nanshanlife/products-long-term-care/"
      },
      "coverages": {
        "ltc": 560000
      }
    },
    {
      "id": "minor",
      "monthlyPremium": 0,
      "age": 0,
      "stage": "隨機生活情境",
      "emoji": "🤒",
      "title": "感冒門診與休養",
      "story": "這個月感冒看診，產生門診與交通支出；本遊戲的住院方案不涵蓋一般門診。",
      "impact": "影響本月收支與存款。",
      "baseCost": 24000,
      "preparedCost": 24000,
      "prepInvestment": 0,
      "coverages": {},
      "product": {
        "category": "緊急預備金",
        "example": "請查看此事件的相關保障方向",
        "note": "教育模擬設定。",
        "url": "https://www.nanshanlife.com.tw/nanshanlife/products-health/"
      }
    },
    {
      "id": "surgery_event",
      "monthlyPremium": 0,
      "age": 0,
      "stage": "隨機生活情境",
      "emoji": "🩺",
      "title": "突發闌尾炎手術",
      "story": "突然腹痛需要手術及短期住院，產生自費手術與病房費用。",
      "impact": "影響本月收支與存款。",
      "baseCost": 560000,
      "preparedCost": 454000,
      "prepInvestment": 0,
      "coverages": {
        "hospital": 60000,
        "surgery": 40000,
        "daily": 6000
      },
      "product": {
        "category": "住院醫療保障",
        "example": "請查看此事件的相關保障方向",
        "note": "教育模擬設定。",
        "url": "https://www.nanshanlife.com.tw/nanshanlife/products-health/"
      }
    },
    {
      "id": "cancer_event",
      "monthlyPremium": 0,
      "age": 0,
      "stage": "隨機生活情境",
      "emoji": "🎗️",
      "title": "癌症治療的第一階段",
      "story": "需要進行癌症療程與住院治療，療程支出讓原本的預算承受壓力。",
      "impact": "影響本月收支與存款。",
      "baseCost": 1920000,
      "preparedCost": 1360000,
      "prepInvestment": 0,
      "coverages": {
        "cancer": 300000,
        "critical": 200000,
        "hospital": 50000,
        "daily": 10000
      },
      "product": {
        "category": "癌症醫療保障",
        "example": "請查看此事件的相關保障方向",
        "note": "教育模擬設定。",
        "url": "https://www.nanshanlife.com.tw/nanshanlife/products-health/"
      }
    },
    {
      "id": "peaceful",
      "monthlyPremium": 0,
      "age": 0,
      "stage": "隨機生活情境",
      "emoji": "🏆",
      "title": "平安過關！",
      "story": "這十年無大額意外開銷，健康與生活穩穩向前。收入、生活費與保費已照常累計；先喘口氣，再迎接下一個十年。",
      "impact": "影響本月收支與存款。",
      "baseCost": 0,
      "preparedCost": 0,
      "prepInvestment": 0,
      "coverages": {},
      "product": {
        "category": "緊急預備金",
        "example": "請查看此事件的相關保障方向",
        "note": "教育模擬設定。",
        "url": "https://www.nanshanlife.com.tw/nanshanlife/products-health/"
      }
    },
    {
      "id": "lottery",
      "monthlyPremium": 0,
      "age": 0,
      "stage": "幸運時刻",
      "emoji": "🍀",
      "title": "幸運中了樂透小獎",
      "story": "偶然收到一筆小額中獎獎金，這筆額外入帳可以補充緊急預備金。獎金為假設淨入帳，不模擬購買彩券。",
      "impact": "增加存款。",
      "baseCost": 0,
      "preparedCost": 0,
      "prepInvestment": 0,
      "bonus": 2000,
      "coverages": {},
      "product": {
        "category": "額外收入",
        "example": "額外入帳不屬於保險給付",
        "note": "遊戲情境",
        "url": "https://www.nanshanlife.com.tw/nanshanlife/products-health/"
      }
    },
    {
      "id": "fall",
      "monthlyPremium": 0,
      "age": 0,
      "stage": "隨機事件",
      "emoji": "🩼",
      "title": "樓梯踩空，骨折住院",
      "story": "一個踩空，骨折、住院和復健接踵而來。原本留給生活的錢，突然變成醫療帳單。",
      "impact": "影響現金餘額",
      "baseCost": 360000,
      "preparedCost": 280000,
      "prepInvestment": 0,
      "coverages": {
        "accident": 50000,
        "hospital": 25000,
        "daily": 5000
      },
      "product": {
        "category": "相關保障方向",
        "example": "參閱官方條款",
        "note": "模擬金額",
        "url": "https://www.nanshanlife.com.tw/nanshanlife/products-health/"
      }
    },
    {
      "id": "sports",
      "monthlyPremium": 0,
      "age": 0,
      "stage": "隨機事件",
      "emoji": "🏸",
      "title": "球場上的韌帶受傷",
      "story": "一場球賽扭傷韌帶，需要手術與復健，醫療費讓你措手不及。",
      "impact": "影響現金餘額",
      "baseCost": 520000,
      "preparedCost": 385000,
      "prepInvestment": 0,
      "coverages": {
        "accident": 60000,
        "surgery": 50000,
        "hospital": 25000
      },
      "product": {
        "category": "相關保障方向",
        "example": "參閱官方條款",
        "note": "模擬金額",
        "url": "https://www.nanshanlife.com.tw/nanshanlife/products-health/"
      }
    },
    {
      "id": "burn",
      "monthlyPremium": 0,
      "age": 0,
      "stage": "隨機事件",
      "emoji": "🔥",
      "title": "料理時不慎燙傷",
      "story": "熱油濺出造成燙傷，需要傷口治療與回診，累積一筆意外支出。",
      "impact": "影響現金餘額",
      "baseCost": 224000,
      "preparedCost": 189000,
      "prepInvestment": 0,
      "coverages": {
        "accident": 35000
      },
      "product": {
        "category": "相關保障方向",
        "example": "參閱官方條款",
        "note": "模擬金額",
        "url": "https://www.nanshanlife.com.tw/nanshanlife/products-health/"
      }
    },
    {
      "id": "bike",
      "monthlyPremium": 0,
      "age": 0,
      "stage": "隨機事件",
      "emoji": "🚲",
      "title": "單車摔倒，急診與治療",
      "story": "騎車時失去平衡摔倒，需要急診處置與後續治療。",
      "impact": "影響現金餘額",
      "baseCost": 176000,
      "preparedCost": 151000,
      "prepInvestment": 0,
      "coverages": {
        "accident": 25000
      },
      "product": {
        "category": "相關保障方向",
        "example": "參閱官方條款",
        "note": "模擬金額",
        "url": "https://www.nanshanlife.com.tw/nanshanlife/products-health/"
      }
    },
    {
      "id": "car_collision",
      "monthlyPremium": 0,
      "age": 0,
      "stage": "隨機事件",
      "emoji": "🚘",
      "title": "一聲碰撞，修車帳單來了",
      "story": "車對車碰撞讓愛車受損，需要支付自己的車體維修費；本事件不含對方損害。",
      "impact": "影響現金餘額",
      "baseCost": 360000,
      "preparedCost": 360000,
      "prepInvestment": 0,
      "coverages": {
        "car": 1
      },
      "product": {
        "category": "相關保障方向",
        "example": "參閱官方條款",
        "note": "模擬金額",
        "url": "https://www.nanshanlife.com.tw/nanshanlife/products-health/"
      }
    },
    {
      "id": "car_damage",
      "monthlyPremium": 0,
      "age": 0,
      "stage": "隨機事件",
      "emoji": "💥",
      "title": "停車場的碰撞損傷",
      "story": "在停車場與另一台已確認身分的汽車擦撞，板金與零件需要維修。",
      "impact": "影響現金餘額",
      "baseCost": 200000,
      "preparedCost": 200000,
      "prepInvestment": 0,
      "coverages": {
        "car": 1
      },
      "product": {
        "category": "相關保障方向",
        "example": "參閱官方條款",
        "note": "模擬金額",
        "url": "https://www.nanshanlife.com.tw/nanshanlife/products-health/"
      }
    },
    {
      "id": "house_fire",
      "monthlyPremium": 0,
      "age": 0,
      "stage": "隨機事件",
      "emoji": "🏚️",
      "title": "住宅火災，生活被打亂",
      "story": "火災造成住宅損害，需要修復建物與裝潢。支出限於本事件的建物修復假設。",
      "impact": "影響現金餘額",
      "baseCost": 1280000,
      "preparedCost": 1280000,
      "prepInvestment": 0,
      "coverages": {
        "house": 1
      },
      "product": {
        "category": "相關保障方向",
        "example": "參閱官方條款",
        "note": "模擬金額",
        "url": "https://www.nanshanlife.com.tw/nanshanlife/products-health/"
      }
    },
    {
      "id": "hiking",
      "emoji": "🥾",
      "title": "登山滑倒，需要救援與治療",
      "story": "假日登山踩空，除了急診與醫療，還有自付的交通救援支出。",
      "baseCost": 624000,
      "coverages": {
        "accident": 65000,
        "hospital": 20000
      },
      "monthlyPremium": 0,
      "age": 0,
      "stage": "隨機意外",
      "impact": "影響現金",
      "preparedCost": 539000,
      "prepInvestment": 0,
      "product": {
        "category": "意外保障",
        "example": "請查看官方資訊",
        "note": "遊戲假設",
        "url": "https://www.nanshanlife.com.tw/nanshanlife/products-health/"
      }
    },
    {
      "id": "glass",
      "emoji": "🩹",
      "title": "玻璃割傷，急診縫合",
      "story": "打掃時被碎玻璃割傷，急診處理與回診累積一筆費用。",
      "baseCost": 80000,
      "coverages": {
        "accident": 12000
      },
      "monthlyPremium": 0,
      "age": 0,
      "stage": "隨機意外",
      "impact": "影響現金",
      "preparedCost": 68000,
      "prepInvestment": 0,
      "product": {
        "category": "意外保障",
        "example": "請查看官方資訊",
        "note": "遊戲假設",
        "url": "https://www.nanshanlife.com.tw/nanshanlife/products-health/"
      }
    },
    {
      "id": "fracture",
      "emoji": "🦴",
      "title": "雨天滑倒，手腕骨折",
      "story": "下雨天在濕滑路面摔倒，骨折治療與復健需要花錢。",
      "baseCost": 336000,
      "coverages": {
        "accident": 50000,
        "hospital": 15000
      },
      "monthlyPremium": 0,
      "age": 0,
      "stage": "隨機意外",
      "impact": "影響現金",
      "preparedCost": 271000,
      "prepInvestment": 0,
      "product": {
        "category": "意外保障",
        "example": "請查看官方資訊",
        "note": "遊戲假設",
        "url": "https://www.nanshanlife.com.tw/nanshanlife/products-health/"
      }
    },
    {
      "id": "scooter",
      "emoji": "🛵",
      "title": "機車擦撞，住院休養",
      "story": "通勤時遭遇擦撞，需要住院、復健與部分自費醫材。",
      "baseCost": 880000,
      "coverages": {
        "accident": 100000,
        "hospital": 60000,
        "daily": 8000
      },
      "monthlyPremium": 0,
      "age": 0,
      "stage": "隨機意外",
      "impact": "影響現金",
      "preparedCost": 712000,
      "prepInvestment": 0,
      "product": {
        "category": "意外保障",
        "example": "請查看官方資訊",
        "note": "遊戲假設",
        "url": "https://www.nanshanlife.com.tw/nanshanlife/products-health/"
      }
    },
    {
      "id": "eye",
      "emoji": "👁️",
      "title": "運動碰傷眼睛",
      "story": "運動時遭碰撞，眼部檢查、處置與後續回診成為意外支出。",
      "baseCost": 384000,
      "coverages": {
        "accident": 40000
      },
      "monthlyPremium": 0,
      "age": 0,
      "stage": "隨機意外",
      "impact": "影響現金",
      "preparedCost": 344000,
      "prepInvestment": 0,
      "product": {
        "category": "意外保障",
        "example": "請查看官方資訊",
        "note": "遊戲假設",
        "url": "https://www.nanshanlife.com.tw/nanshanlife/products-health/"
      }
    },
    {
      "id": "dislocation",
      "emoji": "🏀",
      "title": "肩膀脫臼與復健",
      "story": "打球跌倒導致肩膀脫臼，治療後還有一段復健療程。",
      "baseCost": 256000,
      "coverages": {
        "accident": 35000
      },
      "monthlyPremium": 0,
      "age": 0,
      "stage": "隨機意外",
      "impact": "影響現金",
      "preparedCost": 221000,
      "prepInvestment": 0,
      "product": {
        "category": "意外保障",
        "example": "請查看官方資訊",
        "note": "遊戲假設",
        "url": "https://www.nanshanlife.com.tw/nanshanlife/products-health/"
      }
    },
    {
      "id": "car_rear",
      "emoji": "🚙",
      "title": "車對車追撞，維修費增加",
      "story": "與另一輛已確認身分的汽車碰撞，自己的車需要維修。此費用不含賠償對方。",
      "baseCost": 520000,
      "coverages": {
        "car": 1
      },
      "monthlyPremium": 0,
      "age": 0,
      "stage": "隨機意外",
      "impact": "影響現金",
      "preparedCost": 520000,
      "prepInvestment": 0,
      "product": {
        "category": "意外保障",
        "example": "請查看官方資訊",
        "note": "遊戲假設",
        "url": "https://www.nanshanlife.com.tw/nanshanlife/products-health/"
      }
    },
    {
      "id": "house_smoke",
      "emoji": "🏡",
      "title": "火災煙損，住宅需要修復",
      "story": "鄰近火災波及建物與裝潢，清理及修復是一筆額外支出。",
      "baseCost": 760000,
      "coverages": {
        "house": 1
      },
      "monthlyPremium": 0,
      "age": 0,
      "stage": "隨機意外",
      "impact": "影響現金",
      "preparedCost": 760000,
      "prepInvestment": 0,
      "product": {
        "category": "意外保障",
        "example": "請查看官方資訊",
        "note": "遊戲假設",
        "url": "https://www.nanshanlife.com.tw/nanshanlife/products-health/"
      }
    },
    {
      "id": "stroke",
      "emoji": "🧠",
      "title": "腦中風後的治療與復健",
      "story": "緊急治療後需要長期復健與照護，醫療與照護帳單持續累積。",
      "baseCost": 2880000,
      "coverages": {
        "critical": 900000,
        "hospital": 300000,
        "ltc": 500000
      },
      "monthlyPremium": 0,
      "age": 0,
      "stage": "高額風險",
      "impact": "高額自付支出",
      "preparedCost": 1180000,
      "prepInvestment": 0,
      "product": {
        "category": "相關保障",
        "example": "可進一步了解官方商品",
        "note": "遊戲假設",
        "url": "https://www.nanshanlife.com.tw/nanshanlife/products-health/"
      }
    },
    {
      "id": "cardiac",
      "emoji": "🫀",
      "title": "突發心臟疾病需要手術",
      "story": "突然住院並接受心臟治療，自費醫材、手術與後續復原帶來高額支出。",
      "baseCost": 2000000,
      "coverages": {
        "critical": 700000,
        "hospital": 250000,
        "surgery": 180000
      },
      "monthlyPremium": 0,
      "age": 0,
      "stage": "高額風險",
      "impact": "高額自付支出",
      "preparedCost": 870000,
      "prepInvestment": 0,
      "product": {
        "category": "相關保障",
        "example": "可進一步了解官方商品",
        "note": "遊戲假設",
        "url": "https://www.nanshanlife.com.tw/nanshanlife/products-health/"
      }
    },
    {
      "id": "chronic_care",
      "emoji": "🧑‍⚕️",
      "title": "慢性病併發症，照護成為長期支出",
      "story": "反覆治療與生活協助讓支出拉長，原本的存款需要支撐更久。",
      "baseCost": 2400000,
      "coverages": {
        "critical": 650000,
        "hospital": 200000,
        "ltc": 700000
      },
      "monthlyPremium": 0,
      "age": 0,
      "stage": "高額風險",
      "impact": "高額自付支出",
      "preparedCost": 850000,
      "prepInvestment": 0,
      "product": {
        "category": "相關保障",
        "example": "可進一步了解官方商品",
        "note": "遊戲假設",
        "url": "https://www.nanshanlife.com.tw/nanshanlife/products-health/"
      }
    },
    {
      "id": "major_trauma",
      "emoji": "🚑",
      "title": "嚴重交通傷害與多次手術",
      "story": "一次意外帶來多次手術、復健與照護，本關以一次性合計費用呈現。",
      "baseCost": 1760000,
      "coverages": {
        "accident": 350000,
        "hospital": 300000,
        "surgery": 150000,
        "daily": 30000
      },
      "monthlyPremium": 0,
      "age": 0,
      "stage": "高額風險",
      "impact": "高額自付支出",
      "preparedCost": 930000,
      "prepInvestment": 0,
      "product": {
        "category": "相關保障",
        "example": "可進一步了解官方商品",
        "note": "遊戲假設",
        "url": "https://www.nanshanlife.com.tw/nanshanlife/products-health/"
      }
    }
  ],
  "sources": [
    {
      "title": "南山人壽｜健康醫療與意外傷害商品",
      "url": "https://www.nanshanlife.com.tw/nanshanlife/products-health/",
      "note": "住院日額、實支實付、手術醫療、重大疾病、意外傷害等分類。"
    },
    {
      "title": "南山人壽｜長期照顧保險",
      "url": "https://www.nanshanlife.com.tw/nanshanlife/products-long-term-care/",
      "note": "長期照顧與完全失能等相關商品資訊。"
    },
    {
      "title": "南山人壽｜高齡退休規劃",
      "url": "https://www.nanshanlife.com.tw/nanshanlife/features-elderly-product/",
      "note": "健康醫療、退休年金、長期照顧、小額終老等高齡規劃方向。"
    },
    {
      "title": "南山人壽｜NS 小學堂",
      "url": "https://www.nanshanlife.com.tw/nanshanlife/products-nsclass/",
      "note": "保險名詞與實支實付、意外傷害事故等基礎教育。"
    }
  ],
  "plans": [
    {
      "id": "accident",
      "emoji": "🛵",
      "name": "意外傷害保障",
      "monthlyPremium": 500,
      "description": "意外造成的傷害與復健費用",
      "url": "https://www.nanshanlife.com.tw/eCommerce/rwd/ECPA1A_ECPA1B_ECPA1C/product",
      "example": "南山人壽網路投保iLike相挺傷害保險",
      "reference": "官方提供依投保條件試算的入口；下方500元為遊戲概估，不是此商品的報價。",
      "details": [
        "可進一步了解南山人壽網路投保iLike相挺傷害保險；官方區分基本、通勤、全能款。",
        "依款別可有意外失能、特定交通事故、骨折等不同項目，並不是每筆意外醫療費都全額支付。",
        "醫療實支、住院與骨折等給付須分別確認條款，不能把本遊戲自付額當作商品承諾。"
      ]
    },
    {
      "id": "hospital",
      "emoji": "🏥",
      "name": "住院醫療保障",
      "monthlyPremium": 1500,
      "description": "住院、自費醫材與病房支出",
      "url": "https://www.nanshanlife.com.tw/nanshanlife/portal-api/File/2462",
      "example": "南山人壽實踐幸福住院醫療健康保險附約（1HS）",
      "reference": "官方2025年6月版型錄第12頁提供年繳費率表，依性別、年齡、型別及初次／續保區分；附約另需搭配主契約，總保費須一併確認。",
      "details": [
        "1HS是住院醫療附約，需確認搭配主契約的條件與總保費。",
        "官方型錄列有不同型別的病房費、醫院雜費與手術費等項目及限額。",
        "應確認同次住院定義、自負項目、健保身分、實支給付方式及投保／續保規則。"
      ]
    },
    {
      "id": "critical",
      "emoji": "🫀",
      "name": "重大疾病／特定傷病保障",
      "monthlyPremium": 1500,
      "description": "符合條件的特定重大疾病",
      "example": "南山人壽精選傷病定期保險(2)（TED）",
      "url": "https://www.nanshanlife.com.tw/nanshanlife/metabolic-product/",
      "reference": "官方商品／分類入口供進一步了解；下方固定金額僅為遊戲收支概估，不是該商品實際保費。",
      "details": [
        "可進一步了解精選傷病定期保險(2)（TED），保障依條款定義的特定疾病或傷病。",
        "須確認診斷條件、疾病程度、等待期間、各項給付及保險金額，不能只以「生病」判斷可賠。"
      ]
    },
    {
      "id": "retirement",
      "emoji": "🌅",
      "name": "退休年金準備",
      "monthlyPremium": 500,
      "description": "遊戲中的退休資金準備；實際年金需長期累積與約定給付條件",
      "url": "https://www.nanshanlife.com.tw/nanshanlife/features-elderly-product/",
      "example": "南山官方保障分類：退休年金準備",
      "reference": "官方商品／分類入口供進一步了解；下方固定金額僅為遊戲收支概估，不是該商品實際保費。",
      "details": [
        "年金／退休商品是資金累積與約定給付安排，不等同發生退休費用就直接報銷。",
        "須核對繳費年期、給付開始時間、保證／非保證項目、幣別及解約風險。"
      ]
    },
    {
      "id": "ltc",
      "emoji": "🧓",
      "name": "長期照顧保障",
      "monthlyPremium": 1000,
      "description": "符合長期照顧狀態的照護支出",
      "example": "南山人壽輕鬆陪伴長期照顧健康保險（FLTC）",
      "url": "https://www.nanshanlife.com.tw/nanshanlife/products-long-term-care/",
      "reference": "官方商品／分類入口供進一步了解；下方固定金額僅為遊戲收支概估，不是該商品實際保費。",
      "details": [
        "長期照顧保障需符合保單約定的長照或失能狀態與持續期間。",
        "可進一步了解南山官方長照商品與FLTC既有商品資料；應確認目前是否可投保、給付頻率、豁免保費及除外責任。"
      ]
    },
    {
      "id": "surgery",
      "emoji": "🩺",
      "name": "手術醫療保障",
      "monthlyPremium": 600,
      "description": "手術相關支出",
      "url": "https://www.nanshanlife.com.tw/nanshanlife/products-health/",
      "example": "南山官方保障分類：手術醫療保障",
      "reference": "官方商品／分類入口供進一步了解；下方固定金額僅為遊戲收支概估，不是該商品實際保費。",
      "details": [
        "手術保障可能採定額、手術表比例或費用限額等方式，依商品設計不同。",
        "可查看南山健康醫療官方分類及1HS型錄，核對住院手術與門診手術是否各自承保。"
      ]
    },
    {
      "id": "daily",
      "emoji": "🛏️",
      "name": "住院日額保障",
      "monthlyPremium": 300,
      "description": "住院期間的定額補貼",
      "url": "https://www.nanshanlife.com.tw/nanshanlife/products-health/",
      "example": "南山官方保障分類：住院日額保障",
      "reference": "官方商品／分類入口供進一步了解；下方固定金額僅為遊戲收支概估，不是該商品實際保費。",
      "details": [
        "住院日額通常按符合條件的住院日數與約定金額計算，與實支實付核銷不同。",
        "需確認住院必要性、天數上限、加護／燒燙傷病房及不保事項；商品與附約條件依官網。"
      ]
    },
    {
      "id": "cancer",
      "emoji": "🎗️",
      "name": "癌症醫療保障",
      "monthlyPremium": 800,
      "description": "癌症療程相關支出",
      "url": "https://www.nanshanlife.com.tw/nanshanlife/products-health/",
      "example": "南山官方保障分類：癌症醫療保障",
      "reference": "官方商品／分類入口供進一步了解；下方固定金額僅為遊戲收支概估，不是該商品實際保費。",
      "details": [
        "南山官方健康醫療分類提供癌症醫療保障入口。",
        "不同商品可能依癌症程度、療程或一次性給付設計；須確認診斷定義、等待期間與治療項目。"
      ]
    }
  ],
  "stages": [
    {
      "age": 20,
      "name": "20+｜起步",
      "pool": [
        "accident",
        "minor",
        "major_trauma"
      ]
    },
    {
      "age": 30,
      "name": "30+｜成長",
      "pool": [
        "hospital",
        "surgery_event",
        "major_trauma",
        "cardiac"
      ]
    },
    {
      "age": 40,
      "name": "40+｜累積",
      "pool": [
        "hospital",
        "critical",
        "surgery_event",
        "cardiac",
        "cancer_event"
      ]
    },
    {
      "age": 50,
      "name": "50+｜轉折",
      "pool": [
        "critical",
        "cancer_event",
        "hospital",
        "stroke",
        "cardiac",
        "chronic_care"
      ]
    },
    {
      "age": 60,
      "name": "60+｜退休",
      "pool": [
        "retirement",
        "cancer_event",
        "hospital",
        "stroke",
        "chronic_care",
        "ltc"
      ]
    },
    {
      "age": 70,
      "name": "70+｜熟齡",
      "pool": [
        "ltc",
        "hospital",
        "critical",
        "stroke",
        "chronic_care",
        "ltc"
      ]
    }
  ],
  "economy": {
    "yearsPerStage": 10,
    "salaryGrowth": 0.03,
    "expenseGrowth": 0.02,
    "premiumGrowth": 0,
    "retirementAge": 60,
    "pensionRatio": 0.4,
    "travelTaskChance": 0.3,
    "travelAccidentChance": 0.35,
    "tripCost": 30000,
    "travelMedicalCost": 360000,
    "travelPlans": [
      {
        "id": "none",
        "name": "不加保",
        "premium": 0,
        "benefit": 0,
        "share": 0
      },
      {
        "id": "basic",
        "name": "海外醫療基本方案",
        "premium": 1500,
        "benefit": 180000,
        "share": 0.7
      },
      {
        "id": "plus",
        "name": "海外醫療加強方案",
        "premium": 3000,
        "benefit": 360000,
        "share": 0.9
      }
    ],
    "car": {
      "price": 1000000,
      "downPayment": 600000,
      "loanPrincipal": 400000,
      "loanMonthly": 7500,
      "loanYears": 5,
      "monthlyRunning": 5000,
      "eventChance": 0.2,
      "eventCost": 120000,
      "plans": [
        {
          "id": "none",
          "name": "不配置額外保障",
          "monthly": 0,
          "benefit": 0,
          "share": 0
        },
        {
          "id": "basic",
          "name": "汽車基本保障",
          "monthly": 500,
          "benefit": 70000,
          "share": 0.7
        },
        {
          "id": "plus",
          "name": "汽車加強保障",
          "monthly": 1500,
          "benefit": 110000,
          "share": 0.85
        }
      ]
    },
    "house": {
      "price": 10000000,
      "downPayment": 2000000,
      "loanPrincipal": 8000000,
      "mortgageMonthly": 34000,
      "mortgageYears": 30,
      "monthlyMaintenance": 2000,
      "rentReduction": 8000,
      "eventChance": 0.1,
      "eventCost": 300000,
      "plans": [
        {
          "id": "none",
          "name": "不配置住宅保障",
          "monthly": 0,
          "benefit": 0,
          "share": 0
        },
        {
          "id": "basic",
          "name": "住宅火災／地震基本方案",
          "monthly": 200,
          "benefit": 200000,
          "share": 0.7
        },
        {
          "id": "plus",
          "name": "住宅加強方案",
          "monthly": 500,
          "benefit": 280000,
          "share": 0.85
        }
      ]
    },
    "salePrice": 10000000,
    "saleFeeRate": 0.02,
    "annualEventChance": 0.22,
    "stageEventChance": 0.45,
    "uninsuredStageEventChance": 0.65,
    "stageRiskRates": [
      0.47,
      0.52,
      0.58,
      0.62,
      0.67,
      0.7
    ],
    "uninsuredRiskRates": [
      0.64,
      0.68,
      0.72,
      0.75,
      0.77,
      0.78
    ],
    "premiumAgeFactors": [
      1,
      1.1,
      1.25,
      1.45,
      1.7,
      2
    ],
    "medicalAgeFactors": [
      1,
      1.1,
      1.25,
      1.45,
      1.7,
      2
    ],
    "coverageTiers": [
      {
        "id": "base",
        "name": "維持基本保障",
        "fee": 1,
        "benefit": 1,
        "share": 0.6
      },
      {
        "id": "boost",
        "name": "加重保障",
        "fee": 1.35,
        "benefit": 1.25,
        "share": 0.75
      },
      {
        "id": "max",
        "name": "高額保障",
        "fee": 1.75,
        "benefit": 1.5,
        "share": 0.9
      }
    ],
    "severityLevels": [
      {
        "name": "一般衝擊",
        "factor": 1
      },
      {
        "name": "較重衝擊",
        "factor": 1.35
      },
      {
        "name": "重大衝擊",
        "factor": 1.8
      }
    ]
  },
  "catalog": {
    "car": {
      "id": "car",
      "name": "車體損失保障",
      "example": "南山產物汽車車體損失保險",
      "url": "https://www.nanshangeneral.com.tw/product_personal-automobile-insurance_pd/",
      "details": [
        "保障自己的車輛損失，與賠償對方的第三人責任險不同。",
        "官網分甲、乙、丙式：三者皆涵蓋車對車碰撞；甲、乙式另有碰撞、傾覆及部分火災等承保項目。",
        "丙式車對車碰撞須符合條款並確認對方車輛；另需留意自負額、不保事項與附加天災保障。"
      ],
      "note": "本遊戲基本／加強給付不等同任何甲乙丙式的實際保額。"
    },
    "liability": {
      "id": "liability",
      "name": "第三人責任保障",
      "example": "南山產物汽車第三人責任保險（自用車）",
      "url": "https://www.nanshangeneral.com.tw/product_personal-automobile-insurance_liability/",
      "details": [
        "針對依法需向車外第三人賠償的體傷、財物損害。",
        "不賠自己車體，也不等同車上駕駛人或乘客保障；可進一步了解駕駛人、乘客與超額責任附加條款。"
      ],
      "note": "本遊戲未配置此險，僅供進一步了解，不列為自己車體維修的給付。"
    },
    "house": {
      "id": "house",
      "name": "住宅火災／地震保障",
      "example": "南山產物住宅火災及地震基本保險",
      "url": "https://www.nanshangeneral.com.tw/product_residence-insurance_01/",
      "details": [
        "官方商品列有住宅火災、第三人責任、玻璃、颱風洪水災害補償與地震基本保險等內容。",
        "住宅火險保額按建物重置成本等估算，不含土地，並非直接等同購屋價或房貸金額。",
        "地震基本險主要針對符合條件的建築物全損，不能視為任何地震修繕都會給付。"
      ],
      "note": "各承保項目、自負額及限制依正式條款，遊戲給付不是實際保單試算。"
    },
    "travel": {
      "id": "travel",
      "name": "海外旅行醫療保障",
      "example": "南山產物海外旅行綜合險－單次型",
      "url": "https://www.nanshangeneral.com.tw/product_personal-travel_01/",
      "details": [
        "官方提供旅行傷害、海外突發疾病相關保障及可進一步了解的旅行不便內容。",
        "旅行不便保險與醫療給付分屬不同保障，須看實際投保項目。",
        "旅程出發前須完成投保；醫療必要性、疾病定義、限額與不保事項依條款。"
      ],
      "note": "按旅程單次計費，不收終身月費；下一次旅行須重新確認投保。"
    }
  },
  "timeline": [
    {
      "age": 20,
      "start": 0,
      "years": 10
    },
    {
      "age": 30,
      "start": 10,
      "years": 10
    },
    {
      "age": 40,
      "start": 20,
      "years": 10
    },
    {
      "age": 50,
      "start": 30,
      "years": 10
    },
    {
      "age": 60,
      "start": 40,
      "years": 10
    },
    {
      "age": 70,
      "start": 50,
      "years": 10
    }
  ],
  "eventPhotos": {
    "burn": {
      "src": "./assets/events/burn-v1.png",
      "alt": "廚房料理時熱油濺起，一名成人退開並關閉爐火的情境",
      "label": "日常意外",
      "tone": "amber",
      "position": "50% 45%"
    },
    "car": {
      "src": "./assets/events/car-v1.png",
      "alt": "道路碰撞後的車輛受損與安全處理事故的情境",
      "label": "交通事故",
      "tone": "slate",
      "position": "50% 55%"
    },
    "hospital": {
      "src": "./assets/events/hospital-v1.png",
      "alt": "醫師在明亮病房向病人說明照護安排的情境",
      "label": "健康與醫療",
      "tone": "blue",
      "position": "50% 45%"
    },
    "outdoor": {
      "src": "./assets/events/outdoor-v1.png",
      "alt": "登山步道上同伴照顧腳踝受傷者的情境",
      "label": "戶外意外",
      "tone": "forest",
      "position": "50% 55%"
    },
    "sports": {
      "src": "./assets/events/sports-v1.png",
      "alt": "運動球場邊休息並照顧膝傷的球友情境",
      "label": "運動傷害",
      "tone": "blue",
      "position": "50% 50%"
    },
    "travel": {
      "src": "./assets/events/travel-v1.png",
      "alt": "旅人在陽光下欣賞海外海岸小鎮的旅行情境",
      "label": "旅途時刻",
      "tone": "sea",
      "position": "50% 50%"
    },
    "peace-young": {
      "src": "./assets/events/peace-young-v1.png",
      "alt": "年輕朋友在晴朗河濱公園輕鬆騎自行車的平安生活",
      "label": "把日子過成喜歡的樣子",
      "tone": "sunlight",
      "position": "50% 50%"
    },
    "peace-family": {
      "src": "./assets/events/peace-family-v1.png",
      "alt": "一家人在金色夕陽下的海灘散步，享受平安時光",
      "label": "有陪伴，就是好日子",
      "tone": "sunset",
      "position": "50% 50%"
    },
    "peace-senior": {
      "src": "./assets/events/peace-senior-v1.png",
      "alt": "熟齡伴侶在花園裡照料花草並開心交談",
      "label": "慢慢生活，安穩幸福",
      "tone": "garden",
      "position": "50% 45%"
    },
    "house": {
      "src": "./assets/events/house-v1.png",
      "alt": "小型火災熄滅後的住宅修復與屋主查看損失的情境",
      "label": "居家風險",
      "tone": "amber",
      "position": "50% 50%"
    },
    "lucky": {
      "src": "./assets/events/lucky-v1.png",
      "alt": "成人在咖啡館得知小額獎金後開心微笑的情境",
      "label": "生活送來的小驚喜",
      "tone": "sunlight",
      "position": "50% 45%"
    },
    "cycling": {
      "src": "./assets/events/cycling-v1.png",
      "alt": "自行車跌倒後在安全路邊休息、朋友協助照顧的情境",
      "label": "通勤與騎乘風險",
      "tone": "forest",
      "position": "50% 50%"
    }
  },
  "eventPhotoMap": {
    "burn": "burn",
    "car_collision": "car",
    "car_damage": "car",
    "car_rear": "car",
    "hospital": "hospital",
    "surgery_event": "hospital",
    "critical": "hospital",
    "cancer_event": "hospital",
    "ltc": "hospital",
    "minor": "hospital",
    "glass": "hospital",
    "hiking": "outdoor",
    "fall": "outdoor",
    "fracture": "outdoor",
    "sports": "sports",
    "dislocation": "sports",
    "eye": "sports",
    "trip": "travel",
    "house_fire": "house",
    "house_smoke": "house",
    "lottery": "lucky",
    "accident": "cycling",
    "bike": "cycling",
    "scooter": "cycling",
    "retirement": "peace-senior",
    "home": "peace-family",
    "stroke": "hospital",
    "cardiac": "hospital",
    "chronic_care": "hospital",
    "major_trauma": "cycling"
  }
};
