// データベースを使用する操作を統括するファイル
/**
 * データ復元（シートのボタン「選択」を押した時に作動）
 */
const show_dialog = () => {
    // cf)!!!!!!!!!! https://developers.google.com/apps-script/guides/html?hl=ja#serve_html_as_a_google_docs_sheets_slides_or_forms_user_interface
    // const html = HtmlService.createHtmlOutputFromFile('Index');
    const html_after = HtmlService
        .createTemplateFromFile('index')
        .evaluate(); //HtmlOutput オブジェクト	スクリプトレットの実行。
    SpreadsheetApp.getUi().showModalDialog(html_after, //HtmlOutput オブジェクトでないといけない
    G_var.select_question);
};
/**
 * 本当はshodialogのながで実装したかったけど、showmodaldialog（）からデータを受け取る方法がこれ以外にわからない。
 * SABMITボタンを押した後にGASにデータを持ってくる。id_and_name
 */
const apply_value = (id_and_name) => {
    const id_selected = id_and_name.split(",")[0];
    const name_selected = id_and_name.split(",")[1];
    // Browser.msgBox(id_selected);
    // Browser.msgBox(name_selected);
    G_var.id_range.setValue(id_selected);
    G_var.name_range.setValue(name_selected);
    // 上の名前とIDの反映に合わせて月毎のデータも復元
    restore_data(id_selected, name_selected);
};
/**
 * データ入れる。（ボタン「？一時保存」を選択したときに作動）
 */
const save = () => {
    save_as_json();
};
const is_really = () => {
    // G_var.ui.Button.YES.valueOf();
};
