import React from "react";
import { useState } from "react";
import { Cell } from "./cell";

export const Board = ({ height, width, mines }) => {
    const [gameStatus, setGameStatus] = useState(false);
    const [mineCount, setMineCount] = useState(mines);

    const createEmptyArray = (height, width) => {
        //make board array
        //each item is data[i][j] with different attributes
        let data = [];
        for (let i = 0; i < height; i++) {
            data.push([]);
            for (let j = 0; j < width; j++) {
                data[i][j] = {
                    "x": i,
                    "y": j,
                    isMine: false,
                    neighbor: 0,
                    isRevealed: false,
                    isEmpty: false,
                    isFlagged: false
                };
            }
        }
        return data;
    }

    const plantMines = (data, height, width, mines) => {
        //puts 10 mines randomly by assigning isMine to true per cell
        let randomX = 0;
        let randomY = 0;
        let minesPlanted = 0;

        while (minesPlanted < mines) {
            //get random coordinate values
            randomX = getRandomNumber(width);
            randomY = getRandomNumber(height);

            //set coordinate as mine if not already a mine
            if (!(data[randomX][randomY].isMine)) {
                data[randomX][randomY].isMine = true;
                minesPlanted++;
            }
        }
        return data;
    }

    const getNeighbors = (data, height, width) => {
        let updatedData = data;

        //check all the tiles
        for (let i = 0; i < height; i++) {
            for (let j = 0; j < width; j++) {
                //if not a mine
                if (data[i][j].isMine !== true) {
                    let mine = 0;
                    //look around the tile, get all the neighbors
                    const area = traverseBoard(data[i][j].x, data[i][j].y, data);
                    //if tiles in the neighbor array are mines, add to counter
                    area.map(value => {
                        if (value.isMine) {
                            mine++;
                        }
                    });
                    //if no mine neighbors, set empyy
                    if (mine === 0) {
                        updatedData[i][j].isEmpty = true;
                    }
                    //set the number of neighbor mines;
                    updatedData[i][j].neighbor = mine;
                }
            }
        }
    }

    const traverseBoard = (x, y, data) => {
        const el = [];
        //really just check the 8 surrounding tiles 
        //up
        if (x > 0) {
            el.push(data[x - 1][y]);
        }
        //down
        if (x < (height - 1)) {
            el.push(data[x + 1][y]);
        }
        //left
        if (y > 0) {
            el.push(data[x][y - 1]);
        }
        //right
        if (y < (width - 1)) {
            el.push(data[x][y + 1])
        }
        //top left
        if (x > 0 && y > 0) {
            el.push(data[x - 1][y - 1]);
        }
        // top right
        if (x > 0 && y < (width - 1)) {
            el.push(data[x - 1][y + 1]);
        }
        // bottom right
        if (x < (height - 1) && y < (width - 1)) {
            el.push(data[x + 1][y + 1]);
        }
        // bottom left
        if (x < (height - 1) && y > 0) {
            el.push(data[x + 1][y - 1]);
        }
        return el;
    }

    //create a random number from 0 to given number
    const getRandomNumber = (num) => {
        return Math.floor(Math.random() * num);
    }

    const initializeBoardData = (height, width, mines) => {
        //make 2d array for board
        let data = createEmptyArray(height, width);
        //add mines to the array
        data = plantMines(data, height, width, mines);
        //look for non mine tiles, look at neighbors, calculate mines around it
        data = getNeighbors(data, height, width);
        return data;
    }
    let boardData = initializeBoardData(height, width, mines);
    console.log(boardData);

    //bring it all together and render the board
    const renderBoard = (data) => {
        //iterate through the board, set all tiles to be cells
        return data.map((dataRow) => {
            return dataRow.map((dataItem) => {
                return (
                    <div key={dataItem.x * dataRow.length + dataItem.y}>
                        <Cell
                            // onClick={() => handleCellClick(dataItem.x, dataItem.y)}
                            // cMenu={(e) => handleContextMenu(e, dataItem.x, dataItem.y)}
                            value={dataItem}
                        />
                        {(dataRow[dataRow.length - 1] === dataItem) ? <div className="clear" /> : ""}
                    </div>
                )
            })
        })
    }

    // const handleCellClick = (x, y) => {
    //     //check if it's revealed, true if it is
    //     if (boardData[x][y].isRevealed || boardData[x][y].isFlagged) return null;

    //     //check for a mine
    //     if (boardData[x][y].isMine) {
    //         setGameStatus("You lost");
    //         revealBoard();
    //         alert("Game Over");
    //     }

    //     if (updatedData[x][y].isEmpty) {
    //         updatedData = revealEmpty(x, y, updatedData);
    //     }

    //     if (getHidden(updatedData).length === mines) {
    //         setGameStatus("You win");
    //         revealBoard();
    //         alert("You Win");
    //     }


    // }


    return (
        <div className="board">
            <div className="game-info">
                Mines: {mines}
                <br />
                <span className="info">
                    {gameStatus}
                </span>
            </div>
            {renderBoard()}
        </div>
    )
}