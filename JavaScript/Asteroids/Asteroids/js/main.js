var mainContext, mainCanvas;
var originNode, originVector, angle, rotateNode, scale, scaleNode;
var toSpawn, entities, objectsToAdd, objectsToRemove;
var player, score, isGameOver;

//event handler for window loading
function onLoad() {
    var  scene, lastTime, renderVisitor;

    //this function will initialise our variables
    function initialiseCanvasContext() {
        console.log("initialise started");

        //find the canvas element using its id
        mainCanvas = document.getElementById('mainCanvas');
        //if it cant be found
        if (!mainCanvas) {
            //make an error message pop up
            alert('Error: I cannot find the canvas element!');
            return;
        }

        //Get the 2D canvas context
        mainContext = mainCanvas.getContext('2d');
        if (!mainContext) {
            alert('Error: Failed to get context!');
            return;
        }

        //create the render visitor
        renderVisitor = new RenderVisitor(mainContext);

        //create an list of entities
        entities = [];

        objectsToAdd = [];
        objectsToRemove = [];

        //create the score
        score = 0;
        isGameOver = false;

        //create a list of positions to spawn shapes at
        toSpawn = [];

        var entitiesToAdd = [];

        //var circle = new PhysicsCircle(new Vector(0, 0), 20);
        //entitiesToAdd.push(circle);

        //var box = new PhysicsBox(50, 50, new Vector(20, 0));
        //entitiesToAdd.push(box);

        //create 10 random asteroids here
        for (var i = 0; i < 10; i += 1) {
            var asteroid = new Asteroid(mainCanvas.width, mainCanvas.height, 0);
            entitiesToAdd.push(asteroid);
        }

        //player
        player = new Player();
        entitiesToAdd.push(player);

        //create the scenegraph
        createSceneGraph();
        //add objects to a list of entities, their nodes are passed onto the scene graph
        addToEntities(entitiesToAdd);

        console.log("initialise completed");
    }

    function animationLoop() {

        var thisTime = Date.now();
        var deltaTime = (thisTime - lastTime) / 1000;

        if (!isGameOver) {
            update(deltaTime);

            draw();
        }
        else {
            var matrix = Matrix.createTranslation(new Vector(0, 0));
            matrix.setTransform(mainContext);
            mainContext.font = "40px Arial";
            mainContext.fillStyle = "red";
            mainContext.fillText("Game Over!", getScreenWidth() * 0.35, getScreenHeight() * 0.5);
        }

        lastTime = thisTime;

        requestAnimationFrame(animationLoop);
    }

    function update(deltaTime) {
        //use deltaTime to update the game

        //generate the shapes from positions decided by mouse clicks
        //if (toSpawn.length > 0) {
        //    var entitiesToAdd = ShapeGenerator.generateNewShapes(toSpawn);
        //    //empty the "toSpawn" list to prevent endlessly spawning shapes
        //    toSpawn = [];

        //    addToEntities(entitiesToAdd);
        //}

        //add the new objects
        addToEntities(objectsToAdd);
        objectsToAdd = [];

        //remove objects
        for (var i = 0; i < objectsToRemove.length; i += 1) {
            var object = objectsToRemove[i];
            removeFromEntities(object);
        }
        objectsToRemove = [];

        //update all of the entities
        for (var j = 0; j < entities.length; j += 1) {
            entities[j].update(deltaTime);
        }

        updateCollision(deltaTime);
    }

    function draw() {
        // set the draw fill style colour to black
        mainContext.fillStyle = '#000000';

        originNode.getLocal().setTransform(mainContext);

        //fill the canvas with black
        mainContext.fillRect(-400, -300, mainCanvas.width, mainCanvas.height);

        //draw the scene
        renderVisitor.visit(scene);

        //GUI
        var matrix = Matrix.createTranslation(new Vector(0, 0));
        matrix.setTransform(mainContext);
        mainContext.font = "20px Arial";
        mainContext.fillStyle = "white";
        mainContext.fillText("LIVES: " + player.getLives(), 10, 30);
        mainContext.fillText("SCORE: " + score, 10, 60);
    }

    function updateCollision(deltaTime) {
        var tempEntities = [];

        for (var i = 0; i < entities.length - 1; i += 1) {
            //console.log("i: " + i);

            //check collision with all other entities
            for (var j = i + 1; j < entities.length; j += 1) {
                //console.log("i: " + i + " j: " + j);
                Collision.collisionCheck(entities[i], entities[j]);
            }
        }
        
        //console.log("entities length: " + entities.length);
    }

    function createSceneGraph() {
        originVector = new Vector(mainCanvas.width / 2, mainCanvas.height / 2, 1);
        angle = 0;
        scale = new Vector(1, 1, 1);

        scene = SceneGraphBranchCreator.createTree(scale,
            angle,
            originVector,
        );

        originNode = scene;
        rotateNode = originNode.getChild(0);
        scaleNode = rotateNode.getChild(0);
    }

    initialiseCanvasContext();
    lastTime = Date.now();
    animationLoop();
}

function getContext() {
    return mainContext;
}

function getScreenWidth() {
    return mainCanvas.width;
}

function getScreenHeight() {
    return mainCanvas.height;
}

function getMousePos() {
    var rect = mainCanvas.getBoundingClientRect();
    return new Vector(
        event.clientX - rect.left - originVector.getX(),
        event.clientY - rect.top - originVector.getY()
    );
}

function mouseClicked() {
    //spawn circle
    //get mouse position
    var mousePosition = getMousePos();
    //console.log("x: " + mousePosition.getX() + " y: " + mousePosition.getY());

    //add mouse position to a list of circles to spawn
    toSpawn.push(mousePosition);

    //once update is hit, loop through list and make circles at that point stored in list
    //this minimizes event handler while keeping functionality
}

function keyDown() {
    var key = event.key;

    switch (key) {
        case "ArrowUp": //up arrow
            player.drive();
            break;
        case "ArrowRight": //right arrow
            player.turnRight();
            break;
        case "ArrowLeft": //left arrow
            player.turnLeft();
            break;
        case " ":
            player.shoot();
            break;
        case "d":
            //kill the player
            player.setLives(0);
            break;
        case "r":
            //restart the game
            console.log("restart the game");
            break;
        case "h":
            console.log("entity count: " + entities.length);
            break;
        default:
            //console.log("key: " + key);
            break;
    }
}
function keyUp() {
    var key = event.key;

    switch (key) {
        case "ArrowUp": //up arrow
            player.driveRelease();
            break;
        case "ArrowRight": //right arrow
            player.turnRightRelease();
            break;
        case "ArrowLeft": //left arrow
            player.turnLeftRelease();
            break;
        case " ":
            player.canShoot();
            break;
    }
}

function addToEntities(pObjects) {
    //add object to a list of updatables
    for (var objectNum = 0; objectNum < pObjects.length; objectNum += 1) {
        entities.push(pObjects[objectNum]);
    }

    addToTree(pObjects);

    //console.log("number of entities: " + entities.length);
    //console.log("number of children of scale: " + scaleNode.getChildCount());
}

function addToTree(pObjects) {
    for (var objectNum = 0; objectNum < pObjects.length; objectNum += 1) {
        //get the top node of the object
        var topNode = pObjects[objectNum].getTopNode();

        //add the top node of the object to the scene graph
        scaleNode.addChild(topNode);
    }
}

function removeFromEntities(pObject) {
    //remove object from the sceneGraph
    var topNode = pObject.getTopNode();
    removeFromTree(topNode);

    //get the position of the object
    var index = entities.indexOf(pObject);

    if (index > -1) {
        entities.splice(index, 1);
    }
}

function removeFromTree(pNode) {
    scaleNode.removeChild(pNode);
}

function addObject(object) {
    objectsToAdd.push(object);
}
function removeObject(object) {
    objectsToRemove.push(object);
}

function addToScore(value) {
    score += value;
    console.log("score: " + score);
}

function gameOver() {
    isGameOver = true;
}

window.addEventListener('load', onLoad, false);
//window.addEventListener('mousedown', mouseClicked, false);