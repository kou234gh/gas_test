// 全てのシートで使う変数を初期化＝＝＝＝＝＝＝＝＝＝＝＝＝＝＝＝＝＝＝＝＝＝＝＝＝＝＝＝＝＝＝＝＝＝＝＝＝＝＝＝＝

// export const init = () => {
// ssAppはスプレッドを開いた瞬間に権限が付与されているからグローバルで呼び出してもOK 。
// 逆にここはSSAPI以外も言えbんとトリガーで勝手に読み込まれてしまう。だから他はファンクションにして手動で呼び出すようにしないとエラーになる。
namespace G_var {

  export const json_folder_name = "data";
  export const json_file_name = "tmp.json";
  export const select_question = "どのスタッフのデータを見ますか？";

  export const output_folder_name = "明細PDF";


  export const ss = SpreadsheetApp.getActiveSpreadsheet();
  export const this_file_id = ss.getId();
  export const s1 = ss.getSheetByName( "労働者名簿" );
  export const s2 = ss.getSheetByName( "入力シート" );
  export const s3 = ss.getSheetByName("給与明細書");
  export const ui = SpreadsheetApp.getUi();
  export const last_row = s1.getLastRow() - 1;
  export const id_range = s2.getRange( "H2" ); //1
  export const name_range = s2.getRange( "J2" );
  export const year_range = s2.getRange( "B2" );

  // データアクセス時（driveapp時使用）
  // s２の合計欄は変更する必要がないのでその情報
  export const total_range = s2.getRange( 5, 3, 35 - 3, 15 - 5 )
  export const rows_wasted = [ 11, 14, 15, 26, 30, 35 ].reverse();
  export const keys_required = [];
  export const keys_all = s2.getRange( "C5:C35" ).getValues();
  // 配列が
  for(let i = 0; i < keys_all.length; i++){
    if(rows_wasted.includes(i+5)){
      continue;
    };
    keys_required.push(keys_all[i].toString())
  }
 
  export const staffs_id_range = s1.getRange( 3, 1, last_row - 1, 2 );


}

// 先にDriveApp使ってファイルオブジェクトを取得する。（ss.getParentはssが帰ってくる。fileオブジェクトではない）
// その後getparentsでフォルダーを特定。
// イベントトリガーからDRIVEAPPを呼び出すと権限エラーになるので,"仕方なく"関数として保存して手動で操作した時のみ呼び出して権限を付与する形にする。＝グローバル変数として初期化させない。
class DriveApp_var {
  // 先にDriveApp使ってファイルオブジェクトを取得する。（ss.getParentはssが帰ってくる。fileオブジェクトではない）
  // その後getparentsでフォルダーを特定。
  private _this_file = DriveApp.getFileById( G_var.this_file_id );
  private _this_folder = loop_for_one( this.this_file.getParents() );
  //データベースいじる時のフォルダ特定 
  private _json_folder = loop_for_one( this.this_folder.getFoldersByName( G_var.json_folder_name ) );
  private _json_file = loop_for_one( this.json_folder.getFilesByName( G_var.json_file_name ) );
  //PDF出力する時のフォルダ特定
  private _pdf_folder = loop_for_one( this.this_folder.getFoldersByName( G_var.output_folder_name ) );
  private _pdf_folder_id = this.pdf_folder.getId();


  public get pdf_folder () {
    return this._pdf_folder;
  }
  public set pdf_folder ( value ) {
    this._pdf_folder = value;
  }
  public get pdf_folder_id () {
    return this._pdf_folder_id;
  }
  public set pdf_folder_id ( value ) {
    this._pdf_folder_id = value;
  }


  public get this_file () {
    return this._this_file;
  }
  public set this_file ( value ) {
    this._this_file = value;
  }
  public get this_folder () {
    return this._this_folder;
  }
  public set this_folder ( value ) {
    this._this_folder = value;
  }
  // public get json_name () {
  //   return this._json_name;
  // }
  // public set json_name ( value ) {
  //   this._json_name = value;
  // }
  public get json_folder () {
    return this._json_folder;
  }
  public set json_folder ( value ) {
    this._json_folder = value;
  }
  public get json_file () {
    return this._json_file;
  }
  public set json_file ( value ) {
    this._json_file = value;
  }

}





  // ＝＝＝＝＝＝＝＝＝＝＝＝＝＝＝＝＝＝＝＝＝＝＝＝＝
  // ＝＝＝＝＝＝＝＝＝＝＝＝＝＝＝＝＝＝＝＝＝＝＝＝＝＝＝＝＝＝＝＝＝＝＝＝＝＝＝＝＝＝＝＝＝＝＝＝＝＝
  // ＝＝＝＝＝＝＝＝＝＝＝＝＝＝＝＝＝＝＝＝＝＝＝＝＝
  // ＝＝＝＝＝＝＝＝＝＝＝＝＝＝＝＝＝＝＝＝＝＝＝＝＝＝＝＝＝＝＝＝＝＝＝＝＝＝＝＝＝＝＝＝＝＝＝＝＝＝
  // ＝＝＝＝＝＝＝＝＝＝＝＝＝＝＝＝＝＝＝＝＝＝＝＝＝
  // ＝＝＝＝＝＝＝＝＝＝＝＝＝＝＝＝＝＝＝＝＝＝＝＝＝＝＝＝＝＝＝＝＝＝＝＝＝＝＝＝＝＝＝＝＝＝＝＝＝＝

// }