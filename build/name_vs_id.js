// // 従業員の名前と番号どちらを入力しても楽に変換されるよう
// 
// const onEdit = (e) => {
//   Browser.msgBox("トリガーが作動しました");
//   Browser.msgBox("hellooooooo")
//   const event_range = e.range;
//   const event_range_col = event_range.getColumn();
//   const event_range_row = event_range.getRow();
//   // ss.getActiveSheet().getRange(event_range_row,event_range_col).setBackgroundRGB(100,100,100)
//   // event_range_col+"fkeofko"+event_range_row);
// 
// 
//   const id = s2.getRange("G2"); //1
//   const name = s2.getRange("I2");
// 
//   // 名前を必死で探してIDを見つける、IDを必死で探して名前を見つける
// 
//   if (event_range.getA1Notation() == id.getA1Notation()) {
//     Browser.msgBox("idを変更しました")
//     const name_for_id = s1.getRange(id.getValue() + 2, 2)
//     name.setValue(name_for_id.getValue());
// 
//     return;
//   } else if (event_range.getA1Notation() == name.getA1Notation()) {
//     Browser.msgBox("名前を変更しました")
//     // IDを探す
//     // 1.define a search range
//     const search_range = s1.getRange(3, 1, last_row - 1, 2).getValues();
// 
//     // 2.find same name in s1 from s2
//     let result = search_range.filter((idAndName) => {
//       return name.getValue() == idAndName[1]
//     })
// 
//     const id_for_name = result[0][0]
//     id.setValue(id_for_name);
// 
//     return;
//   }
// 
// }
// 
