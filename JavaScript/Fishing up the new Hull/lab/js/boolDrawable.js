class BoolDrawable extends Drawable {
    constructor(pImage, pPosition, pAngle, pScale, pBool) {
        super(pImage, pPosition, pAngle, pScale);
        this.setShouldDraw(pBool);
        this.createBoolSceneGraph();
    }

    getShouldDraw() {
        return this.mShouldDraw;
    }
    setShouldDraw(pBool) {
        this.mShouldDraw = pBool;
    }

    getDrawNode() {
        return this.mDrawNode;
    }
    setDrawNode(pNode) {
        this.mDrawNode = pNode;
    }

    getPositionNode() {
        return this.mPositionNode;
    }
    setPositionNode(pNode) {
        this.mPositionNode = pNode;
    }

    createBoolSceneGraph() {
        var topNode = SceneGraphBranchCreator.createBoolDrawBranch(this.getImage(),
            this.getScale(),
            this.getAngle(),
            this.getPosition(),
            this.getShouldDraw()
        );

        var translateNode = topNode;
        this.setPositionNode(translateNode);

        var drawNode = topNode.getChild(0).getChild(0).getChild(0);
        this.setDrawNode(drawNode);

        this.setTopNode(topNode);
    }
}