// create player 1 and player 1 color
let player1 = prompt("Player One: Enter Your Name, you will be Blue");
let player1Color = 'rgb(86, 151, 255)';

// craete player 2 and player 2 color
let player2 = prompt("Player Two: Enter Your Name, you will be Red");
let player2Color = 'rgb(237, 45, 73)';

// get the full table
let table = $('table tr');

// start with player 1
let currentPlayer = 1;
let currentName = player1;
let currentColor = player1Color;


$('h3').text(player1 + ": it is your turn, please pick a column to drop your blue chip.");

// create a event listener when players click the button
$('.board button').click(function(){
    // get the column
    let col = $(this).closest('td').index();
    
    // get the bottom most row with gray color
    let bottomAvail = checkBottom(col);
    
    //check the color of the bottom row of the selected column
    changeColor(bottomAvail, col, currentColor)
    
    // check to see if there is a win
    if(horizontalWinCheck() || verticalWinCheck() || diagonalWinCheck()){
        gameEnd(currentName);
    }
    
    currentPlayer *= -1;
    
    if(currentPlayer === 1){
        currentName = player1;
        $('h3').text(currentName+": it is your turn, please pick a column to drop your blue chip.");
        currentColor = player1Color;
    }else{
        currentName = player2;
        $('h3').text(currentName+": it is your turn, please pick a column to drop your red chip.")
        currentColor = player2Color;
    }
})

// create a function that will return the button color
function returnColor(rowIndex, colIndex){
    return table.eq(rowIndex).find('td').eq(colIndex).find('button').css('background-color');
}


// create a function that check the bottom most row wuth gray color
function checkBottom(colIndex){
    let colorReport;
    for(let row = 5; row > -1; row--){
        colorReport = returnColor(row, colIndex);
        if (colorReport === 'rgb(128, 128, 128)') {
            return row
        } 
    }
}


// create a function that will change the background color of the button
function changeColor(rowIndex, colIndex, color){
    return table.eq(rowIndex).find('td').eq(colIndex).find('button')
.css('background-color', color);}

// create a function to check if the 4 inputs have the same color
function colorMatchCheck(one, two, three, four){
    return (one === two && one === three && one === four && one !== 'rgb(128, 128, 128)' && one !== undefined);
}

// create a function that will declare the win
function reportWin(rowIndex, colIndex){
    console.log("You won starting at this row, col");
    console.log(rowIndex);
    console.log(colIndex);
}

// create a function to check horizontal win
function horizontalWinCheck(){
    for(let row = 0; row < 6; row++){
        for(let col = 0; col < 4; col++){
            if(colorMatchCheck(returnColor(row, col), returnColor(row, col+1), returnColor(row, col+2), returnColor(row, col+3))){
                console.log('horiz');
                reportWin(row, col);
                return true;
            } else {
                continue;
            }
        }
        
    }
}

// create a function to check vertical win
function verticalWinCheck(){
    for(let col = 0; col < 7; col++){
        for(let row = 0; row < 3; row++){
            if(colorMatchCheck(returnColor(row, col), returnColor(row+1, col), returnColor(row+2, col), returnColor(row+3, col))){
                console.log('vertical');
                reportWin(row, col);
                return true;
            } else {
                continue;
            }
        }
    }
}

// create a function to check diagonal win
function diagonalWinCheck(){
    for(let col = 0; col < 5; col++){
        for(let row = 0; row < 7; row++){
            if(colorMatchCheck(returnColor(row, col), returnColor(row+1,col+1), returnColor(row+2, col+2), returnColor(row+3, col+3))){
                console.log('diag');
                reportWin(row, col);
                return true
            } else if (colorMatchCheck(returnColor(row, col), returnColor(row-1,col+1), returnColor(row-2,col+2), returnColor(row-3,col+3))){
                console.log('diag');
                reportWin(row, col);
                return true;
            } else {
                continue;
            }
        }
    }
}

// create an end game function
function gameEnd(player){
    $('h3').fadeOut('fast');
    $('h2').fadeOut('fast');
    $('h1').text(player+" has won! Refresh your browser to play again!").css("fontSize", "50px")
}
