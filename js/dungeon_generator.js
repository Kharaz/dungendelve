//implementing a binding-of-isaac style generation to rooms because it seems easier
//this should be moved to serverside eventually
var Room = function() {
    this.map = [];
    this.doors = [];
};

Room.prototype.init = function(width, height) {
    for (var y = 0; y < height; y++) {
        this.map.push([]);

        for (var x = 0; x < width; x++) {
            tile = '0';

            if (y === 0) {
                if (x === 0) {
                    tile = '5';
 
                } else if (x == width - 1) {
                    tile = '7';
                } else {
                    tile = '1';
                }
            } else if (y == height - 1) {
                if (x === 0) {
                    tile = '8';
                } else if (x == width - 1) {
                    tile = '6';
                } else {
                    tile = '2';
                }
            }

            if (x === 0) {
                if (y === 0) {
                    tile = '5';
                } else if (y == height - 1) {
                    tile = '8';
                } else {
                    tile = '3';
                }
            } else if (x == width - 1) {
                if (y === 0) {
                    tile = '7';
                } else if (y == height - 1) {
                    tile = '6';
                } else {
                    tile = '4';
                }
            }



            this.map[y].push(tile);
        }
    }
};

Room.prototype.printMap = function() {
    for (var y = 0; y < this.map.length; y++) {
        console.log(this.map[y] + "");
    }
};

var tilePngs = {
    "0": "dungeontile2e.png",
    "1": "walltile1_N.png",
    "2": "walltile1_S.png",
    "3": "walltile1_W.png",
    "4": "walltile1_E.png",
    "5": "wallcornerNW.png",
    "6": "wallcornerSE.png",
    "7": "wallcornerNE.png",
    "8": "wallcornerSW.png"
};

Room.prototype.getTile = function(row, col) {
    tile = this.map[col][row];
    outTile = tilePngs[tile];

    for (var i = 0; i < this.doors.length; i++) {
        if (this.doors[i].x == row && this.doors[i].y == col) {
            return "walldoor1_N.png";
        }
    }

    return outTile;
};

var Door = function(x, y) {
    this.x = x;
    this.y = y;
};
