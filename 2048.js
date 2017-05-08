function Game() {
    var board = [
        [0, 0, 0, 0],
        [0, 0, 0, 0],
        [0, 0, 0, 0],
        [0, 0, 0, 0]
    ];
 var prev = [
        [0, 0, 0, 0],
        [0, 0, 0, 0],
        [0, 0, 0, 0],
        [0, 0, 0, 0]
    ];
   
var scorer;
    var list;
    var score=0;
    var moves = 0;
    var rows = 4;

    function equal() {
        for (var i = 0; i < 4; i++) {
            for (var j = 0; j < 4; j++) {
                if (board[i][j] !== prev[i][j]){
                    return false;
                }
            }

        }
        return true;
    }

    function randomGenerator() {

        return {
            i: Math.floor((Math.random() * 4)),
            j: Math.floor((Math.random() * 4))
        };
    }

    function emptyPlaceLeft() {
        var count = 16;
        for (var i = 0; i < 4; i++) {
            for (var j = 0; j < 4; j++) {
                if (board[i][j] !== 0) {
                    count--;
                }
            }
        }
        var result = true;
        if (count === 0) {
            result = false;
        }
        return {
            res: result
        };
    }

    function allocater() {

        while (emptyPlaceLeft().res) {
            var value = Math.floor((Math.random() * 10));
            var i = randomGenerator().i;
            var j = randomGenerator().j;
            if (board[i][j] == 0) {
                if (value <= 8)
                    board[i][j] = 2;
                else
                    board[i][j] = 4;
                break;
            }
        }
    }

    function makeAMove(e) {
        var flag = true;
        switch (e.keyCode) {
            case 38: //w
                moves++;
                moveUp();
                break;
            case 37: //a
                moves++;
                moveLeft();
                break;
            case 40: //s
                moves++;
                moveDown();
                break;
            case 39: //d
                moves++
                moveRight();
                break;
            default:
                alert("Invalid Move");
                flag = false;
        }
        if (!isGameFinished().result) {
            if (flag) {
                allocater();
                changeBoard();
            }
        }
    }

    function moveUp() {
        for (var i = 0; i < rows; i++) {
            var temp = [0, 0, 0, 0];
            var k = 0;
            for (var j = 0; j < rows; j++) {
                if (board[j][i] != 0) {
                    temp[k] = board[j][i];
                    k++;
                    board[j][i] = 0;
                }
            }
            k = 0;
            for (var j = 0; j < rows - 1; j++) {
                if (temp[j] == temp[j + 1]) {
					 score+=temp[j]*2;
                    temp[j] = temp[j] + temp[j + 1];
                    temp[j + 1] = 0;
                   
                }
            }
            for (var j = 0; j < rows; j++) {
                if (temp[j] != 0) {
                    board[k][i] = temp[j];
                    k++;
                }
            }
            k = 0;
        }
    }

    function moveLeft() {
        for (var i = 0; i < rows; i++) {
            var temp = [0, 0, 0, 0];
            var k = 0;
            for (var j = 0; j < rows; j++) {
                if (board[i][j] != 0) {
                    temp[k] = board[i][j];
                    k++;
                    board[i][j] = 0;
                }
            }
            k = 0;
            for (var j = 0; j < rows - 1; j++) {
                if (temp[j] == temp[j + 1]) {
					 score+=temp[j]*2;
                    temp[j] = temp[j] + temp[j + 1];
                    
                    temp[j + 1] = 0;
                }
            }
            for (var j = 0; j < rows; j++) {
                if (temp[j] != 0) {
                    board[i][k] = temp[j];
                    k++;
                }
            }
            k = 0;
        }
    }

    function moveDown() {
        for (var i = 0; i < rows; i++) {
            var temp = [0, 0, 0, 0];
            var k = 3;
            for (var j = rows - 1; j >= 0; j--) {
                if (board[j][i] != 0) {
                    temp[k] = board[j][i];
                    k--;
                    board[j][i] = 0;
                }
            }

            for (var j = rows - 1; j > 0; j--) {
                if (temp[j] == temp[j - 1]) {
					score+=temp[j]*2;
                    temp[j] = temp[j] + temp[j - 1];
                     
                    temp[j - 1] = 0;
                }
            }
            k = 3;
            for (var j = rows - 1; j >= 0; j--) {
                if (temp[j] != 0) {
                    board[k][i] = temp[j];
                    k--;
                }
            }
            k = 0;
        }
    }

    function moveRight() {
        for (var i = 0; i < rows; i++) {
            var temp = [0, 0, 0, 0];
            var k = 3;
            for (var j = rows - 1; j >= 0; j--) {
                if (board[i][j] != 0) {
                    temp[k] = board[i][j];
                    k--;
                    board[i][j] = 0;
                }
            }

            for (var j = rows - 1; j > 0; j--) {
                if (temp[j] == temp[j - 1]) {
					 score+=temp[j]*2;
                    temp[j] = temp[j] + temp[j - 1];
                    
                    temp[j - 1] = 0;
                }
            }
            k = 3;
            for (var j = rows - 1; j >= 0; j--) {
                if (temp[j] != 0) {
                    board[i][k] = temp[j];
                    k--;
                }
            }
        }
    }

    function isGameFinished() {
        var rows = 4;
        var res = false;
        var noOfZeros = rows * rows;
        for (var i = 0; i < rows; i++) {
            for (var j = 0; j < rows; j++) {
                if (board[i][j] == 2048) {
                    changeBoard();
                    alert("Tada!!! You Won");

                    res = true;
                }
                if (board[i][j] != 0)
                    noOfZeros--;
            }
        }

        var count1 = 0;
        for (var i = 0; i < rows - 1; i++) {
            for (var j = 0; j < rows; j++) {
                if (board[i][j] != board[i + 1][j])
                    count1++;
            }
        }

        var count2 = 0;
        for (var i = 0; i < rows; i++) {
            for (var j = 0; j < rows - 1; j++) {
                if (board[i][j] != board[i][j + 1])
                    count2++;
            }
        }
        if (count2 == rows * (rows - 1) && count1 == rows * (rows - 1) && noOfZeros == 0) // no of comparisons
        // row and column
        // wise
        {
            res = true;
            var ele = document.getElementById("gameEnded");
            ele.style.display = "block";
           

        }

        return {
            result: res
        };
    }

    function changeBoard() {
        var element = 0;
        for (var i = 0; i < 4; i++) {
            for (var j = 0; j < 4; j++) {
                switch (board[i][j]) {
                    case 0:
                        list[element].setAttribute("class", "empty look");
                        break;
                    case 2:
                        list[element].setAttribute("class", "two look");
                        break;
                    case 4:
                        list[element].setAttribute("class", "four look");
                        break;
                    case 8:
                        list[element].setAttribute("class", "eight look");
                        break;
                    case 16:
                        list[element].setAttribute("class", "sixteen look");
                        break;
                    case 32:
                        list[element].setAttribute("class", "thirtyTwo look");
                        break;
                    case 64:
                        list[element].setAttribute("class", "sixtyFour look");
                        break;
                    case 128:
                        list[element].setAttribute("class", "oneTwentyEight look");
                        break;
                    case 256:
                        list[element].setAttribute("class", "twoFiftySix look");
                        break;
                    case 512:
                        list[element].setAttribute("class", "fiveOneTwo look");
                        break;
                    case 1024:
                        list[element].setAttribute("class", "oneZeroTwoFour look");
                        break;
                    case 2048:
                        list[element].setAttribute("class", "twoZeroFourEight look");
                        break;

                }
                element++;
				
            scorer.innerHTML = "<p>" + score + "</p>";
            }
        }
    }
    return {
        init: function() {
            list = document.querySelectorAll("#gameBox > div > *")
			 scorer = document.getElementById("score");
            console.log(list);
            allocater();
            allocater();
            changeBoard();
            window.addEventListener('keydown', makeAMove);
			

        }
    };

}