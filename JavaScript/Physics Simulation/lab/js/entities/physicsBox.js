class PhysicsBox extends PhysicsMover {
    constructor(pWidth, pHeight, pPosition) {
        var mass = pWidth * pHeight / 1000;
        super(pPosition, new Vector(0, 0), mass);

        this.setWidth(pWidth);
        this.setHeight(pHeight);
        this.setAngle(Math.PI / 3); //Math.PI / 3

        this.constructBoxSceneGraph();
    }

    getType() {
        return "box";
    }

    getWidth() {
        return this.mWidth;
    }
    setWidth(pWidth) {
        this.mWidth = pWidth;
    }

    getHeight() {
        return this.mHeight;
    }
    setHeight(pHeight) {
        this.mHeight = pHeight;
    }

    update(deltaTime) {
        super.update(deltaTime);

        //console.log("position: " + this.getPosition().getX() + " " + this.getPosition().getY());

        var positionMatrix = Matrix.createTranslation(this.getPosition());
        this.getPositionNode().setLocal(positionMatrix);
    }

    getCorners() {
        var corners = [];

        var widthAdd = this.getWidth() * 0.5;
        var heightAdd = this.getHeight() * 0.5;

        var positionMatrix = this.getPositionNode().getLocal();
        var scaleMatrix = this.getScaleNode().getLocal();
        var angleMatrix = this.getAngleNode().getLocal();

        var matrix = positionMatrix.multiply(scaleMatrix.multiply(angleMatrix));

        var corner1 = matrix.multiplyVector(new Vector(-widthAdd, -heightAdd));
        var corner2 = matrix.multiplyVector(new Vector(widthAdd, -heightAdd));
        var corner3 = matrix.multiplyVector(new Vector(widthAdd, heightAdd));
        var corner4 = matrix.multiplyVector(new Vector(-widthAdd, heightAdd));
        corners.push(corner1);
        corners.push(corner2);
        corners.push(corner3);
        corners.push(corner4);

        return corners;
    }

    getEdges() {
        var edges = [];
        var corners = this.getCorners();

        var startPoint;
        var endPoint;

        var edge;

        //create edges
        //1-2
        startPoint = corners[0];
        endPoint = corners[1];

        edge = new Line(startPoint, endPoint);
        edges.push(edge);

        //2-3
        startPoint = corners[1];
        endPoint = corners[2];

        edge = new Line(startPoint, endPoint);
        edges.push(edge);

        //3-4
        startPoint = corners[2];
        endPoint = corners[3];

        edge = new Line(startPoint, endPoint);
        edges.push(edge);

        //4-1
        startPoint = corners[3];
        endPoint = corners[0];

        edge = new Line(startPoint, endPoint);
        edges.push(edge);

        return edges;
    }

    collisionCheck(pObject) {
        var typeOfObject = pObject.getType();
        var collided = false;

        if (typeOfObject === "line") {
            //line-line
            collided = Collision.lineLineCheck(this, pObject); //needs to be line-box
        }
        else if (typeOfObject === "circle") {
            //line-circle
            collided = Collision.circleBoxCheck(pObject, this);
        }

        if (collided) {
            this.collided(pObject);
        }
    }

    collided(pObject) {
        console.log("collided");
        Collision.collided(this, pObject);
    }

    constructBoxSceneGraph() {
        var widthAdd = this.getWidth() * 0.5;
        var heightAdd = this.getHeight() * 0.5;

        var points = [new Vector(-widthAdd, -heightAdd), new Vector(widthAdd, -heightAdd), new Vector(widthAdd, heightAdd), new Vector(-widthAdd, heightAdd)];

        var topNode = SceneGraphBranchCreator.createDrawBranch(points, this.getScale(), this.getAngle(), this.getPosition());
        var positionNode = topNode;
        var angleNode = topNode.getChild(0);
        var scaleNode = angleNode.getChild(0);

        this.setPositionNode(positionNode);
        this.setAngleNode(angleNode);
        this.setScaleNode(scaleNode);

        this.setTopNode(topNode);
    }
}