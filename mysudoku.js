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

        // 추후 데이터 넣을 예정..
        const gameDatas = [




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
        let randomNumber = Math.floor((Math.random()*10));
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
                $baseNumber.innerHTML = " ";
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
                $solvedNumber.innerHTML = " ";
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




    }


    solve(){




    }


    checkAnswer(){



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
        alert("정답!! 좀 SMART한 친군가?");
    else
        alert("틀렸어.. 멍청이");
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


}

// print number for user input
function outputNumber(r,c,color){

    
}










// -----------------------------------    KEY DOWN EVENT   -----------------------------------