class Box extends Drawable {
    constructor(pWidth, pHeight, pPosition) {
        this.setWidth(pWidth);
        this.setHeight(pHeight);
        this.setPosition(pPosition);

        this.constructBoxSceneGraph();
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

    constructBoxSceneGraph() {
        var points; //create the list of points using width and height and the given position

        var translateNode = SceneGraphBranchCreator.createDrawBranch(points,
            this.getScale(),
            this.getRotation(),
            this.getPosition()
        );
    }
}