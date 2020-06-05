var board = new Array();
var score = 0;
var hasConflicted = new Array();
var startx = 0;
var starty = 0;
var endx = 0;
var endy = 0;

$(document).ready(function(){
    prepareForMobile();
    newGame();
})

function prepareForMobile(){
    if(documentWidth > 500){
        gridContainerWidth = 500;
        cellSpace = 20;
        cellSideLength = 100;
    }

    $('#grid-container').css('width', gridContainerWidth - 2 * cellSpace);
    $('#grid-container').css('height', gridContainerWidth - 2 * cellSpace);
    $('#grid-container').css('padding', cellSpace);
    $('#grid-container').css('border-radius', 0.02 * gridContainerWidth);
    $('.grid-cell').css('width', cellSideLength);
    $('.grid-cell').css('height', cellSideLength);
    $('.grid-cell').css('border-radius', 0.02 * cellSideLength);
}

function newGame(){
    //initializing...
    init();
    //generate two numbers...
    generateOneNumber();
    generateOneNumber();
}

function init(){
    //locate every cell correctly
    for (var i = 0; i < 4; i++){
        for (var j = 0; j < 4; j++){
            var gridCell = $("#grid-cell-" + i + "-" + j);
            gridCell.css('top', getPosTop(i));
            gridCell.css('left', getPosLeft(j));
        }
    }
    //initializing 2D array
    for (var i = 0;i < 4;i++){
        board[i] = new Array();
        hasConflicted[i] = new Array();
        for (var j = 0; j < 4;j++){
            board[i][j] = 0;
            hasConflicted[i][j] = false;
        }
    }
    //update the latest data
    updateBoardView();

    score = 0;
}

function updateBoardView(){
    $(".number-cell").remove();
    for (var i = 0; i < 4; i++){
        for (var j = 0; j < 4; j++){
            //add number cells for displaying numbers
            $("#grid-container").append('<div class="number-cell" id="number-cell-'+i+'-'+j+'"></div>');
            var theNumberCell = $('#number-cell-'+i+'-'+j);
            if(board[i][j] == 0){
                theNumberCell.css('width', '0px');
                theNumberCell.css('height', '0px');
                theNumberCell.css('top', getPosTop(i) + cellSideLength * 0.5 );
                theNumberCell.css('left', getPosLeft(j) + cellSideLength * 0.5 );
            }
            else{
                theNumberCell.css('width', cellSideLength);
                theNumberCell.css('height', cellSideLength);
                theNumberCell.css('top', getPosTop(i));
                theNumberCell.css('left', getPosLeft(j));
                theNumberCell.css('background-color', getNumberBackgroundColor(board[i][j]));
                theNumberCell.css('color', getNumberColor(board[i][j]));
                theNumberCell.text(board[i][j]);
                if(board[i][j]==512){
                    theNumberCell.css('font-size', '50px');
                }
                if(board[i][j]==1024){
                    theNumberCell.css('font-size', '40px');
                }
                if(board[i][j]==2048 || board[i][j]==4096){
                    theNumberCell.css('font-size', '40px');
                    theNumberCell.css('color', 'red');
                }
            }
            hasConflicted[i][j] = false;
        }
    }
    $('.number-cell').css('line-height', cellSideLength + 'px');
    $('.number-cell').css('font-size', 0.6 * cellSideLength + 'px');
    $('.number-cell').css('border-radius', 0.02 * cellSideLength + 'px');
}

function generateOneNumber(){
    if(nospace(board)){
        return false;
    }
    //comfirm random location
    var randx = parseInt(Math.floor(Math.random() * 4));
    var randy = parseInt(Math.floor(Math.random() * 4));
    var times = 0;
    while (times<50){
        if (board[randx][randy] == 0)
            break;
        var randx = parseInt(Math.floor(Math.random() * 4));
        var randy = parseInt(Math.floor(Math.random() * 4));
        times++;
    }
    if(times == 50){
        for(var i = 0;i < 4;i++){
            for(var j = 0;j < 4;j++){
                if(board[i][j] == 0){
                    randx = i;
                    randy = j;
                }
            }
        }
    }
    //confirm random number
    var randNum = Math.random()<0.5?2:4;
    //display the number on specified location
    board[randx][randy] = randNum;
    showNumberWithAnimation(randx, randy, randNum);
    return true;
}

$(document).keydown(function(event){
    switch(event.keyCode){
        case 37://left
            if (moveLeft()){
                event.preventDefault();
                setTimeout("generateOneNumber()",210);
                setTimeout("isGameOver()",300);
            }
            break;
        case 38://up
            if (moveUp()){
                event.preventDefault();
                setTimeout("generateOneNumber()",210);
                setTimeout("isGameOver()",300);
            }
            break;
        case 39://right
            if (moveRight()){
                event.preventDefault();
                setTimeout("generateOneNumber()",210);
                setTimeout("isGameOver()",300);
            }
            break;
        case 40://down
            if (moveDown()){
                event.preventDefault();
                setTimeout("generateOneNumber()",210);
                setTimeout("isGameOver()",300);
            }
            break;
        default://default
            break;
    }
})

document.addEventListener('touchstart', function(event){
    startx = event.touches[0].pageX;
    starty = event.touches[0].pageY;
});

document.addEventListener('touchmove', function(event){
    event.preventDefault();
})

document.addEventListener('touchend', function(event){
    endx = event.changedTouches[0].pageX;
    endy = event.changedTouches[0].pageY;

    var deltaX = endx - startx;
    var deltaY = endy - starty;

    if (Math.abs(deltaX) < 0.1 * documentWidth && Math.abs(deltaY) < 0.1 * documentWidth){
        return;
    }

    if(Math.abs(deltaX)>=Math.abs(deltaY)){
        if(deltaX > 0){//right
            if (moveRight()){
                setTimeout("generateOneNumber()",210);
                setTimeout("isGameOver()",300);
            }
        }else{//left
            if (moveLeft()){
                setTimeout("generateOneNumber()",210);
                setTimeout("isGameOver()",300);
            }
        }
    }else{
        if(deltaY > 0){//down
            if (moveDown()){
                setTimeout("generateOneNumber()",210);
                setTimeout("isGameOver()",300);
            }
        }else{//up
            if (moveUp()){
                setTimeout("generateOneNumber()",210);
                setTimeout("isGameOver()",300);
            }
        }
    }
});

function isGameOver(){
    if(win(board)){
        alert('Unbelievable! You made it!');
        if(score>10000&&score<14000){
            alert('Congratulations! You are a [master] of 2048!');
        }
        if(score>=14000){
            alert('你是怎么做到的？')
        }
    }
    if(nospace(board) && nomove(board)){
        gameOver();
        if(score>8000){
            alert('Failed but with honor! Try to make your skills better!');
        }
    }
}

function moveLeft(){
    if(!canMoveLeft(board)){
        return false;
    }
    for(var i = 0;i < 4;i++){
        for(var j = 1;j < 4;j++){
            if(board[i][j] != 0){
                for(var k = 0; k < j; k++){
                    if(board[i][k] == 0 && noBlockHorizontal(i,k,j,board)){
                        //move
                        showMoveAnimation(i,j,i,k);
                        board[i][k] = board[i][j];
                        board[i][j] = 0;
                        continue;
                    }
                    else if(board[i][k] == board[i][j] && noBlockHorizontal(i,k,j,board) && !hasConflicted[i][k]){
                        //move
                        showMoveAnimation(i,j,i,k);
                        //emerge
                        board[i][k] += board[i][j];
                        board[i][j] = 0;
                        //score
                        score += board[i][k];
                        updateScore(score);
                        hasConflicted[i][k] = true;
                        continue;
                    }
                }
            }
        }
    }
    setTimeout("updateBoardView()",200);
    return true;
}

function moveRight(){
    if(!canMoveRight(board)){
        return false;
    }
    for(var i = 0;i < 4;i++){
        for(var j = 2;j > -1;j--){
            if(board[i][j] != 0){
                for(var k = 3; k > j; k--){
                    if(board[i][k] == 0 && noBlockHorizontal(i,j,k,board)){
                        //move
                        showMoveAnimation(i,j,i,k);
                        board[i][k] = board[i][j];
                        board[i][j] = 0;
                        continue;
                    }
                    else if(board[i][k] == board[i][j] && noBlockHorizontal(i,j,k,board) && !hasConflicted[i][k]){
                        //move
                        showMoveAnimation(i,j,i,k);
                        //emerge
                        board[i][k] += board[i][j];
                        board[i][j] = 0;
                        //socre
                        score += board[i][k];
                        updateScore(score);
                        hasConflicted[i][k] = true;
                        continue;
                    }
                }
            }
        }
    }
    setTimeout("updateBoardView()",200);
    return true;
}

function moveUp(){
    if(!canMoveUp(board)){
        return false;
    }
    for(var j = 0;j < 4;j++){
        for(var i = 1;i < 4;i++){
            if(board[i][j] != 0){
                for(var k = 0; k < i; k++){
                    if(board[k][j] == 0 && noBlockVertical(j,k,i,board)){
                        //move
                        showMoveAnimation(i,j,k,j);
                        board[k][j] = board[i][j];
                        board[i][j] = 0;
                        continue;
                    }
                    else if(board[k][j] == board[i][j] && noBlockVertical(j,k,i,board) && !hasConflicted[k][j]){
                        //move
                        showMoveAnimation(i,j,k,j);
                        //emerge
                        board[k][j] += board[i][j];
                        board[i][j] = 0;
                        //score
                        score += board[k][j];
                        updateScore(score);
                        hasConflicted[k][j] = true;
                        continue;
                    }
                }
            }
        }
    }
    setTimeout("updateBoardView()",200);
    return true;
}

function moveDown(){
    if(!canMoveDown(board)){
        return false;
    }
    for(var j = 0;j < 4;j++){
        for(var i = 2;i > -1;i--){
            if(board[i][j] != 0){
                for(var k = 3; k > i; k--){
                    if(board[k][j] == 0 && noBlockVertical(j,i,k,board)){
                        //move
                        showMoveAnimation(i,j,k,j);
                        board[k][j] = board[i][j];
                        board[i][j] = 0;
                        continue;
                    }
                    else if(board[k][j] == board[i][j] && noBlockVertical(j,i,k,board) && !hasConflicted[k][j]){
                        //move
                        showMoveAnimation(i,j,k,j);
                        //emerge
                        board[k][j] += board[i][j];
                        board[i][j] = 0;
                        //score
                        score += board[k][j];
                        updateScore(score);
                        hasConflicted[k][j] = true;
                        continue;
                    }
                }
            }
        }
    }
    setTimeout("updateBoardView()",200);
    return true;
}
