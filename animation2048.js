function showNumberWithAnimation(i,j,randNum){
    var numberCell = $('#number-cell-'+i+'-'+j);
    numberCell.css('background-color',getNumberBackgroundColor(randNum));
    numberCell.css('color',getNumberColor(randNum));
    numberCell.text(randNum);
    numberCell.animate({
        width:cellSideLength,
        height:cellSideLength,
        top:getPosTop(i),
        left:getPosLeft(j)
    },200);
}

function showMoveAnimation(fromx, fromy, tox, toy){
    var numbercell = $('#number-cell-'+fromx+'-'+fromy);
    numbercell.animate({
        top:getPosTop(tox),
        left:getPosLeft(toy)
    },200);
}

function updateScore(score){
    $('#score').text(score);
    $('#score').css('background-color',getNumberBackgroundColor2(score));
    $('#score').css('color',"rgb(256,256,256)");
}