//event handler for window loading
var player, sea, currentFished, score;
function onLoad() {
    var mainCanvas, mainContext, scene, lastTime, renderVisitor;
    var origin, scale, scaleNode, angle, rotateNode;

    //this function will initialise our variables
    function initialiseCanvasContext() {
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

        //move the origin of the canvas to the centre
        origin = Matrix.createTranslation(new Vector(mainCanvas.width / 2, mainCanvas.height / 2, 1));

        var fishermanImage = new Image();
        fishermanImage.src = 'content/fisherman.png';

        var seaImage = new Image();
        seaImage.src = 'content/sea.png';

        var fishImage = new Image();
        fishImage.src = 'content/Fish.png';

        var turbineBladeImage = new Image();
        turbineBladeImage.src = 'content/WindTurbineBlade.png';

        //pier image
        var pierImage = new Image();
        pierImage.src = 'content/Pier.png';


        //create the list of items in the sea
        var itemsLeft = [];

        //turbine piece
        var turbineBlade = new Item(turbineBladeImage, 'turbine', false, new Vector(10, 250), new Vector(0.5, 0.5), 100);
        //turbine
        var windTurbineImage = new Image();
        windTurbineImage.src = 'content/WindTurbine.png';
        var turbine = new Structure(windTurbineImage, new Vector(200, -200), new Vector(0.5, 0.5));
        turbineBlade.setPartner(turbine);

        //the deep piece
        var theDeepPieceImage = new Image();
        theDeepPieceImage.src = 'content/the_deep_piece.png';
        var theDeepPiece = new Item(theDeepPieceImage, 'the deep', false, new Vector(10, 250), new Vector(0.5, 0.5), 100);
        //the deep
        var theDeepImage = new Image();
        theDeepImage.src = 'content/the_deep.png';
        var theDeep = new Structure(theDeepImage, new Vector(-600, -50), new Vector(0.75, 0.75));
        theDeepPiece.setPartner(theDeep);

        //fish
        var fish = new Item(fishImage, 'cod', false, new Vector(10, 250), new Vector(0.20, 0.20), 10);

        itemsLeft.push(turbineBlade);
        itemsLeft.push(theDeepPiece);
        itemsLeft.push(fish);

        sea = new Sea(seaImage, new Vector(-640, 160), 0, new Vector(2, 2), 0, 3, 640, 100, itemsLeft);

        //create the player
        player = new Player(fishermanImage, new Vector(-640, 30), 0, new Vector(0.25, 0.25), sea);
        var lineNode = player.getLineNode();

        //pier
        var pier = new Drawable(pierImage, new Vector(-650, 160), 0, new Vector(1, 1));

        var forTree = [];

        forTree.push(turbine);
        forTree.push(theDeep);
        forTree.push(sea);
        forTree.push(pier);
        //add items
        for (var i = 0; i < itemsLeft.length; i += 1) {
            forTree.push(itemsLeft[i]);
        }

        forTree.push(player);
        
        
        createSceneGraph(forTree);
        
        //get angle and scale nodes
        angle = 0;
        rotateNode = scene.getChild(0);
        scale = new Vector(1, 1, 1);
        scaleNode = scene.getChild(0).getChild(0);

        //add line to the scene
        addToScene(lineNode);
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
        sea.update(deltaTime);

        player.update(deltaTime);
        score = player.getScore();
    }

    function draw() {
        // set the draw fill style colour to black
        mainContext.fillStyle = "#ffffff";

        origin.setTransform(mainContext);

        //fill the canvas with black
        mainContext.fillRect(-640, -360, mainCanvas.width, mainCanvas.height);
        
        //draw the scene
        renderVisitor.visit(scene); 

        mainContext.fillStyle = "#000000";
        mainContext.font = "40pt Calibri";
        mainContext.fillText("Score: " + score, -600, -300);
    }

    function createSceneGraph(pObjects) {
        //create background image
        var backgroundImage = new Image();
        backgroundImage.src = 'content/background.png';

        //create background
        var background = new SceneGraphImage(backgroundImage);
        var translateBackground = new SceneGraphTransform(Matrix.createTranslation(new Vector(-640, -360)));
        translateBackground.addChild(background);

        var topNodes = [];

        //add background as first branch
        topNodes.push(translateBackground);

        for (var i = 0; i < pObjects.length; i += 1) {
            topNodes.push(pObjects[i].getTopNode());
        }

        scene = SceneGraphBranchCreator.createTree(new Vector(1,1,1),
            0,
            new Vector(mainCanvas.width / 2, mainCanvas.height / 2, 1),
            topNodes
        );
        console.log();
    }

    function addToScene(pNode) {
        scaleNode.addChild(pNode);
    }

    initialiseCanvasContext();
    lastTime = Date.now();
    animationLoop();
}

function mouseClicked() {
    player.mouseClicked();
}

function getPlayer() {
    return player;
}
function setPlayer(pPlayer) {
    player = pPlayer;
}

function getSea() {
    return sea;
}
function setSea(pSea) {
    sea = pSea;
}

function getCurrentFished() {
    return currentFished;
}
function setCurrentFished(pCurrent) {
    currentFished = pCurrent;
}

window.addEventListener('load', onLoad, false);
window.addEventListener('mousedown', mouseClicked, true);