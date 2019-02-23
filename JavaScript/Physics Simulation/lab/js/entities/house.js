class House extends Drawable {
    constructor(pPosition, pScale, pAngle, pDoorColour) {
        super(pPosition, pAngle, pScale);

        this.setDoorColour(pDoorColour);

        //create the house's scene graph
        this.mTopNode = this.createSceneGraph();
        this.scaleMultiplier = 1;
    }

    getType() {
        return "house";
    }

    getDoorColour() {
        return this.mDoorColour;
    }
    setDoorColour(pDoorColour) {
        this.mDoorColour = pDoorColour;
    }

    update(deltaTime) {
        //rotate the house
        var angle = this.getAngle();
        var angleChange = Math.PI / 16 * deltaTime;
        var newAngle = angle + angleChange;
        this.setAngle(newAngle);

        var angleAdded = Matrix.createRotation(angleChange);
        var newAngleMatrix = this.getAngleNode().getLocal().multiply(angleAdded);

        var angleNode = this.getAngleNode();
        angleNode.setLocal(newAngleMatrix);
        //console.log();

        //scale house
        var scale = this.getScale();

        var scaleChange = new Vector(0.5, 0.5);

        if (scale.getX() < 1 && scale.getY() < 1) {
            if (this.scaleMultiplier == -1) {
                this.scaleMultiplier *= -1;
            }
        }
        else if (scale.getX() > 2 && scale.getY() > 2) {
            if (this.scaleMultiplier == 1) {
                this.scaleMultiplier *= -1;
            }
        }

        var newScale = scale.add(scaleChange.multiply(this.scaleMultiplier).multiply(deltaTime));
        this.setScale(newScale);
        var scaleMatrix = Matrix.createScale(newScale);
        this.getScaleNode().setLocal(scaleMatrix);
    }

    collisionCheck(pObject) {

    }

    createSceneGraph() {
        this.rootNode = new SceneGraphGroup();

        //create the lists of points to draw each item
        var roofPoints = [new Vector(0, -50), new Vector(100, 50), new Vector(-100, 50)];
        var wallPoints = [new Vector(-100, -50), new Vector(100, -50), new Vector(100, 50), new Vector(-100, 50)];
        var doorPoints = [new Vector(-20, -40), new Vector(20, -40), new Vector(20, 40), new Vector(-20, 40)];
        var windowPoints = [new Vector(-20, -20), new Vector(20, -20), new Vector(20, 20), new Vector(-20, 20)];

        //create general matrices
        var translate = Matrix.createTranslation(this.getPosition());
        var rotate = Matrix.createRotation(this.getAngle());
        var scale = Matrix.createScale(this.getScale());

        //wall logic (translate down by 50)
        var wallTopNode = SceneGraphBranchCreator.createDrawBranch(
            wallPoints,
            new Vector(1, 1, 1),
            0,
            new Vector(0, 50)
        );

        //roof logic (translate up by 50)
        var roofTopNode = SceneGraphBranchCreator.createDrawBranch(
            roofPoints,
            new Vector(1, 1, 1),
            0,
            new Vector(0, -50)
        );

        //door logic (translate down by 60)
        var doorTopNode = SceneGraphBranchCreator.createDrawBranch(
            doorPoints,
            new Vector(1, 1, 1),
            0,
            new Vector(0, 60)
        );

        //left window logic (down by 40, left by 60)
        var leftWindowTopNode = SceneGraphBranchCreator.createDrawBranch(
            windowPoints,
            new Vector(1, 1, 1),
            0,
            new Vector(-60, 40)
        );

        //right window logic (down by 40, right by 60)
        var rightWindowTopNode = SceneGraphBranchCreator.createDrawBranch(
            windowPoints,
            new Vector(1, 1, 1),
            0,
            new Vector(60, 40)
        );

        //apply states to nodes
        var stateRoof = new SceneGraphState("fillStyle", "#FF0000");
        stateRoof.addChild(roofTopNode);

        var stateWall = new SceneGraphState("fillStyle", "#FFFFFF");
        stateWall.addChild(wallTopNode);

        var stateDoor = new SceneGraphState("fillStyle", this.mDoorColour);
        stateDoor.addChild(doorTopNode);

        var stateWindow = new SceneGraphState("fillStyle", "#0000FF");
        stateWindow.addChild(leftWindowTopNode);
        stateWindow.addChild(rightWindowTopNode);

        //create general nodes
        var translateNode = new SceneGraphTransform(translate);
        var rotateNode = new SceneGraphTransform(rotate);
        var scaleNode = new SceneGraphTransform(scale);

        this.setPositionNode(translateNode);
        this.setAngleNode(rotateNode);
        this.setScaleNode(scaleNode);

        //--structure tree
        scaleNode.addChild(stateWall); //add the wall
        scaleNode.addChild(stateRoof); //add the roof
        scaleNode.addChild(stateDoor); //add the door
        scaleNode.addChild(stateWindow); //add the windows

        //apply general transform nodes
        rotateNode.addChild(scaleNode);
        translateNode.addChild(rotateNode);

        //create and apply general state nodes
        var lineWidthState = new SceneGraphState("lineWidth", 5);
        var lineJoinState = new SceneGraphState("lineJoin", "round");
        lineJoinState.addChild(translateNode);
        lineWidthState.addChild(lineJoinState);


        //apply a general name to the topNode
        var topNode = lineWidthState;

        return topNode;
    }
}