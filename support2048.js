documentWidth = window.screen.availWidth;
gridContainerWidth = 0.92 * documentWidth;
cellSideLength = 0.18 * documentWidth;
cellSpace = 0.04 * documentWidth;

function getPosTop(i){
    return cellSpace + i * (cellSpace + cellSideLength);
}

function getPosLeft(j){
    return cellSpace + j * (cellSpace + cellSideLength);
}

function getNumberBackgroundColor(number){
    switch(number){
        case 2: return "#eee4da";break;
        case 4: return "#ede0c8";break;
        case 8: return "#f2b179";break;
        case 16: return "#f59563";break;
        case 32: return "#f67c5f";break;
        case 64: return "#f65e3b";break;
        case 128: return "#edcf72";break;
        case 256: return "#edcc61";break;
        case 512: return "#9c0";break;
        case 1024: return "#33b5e5";break;
        case 2048: return "#09c";break;
        case 4096: return "#a6c";break;
        case 8192: return "#93c";break;
        case 16384: return "black";break;
    }
}

function getNumberBackgroundColor2(score){
    switch(score){
        case 1: return "black";break;
        case 2: return "rgb(2,2,2)";break;
        case 4: return "rgb(4,4,4)";break;
        case 8: return "rgb(8,8,8)";break;
        case 16: return "rgb(16,16,16)";break;
        case 32: return "rgb(32,32,32)";break;
        case 64: return "rgb(40,40,40)";break;
        case 128: return "rgb(45,45,45)";break;
        case 256: return "green";break;
        case 512: return "skyblue";break;
        case 1024: return "red";break;
        case 2048: return "purple";break;
        case 4096: return "yellow";break;
    }
}

function getNumberColor(number){
    if (number<=4){
        return "#776e65";
    }
    return "white";
}

function nospace(board){
    for(var i= 0;i < 4;i++){
        for(var j = 0;j < 4;j++){
            if(board[i][j] == 0){
                return false;
            }
        }
    }
    return true;
}

function canMoveLeft(board){
    for(var i= 0;i < 4;i++){
        for(var j = 1;j < 4;j++){
            if (board[i][j] != 0){
                if (board[i][j-1] == 0 || board[i][j-1] == board[i][j]){
                    return true;
                }
            }
        }
    }
    return false;
}

function canMoveRight(board){
    for(var i = 0;i < 4;i++){
        for(var j = 2;j > -1;j--){
            if(board[i][j] != 0){
                if (board[i][j+1] == 0 || board[i][j+1] == board[i][j]){
                    return true;
                }
            }
        }
    }
    return false;
}

function canMoveUp(board){
    for(var j = 0;j < 4;j++){
        for(var i = 1;i < 4;i++){
            if(board[i][j] != 0){
                if (board[i-1][j] == 0 || board[i-1][j] == board[i][j]){
                    return true;
                }
            }
        }
    }
    return false;
}

function canMoveDown(board){
    for(var j = 0;j < 4;j++){
        for(var i = 2;i > -1;i--){
            if(board[i][j] != 0){
                if (board[i+1][j] == 0 || board[i+1][j] == board[i][j]){
                    return true;
                }
            }
        }
    }
    return false;
}

function noBlockHorizontal(row,col1,col2,board){
    for(var i = col1 + 1; i < col2; i++){
        if(board[row][i] != 0){
            return false;
        }   
    }
    return true;
}

function noBlockVertical(col,row1,row2,board){
    for(var i = row1 + 1; i < row2; i++){
        if(board[i][col] != 0){
            return false;
        }
    }
    return true;
}

function nomove(board){
    if (canMoveUp(board)||
        canMoveDown(board)||
        canMoveLeft(board)||
        canMoveRight(board)){
        return false;
        }
    return true;
}

function gameOver(){
    alert("Game Over! Don't give up and try again.");
}

function win(board){
    for(var i = 0;i < 4;i++){
        for(var j = 0;j < 4;j++){
            if(board[i][j]==2048){
                return true;
            }
        }
    }
    return false;
}