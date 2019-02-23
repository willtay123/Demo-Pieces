class Asteroid extends PhysicsMover {
    constructor(screenWidth, screenHeight, brokenVal, position) {
        if (position === undefined) {
            var xPos = Math.floor(Math.random() * screenWidth) - screenWidth / 2;
            var yPos = Math.floor(Math.random() * screenHeight) - screenHeight / 2;
            position = new Vector(xPos, yPos);
        }

        var velLimit = 40;

        var xVel = Math.floor(Math.random() * velLimit * 2) - velLimit;
        var yVel = Math.floor(Math.random() * velLimit * 2) - velLimit;
        var velocity = new Vector(xVel, yVel);

        super(position, velocity, 0);

        this.roughRadius = 20;
        this.timesBroken = brokenVal;

        this.constructAsteroidSceneGraph();
    }

    getType() {
        return "asteroid";
    }

    getShapeType() {
        return "polygon";
    }

    getPrime() {
        return 5;
    }

    isOffScreen() {
        var screenWidth = getScreenWidth();
        var screenHeight = getScreenHeight();

        var position = this.getPosition();

        if (position.getX() < 0 - screenWidth * 0.5 - this.roughRadius) {
            position.setX(screenWidth * 0.5);
        }
        else if (position.getX() > screenWidth * 0.5 + this.roughRadius) {
            position.setX(0 - screenWidth * 0.5);
        } else if (position.getY() < 0 - screenHeight * 0.5 - this.roughRadius) {
            position.setY(screenHeight * 0.5);
        }
        else if (position.getY() > screenHeight * 0.5 + this.roughRadius) {
            position.setY(0 - screenHeight * 0.5);
        }
    }

    getPoints() {
        return this.mPoints;
    }
    setPoints(pPoints) {
        this.mPoints = pPoints;
    }

    getEdges() {
        //get the points of the shape
        var points = this.getPoints();
        var pointCount = points.length;
        var shiftedPoints = [];

        //transform them depending on the scene graph to their location relative to origin
        var positionMatrix = this.getPositionNode().getLocal();
        var scaleMatrix = this.getScaleNode().getLocal();
        var angleMatrix = this.getAngleNode().getLocal();

        var transformMatrix = positionMatrix.multiply(scaleMatrix.multiply(angleMatrix));

        for (var shiftCount = 0; shiftCount < points.length; shiftCount += 1) {
            var shiftedPoint = transformMatrix.multiplyVector(points[shiftCount]);
            shiftedPoints.push(shiftedPoint);
        }


        var edges = [];
        var edge;
        var startPoint = shiftedPoints[0];
        var endPoint;

        for (var i = 1; i < pointCount; i += 1) {
            endPoint = shiftedPoints[i];

            //create line from the start and end
            edge = new Line(startPoint, endPoint);

            edges.push(edge);

            //shift the start point over 1 for the next loop
            startPoint = shiftedPoints[i];
        }

        //makes a line from the last point to the first
        endPoint = shiftedPoints[0];
        edge = new Line(startPoint, endPoint);
        edges.push(edge);

        return edges;
    }

    smash() {
        //add 1 to the "broken" value
        var brokenValue = this.timesBroken + 1;

        if (brokenValue < 3) {
            //create 2 smaller asteroids on the same position as the parent with the higher broken value
            var toAdd = [];
            var screenWidth = getScreenWidth();
            var screenHeight = getScreenHeight();

            var asteroid1 = new Asteroid(screenWidth, screenHeight, brokenValue, this.getPosition());
            var asteroid2 = new Asteroid(screenWidth, screenHeight, brokenValue, this.getPosition());

            addObject(asteroid1);
            addObject(asteroid2);
        }
        //delete this object
        removeObject(this);
    }

    update(deltaTime) {
        super.update(deltaTime);
    }

    constructAsteroidSceneGraph() {
        var points = this.generatePoints();
        this.setPoints(points);

        var scene = SceneGraphBranchCreator.createDrawBranch(
            points,
            this.getScale(),
            this.getAngle(),
            this.getPosition()
        );

        var positionNode = scene;
        var angleNode = positionNode.getChild(0);
        var scaleNode = angleNode.getChild(0);

        this.setPositionNode(positionNode);
        this.setAngleNode(angleNode);
        this.setScaleNode(scaleNode);

        var colourNode = SceneGraphBranchCreator.createStateNode('fillStyle', '#A9ACAA');

        colourNode.addChild(positionNode);

        this.setTopNode(colourNode);
    }

    generatePoints() {
        var points = [];
        var maxSize = 30;
        var pointCountMin = 10;
        var pointCountRange = 5;

        var size = maxSize - this.timesBroken * 5;
         
        var diff = maxSize - size;
        var pointAddition = diff / 5;

        var pointCount = Math.floor(Math.random() * pointCountRange) + pointCountMin + pointAddition * 2;

        //console.log("size: " + size);
        //console.log("point count: " + pointCount);

        for (var i = 0; i < pointCount; i += 1) {
            var angle = 2 * Math.PI / pointCount * i;
            var radius = Math.floor(Math.random() * size * 0.5) - size * 0.25 + size;

            var x = radius * Math.cos(angle);
            var y = radius * Math.sin(angle);

            var point = new Vector(x, y);

            points.push(point);
        }

        return points;
    }
}