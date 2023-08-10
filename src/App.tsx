import { useState, useEffect } from 'react';
import './App.css';

export const App = () => {
  const BOARD_SIZE = 8;

  //
  const DIRECTIONS = [
    { x: -1, y: -1 },
    { x: 0, y: -1 },
    { x: 1, y: -1 },
    { x: -1, y: 0 },
    { x: 1, y: 0 },
    { x: -1, y: 1 },
    { x: 0, y: 1 },
    { x: 1, y: 1 },
  ];

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

  // // マス目が押下された際に、対象の配列にblackまたはwhiteを入れる
  // const handleCellClick = (index: number) => {
  //   //更新前の盤面をコピーする
  //   const newGrid = [...grid];

  //   //押下したマス目がnullの場合のみ、押下可能
  //   if (newGrid[index] === null) {
  //     //押下したマス目の周辺のマス目にて白があった場合のみ、押下可能
  //     if (newGrid[index - 9] === 'white') {
  //       //TODO: 白があったので、白があった先に、黒があるか確認する
  //       newGrid[index] = 'black';
  //       //入力されていた文字が黒色だった場合は、白色に変更する。
  //       //白だった場合は、nullとしコマの描写を消す
  //     } else if (newGrid[index - 8] === 'white') {
  //       newGrid[index] = 'black';
  //     } else if (newGrid[index - 8] === 'white') {
  //       newGrid[index] = 'black';
  //     } else if (newGrid[index - 7] === 'white') {
  //       newGrid[index] = 'black';
  //     } else if (newGrid[index + 1] === 'white') {
  //       let nums = index;
  //       //TODO: マジックナンバーを修正する

  //       for (nums + 1; nums < 39; nums++) {
  //         if (newGrid[nums] === 'black') {
  //           newGrid[nums - 1] = 'black';
  //           newGrid[index + 1] = 'black';
  //           break;
  //         }
  //       }

  //       newGrid[index] = 'black';
  //     } else if (newGrid[index + 9] === 'white') {
  //       console.log('a');
  //       newGrid[index] = 'black';
  //     } else if (newGrid[index + 8] === 'white') {
  //       newGrid[index] = 'black';
  //     } else if (newGrid[index + 7] === 'white') {
  //       newGrid[index] = 'black';
  //     } else if (newGrid[index - 1] === 'white') {
  //       newGrid[index] = 'black';
  //     } else {
  //       alert('置けませんよ');
  //       return;
  //       // newGrid[index] = newGrid[index] === 'black' ? 'white' : null;
  //     }
  //   }
  //   //TODO: コマをひっくり返す処理
  //   //TODO: 置ける場所を制限する処理
  //   //TODO: コマを置く順番を制御する
  //   //盤面を保存する

  //   setGrid(newGrid);
  // };

  const handleCellClick = (index: number) => {
    // ここで現在のプレイヤーの色を取得する必要があります。
    // 以下のコードでは仮に 'black' としています。
    const color: 'black' | 'white' = 'black';

    // index / 2のあまりでX列を測定する
    const x = index % BOARD_SIZE;

    // index / 2の商でY行を測定する
    const y = Math.floor(index / BOARD_SIZE);

    //更新前の盤面をコピーする
    const newGrid = [...grid];

    // すでにコマが置かれている場合は何もしない
    if (newGrid[y * BOARD_SIZE + x] !== null) return;

    console.log(DIRECTIONS);
    let canPlace = false;
    DIRECTIONS.forEach((direction) => {
      if (canFlip(x, y, direction, color)) {
        canPlace = true;
        flip(x, y, direction, color);
      }
    });

    if (canPlace) {
      newGrid[y * BOARD_SIZE + x] = color;
      setGrid(newGrid);
      // 他のプレイヤーにターンを渡すなどの処理
    } else {
      alert('置けませんよ');
    }
  };

  // ひっくり返せるかどうかを確認する関数
  const canFlip = (x: number, y: number, direction: { x: number; y: number }, color: 'black' | 'white') => {
    //
    let nx = x + direction.x;
    let ny = y + direction.y;
    const oppositeColor = color === 'black' ? 'white' : 'black';

    if (!isValidPosition(nx, ny) || grid[ny * BOARD_SIZE + nx] !== oppositeColor) return false;

    while (isValidPosition(nx, ny)) {
      nx += direction.x;
      ny += direction.y;

      if (!isValidPosition(nx, ny) || grid[ny * BOARD_SIZE + nx] === null) return false;
      if (grid[ny * BOARD_SIZE + nx] === color) return true;
    }

    return false;
  };

  // ひっくり返す関数
  const flip = (x: number, y: number, direction: { x: number; y: number }, color: 'black' | 'white') => {
    let nx = x + direction.x;
    let ny = y + direction.y;

    while (isValidPosition(nx, ny) && grid[ny * BOARD_SIZE + nx] !== color) {
      grid[ny * BOARD_SIZE + nx] = color;
      nx += direction.x;
      ny += direction.y;
    }
  };

  // 盤面の範囲内かどうかを確認する関数
  const isValidPosition = (x: number, y: number) => {
    return x >= 0 && x < BOARD_SIZE && y >= 0 && y < BOARD_SIZE;
  };

  return (
    <div className="App">
      <div className="grid">{createGrid()}</div>
    </div>
  );
};
