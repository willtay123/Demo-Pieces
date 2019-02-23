class PhysicsCircle extends PhysicsMover {
    constructor(pPosition, pRadius) {
        var mass = Math.PI * Math.pow(pRadius, 2) / 1000;
        super(pPosition, new Vector(0, 0), mass);

        this.setRadius(pRadius);

        this.constructCircleSceneGraph();
    }

    getType() {
        return "circle";
    }

    getRadius() {
        return this.mRadius;
    }
    setRadius(pRadius) {
        this.mRadius = pRadius;
    }

    update(deltaTime) {
        super.update(deltaTime);

        //console.log("position: " + this.getPosition().getX() + " " + this.getPosition().getY());
    }

    constructCircleSceneGraph() {
        var translateNode = SceneGraphBranchCreator.createCircleDrawBranch(this.getScale(),
            this.getAngle(),
            this.getPosition(),
            this.getRadius()
        );

        var positionNode = translateNode;
        var angleNode = positionNode.getChild(0);
        var scaleNode = angleNode.getChild(0);

        this.setPositionNode(positionNode);
        this.setAngleNode(angleNode);
        this.setScaleNode(scaleNode);

        var colourNode = new SceneGraphState("fillStyle", "#FFFFFF");
        colourNode.addChild(translateNode);

        var topNode = colourNode;

        this.setTopNode(topNode);
    }

    collisionCheck(pObject) {
        //console.log("collision check hit");
        var typeOfObject = pObject.getType();
        var collided = false;

        if (typeOfObject === "line") {
            //line-circle
            collided = Collision.lineLineCheck(pObject, this);
        }
        else if (typeOfObject === "circle") {
            //circle-circle
            collided = Collision.circleCircleCheck(this, pObject);
        }
        else if (typeOfObject === "box") {
            //circle-polygon
            collided = Collision.circleBoxCheck(this, pObject);
        }
        else {
            //console.log("collision in circle found no matching partner");
            //console.log("type of: " + typeOfObject);
        }

        if (collided) {
            //console.log("collided: " + collided + " between: " + this.getType() + " and " + pObject.getType());
            this.collisionHandler(pObject);
        }
    }

    collisionHandler(pObject) {
        Collision.collided(this, pObject);
    }
}