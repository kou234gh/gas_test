// test import directory

// namespace G_func {
// 対象が一つでもイテレータの中に入っている仕様だから
const loop_for_one = ( itr ) => {
  const trash_box = []
  while ( itr.hasNext() ) {
    trash_box.push( itr.next() )
  }
  if ( trash_box.length != 1 ) {
    // Browser.msgBox( "ファイル数に異常があります。管理者に問い合わせください。" )
    console.log( "ファイル数に異常があります。" )
    return false;
  }
  return trash_box[ 0 ];
}
// }
