//PDFを作成し指定したフォルダーに保存する関数
//以下4つの引数を指定する必要がある
//1: フォルダーID (folderId)
//2: スプレッドシートID (ssId)
//3: シートID (shId)
//4: ファイル名 (fileName)
function createPdf() {
    const drive_obj = new DriveApp_var();
    //PDFを作成するためのベースとなるURL
    let baseUrl = "https://docs.google.com/spreadsheets/d/"
        + drive_obj.pdf_folder_id
        + "/export?gid="
        + G_var.ss.getId();
    //★★★自由にカスタマイズしてください★★★
    //PDFのオプションを指定
    let pdfOptions = "&exportFormat=pdf&format=pdf"
        + "&size=A4" //用紙サイズ (A4)
        + "&portrait=true" //用紙の向き true: 縦向き / false: 横向き
        + "&fitw=true" //ページ幅を用紙にフィットさせるか true: フィットさせる / false: 原寸大
        + "&top_margin=0.50" //上の余白
        + "&right_margin=0.50" //右の余白
        + "&bottom_margin=0.50" //下の余白
        + "&left_margin=0.50" //左の余白
        + "&horizontal_alignment=CENTER" //水平方向の位置
        + "&vertical_alignment=TOP" //垂直方向の位置
        + "&printtitle=false" //スプレッドシート名の表示有無
        + "&sheetnames=false" //シート名の表示有無
        + "&gridlines=false" //グリッドラインの表示有無
        + "&fzr=false" //固定行の表示有無
        + "&fzc=false"; //固定列の表示有無;
    //PDFを作成するためのURL
    let url = baseUrl + pdfOptions;
    //アクセストークンを取得する
    let token = ScriptApp.getOAuthToken();
    //headersにアクセストークンを格納する
    let options = {
        headers: {
            'Authorization': 'Bearer ' + token
        }
    };
    //PDFを作成する
    let blob = UrlFetchApp.fetch(url, options).getBlob().setName(G_var.s3.getName() + '.pdf');
    //PDFを指定したフォルダに保存する
    drive_obj.pdf_folder.createFile(blob);
}
