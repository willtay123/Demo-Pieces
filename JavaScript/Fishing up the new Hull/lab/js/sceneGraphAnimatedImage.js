class SceneGraphAnimatedImage extends SceneGraphNode {
    constructor(pImage,pFrame, pFrames, pFrameWidth, pFrameHeight) {
        super();
        this.setImage(pImage);
        this.setFrame(pFrame);
        this.setFrames(pFrames);
        this.setFrameWidth(pFrameWidth);
        this.setFrameHeight(pFrameHeight);
    }

    getType() {
        return 'Animated Image';
    }

    getImage() {
        return this.mImage;
    }
    setImage(pImage) {
        this.mImage = pImage;
    }

    getFrame() {
        return this.mFrame;
    }
    setFrame(pFrame) {
        this.mFrame = pFrame;
    }

    getFrames() {
        return this.mFrames;
    }
    setFrames(pFrames) {
        this.mFrames = pFrames;
    }

    getFrameWidth() {
        return this.mFrameWidth;
    }
    setFrameWidth(pWidth) {
        this.mFrameWidth = pWidth;
    }

    getFrameHeight() {
        return this.mFrameHeight;
    }
    setFrameHeight(pHeight) {
        this.mFrameHeight = pHeight;
    }

    draw(pContext) {
        //draw image
        var frameWidth = this.getFrameWidth();
        var frameX = frameWidth * this.getFrame();
        var frameY = 0;
        pContext.drawImage(this.mImage, frameX, frameY, this.getFrameWidth(), this.getFrameHeight(), 0, 0, this.getFrameWidth(), this.getFrameHeight());
    }
}