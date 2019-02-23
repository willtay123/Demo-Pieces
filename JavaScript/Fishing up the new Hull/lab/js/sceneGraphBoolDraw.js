class SceneGraphBoolDraw extends SceneGraphImage {
    constructor(pImage, pBool) {
        super(pImage);
        this.setShouldDraw(pBool);
    }

    getType() {
        return 'Bool Draw';
    }

    getShouldDraw() {
        return this.mShouldDraw;
        //return false;
    }
    setShouldDraw(bool) {
        this.mShouldDraw = bool;
    }

    draw(pContext) {
        //draw image if true
        pContext.drawImage(this.mImage, 0, 0, this.mImage.width, this.mImage.height);
    }
}