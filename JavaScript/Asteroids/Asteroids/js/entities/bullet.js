class Bullet extends PhysicsMover {
    constructor(pPosition, direction) {
        var velocity;
        var speed = 150;
        velocity = direction.multiply(speed);
        super(pPosition, velocity, 0);

        //set initial variables
        this.setBirth(Date.now());
        this.roughRadius = 10;
        this.bulletLength = 15;

        var angle = direction.angle() - Math.PI * 0.5;
        this.setAngle(angle);

        this.constructBulletSceneGraph(direction);
    }

    getType() {
        return "bullet";
    }

    getShapeType() {
        return "line";
    }

    getPrime() {
        return 3;
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

    getBirth() {
        return this.timeOfBirth;
    }
    setBirth(pTime) {
        this.timeOfBirth = pTime;
    }

    getAsLine() {
        var startPoint = this.getPosition();

        var lengthVector = new Vector(0, this.bulletLength);
        var rotationMatrix = this.getAngleNode().getLocal();

        var toEnd = rotationMatrix.multiplyVector(lengthVector);
        var endPoint = startPoint.add(toEnd);

        var line = new Line(startPoint, endPoint);

        return line;
    }

    update(deltaTime) {
        var age = (Date.now() - this.getBirth()) / 1000;

        if (age > 2) {
            removeFromEntities(this);
        }

        super.update(deltaTime);
    }

    constructBulletSceneGraph() {
        var points = [];

        points.push(new Vector(0,0));
        points.push(new Vector(0,this.bulletLength));

        var positionNode = SceneGraphBranchCreator.createPositionNode(this.getPosition());
        var angleNode = SceneGraphBranchCreator.createAngleNode(this.getAngle());
        var scaleNode = SceneGraphBranchCreator.createScaleNode(this.getScale());
        var fillColourNode = SceneGraphBranchCreator.createStateNode("fillStyle", "#FFFFFF");
        var strokeColourNode = SceneGraphBranchCreator.createStateNode("strokeStyle", "#FFFFFF");
        var lineWidthNode = SceneGraphBranchCreator.createStateNode("lineWidth", 2);
        var drawNode = SceneGraphBranchCreator.createPolygonNode(points);

        positionNode.addChild(angleNode);
        angleNode.addChild(scaleNode);
        scaleNode.addChild(fillColourNode);
        fillColourNode.addChild(strokeColourNode);
        strokeColourNode.addChild(lineWidthNode);
        lineWidthNode.addChild(drawNode);

        this.setPositionNode(positionNode);
        this.setAngleNode(angleNode);
        this.setScaleNode(scaleNode);

        this.setTopNode(positionNode);
    }
}