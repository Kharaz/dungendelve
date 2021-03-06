/* Engine.js
 * This file provides the game loop functionality (update entities and render),
 * draws the initial game board on the screen, and then calls the update and
 * render methods on your player and enemy objects (defined in your app.js).
 *
 * A game engine works by drawing the entire game screen over and over, kind of
 * like a flipbook you may have created as a kid. When your player moves across
 * the screen, it may look like just that image/character is moving or being
 * drawn but that is not the case. What's really happening is the entire "scene"
 * is being drawn over and over, presenting the illusion of animation.
 *
 * This engine is available globally via the Engine variable and it also makes
 * the canvas' context (ctx) object globally available to make writing app.js
 * a little simpler to work with.
 */

var Engine = (function(global) {
    /* Predefine the variables we'll be using within this scope,
     * create the canvas element, grab the 2D context for that canvas
     * set the canvas elements height/width and add it to the DOM.
     */
    var doc = global.document,
        win = global.window,
        canvas = doc.createElement('canvas'),
        ctx = canvas.getContext('2d'),
        lastTime;

    canvas.width = room.map[0].length * 128;
    canvas.height = room.map.length * 128;
    canvas.currRoom = room;
    
    doc.body.appendChild(canvas);

    this.objects = [];

    /* This function serves as the kickoff point for the game loop itself
     * and handles properly calling the update and render methods.
     */

    function main() {
        /* Get our time delta information which is required if your game
         * requires smooth animation. Because everyone's computer processes
         * instructions at different speeds we need a constant value that
         * would be the same for everyone (regardless of how fast their
         * computer is) - hurray time!
         */
        var now = Date.now(),
            dt = (now - lastTime) / 1000.0;

        /* Call our update/render functions, pass along the time delta to
         * our update function since it may be used for smooth animation.
         */
        if (player.lives < 0) {
            dt = 0;
        }
        update(dt);
        render();

        /* Set our lastTime variable which is used to determine the time delta
         * for the next time this function is called.
         */
        lastTime = now;

        /* Use the browser's requestAnimationFrame function to call this
         * function again as soon as the browser is able to draw another frame.
         */



        win.requestAnimationFrame(main);
    }

    /* This function does some initial setup that should only occur once,
     * particularly setting the lastTime variable that is required for the
     * game loop.
     */
    function init() {
        reset();
        lastTime = Date.now();

        main();
    }

    /* This function is called by main (our game loop) and itself calls all
     * of the functions which may need to update entity's data. Based on how
     * you implement your collision detection (when two entities occupy the
     * same space, for instance when your character should die), you may find
     * the need to add an additional function call here. For now, we've left
     * it commented out - you may or may not want to implement this
     * functionality this way (you could just implement collision detection
     * on the entities themselves within your app.js file).
     */
    function update(dt) {
        updateEntities(dt);
        //checkCollisions();
    }

    /* This is called by the update function  and loops through all of the
     * objects within your allEnemies array as defined in app.js and calls
     * their update() methods. It will then call the update function for your
     * player object. These update methods should focus purely on updating
     * the data/properties related to  the object. Do your drawing in your
     * render methods.
     */
    function updateEntities(dt) {
            // allEnemies.forEach(function(enemy) {
            //     enemy.update(dt);
            // });
            player.update(dt);
        }
        /*
            function checkCollisions(){
                var width = 101;
                var height = 83;
                
                player.isColliding = false;

                allEnemies.forEach(function(enemy) {
                    if(player.x < enemy.x+width && 
                        player.x+width > enemy.x &&
                        player.y < enemy.y+height &&
                        player.y+height > enemy.y)
                    {
                            player.isColliding = true;
                            //player.die();
                            console.log("player hit thing");
                            return;
                    }
                });
            }
        */

    function checkCollisions()
    { 
        for(var i = 0; i < objects.length; i++){
            for(var j = 0; j < objects.length; j++){
                if(i != j){
                    objects[i].isColliding(objects[j]);
                }
            }
        }
    }

    /* This function initially draws the "game level", it will then call
     * the renderEntities function. Remember, this function is called every
     * game tick (or loop of the game engine) because that's how games work -
     * they are flipbooks creating the illusion of animation but in reality
     * they are just drawing the entire screen over and over.
     */
    function render() {
        /* This array holds the relative URL to the image used
         * for that particular row of the game level.
         */
        renderTerrain(canvas.currRoom);
        renderEntities();
        //renderGui();

        if (player.lives < 0) {
            displayGameover();
        }
    }

    /* This function is called by the render function and is called on each game
     * tick. It's purpose is to then call the render functions you have defined
     * on your enemy and player entities within app.js
     */
    function renderTerrain(currentRoom) {
        /* Loop through the number of rows and columns we've defined above
         * and, using the rowImages array, draw the correct image for that
         * portion of the "grid"
         */
        for (row = 0; row < currentRoom.map[0].length; row++) {
            for (col = 0; col < currentRoom.map.length; col++) {
                var tile = currentRoom.getTile(row, col);
                ctx.drawImage(Resources.get('assets/tiles/' + tile), row * 128, col * 128);
            }
        }
    }

    function renderEntities() {
        /* Loop through all of the objects within the allEnemies array and call
         * the render function you have defined.
         */
        /*
        allEnemies.forEach(function(enemy) {
            enemy.render();
        });
        */
        player.render();
    }

    function renderGui() {
        hearts.forEach(function(element) {
            element.render();
        });

        gem.render();
        ctx.font = "35pt Verdana";
        ctx.fillStyle = "white";
        ctx.strokeStyle = "black";
        ctx.fillText(player.score, 438, 530);
        ctx.strokeText(player.score, 438, 530);

    }

    function displayGameover() {
        ctx.font = "60pt Verdana";
        ctx.fillStyle = "red";
        ctx.strokestyle = "black";
        //     ctx.fillText("Game Over!", ctx.width/2, ctx.height/2);
        //     ctx.strokeText("Game Over!", ctx.width/2, ctx.height/2); 
        ctx.fillText("Game Over!", 50, 250);
        ctx.strokeText("Game Over!", 50, 250);

    }

    ctx.setRoom = function(newRoom) {
        ctx.clearRect(0, 0, ctx.canvas.width, ctx.canvas.height);
        canvas.currRoom = newRoom;
    };

    ctx.getRoom = function() {
        return canvas.currRoom;
    };

    /* This function does nothing but it could have been a good place to
     * handle game reset states - maybe a new game menu or a game over screen
     * those sorts of things. It's only called once by the init() method.
     */
    function reset() {
        // noop
    }

    /* Go ahead and load all of the images we know we're going to need to
     * draw our game level. Then set init as the callback method, so that when
     * all of these images are properly loaded our game will start.
     */
    Resources.load([
        'images/stone-block.png',
        'images/water-block.png',
        'images/grass-block.png',
        'images/enemy-bug.png',
        'images/char-boy.png',
        'images/heart.png',
        'images/Gem_Blue.png',
        'assets/tiles/dungeontile1.png',
        'assets/tiles/dungeontile2.png',
        'assets/tiles/dungeontile2b.png',
        'assets/tiles/dungeontile2c.png',
        'assets/tiles/dungeontile2d.png',
        'assets/tiles/dungeontile2e.png',
        'assets/tiles/dungeontile1b.png',
        'assets/guy.png',
        'assets/guy2.png',
        'assets/guy2b.png',
        'assets/guy3.png',
        'assets/guy4.png',
        'assets/tiles/walltile1.png',
        'assets/tiles/walltile1a.png',
        'assets/tiles/walltile1_E.png',
        'assets/tiles/walltile1_W.png',
        'assets/tiles/walltile1_N.png',
        'assets/tiles/walltile1_S.png',
        'assets/tiles/wallcornerNE.png',
        'assets/tiles/wallcornerNW.png',
        'assets/tiles/wallcornerSE.png',
        'assets/tiles/wallcornerSW.png',
        'assets/tiles/walldoor1_N.png',
        'assets/tiles/walldoor1_S.png',
        'assets/tiles/walldoor1_E.png',
        'assets/tiles/walldoor1_W.png'
    ]);
    Resources.onReady(init);

    /* Assign the canvas' context object to the global variable (the window
     * object when run in a browser) so that developer's can use it more easily
     * from within their app.js files.
     */
    global.ctx = ctx;
})(this);
