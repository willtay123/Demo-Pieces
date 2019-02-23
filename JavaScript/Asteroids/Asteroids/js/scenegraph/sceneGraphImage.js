class SceneGraphImage extends SceneGraphNode {
    constructor(pImage) {
        super();
        this.setImage(pImage);
    }

    getType() {
        return 'Image';
    }

    getImage() {
        return this.mImage;
    }
    setImage(pImage) {
        this.mImage = pImage;
    }

    draw(pContext) {
        pContext.drawImage(this.mImage, 0, 0, this.mImage.width, this.mImage.height);
    }
}