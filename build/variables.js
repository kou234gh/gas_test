// 全てのシートで使う変数を初期化＝＝＝＝＝＝＝＝＝＝＝＝＝＝＝＝＝＝＝＝＝＝＝＝＝＝＝＝＝＝＝＝＝＝＝＝＝＝＝＝＝
// export const init = () => {
// ssAppはスプレッドを開いた瞬間に権限が付与されているからグローバルで呼び出してもOK 。
// 逆にここはSSAPI以外も言えbんとトリガーで勝手に読み込まれてしまう。だから他はファンクションにして手動で呼び出すようにしないとエラーになる。
var G_var;
(function (G_var) {
    G_var.json_folder_name = "data";
    G_var.json_file_name = "tmp.json";
    G_var.select_question = "どのスタッフの月データを見ますか？";
    G_var.output_folder_name = "明細PDF";
    G_var.ss = SpreadsheetApp.getActiveSpreadsheet();
    G_var.this_file_id = G_var.ss.getId();
    G_var.s1 = G_var.ss.getSheetByName("労働者名簿");
    G_var.s2 = G_var.ss.getSheetByName("入力シート");
    G_var.s3 = G_var.ss.getSheetByName("給与明細書");
    G_var.ui = SpreadsheetApp.getUi();
    G_var.last_row = G_var.s1.getLastRow() - 1;
    G_var.id_range = G_var.s2.getRange("H2"); //1
    G_var.name_range = G_var.s2.getRange("J2");
    G_var.year_range = G_var.s2.getRange("B2");
    // データアクセス時（driveapp時使用）
    // s２の合計欄は変更する必要がないのでその情報
    G_var.total_range = G_var.s2.getRange(5, 3, 35 - 3, 15 - 5);
    G_var.rows_wasted = [11, 14, 15, 26, 30, 35].reverse();
    G_var.keys_required = [];
    G_var.keys_all = G_var.s2.getRange("C5:C35").getValues();
    // 配列が
    for (let i = 0; i < G_var.keys_all.length; i++) {
        if (G_var.rows_wasted.includes(i + 5)) {
            continue;
        }
        ;
        G_var.keys_required.push(G_var.keys_all[i].toString());
    }
    G_var.staffs_id_range = G_var.s1.getRange(3, 1, G_var.last_row - 1, 2);
})(G_var || (G_var = {}));
// 先にDriveApp使ってファイルオブジェクトを取得する。（ss.getParentはssが帰ってくる。fileオブジェクトではない）
// その後getparentsでフォルダーを特定。
// イベントトリガーからDRIVEAPPを呼び出すと権限エラーになるので,"仕方なく"関数として保存して手動で操作した時のみ呼び出して権限を付与する形にする。＝グローバル変数として初期化させない。
class DriveApp_var {
    constructor() {
        // 先にDriveApp使ってファイルオブジェクトを取得する。（ss.getParentはssが帰ってくる。fileオブジェクトではない）
        // その後getparentsでフォルダーを特定。
        this._this_file = DriveApp.getFileById(G_var.this_file_id);
        this._this_folder = loop_for_one(this.this_file.getParents());
        //データベースいじる時のフォルダ特定 
        this._json_folder = loop_for_one(this.this_folder.getFoldersByName(G_var.json_folder_name));
        this._json_file = loop_for_one(this.json_folder.getFilesByName(G_var.json_file_name));
        //PDF出力する時のフォルダ特定
        this._pdf_folder = loop_for_one(this.this_folder.getFoldersByName(G_var.output_folder_name));
        this._pdf_folder_id = this.pdf_folder.getId();
    }
    get pdf_folder() {
        return this._pdf_folder;
    }
    set pdf_folder(value) {
        this._pdf_folder = value;
    }
    get pdf_folder_id() {
        return this._pdf_folder_id;
    }
    set pdf_folder_id(value) {
        this._pdf_folder_id = value;
    }
    get this_file() {
        return this._this_file;
    }
    set this_file(value) {
        this._this_file = value;
    }
    get this_folder() {
        return this._this_folder;
    }
    set this_folder(value) {
        this._this_folder = value;
    }
    // public get json_name () {
    //   return this._json_name;
    // }
    // public set json_name ( value ) {
    //   this._json_name = value;
    // }
    get json_folder() {
        return this._json_folder;
    }
    set json_folder(value) {
        this._json_folder = value;
    }
    get json_file() {
        return this._json_file;
    }
    set json_file(value) {
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
