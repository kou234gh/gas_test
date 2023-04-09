const save_as_json = () => {
    const drive_obj = new DriveApp_var();
    if (!check_presence(drive_obj)) {
        // 初期化
        init_json(drive_obj);
    }
    update_json(drive_obj);
};
const check_presence = (drive_obj) => {
    if (drive_obj.json_file != false) {
        console.log("その名前のファイルがあるので更新します");
        return true;
    }
    // }
    console.log("その名前のファイルはないから作ります");
    return false;
};
// フォルダからIDをもとに特定して上書き
/**
 * @returns {object}
 */
const read_from_json = (drive_obj) => {
    // テキストとして取得＆JSONに変換
    const json_str = drive_obj.json_file.getBlob().getDataAsString();
    const json_as_db = JSON.parse(json_str);
    return json_as_db;
};
// シートから情報を取ってきてJSONファイルに使う用の情報を保存する
// @update_json()
const read_from_sheet = () => {
    const id_str = G_var.id_range.getValue().toString();
    const name_str = G_var.name_range.getValue().toString();
    const year_str = G_var.year_range.getValue().toString();
    /**
     * シート内で取得する範囲
     */
    let total_range = G_var.s2.getRange("C5:O34").getValues();
    // let new_range = []
    const rows = G_var.rows_wasted;
    // console.log( rows )
    for (let i = 0; i < rows.length; i++) {
        // console.log(total_range[rows[i]-5]);
        total_range.splice(rows[i] - 5, 1);
    }
    // console.log( total_range );
    let json_from_spread = {};
    let month_obj = [];
    // 二次元配列だから繰り返し２回でオブジェクトを作成。
    for (let i = 0; i < total_range.length; i++) {
        for (let j = (0 + 1); j < total_range[i].length; j++) {
            // [ '基本給', 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12 ] →　 '基本給'：[ 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12 ]
            month_obj.push(total_range[i][j].toString());
        }
        json_from_spread[total_range[i][0]] = month_obj;
        month_obj = [];
    }
    console.log(json_from_spread);
    return [json_from_spread, id_str, name_str, year_str];
};
const update_json = (drive_obj) => {
    // 結合
    let json_as_db = read_from_json(drive_obj);
    // console.log( json_as_db )
    const json_from_spread_list = read_from_sheet();
    const json_from_spread = json_from_spread_list[0];
    const id = json_from_spread_list[1];
    const name = json_from_spread_list[2];
    const year = json_from_spread_list[3];
    // let merge_json;
    // 過去のデータを復元できるように年や名前など違うパターンを保存しておく
    // すぷ氏から得た値がすでにデータベースにあるかどうかの判定
    let is_id = false;
    let is_name = false;
    let is_year = false;
    //オブジェクトの構造上、またundefinedのさらに深くにアクセスしようとするとエラーになるためネストに。
    if (json_as_db[id] != undefined) {
        is_id = true;
        if (json_as_db[id]["name"][name] != undefined) {
            is_name = true;
            if (json_as_db[id]["name"][name]["year"][year] != undefined) {
                is_year = true;
            }
        }
    }
    ;
    // if(!is_id && !is_name && !is_year){
    if (!is_id && !is_name && !is_year) {
        // IDを含めて全て存在しない場合。（新規登録）
        json_as_db[id] = {
            ["name"]: {
                [name]: {
                    ["year"]: {
                        [year]: {
                            ["data"]: json_from_spread
                        } //すでにオブジェクトだから{json_from_spread}でなくていい
                    }
                }
            }
        };
    }
    else if (is_id && !is_name && !is_year) {
        // idはある。名前を含め後ろがない場合
        json_as_db[id]["name"][name] = {
            ["year"]: {
                [year]: {
                    ["data"]: json_from_spread
                } //すでにオブジェクトだから{json_from_spread}でなくていい
            }
        };
    }
    else if (is_id && is_name && !is_year) {
        //年とデータが違う場合
        json_as_db[id]["name"][name]["year"][year] = {
            ["data"]: json_from_spread
        }; //すでにオブジェクトだから{json_from_spread}でなくていい
    }
    else if (is_id && is_name && is_year) {
        // 末端データだけ違う他は全て同じ場合
        json_as_db[id]["name"][name]["year"][year] = {
            ["data"]: json_from_spread
        };
    }
    // console.log(id + " " + name + " " + year + "" + json_from_spread)
    // 変更した JSON データを文字列に変換します
    const updatedJson = JSON.stringify(json_as_db);
    // ファイルに書き込みます
    drive_obj.json_file.setContent(updatedJson);
};
const init_json = (drive_obj) => {
    const init_json = {};
    const content_type = "application/json";
    const blob = Utilities.newBlob("", content_type, drive_obj.json_name);
    const file = blob.setDataFromString(JSON.stringify(init_json), "UTF-8");
    drive_obj.json_folder.createFile(file);
    drive_obj.json_file = loop_for_one(drive_obj.json_folder.getFilesByName(drive_obj.json_name));
};
// const test = () => {
// 
//   var obj = {
//     "id": {
//       "1": { "山田太郎": { "2023": { "4": "１ー山田太郎、２０２３の４" } } },
// 
//     }
//     // "1":{"山田太郎":{"2023":{"4": "１ー山田太郎、２０２３の４"}}}
//   }
// 
//   console.log( obj )
// 
//   var obj2 = {
//     "id": { "2": { "山田花子": { "2022": { "5": "１ー山田hanako、２０２３の４" } } } }
//     // "2":"two"
//   }
//   console.log( obj2 )
// 
//   // obj[要素名（K：VのKの部分）]＝という書き方で実現できる
//   obj[ "id" ][ "2" ] = obj2[ "id" ][ "2" ]
// 
//   var json = JSON.stringify( obj );
// 
//   // console.log(obj["2"]["山田花子"]["2023"]["4"])//成功　>＞１ー山田太郎、２０２３の４
//   // console.log(obj["id"]["1"]["山田太郎"]["2023"]["4"])
//   console.log( obj )
//   console.log( obj[ "id" ][ "2" ][ "山田花子" ][ "2022" ][ "5" ] )
// 
//   let fruit = [ 'Apple', 120, 'Grapes', 80 ];
//   // let fruits = []
//   // fruits.push(fruit.join("''"))
//   // console.log("'"+ fruit.join("','") + "'")
//   let f3 = "[" + "'" + fruit.join( "','" ) + "'" + "]"
//   console.log( f3 )
//   console.log( f3[ 2 ] )
// 
//   return json;
// }
