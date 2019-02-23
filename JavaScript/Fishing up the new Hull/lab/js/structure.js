class Structure {
    constructor(pImage, pPosition, pScale) {
        this.setImage(pImage);
        this.setPosition(pPosition);
        this.setAngle(0);
        this.setScale(pScale);
        this.createSceneGraph();
        this.hide();
    }

    getTopNode() {
        return this.mTopNode;
    }
    setTopNode(pTopNode) {
        this.mTopNode = pTopNode;
    }

    getImage() {
        return this.mImage;
    }
    setImage(pImage) {
        this.mImage = pImage;
    }

    getPosition() {
        return this.mPosition;
    }
    setPosition(pPosition) {
        this.mPosition = pPosition;
    }

    getAngle() {
        return this.mAngle;
    }
    setAngle(pAngle) {
        this.mAngle = pAngle;
    }

    getScale() {
        return this.mScale;
    }
    setScale(pScale) {
        this.mScale = pScale;
    }

    getDrawNode() {
        return this.mDrawNode;
    }
    setDrawNode(pNode) {
        this.mDrawNode = pNode;
    }

    show() {
        this.getDrawNode().setShouldDraw(true);
    }
    hide() {
        this.getDrawNode().setShouldDraw(false);
    }

    createSceneGraph() {
        var topNode = SceneGraphBranchCreator.createBoolDrawBranch(this.getImage(),
            this.getScale(),
            this.getAngle(),
            this.getPosition(),
            false
        );

        var drawNode = topNode.getChild(0).getChild(0).getChild(0);

        this.setDrawNode(drawNode);

        this.setTopNode(topNode);
    }
}