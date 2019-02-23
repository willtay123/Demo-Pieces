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

    getAngle() {
        return this.mAngle;
    }
    setAngle(pAngle) {
        this.mAngle = pAngle;
    }

    getAngleNode() {
        return this.mAngleNode;
    }
    setAngleNode(pNode) {
        this.mAngleNode = pNode;
    }
}