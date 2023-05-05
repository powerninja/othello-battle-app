import { useState, useEffect } from 'react';
import './App.css';

export const App = () => {
  //配列にnullを64個設定する
  const [grid, setGrid] = useState<any>(Array(64).fill(null));

  //初期の盤面を作成
  useEffect(() => {
    const newGrid = [...grid];
    newGrid[27] = 'black';
    newGrid[28] = 'white';
    newGrid[35] = 'white';
    newGrid[36] = 'black';
    setGrid(newGrid);
  }, []);

  //マス目の描写とマス目を押下時に黒色のコマを表示
  const createGrid = () => {
    //cell:gridの値を一つづつ取り出す、最初は全てnull
    //index:現在処理中の要素の配列内における添字、0から始まる
    return grid.map((cell: string, index: number) => (
      //keyに0~63までの数字を割り当てる
      //対象のマス目を押下すると、handleCellClick関数を呼び出す
      <div key={index} className="cell" onClick={() => handleCellClick(index)}>
        {/* cellがnullでない場合、押下したマス目にclassNameを付与しコマを描写する */}
        {/* cellの値によってclassNameを動的に変更する */}
        {cell && <div className={`circle ${cell === 'black' ? 'black' : 'white'}`}></div>}
      </div>
    ));
  };

  // マス目が押下された際に、対象の配列にblackまたはwhiteを入れる
  const handleCellClick = (index: number) => {
    //更新前の盤面をコピーする
    const newGrid = [...grid];
    //押下したマス目が黒でも白でもなかった場合、黒色にする
    if (!newGrid[index]) {
      newGrid[index] = 'black';
      //入力されていた文字が黒色だった場合は、白色に変更する。
      //白だった場合は、nullとしコマの描写を消す
    } else {
      newGrid[index] = newGrid[index] === 'black' ? 'white' : null;
    }
    //TODO: コマをひっくり返す処理
    //TODO: 置ける場所を制限する処理
    //盤面を保存する
    setGrid(newGrid);
  };

  return (
    <div className="App">
      <div className="grid">{createGrid()}</div>
    </div>
  );
};
