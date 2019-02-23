class SceneGraphArc extends SceneGraphNode {
    constructor(pStartAngle, pEndAngle, pRadius) {
        super();
        this.setStartAngle(pStartAngle);
        this.setEndAngle(pEndAngle);
        this.setRadius(pRadius);
    }

    getType() {
        return 'Draw';
    }

    getStartAngle() {
        return this.mStartAngle;
    }
    setStartAngle(pAngle) {
        this.mStartAngle = pAngle;
    }

    getEndAngle() {
        return this.mEndAngle;
    }
    setEndAngle(pAngle) {
        this.mEndAngle = pAngle;
    }

    getRadius() {
        return this.mRadius;
    }
    setRadius(pRadius) {
        this.mRadius = pRadius;
    }

    draw(pContext) {
        pContext.beginPath();

        pContext.arc(0, 0, this.getRadius(), this.getStartAngle(), this.getEndAngle(), false);

        pContext.closePath();

        pContext.fill();
        pContext.stroke();
    }
}