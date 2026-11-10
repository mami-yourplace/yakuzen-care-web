// 各体質の該当割合を計算する
// 0%は表示しない
// 割合の高い順に並べる
// 体質を決めるのではなく「この順番で見てみましょう」と表示する

const symptoms = [
    {
        symptom: "朝起きるのがつらい",
        types: ["気虚"],
        group: 1
    },
    //{
    //    symptom: "少し動いただけでも汗をかきやすい",
    //    types: ["気虚", "水滞"]
    //},
    {
        symptom: "風邪を引きやすく、長引きやすい",
        types: ["気虚"],
        group: 1
    },
    //{
    //    symptom: "下痢や軟らかい便になりやすい",
    //    types: ["気虚", "水滞"]
    //},
    {
        symptom: "胃もたれしやすい",
        types: ["気虚", "水滞"],
        group: 1
    },
    {
        symptom: "手足が冷えやすい",
        types: ["気虚", "瘀血", "水滞"],
        group: 1


    },
    {
        symptom: "一日中だるさや疲れが抜けない",
        types: ["気虚", "水滞"],
        group: 1
    },
    {
        symptom: "イライラしやすく、怒りっぽい",
        types: ["気滞"],
        group: 2
    },
    {
        symptom: "ため息が多い",
        types: ["気滞"],
        group: 2
    },
    {
        symptom: "お腹にガスが溜まりやすく、ゲップやオナラが出やすい",
        types: ["気滞"],
        group: 2
    },
    {
        symptom: "喉や胸がつかえたような違和感がある",
        types: ["気滞"],
        group: 2
    },
    {
        symptom: "環境や気候の変化で体調を崩しやすい",
        types: ["気滞", "水滞"],
        group: 2
    },
    {
        symptom: "食欲にムラがある",
        types: ["気滞", "気虚"],
        group: 2
    },
    {
        symptom: "月経前に具合が悪くなり、気分が不安定になりやすい",
        types: ["気滞", "瘀血"],
        group: 2
    },
    {
        symptom: "夜なかなか寝付けない",
        types: ["血虚", "気滞"],
        group: 3
    },
    {
        symptom: "眠りが浅く、夢をよく見る",
        types: ["血虚"],
        group: 3
    },
    {
        symptom: "めまいや立ちくらみが起こりやすい",
        types: ["血虚", "気虚", "水滞"],
        group: 3
    },
    {
        symptom: "目が疲れやすく、かすんだり乾燥しやすい",
        types: ["血虚"],
        group: 3
    },
    {
        symptom: "爪が割れやすい、薄い、縦じわが気になる",
        types: ["血虚"],
        group: 3
    },
    {
        symptom: "肌が乾燥しやすい",
        types: ["血虚"],
        group: 3
    },
    {
        symptom: "髪のパサつきや抜け毛が気になる",
        types: ["血虚"],
        group: 3
    },
    {
        symptom: "便が硬く、コロコロしやすい",
        types: ["血虚"],
        group: 3
    },
    {
        symptom: "手足がしびれやすい",
        types: ["血虚", "瘀血"],
        group: 3
    },
    {
        symptom: "足がつりやすい",
        types: ["血虚"],
        group: 3
    },
    {
        symptom: "月経周期が長くなったり、月経量が少ない",
        types: ["血虚"],
        group: 3
    },
    {
        symptom: "シミ・そばかすが気になる",
        types: ["瘀血"],
        group: 4
    },
    {
        symptom: "顔色がくすみがちで、目の下にクマができやすい",
        types: ["瘀血", "血虚"],
        group: 4
    },
    {
        symptom: "肩こりや腰痛がある",
        types: ["瘀血", "気滞"],
        group: 4
    },
    {
        symptom: "決まった場所に刺すような痛みを感じることがある",
        types: ["瘀血"],
        group: 4
    },
    {
        symptom: "アザができやすい",
        types: ["瘀血"],
        group: 4
    },
    {
        symptom: "唇や舌、歯茎の色が暗い紫色っぽい",
        types: ["瘀血"],
        group: 4
    },
    {
        symptom: "生理痛が重い、経血にレバー状の塊が出る",
        types: ["瘀血", "気滞"],
        group: 4
    },
    {
        symptom: "肌荒れしやすい",
        types: ["瘀血", "血虚"],
        group: 4
    },
    {
        symptom: "手足の末端が冷えるのに、頭や顔だけがのぼせる",
        types: ["瘀血"],
        group: 4
    },
    {
        symptom: "汗をかきやすい",
        types: ["水滞", "気虚"],
        group: 5
    },
    {
        symptom: "夕方になると足がパンパンにむくむ",
        types: ["水滞"],
        group: 5
    },
    {
        symptom: "下痢・軟便になりやすい",
        types: ["水滞", "気虚"],
        group: 5
    },
    {
        symptom: "雨の日や湿度の多い日に体が重だるく、頭が重く感じる",
        types: ["水滞"],
        group: 5
    },
    //{
    //    symptom: "めまいや耳鳴り、または乗り物酔いしやすい",
    //    types: ["水滞"]
    //},
    {
        symptom: "耳鳴りが気になる",
        types: ["水滞"],
        group: 5
    },
    {
        symptom: "乗り物酔いしやすい",
        types: ["水滞"],
        group: 5
    },
    {
        symptom: "お腹を叩くと「ポチャポチャ」と水音がする",
        types: ["水滞"],
        group: 5

    },
    {
        symptom: "関節が重く痛む",
        types: ["水滞", "瘀血"],
        group: 5
    },
    {
        symptom: "肌がたるみやすい",
        types: ["水滞"],
        group: 5
    },
    {
        symptom: "痰が出やすい",
        types: ["水滞"],
        group: 5

    }

];