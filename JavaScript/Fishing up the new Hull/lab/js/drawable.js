class Drawable {
    constructor(pImage, pPosition, pAngle, pScale) {
        this.setImage(pImage);
        this.setPosition(pPosition);
        this.setAngle(pAngle);
        this.setScale(pScale);
        this.createSceneGraph();
    }

    getImage() {
        return this.mImage;
    }
    setImage(pImage) {
        this.mImage = pImage;
    }

    getTopNode() {
        return this.mTopNode;
    }
    setTopNode(pNode) {
        this.mTopNode = pNode;
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

    createSceneGraph() {
        var topNode = SceneGraphBranchCreator.createImageBranch(this.getImage(),
            this.getScale(),
            this.getAngle(),
            this.getPosition()
        );

        this.setTopNode(topNode);
    }
}