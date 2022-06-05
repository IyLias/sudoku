const BOARD_SIZE = 9;

// total number of sudoku games
const GAME_DATABASE = 10;

// BIT CHECK NUMBER
const CHECK_NUMBER = 511;

window.onload = function(){
    document.addEventListener("keydown",keyDownEvent);
}


class SudokuGame{

    constructor(){

        // game map database array
        this.sudokuMapDatas = new Array(GAME_DATABASE);
        for(var i=0;i<GAME_DATABASE;i++){
            this.sudokuMapDatas[i] = new Array(BOARD_SIZE);
            for(var j=0;j<BOARD_SIZE;j++)
                this.sudokuMapDatas[i][j] = new Array(BOARD_SIZE);
        }

        // base/initial sudoku map for reset button
        this.base_sudokuMap = new Array(BOARD_SIZE);
        for(var i=0;i<BOARD_SIZE;i++)
            this.base_sudokuMap[i] = new Array(BOARD_SIZE);

        // sudoku map which applied by user inputs
        this.user_sudokuMap = new Array(BOARD_SIZE);
        for(var i=0;i<BOARD_SIZE;i++)
            this.user_sudokuMap[i] = new Array(BOARD_SIZE);

        // solved sudoku map for showing answer
        this.solved_sudokuMap = new Array(BOARD_SIZE);
        for(var i=0;i<BOARD_SIZE;i++)
            this.solved_sudokuMap[i] = new Array(BOARD_SIZE);
    }


    initGameDatabase(){

        // game map datas
        const gameDatas = [
            // Q150
            [
                [0,8,0,0,7,2,3,0,0],
                [0,0,0,0,0,0,0,0,0],
                [0,0,0,0,0,5,4,0,8],
                [8,0,0,0,0,0,5,0,1],
                [0,1,0,7,0,8,0,4,0],
                [5,0,2,0,0,0,0,0,6],
                [2,0,6,8,0,0,0,0,0],
                [0,0,0,0,0,0,0,0,0],
                [0,0,7,1,3,0,0,6,0]
            ],


            [
                [0,0,7,0,0,1,0,3,9],
                [0,0,1,0,0,0,0,0,0],
                [0,0,0,4,0,0,5,0,7],
                [0,0,5,0,9,0,0,0,4],
                [0,3,0,1,8,4,0,9,0],
                [9,0,0,0,3,0,6,0,0],
                [1,0,9,0,0,2,0,0,0],
                [0,0,0,0,0,0,9,0,0],
                [6,4,0,3,0,9,1,0,0]
            ],

            [
                [0,2,0,3,0,0,0,1,0],
                [3,8,0,0,0,5,0,4,7],
                [0,0,0,2,0,0,0,0,0],
                [0,1,0,0,0,0,8,0,6],
                [0,0,0,0,1,0,0,0,0],
                [5,0,8,0,0,0,0,9,0],
                [0,0,0,0,0,7,0,0,0],
                [4,6,0,1,0,0,0,7,5],
                [0,5,0,0,0,9,0,8,0]
            ],

            [
                [8,0,7,0,0,0,0,0,0],
                [0,0,4,6,1,0,0,2,0],
                [0,0,0,0,0,0,0,0,0],
                [0,0,0,0,3,0,0,4,8],
                [0,0,9,5,0,1,3,0,0],
                [1,3,0,0,6,0,0,0,0],
                [0,0,0,0,0,0,0,0,0],
                [0,6,0,0,8,4,5,0,0],
                [3,0,0,0,0,0,4,0,9]
            ],

            [
                [0,7,0,0,5,0,0,0,2],
                [0,0,0,0,3,0,0,6,9],
                [1,0,0,9,0,2,0,4,0],
                [0,9,0,0,0,6,2,0,0],
                [2,0,0,3,0,9,0,0,4],
                [0,0,1,2,0,0,0,9,0],
                [0,8,0,4,0,3,0,0,7],
                [7,3,0,0,2,0,0,0,0],
                [4,0,0,0,6,0,0,2,0]
            ],


            [
                [0,0,0,1,6,0,2,8,0],
                [0,0,6,0,4,0,1,0,0],
                [0,1,0,0,2,8,4,0,0],
                [0,2,0,0,8,0,7,5,0],
                [8,4,0,0,0,0,0,0,0],
                [0,0,0,0,0,0,0,0,0],
                [5,7,0,9,0,0,0,0,0],
                [9,0,0,0,0,0,0,3,1],
                [0,0,0,0,5,0,0,0,0]
            ],

            [
                [5,0,0,0,0,1,3,0,0],
                [0,0,0,0,0,5,0,2,0],
                [0,0,0,0,2,0,0,8,0],
                [6,0,0,0,0,3,8,0,0],
                [0,2,9,0,0,0,1,3,0],
                [0,0,4,9,0,0,0,0,2],
                [0,4,0,0,5,0,0,0,0],
                [0,1,0,4,0,0,0,0,0],
                [0,0,3,8,0,0,0,0,7]
            ],

            [
                [9,7,5,0,2,0,0,0,1],
                [0,1,0,0,0,4,0,0,0],
                [0,0,0,0,0,6,0,0,0],
                [5,0,9,0,0,0,0,0,0],
                [8,0,0,2,0,5,0,0,7],
                [0,0,0,0,0,0,9,0,8],
                [0,0,0,4,0,0,0,0,0],
                [0,0,0,6,0,0,0,9,0],
                [1,0,0,0,7,0,2,4,6]
            ],

            [
                [0,0,3,0,0,0,2,0,0],
                [7,0,0,0,3,0,5,0,1],
                [0,0,0,1,0,5,0,0,4],
                [2,4,0,0,0,0,0,9,0],
                [0,0,1,5,0,0,0,2,8],
                [0,5,0,0,1,2,0,0,0],
                [0,0,9,0,6,7,0,0,0],
                [0,0,0,0,9,0,0,0,3],
                [8,0,0,0,0,0,0,0,7]
            ],

            [
                [4,0,0,0,0,0,7,0,0],
                [0,6,0,0,0,7,9,0,0],
                [0,0,0,6,4,0,0,0,0],
                [2,0,0,9,1,0,0,0,0],
                [9,0,0,0,0,2,3,0,1],
                [0,0,8,0,0,0,2,0,0],
                [0,5,0,1,0,0,6,4,0],
                [0,3,0,5,6,0,0,0,0],
                [0,0,1,4,0,0,0,0,5]
            ]

        ];


        for(let i=0;i<GAME_DATABASE;i++)
            this.setGameDatabase(i,gameDatas[i]);

    }



    // set values of sudoku game map for target idx
    setGameDatabase(target,map){

        for(var i=0;i<BOARD_SIZE;i++)
            for(var j=0;j<BOARD_SIZE;j++)
                this.sudokuMapDatas[target][i][j] = map[i][j];
    }

    // for pressed new problem button, reset for new game data from game database
    setRandomSudokuMap(){
        let randomNumber = Math.floor((Math.random()*GAME_DATABASE));
        this.setSudokuMap(this.sudokuMapDatas[randomNumber]);
    }


    setSudokuMap(map){

        for(var i=0;i<BOARD_SIZE;i++)
            for(var j=0;j<BOARD_SIZE;j++){
                this.base_sudokuMap[i][j] = map[i][j];
                this.user_sudokuMap[i][j] = map[i][j];
                this.solved_sudokuMap[i][j] = map[i][j]; 
            }

    }


    // for reset button
    printBaseSudokuMap(){
        const number = ['zero','one','two','three','four','five','six','seven','eight','nine'];

        for(var i=0;i<BOARD_SIZE;i++){
            for(var j=0;j<BOARD_SIZE;j++){
                let $baseNumber = document.querySelector('#' + number[i+1] + '_' + number[j+1]);
                $baseNumber.innerHTML = "";
                if(this.base_sudokuMap[i][j] !== 0){
                    $baseNumber.innerHTML = this.base_sudokuMap[i][j];
                    $baseNumber.style.color = 'skyblue';
                    $baseNumber.style.fontWeight = 'bold';
                }

            }

        }

    }



    printUserSudokuMap(){
        const number = ['zero','one','two','three','four','five','six','seven','eight','nine'];

        for(var i=0;i<BOARD_SIZE;i++){
            for(var j=0;j<BOARD_SIZE;j++){
                if(this.user_sudokuMap[i][j] !== 0)
                    document.getElementById(number[i+1] + '_' + number[j+1]).innerHTML = this.user_sudokuMap[i][j];
            }

        }
    }


    // print solved sudokuMap
    printSolvedSudokuMap(){
        const number = ['zero','one','two','three','four','five','six','seven','eight','nine'];

        for(var i=0;i<BOARD_SIZE;i++){
            for(var j=0;j<BOARD_SIZE;j++){
                let $solvedNumber = document.querySelector('#' + number[i+1] + '_' + number[j+1]);
                $solvedNumber.innerHTML = "";
                $solvedNumber.innerHTML = this.solved_sudokuMap[i][j];
                $solvedNumber.style.color = 'skyblue';
                $solvedNumber.style.fontWeight = 'bold';
                
            }

        }

    }


    // search sudoku map and find empty spot
    find_emptySpot(){

        for(var i=0;i<BOARD_SIZE;i++)
            for(var j=0;j<BOARD_SIZE;j++)
                if(this.solved_sudokuMap[i][j] === 0)
                    return [i,j];
        
        return -1;
    }

    checkUserAnswer(){

        let currentCheckNumber = 1;
        const bitNumber = [0,1,2,4,8,16,32,64,128,256];

        // check every row for 1~9 written only one time
        for(var i=0;i<BOARD_SIZE;i++){
            currentCheckNumber = 1;
            for(var j=0;j<BOARD_SIZE;j++)
                currentCheckNumber |= bitNumber[this.user_sudokuMap[i][j]];
            
            if(currentCheckNumber !== CHECK_NUMBER)
                return false;
        }

        // check every column for 1~9 written only one time
        for(var i=0;i<BOARD_SIZE;i++){
            currentCheckNumber = 1;
            for(var j=0;j<BOARD_SIZE;j++)
                currentCheckNumber |= bitNumber[this.user_sudokuMap[i][j]];
            
            if(currentCheckNumber !== CHECK_NUMBER)
                return false;
        }


        // check every 3x3 square for 1~9 written only one time
        const squareIdx = [0,3,6];
        for(var i=0;i<3;i++)
            for(var j=0;j<3;j++){
                currentCheckNumber = 1;
                for(var x=squareIdx[i];x<squareIdx[i]+3;x++)
                    for(var y=squareIdx[j];y<squareIdx[j]+3;y++)
                        currentCheckNumber |= bitNumber[this.user_sudokuMap[x][y]]; 


                if(currentCheckNumber !== CHECK_NUMBER)
                    return false;
            }
        
        // if passed 3 cases tests, then it's correct answer
        return true;
    }


    solve(){
        
        let emptySpot = this.find_emptySpot();
        while(emptySpot !== -1){
            let r = emptySpot[0], c = emptySpot[1];
            console.log(emptySpot);

            for(var p=1;p<10;p++){
                // if current number p is not proper to current empty spot,
                // then escape flag turns on true
                let escape_flag = false;

                // check row of current empty Spot //
                for(var v=0;v<BOARD_SIZE;v++)
                    if(this.solved_sudokuMap[r][v] === p){
                        escape_flag = true;
                        break;
                    }
                
                if(escape_flag === true)
                    continue;
                // check row of current empty spot //


                // check column of current empty Spot //
                for(var v=0;v<BOARD_SIZE;v++)
                if(this.solved_sudokuMap[v][c] === p){
                    escape_flag = true;
                    break;
                }

                if(escape_flag === true)
                    continue;
                // check column of current empty spot //



                // check 3x3 square of empty spot //
                for(var i=(Math.floor(r/3))*3;i<(Math.floor(r/3))*3+3;i++){
                    for(var j=(Math.floor(c/3))*3;j<(Math.floor(c/3))*3+3;j++)
                        if(this.solved_sudokuMap[i][j] === p){
                            escape_flag = true;
                            break;
                        }
                    
                    if(escape_flag === true)
                        break;
                }

                if(escape_flag === true)
                    continue;
                // check 3x3 square of empty spot //
                
                
                // set value p on spot [r,c]
                this.solved_sudokuMap[r][c] = p;
                if(this.solve() === -1)
                    this.solved_sudokuMap[r][c] = 0;
                else    
                    return 0;
            }

            if(this.solved_sudokuMap[r][c] === 0)
                return -1;
        }
        
        return 0;
    }

    // check user sudoku map and answer same
    checkAnswer(){

        if(this.checkUserAnswer() === true)
            return true;
        else 
            return false;
    }

};


// -----------------------------------    main function   ------------------------------------
var mySudoku = new SudokuGame();

// initialize game database
mySudoku.initGameDatabase();

mySudoku.setRandomSudokuMap();

mySudoku.printBaseSudokuMap();
mySudoku.solve();

// -----------------------------------    main function   ------------------------------------



// -----------------------------------    Button     -----------------------------------------

// when reset button clicked, show base sudoku map 
const $resetButton = document.getElementById('reset_button');
$resetButton.addEventListener("click",function(){
    mySudoku.printBaseSudokuMap();
});

// when solve button clicked, show answer on sudoku map page
const $solveButton = document.getElementById('solve_button');
$solveButton.addEventListener("click",function(){
    mySudoku.printSolvedSudokuMap();
});


// check button for comparing user answer and solved answer
const $checkButton = document.getElementById('check_button');
$checkButton.addEventListener("click",function(){
    if(mySudoku.checkAnswer() == true)
        alert("correct!! you solved ))");
    else
        alert("wrong... Try again");
});


// new problem button for showing new problem
const $new_problemButton = document.getElementById('new_problem_button');
$new_problemButton.addEventListener("click",function(){
    mySudoku.setRandomSudokuMap();
    mySudoku.printBaseSudokuMap();
    mySudoku.solve();
});

// -----------------------------------    Button     -----------------------------------------





// -----------------------------------    KEY DOWN EVENT   -----------------------------------

// user position in sudoku board
var user_r = 1, user_c = 1;

const USER_COVER_COLOR = '#EEEEEE';
const EMPTY_COLOR = '#FFFFFF';

// change color of specific position
function changeColorOfSpot(r,c,color){
    const number= ['zero', 'one', 'two', 'three', 'four', 'five', 'six', 'seven', 'eight', 'nine'];
    const $spot = document.querySelector('#' + number[r] + '_' + number[c]);
    console.log($spot);

    $spot.style.backgroundColor = color;
}

// print number for user input
function outputNumber(r,c,num){
    const number= ['zero', 'one', 'two', 'three', 'four', 'five', 'six', 'seven', 'eight', 'nine'];
    const $spot = document.querySelector('#' + number[r] + '_' + number[c]);
    
    $spot.innerHTML = num !== 0 ? num : "";
    $spot.style.fontWeight = 'normal';
    $spot.style.color = 'black';
}


changeColorOfSpot(user_r,user_c,USER_COVER_COLOR);

function keyDownEvent(e){
    switch(e.keyCode){

        // left
        case 37:
            changeColorOfSpot(user_r,user_c,EMPTY_COLOR);
            user_c-=1;
            if(user_c < 1)
                user_c = 1;

            changeColorOfSpot(user_r,user_c,USER_COVER_COLOR);
            break;

        // up
        case 38:
            changeColorOfSpot(user_r,user_c,EMPTY_COLOR);
            user_r-=1;
            if(user_r < 1)
                user_r = 1;

            changeColorOfSpot(user_r,user_c,USER_COVER_COLOR);
            break;

        // right
        case 39:
            changeColorOfSpot(user_r,user_c,EMPTY_COLOR);
            user_c+=1;
            if(user_c > BOARD_SIZE)
                user_c = BOARD_SIZE;

            changeColorOfSpot(user_r,user_c,USER_COVER_COLOR);
            break;

        // down
        case 40:
            changeColorOfSpot(user_r,user_c,EMPTY_COLOR);
            user_r+=1;
            if(user_r > BOARD_SIZE)
                user_r = BOARD_SIZE;

            changeColorOfSpot(user_r,user_c,USER_COVER_COLOR);
            break;



        //case for pressing number -> the number pressed by user should be output on page

        // number 1
        case 49:
            if(mySudoku.base_sudokuMap[user_r-1][user_c-1] === 0){
                outputNumber(user_r,user_c,1);
                mySudoku.user_sudokuMap[user_r-1][user_c-1] = 1;
            }
            break;

        // number 2
        case 50:
            if(mySudoku.base_sudokuMap[user_r-1][user_c-1] === 0){
                outputNumber(user_r,user_c,2);
                mySudoku.user_sudokuMap[user_r-1][user_c-1] = 2;
            }
            break;

        // number 3
        case 51:
            if(mySudoku.base_sudokuMap[user_r-1][user_c-1] === 0){
                outputNumber(user_r,user_c,3);
                mySudoku.user_sudokuMap[user_r-1][user_c-1] = 3;
            }
            break;


        // number 4
        case 52:
            if(mySudoku.base_sudokuMap[user_r-1][user_c-1] === 0){
                outputNumber(user_r,user_c,4);
                mySudoku.user_sudokuMap[user_r-1][user_c-1] = 4;
            }
            break;
    

        // number 5
        case 53:
            if(mySudoku.base_sudokuMap[user_r-1][user_c-1] === 0){
                outputNumber(user_r,user_c,5);
                mySudoku.user_sudokuMap[user_r-1][user_c-1] = 5;
            }
            break;


        // number 6
        case 54:
            if(mySudoku.base_sudokuMap[user_r-1][user_c-1] === 0){
                outputNumber(user_r,user_c,6);
                mySudoku.user_sudokuMap[user_r-1][user_c-1] = 6;
            }
            break;

        
        // number 7
        case 55:
            if(mySudoku.base_sudokuMap[user_r-1][user_c-1] === 0){
                outputNumber(user_r,user_c,7);
                mySudoku.user_sudokuMap[user_r-1][user_c-1] = 7;
            }
            break;

        
        // number 8
        case 56:
            if(mySudoku.base_sudokuMap[user_r-1][user_c-1] === 0){
                outputNumber(user_r,user_c,8);
                mySudoku.user_sudokuMap[user_r-1][user_c-1] = 8;
            }
            break;


        // number 9
        case 57:
            if(mySudoku.base_sudokuMap[user_r-1][user_c-1] === 0){
                outputNumber(user_r,user_c,9);
                mySudoku.user_sudokuMap[user_r-1][user_c-1] = 9;
            }
            break;


        // number 0
        case 48:
            if(mySudoku.base_sudokuMap[user_r-1][user_c-1] === 0){
                outputNumber(user_r,user_c,0);
                mySudoku.user_sudokuMap[user_r-1][user_c-1] = 0;
            }
            break;
    }

}

// -----------------------------------    KEY DOWN EVENT   -----------------------------------
