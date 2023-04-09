/**
 * JsonFILE→すぷ氏。IDをもとにデータを復元する。データがなければ作る。結果を通知。
 */
const restore_data = (id_selected, name_selected) => {
    // あとで実装
    const year_selected = G_var.year_range.getValue().toString();
    const drive_obj = new DriveApp_var();
    const json_obj_for_read = read_from_json(drive_obj);
    // let json_obj_for_read = { ...json_obj_for_read };
    console.log(json_obj_for_read["1"]["name"]["山田 太郎"]["year"]["2023"]["data"]);
    // これは動作しない。特定する値はキューか変数
    // console.log(json_obj_for_read["1"]["name"]["山田 太郎"]["year"]["2023"]["data"]["0"])
    // すぷ氏から得た値がすでにデータベースにあるかどうかの判定
    let is_id = false;
    let is_name = false;
    let is_year = false;
    // JSONファイルにid, name, yearが登録されているか確認する
    //オブジェクトの構造上、またundefinedのさらに深くにアクセスしようとするとエラーになるためネストに。
    if (json_obj_for_read[id_selected] != undefined) {
        is_id = true;
        if (json_obj_for_read[id_selected]["name"][name_selected] != undefined) {
            is_name = true;
            if (json_obj_for_read[id_selected]["name"][name_selected]["year"][year_selected] != undefined) {
                is_year = true;
            }
        }
    }
    ;
    const key_list = G_var.keys_required;
    // 引っ張ってきたデータに全ての情報が入っていたら
    if (is_id && is_name && is_year) {
        // 末端データだけ違う他は全て同じ場合
        // 範囲特定
        const range_1 = G_var.s2.getRange("D5:O10");
        // [[],[],[],[],[],[]]
        const range_2 = G_var.s2.getRange("D12:O13");
        const range_3 = G_var.s2.getRange("D16:O25");
        const range_4 = G_var.s2.getRange("D27:O29");
        const range_5 = G_var.s2.getRange("D31:O34");
        // 入れる値用意
        for (let i = 0; i < key_list.length; i++) {
            console.log(json_obj_for_read[id_selected]["name"][name_selected]["year"][year_selected]["data"][key_list[i]]);
        }
        range_1.setValues([
            json_obj_for_read[id_selected]["name"][name_selected]["year"][year_selected]["data"][key_list[0]],
            json_obj_for_read[id_selected]["name"][name_selected]["year"][year_selected]["data"][key_list[1]],
            json_obj_for_read[id_selected]["name"][name_selected]["year"][year_selected]["data"][key_list[2]],
            json_obj_for_read[id_selected]["name"][name_selected]["year"][year_selected]["data"][key_list[3]],
            json_obj_for_read[id_selected]["name"][name_selected]["year"][year_selected]["data"][key_list[4]],
            json_obj_for_read[id_selected]["name"][name_selected]["year"][year_selected]["data"][key_list[5]],
        ]);
        range_2.setValues([
            json_obj_for_read[id_selected]["name"][name_selected]["year"][year_selected]["data"][key_list[6]],
            json_obj_for_read[id_selected]["name"][name_selected]["year"][year_selected]["data"][key_list[7]],
        ]);
        range_3.setValues([
            json_obj_for_read[id_selected]["name"][name_selected]["year"][year_selected]["data"][key_list[8]],
            json_obj_for_read[id_selected]["name"][name_selected]["year"][year_selected]["data"][key_list[9]],
            json_obj_for_read[id_selected]["name"][name_selected]["year"][year_selected]["data"][key_list[10]],
            json_obj_for_read[id_selected]["name"][name_selected]["year"][year_selected]["data"][key_list[11]],
            json_obj_for_read[id_selected]["name"][name_selected]["year"][year_selected]["data"][key_list[12]],
            json_obj_for_read[id_selected]["name"][name_selected]["year"][year_selected]["data"][key_list[13]],
            json_obj_for_read[id_selected]["name"][name_selected]["year"][year_selected]["data"][key_list[14]],
            json_obj_for_read[id_selected]["name"][name_selected]["year"][year_selected]["data"][key_list[15]],
            json_obj_for_read[id_selected]["name"][name_selected]["year"][year_selected]["data"][key_list[16]],
            json_obj_for_read[id_selected]["name"][name_selected]["year"][year_selected]["data"][key_list[17]],
        ]);
        range_4.setValues([
            json_obj_for_read[id_selected]["name"][name_selected]["year"][year_selected]["data"][key_list[18]],
            json_obj_for_read[id_selected]["name"][name_selected]["year"][year_selected]["data"][key_list[19]],
            json_obj_for_read[id_selected]["name"][name_selected]["year"][year_selected]["data"][key_list[20]],
        ]);
        range_5.setValues([
            json_obj_for_read[id_selected]["name"][name_selected]["year"][year_selected]["data"][key_list[21]],
            json_obj_for_read[id_selected]["name"][name_selected]["year"][year_selected]["data"][key_list[22]],
            json_obj_for_read[id_selected]["name"][name_selected]["year"][year_selected]["data"][key_list[23]],
            json_obj_for_read[id_selected]["name"][name_selected]["year"][year_selected]["data"][key_list[24]],
        ]);
        // 完了通知
        const message = "復元が完了しました。";
        Browser.msgBox(message);
    }
    else {
        Browser.msgBox("保存されているデータがないので作成します");
        // json_obj_for_read[ id_selected ][ "name" ][ name_selected ][ "year" ][ year_selected ] = {
        //   [ "data" ]: {}
        // }
    }
};
