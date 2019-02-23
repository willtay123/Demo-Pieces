class Rod extends Drawable {
    constructor(pImage, pPosition, pAngle, pScale) {
        super(pImage, pPosition, pAngle, pScale);
        this.setTip(pPosition.add(new Vector(-586, 23)));

        var rodEndPos = this.getTip();
        var line = new Line(rodEndPos, new Vector(30,300));
        this.setLine(line);
    }

    getTip() {
        return this.mTip;
    }
    setTip(pTip) {
        this.mTip = pTip;
    }

    getLine() {
        return this.mLine;
    }
    setLine(pLine) {
        this.mLine = pLine;
    }
}