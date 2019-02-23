class Player extends PhysicsMover {
    constructor() {
        super(new Vector(0, 0), new Vector(0, 0), 7);

        //create data
        this.setLives(3);
        this.dying = false;
        this.timeOfFlash = 0;

        this.driving = false;
        this.turningRight = false;
        this.turningLeft = false;
        this.shooting = false;
        this.roughRadius = 15;

        this.thrustValue = 1000;
        this.turnValue = 3.5;

        //construct scene graph
        this.constructPlayerSceneGraph();

        //create event listeners
        window.addEventListener("keydown", keyDown, false);
        window.addEventListener("keyup", keyUp, false);
    }

    getType() {
        return "player";
    }

    getShapeType() {
        return "polygon";
    }

    getPrime() {
        return 2;
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

    getLives() {
        return this.mLives;
    }
    setLives(number) {
        this.mLives = number;
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

    explode() {
        //blow up player
        this.dying = true;
        this.timeOfDeath = Date.now();

        //take life, if <0, lose
        var lives = this.getLives();
        console.log("lives: " + lives);
        if (lives < 1) {
            console.log("game over");
            gameOver();
        }
        else {
            this.setLives(lives - 1);
        }
    }

    drive() {
        this.driving = true;
    }
    driveRelease() {
        this.driving = false;
    }

    turnRight() {
        this.turningRight = true;
    }
    turnRightRelease() {
        this.turningRight = false;
    }

    turnLeft() {
        this.turningLeft = true;
    }
    turnLeftRelease() {
        this.turningLeft = false;
    }

    shoot() {
        if (this.mCanShoot) {
            this.shooting = true;
            this.mCanShoot = false;
        }
    }
    canShoot() {
        this.mCanShoot = true;
    }

    fire() {
        this.shooting = false;

        var direction = this.getDirection();
        //create a bullet
        var bulletPos = this.getPosition().add(direction.multiply(10));
        var bullet = new Bullet(bulletPos, direction);

        addObject(bullet);
    }

    update(deltaTime) {
        //--set the values
        var thrust = 0;
        var thrustVector = new Vector(0, 0);
        var turningSpeed = 0; //may need to be swapped for a constant store to avoid a stop start bug?

        if (this.dying) {
            var timeSinceDeath = (Date.now() - this.timeOfDeath) / 1000;
            if (timeSinceDeath > 3) {
                this.dying = false;
                this.getVisibilityNode().setShouldDraw(true);
            }
            else {
                var timeSinceFlash = (Date.now() - this.timeOfFlash) / 1000;
                if (timeSinceFlash > 0.25) {
                    this.getVisibilityNode().flip();
                    this.timeOfFlash = Date.now();
                }
            }
        }

        if (this.driving) {
            thrust = this.thrustValue;
            var direction = this.getDirection();
            thrustVector = direction.multiply(thrust);
        }

        if (this.turningRight) {
            //add to the turn velocity to turn clockwise
            turningSpeed += this.turnValue;
        }

        if (this.turningLeft) {
            //take from the turn velocity to turn anti-clockwise
            turningSpeed -= this.turnValue;
        }

        if (this.shooting) {
            this.fire();
        }

        //--scale values by deltaTime
        turningSpeed *= deltaTime;

        //--apply values
        this.addForce(thrustVector);
        this.addToAngle(turningSpeed);
        super.update(deltaTime);
    }

    constructPlayerSceneGraph() {
        var points = [new Vector(0, 15), new Vector(10, -15), new Vector(-10, -15)];
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

        //player colour
        var colourNode = SceneGraphBranchCreator.createStateNode('fillStyle', '#50D811');

        //visibility
        var visibilityNode = new SceneGraphVisible(true);
        this.setVisibilityNode(visibilityNode);

        colourNode.addChild(positionNode);
        visibilityNode.addChild(colourNode);

        this.setTopNode(visibilityNode);
    }
}