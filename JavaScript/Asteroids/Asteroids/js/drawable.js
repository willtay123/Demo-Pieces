class Drawable {
    constructor(pPosition, pAngle, pScale) {
        this.setPosition(pPosition);
        this.setAngle(pAngle);
        this.setScale(pScale);
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
    setPosition(pPos) {
        this.mPosition = pPos;
    }

    getPositionNode() {
        return this.mPositionNode;
    }
    setPositionNode(pNode) {
        this.mPositionNode = pNode;
    }
    updatePositionNode(pPosition) {
        var positionMatrix = Matrix.createTranslation(pPosition);
        this.getPositionNode().setLocal(positionMatrix);
    }

    getScale() {
        return this.mScale;
    }
    setScale(pScale) {
        this.mScale = pScale;
        if (this.mScale === undefined) {
            this.mScale = new Vector(1, 1, 1);
        }
    }

    getScaleNode() {
        return this.mScaleNode;
    }
    setScaleNode(pNode) {
        this.mScaleNode = pNode;
    }
    updateScaleNode(pScale) {
        var matrix = Matrix.createScale(pScale);
        this.getScaleNode().setLocal(matrix);
    }

    getAngle() {
        return this.mAngle;
    }
    setAngle(pAngle) {
        this.mAngle = pAngle;
    }
    addToAngle(value) {
        var angle = this.getAngle();
        angle += value;
        this.setAngle(angle);
    }

    getAngleNode() {
        return this.mAngleNode;
    }
    setAngleNode(pNode) {
        this.mAngleNode = pNode;
    }
    updateAngleNode(pAngle) {
        var angleMatrix = Matrix.createRotation(pAngle);
        this.getAngleNode().setLocal(angleMatrix);
    }

    getVisibilityNode() {
        return this.mVisibilityNode;
    }
    setVisibilityNode(node) {
        this.mVisibilityNode = node;
    }
}