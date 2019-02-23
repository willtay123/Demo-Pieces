class SceneGraphVisible extends SceneGraphGroup {
    constructor(pBool) {
        super();
        this.setShouldDraw(pBool);
    }

    getType() {
        return "Visibility";
    }

    setShouldDraw(bool) {
        this.mShouldDraw = bool;
    }
    shouldDraw() {
        return this.mShouldDraw;
    }

    flip() {
        if (this.mShouldDraw) {
            this.mShouldDraw = false;
        }
        else {
            this.mShouldDraw = true;
        }
    }
}