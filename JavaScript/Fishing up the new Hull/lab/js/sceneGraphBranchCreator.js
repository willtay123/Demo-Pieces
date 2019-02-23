class SceneGraphBranchCreator {
    constructor() {

    }


    static createDrawBranch(pPoints,
        pScale,
        pRotate,
        pTranslate) {
        //create transform matrices
        var scale = Matrix.createScale(pScale);
        var rotate = Matrix.createRotation(pRotate);
        var translate = Matrix.createTranslation(pTranslate);

        //create scene graph nodes
        var scaleNode = new SceneGraphTransform(scale);
        var rotateNode = new SceneGraphTransform(rotate);
        var translateNode = new SceneGraphTransform(translate);

        var shape = new SceneGraphGeometry(pPoints);

        scaleNode.addChild(shape);
        rotateNode.addChild(scaleNode);
        translateNode.addChild(rotateNode);

        var topNode = translateNode;

        return topNode;
    }

    static createImageBranch(pImage,
        pScale,
        pRotate,
        pTranslate) {
        //create transform matrices
        var scale = Matrix.createScale(pScale);
        var rotate = Matrix.createRotation(pRotate);
        var translate = Matrix.createTranslation(pTranslate);

        //create scene graph nodes
        var scaleNode = new SceneGraphTransform(scale);
        var rotateNode = new SceneGraphTransform(rotate);
        var translateNode = new SceneGraphTransform(translate);

        var imageNode = new SceneGraphImage(pImage);

        scaleNode.addChild(imageNode);
        rotateNode.addChild(scaleNode);
        translateNode.addChild(rotateNode);

        var topNode = translateNode;

        return topNode;
    }

    static createBoolDrawBranch(pImage,
        pScale,
        pRotate,
        pTranslate,
        pBool ) {
        //create transform matrices
        var scale = Matrix.createScale(pScale);
        var rotate = Matrix.createRotation(pRotate);
        var translate = Matrix.createTranslation(pTranslate);

        //create scene graph nodes
        var scaleNode = new SceneGraphTransform(scale);
        var rotateNode = new SceneGraphTransform(rotate);
        var translateNode = new SceneGraphTransform(translate);

        var imageNode = new SceneGraphBoolDraw(pImage, pBool);

        scaleNode.addChild(imageNode);
        rotateNode.addChild(scaleNode);
        translateNode.addChild(rotateNode);

        var topNode = translateNode;

        return topNode;
    }

    static createAnimatedImageBranch(pImage,
        pFrame,
        pFrames,
        pFrameWidth,
        pFrameHeight,
        pScale,
        pRotate,
        pTranslate) {
        //create transform matrices
        var scale = Matrix.createScale(pScale);
        var rotate = Matrix.createRotation(pRotate);
        var translate = Matrix.createTranslation(pTranslate);

        //create scene graph nodes
        var scaleNode = new SceneGraphTransform(scale);
        var rotateNode = new SceneGraphTransform(rotate);
        var translateNode = new SceneGraphTransform(translate);

        var imageNode = new SceneGraphAnimatedImage(pImage, pFrame, pFrames, pFrameWidth, pFrameHeight);

        scaleNode.addChild(imageNode);
        rotateNode.addChild(scaleNode);
        translateNode.addChild(rotateNode);

        var topNode = translateNode;

        return topNode;
    }

    static createTree(pScale,
        pRotate,
        pTranslate,
        pChildren) {
        //create transform matrices
        var scale = Matrix.createScale(pScale);
        var rotate = Matrix.createRotation(pRotate);
        var translate = Matrix.createTranslation(pTranslate);

        //create scene graph nodes
        var scaleNode = new SceneGraphTransform(scale);
        var rotateNode = new SceneGraphTransform(rotate);
        var translateNode = new SceneGraphTransform(translate);

        for (var i = 0; i < pChildren.length; i += 1) {
            scaleNode.addChild(pChildren[i]);
        }

        rotateNode.addChild(scaleNode);
        translateNode.addChild(rotateNode);

        var topNode = translateNode;

        return topNode;
    }
}