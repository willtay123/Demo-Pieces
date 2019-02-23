class AnimatedDrawable extends Drawable {
    constructor(pImage, pPosition, pAngle, pScale, pFrame, pFrames, pFrameWidth, pFrameHeight ) {
        super(pImage, pPosition, pAngle, pScale);
        this.setFrame(pFrame);
        this.setFrames(pFrames);
        this.setFrameWidth(pFrameWidth);
        this.setFrameHeight(pFrameHeight);
        this.createAnimSceneGraph();
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

    setFrameWidth(pFrameWidth) {
        this.mFrameWidth = pFrameWidth;
    }

    getFrameHeight() {
        return this.mFrameHeight;
    }

    setFrameHeight(pFrameHeight) {
        this.mFrameHeight = pFrameHeight;
    }

    createAnimSceneGraph() {
        var topNode = SceneGraphBranchCreator.createAnimatedImageBranch(this.getImage(),
            this.getFrame(),
            this.getFrames(),
            this.getFrameWidth(),
            this.getFrameHeight(),
            this.getScale(),
            this.getAngle(),
            this.getPosition()
        );

        return topNode;
    }
}