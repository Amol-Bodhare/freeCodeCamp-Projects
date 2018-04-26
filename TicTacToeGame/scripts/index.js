let PLAYER_TOKEN = 'X';
let COMPUTER_TOKEN = 'O';
var bool=false;
$('#x').css('background-color' ,'#db3445' )
$(document).ready(function() {
    
    $('#x').click(function() {
        PLAYER_TOKEN = 'X';
        COMPUTER_TOKEN = 'O';
        $('#x').css('background-color' ,'#db3445' )
        $('#o').css('background-color' ,'#db7734' )
    })
    $('#o').click(function() {
        PLAYER_TOKEN = 'O';
        COMPUTER_TOKEN = 'X';
        $('#o').css('background-color' ,'#db3445' )
        $('#x').css('background-color' ,'#db7734' )
    })
    
    const grid = [
        ['', '', ''],
        ['', '', ''],
        ['', '', '']
    ];

    function gameOver(grid) {
        // Horizontal
        for (var i = 0; i < 3; i++) {
            if (grid[i][0] !== '' &&
                grid[i][0] === grid[i][1] &&
                grid[i][0] === grid[i][2]) {
                    if(bool) color(i,0,'h');
                    else return grid[i][0];
            }
        }
        // Vertical
        for (var j = 0; j < 3; j++) {
            if (grid[0][j] !== '' &&
                grid[0][j] === grid[1][j] &&
                grid[0][j] === grid[2][j]) {
                    if(bool) color(0,j,'v');
                    else return grid[0][j];
            }
        }
        // Diagonal - top left
        if (grid[0][0] !== '' &&
            grid[0][0] === grid[1][1] &&
            grid[0][0] === grid[2][2]) {
                if(bool) color(0,0,'tl');
                else return grid[0][0];
        }
        // Diagonal - bottom left
        if (grid[2][0] !== '' &&
            grid[2][0] === grid[1][1] &&
            grid[2][0] === grid[0][2]) {
                if(bool) color(2,0,'bl');
                else return grid[2][0];
        }
        for (var i = 0; i < 3; i++) {
            for (var j = 0; j < 3; j++) {
                if (grid[i][j] === '') {
                    return false;
                }
            }
        }

        return null;
    }

    function color(i,j,type) {
        switch(type) {
            case 'h':
            for(var j=0;j<3;j++) {
                $('.cell[data-i=' + i + '][data-j=' + j + ']').css('background-color','#db3445');
            }
            break;
            case 'v': 
            for(var i=0;i<3;i++) {
                $('.cell[data-i=' + i + '][data-j=' + j + ']').css('background-color','#db3445');
            }
            break;
            case 'tl': 
            for(var i=0;i<3;i++) {
                $('.cell[data-i=' + i + '][data-j=' + i + ']').css('background-color','#db3445');
            }
            break;
            case 'bl': 
            for(var j=0;j<3;j++) {
                $('.cell[data-i=' + i + '][data-j=' + j + ']').css('background-color','#db3445');
                i--;
            }
            break;   
        }
    }
    function minmax(newGrid, depth, player) {
        const gameState = gameOver(newGrid);
        
        if (gameState === false) {
            const values = [];
            for (var i = 0; i < 3; i++) {
                for (var j = 0; j < 3; j++) {
                    const gridCopy = _.cloneDeep(newGrid);
                    if (gridCopy[i][j] !== '') continue;
                    gridCopy[i][j] = player;
                    let value = minmax(gridCopy, depth + 1, ((player === PLAYER_TOKEN) ? COMPUTER_TOKEN : PLAYER_TOKEN));
                    values.push({
                        cost: value,
                        cell: {
                            i: i,
                            j: j
                        }
                    });
                }
            }
            if (player === COMPUTER_TOKEN) {
                const max = _.maxBy(values, (v) => {
                    return v.cost;
                });
                if (depth === 0) {
                    return max.cell;
                } else {
                    return max.cost;
                }
            } else {
                const min = _.minBy(values, (v) => {
                    return v.cost;
                });
                if (depth === 0) {
                    return min.cell;
                } else {
                    return min.cost;
                }

            }
        } else if (gameState === null) {
            return 0;
        } else if (gameState === PLAYER_TOKEN) {
            return depth - 10;
        } else if (gameState === COMPUTER_TOKEN) {
            return 10 - depth;
        }
    }

    function computerMove() {
        return minmax(grid, 0, COMPUTER_TOKEN);
    }

    $('.cell').click(function() {

        let gameState = gameOver(grid);

        if (gameState || gameState === null) {
            return;
            
        }

        $this = $(this);
        const i = $this.data('i');
        const j = $this.data('j');
        if (grid[i][j] !== '') {
            return;
        }

        $this.html(PLAYER_TOKEN);

        grid[i][j] = PLAYER_TOKEN;

        gameState = gameOver(grid);
        
        if (gameState) {
            $('.winner').html('<p>Game over: ' + (gameState === COMPUTER_TOKEN ? 'Computer is':'You are') + ' the winner</p>');
            
            setTimeout(function() {
                $('.winner').html('');
                reset();
            }, 2000);
            return;
        } else if (gameState === null) {
          $('.winner').html('<p>Game is drawn! Try again</p>');
          setTimeout(function() {
              $('.winner').html('');
              reset();
          }, 2000);
            return;
        } else {
            const move = computerMove();
            grid[move.i][move.j] = COMPUTER_TOKEN;
            
            $('.cell[data-i=' + move.i + '][data-j=' + move.j + ']').html(COMPUTER_TOKEN);
        }

        gameState = gameOver(grid);
        console.log(gameState);
        if (gameState) {
            bool=true;
            var gs=gameOver(grid);
            $('.winner').html('<p>Game over: ' + (gameState === COMPUTER_TOKEN ? 'Computer is':'You are') + ' the winner</p>');
            setTimeout(function() {
                $('.winner').html('');
                reset();
            }, 2000);
        }
    });
    function reset() {
        bool=false;
        for (var i = 0; i < 3; i++) {
            for (var j = 0; j < 3; j++) {
                grid[i][j] = '';
                $('.cell[data-i=' + i + '][data-j=' + j + ']').html(' ');
                $('.cell[data-i=' + i + '][data-j=' + j + ']').css('background-color','#fff');
            }
        }
    }
    $('#restart').click(reset);

});