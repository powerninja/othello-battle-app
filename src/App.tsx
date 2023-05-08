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
        {index}
        {cell && <div className={`circle ${cell === 'black' ? 'black' : 'white'}`}></div>}
      </div>
    ));
  };

  // マス目が押下された際に、対象の配列にblackまたはwhiteを入れる
  const handleCellClick = (index: number) => {
    //更新前の盤面をコピーする
    const newGrid = [...grid];
    //押下したマス目の周辺のマス目にて白があった場合のみ、押下可能
    if (newGrid[index - 9] === 'white') {
      //TODO: 白があったので、白があった先に、黒があるか確認する
      newGrid[index] = 'black';
      //入力されていた文字が黒色だった場合は、白色に変更する。
      //白だった場合は、nullとしコマの描写を消す
    } else if (newGrid[index - 8] === 'white') {
      newGrid[index] = 'black';
    } else if (newGrid[index - 8] === 'white') {
      newGrid[index] = 'black';
    } else if (newGrid[index - 7] === 'white') {
      newGrid[index] = 'black';
      console.log('a');
      console.log(newGrid[index - 7]);
    } else if (newGrid[index + 1] === 'white') {
      let nums = index;
      //TODO: マジックナンバーを修正する
      for (nums + 1; nums < 39; nums++) {
        if (newGrid[nums] === 'black') {
          newGrid[nums - 1] = 'black';
          newGrid[index + 1] = 'black';
          console.log(nums);
        }
      }

      newGrid[index] = 'black';
    } else if (newGrid[index + 9] === 'white') {
      newGrid[index] = 'black';
    } else if (newGrid[index + 8] === 'white') {
      newGrid[index] = 'black';
    } else if (newGrid[index + 7] === 'white') {
      newGrid[index] = 'black';
    } else if (newGrid[index - 1] === 'white') {
      newGrid[index] = 'black';
    } else {
      alert('置けませんよ');
      return;
      // newGrid[index] = newGrid[index] === 'black' ? 'white' : null;
    }
    //TODO: コマをひっくり返す処理
    //TODO: 置ける場所を制限する処理
    //TODO: コマを置く順番を制御する
    //盤面を保存する

    setGrid(newGrid);
  };

  //各方向でひっくり返せるか確認する処理を関数化して、コードを整理しましょう。例えば、checkDirection という関数を作成して、方向と開始位置を引数として与えることができます。
  const checkDirection = (index: number, direction: string) => {
    if (direction === 'right') {
    } else if (direction === 'left') {
    } else if (direction === 'up') {
    } else if (direction === 'down') {
    } else if (direction === 'rightUp') {
    } else if (direction === 'leftUp') {
    } else if (direction === 'rightDown') {
    } else if (direction === 'leftDown') {
    }
  };

  //コマをひっくり返す処理は、handleCellClick関数内で行うのではなく、別の関数（例えばflipPieces）を作成しましょう。その関数では、指定されたセルと方向に対してコマをひっくり返します。この関数は、置ける場所を確認する関数と共通のロジックを使用できるため、コードの重複を最小限に抑えることができます。
  const flipPieces = () => {};

  return (
    <div className="App">
      <div className="grid">{createGrid()}</div>
    </div>
  );
};
