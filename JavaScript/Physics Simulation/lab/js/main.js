var originNode, originVector, angle, rotateNode, scale, scaleNode;
var toSpawn;

//event handler for window loading
function onLoad() {
    var mainCanvas, mainContext, entities, scene, lastTime, renderVisitor;

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

        //create a list of positions to spawn shapes at
        toSpawn = [];

        var y, x;
        var orangeDoor = false;
        var houseNumber = 0;
        var entitiesToAdd = [];

        //instanciate all of the houses
        for (y = -200; y < 300; y += 200) {
            for (x = -300; x < 400; x += 200) {
                houseNumber++;
                var housePosition = new Vector(x, y);
                if (houseNumber === 12) {
                    entitiesToAdd.push(new House(housePosition, new Vector(1 , 1, 1), 0, '#FFFFFF'));
                }
                else if (orangeDoor === false) {
                    entitiesToAdd.push(new House(housePosition, new Vector(1, 1, 1), 0, '#FF0000'));
                    orangeDoor = true;
                }
                else {
                    entitiesToAdd.push(new House(housePosition, new Vector(1, 1, 1), 0, '#FF4500'));
                    orangeDoor = false;
                }
            }
        }

        var circle = new PhysicsCircle(new Vector(0, 0), 20);
        entitiesToAdd.push(circle);

        var box = new PhysicsBox(50, 50, new Vector(20, 0));
        entitiesToAdd.push(box);

        //create the scenegraph
        createSceneGraph();
        //add objects to a list of entities, their nodes are passed onto the scene graph
        addToEntities(entitiesToAdd);

        console.log("initialise completed");
    }

    function animationLoop() {

        var thisTime = Date.now();
        var deltaTime = (thisTime - lastTime) / 1000;

        update(deltaTime);

        draw();

        lastTime = thisTime;

        requestAnimationFrame(animationLoop);
    }

    function update(deltaTime) {
        //use deltaTime to update the game

        //rotate the screen
        //angle += Math.PI / 16 * deltaTime;
        //var rotateTemp = Matrix.createRotation(angle);
        //rotateNode.setLocal(rotateTemp);

        //generate the shapes from positions decided by mouse clicks
        if (toSpawn.length > 0) {
            var entitiesToAdd = ShapeGenerator.generateNewShapes(toSpawn);
            //empty the "toSpawn" list to prevent endlessly spawning shapes
            toSpawn = [];

            addToEntities(entitiesToAdd);
        }

        for (var i = 0; i < entities.length; i += 1) {
            entities[i].update(deltaTime);
        }

        updateCollision(deltaTime);
    }

    function draw() {
        // set the draw fill style colour to black
        mainContext.fillStyle = '#ccccb3';

        originNode.getLocal().setTransform(mainContext);

        //fill the canvas with black
        mainContext.fillRect(-400, -300, mainCanvas.width, mainCanvas.height); //this needs adding to scenegraph

        //draw the scene
        renderVisitor.visit(scene);
        
    }

    function updateCollision(deltaTime) {
        var tempEntities = [];

        for (var i = entities.length - 1; i > -1; i -= 1) {
            var objectChecking = entities[i];
            //console.log("i: " + i);

            //check collision with all other entities
            for (var j = 0; j < entities.length - 1; j += 1) {
                //console.log("j: " + j);
                objectChecking.collisionCheck(entities[j]);
            }

            //move to other list
            tempEntities.push(objectChecking);
            entities.pop();
        }

        entities = tempEntities;
        entities.reverse(); //if the order matters
        //console.log("tempEnt length: " + tempEntities.length);
        //console.log("entities length: " + entities.length);
        //console.log("stop");
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

    function addToEntities(pObjects) {
        //add object to a list of updatables
        for (var objectNum = 0; objectNum < pObjects.length; objectNum += 1) {
            entities.push(pObjects[objectNum]); //breaks
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

    initialiseCanvasContext();
    lastTime = Date.now();
    animationLoop();
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

window.addEventListener('load', onLoad, false);
window.addEventListener('mousedown', mouseClicked, true);