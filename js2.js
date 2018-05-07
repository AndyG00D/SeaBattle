console.log( "start: " );

var clientWidth = document.documentElement.clientWidth;
var clientHeight = document.documentElement.clientHeight - 4;
//console.log( [clientWidth, clientHeight]);

var canvas = document.getElementById("canvas");
var ctx = canvas.getContext("2d");

var DICE = 0.5;
var attemptsLeft = 5;

var SIZE_X = 30;
var SIZE_Y = 30;

var SOLID = 1;
var EMPTY = 0;
var VOID = -1;

var grid = Array();
for (var i = 0; i < SIZE_X * SIZE_Y; i++)
{
    grid.push(SOLID);
}
grid[parseInt(SIZE_X/2)] = EMPTY;

function update()
{
    var pCount = 0;
    // loop through the grid
    for(var y = 0; y < SIZE_Y; y++)
    {
        for(var x = 0; x < SIZE_X; x++)
        {
            // if empty block
            if(getBlock(x,y) == EMPTY)
            {
                // check neighbours
                pCount += makePassage(x,y, -1,0)
                    + makePassage(x,y,  1,0)
                    + makePassage(x,y, 0,-1)
                    + makePassage(x,y, 0, 1);
            }
        }
    }
    // no passage made
    if( pCount == 0 )
    {
        // extra tries in case bad roll of the dice
        attemptsLeft -= 1;
        if( attemptsLeft < 0 )
        {
            // make exit
            for(var x = 0; x < SIZE_X; x++)
            {
                // find passage
                if(getBlock(x,SIZE_Y-2) == EMPTY)
                {
                    setBlock(x,SIZE_Y-1,EMPTY);
                    break;
                }
            }
            console.log("stopping...");
            stopAnimation();
        }
    }
}

function makePassage(x,y, i,j)
{
    // check neighbour (plus left and right)
    if(	 getBlock( x+i,   y+j   ) == SOLID
        && getBlock( x+i+j, y+j+i ) == SOLID
        && getBlock( x+i-j, y+j-i ) == SOLID
    )
    {
        // neighbour's neighbours (plus left and right)
        if(	 getBlock( x+i+i,    y+j+j    ) == SOLID
            && getBlock( x+i+i +j, y+j+j +i ) == SOLID
            && getBlock( x+i+i -j, y+j+j -i ) == SOLID
        )
        {
            // roll the dice
            if( Math.random() > DICE )
            {
                setBlock(x+i, y+j, EMPTY);
                //console.log([x,y,i,j]);
                return 1;
            }
        }
    }
    // no passage
    return 0;
}

function draw()
{
    var width = canvas.width;
    var height = canvas.height;
    var blockX = width/SIZE_X;
    var blockY = height/SIZE_Y;

    // clear board
    ctx.setTransform(1, 0, 0, 1, 0, 0);
    ctx.clearRect(0, 0, width, width);

    // loop through the grid
    ctx.fillStyle="white";
    for(var y = 0; y < SIZE_Y; y++)
    {
        for(var x = 0; x < SIZE_X; x++)
        {
            if(getBlock(x,y) == SOLID)
            {
                ctx.fillRect(x*blockX, y*blockY, blockX-.5, blockY-.5);
            }
        }
    }
}

function getBlock(x,y)
{
    return (x>=0 && y>=0 && x<SIZE_X && y<SIZE_Y) ? grid[x + y*SIZE_X] : VOID;
}

function setBlock(x,y,b)
{
    if(x>=0 && y>=0 && x<SIZE_X && y<SIZE_Y)
    {
        grid[x + y*SIZE_X] = b;
    }
}

var animId = window.setInterval(updateDrawLoop, 100);
function updateDrawLoop()
{
    update();
    draw();
}

function stopAnimation()
{
    window.clearInterval(animId);
    console.log("end.");
}

