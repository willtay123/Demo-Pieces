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

    static createCircleDrawBranch(pScale,
        pRotate,
        pTranslate,
        pRadius
    ) {
        //create transform matrices
        var scale = Matrix.createScale(pScale);
        var rotate = Matrix.createRotation(pRotate);
        var translate = Matrix.createTranslation(pTranslate);

        //create scene graph nodes
        var scaleNode = new SceneGraphTransform(scale);
        var rotateNode = new SceneGraphTransform(rotate);
        var translateNode = new SceneGraphTransform(translate);

        var circle = new SceneGraphArc(0, 2 * Math.PI, pRadius);

        scaleNode.addChild(circle);
        rotateNode.addChild(scaleNode);
        translateNode.addChild(rotateNode);

        var topNode = translateNode;

        return topNode;
    }

    static createLineDrawBranch(pStartPos, pEndPos) {
        //create transform matrices
        //var scale = Matrix.createScale(pScale);
        //var rotate = Matrix.createRotation(pRotate);
        //var translate = Matrix.createTranslation(pTranslate);

        //create scene graph nodes
        //var scaleNode = new SceneGraphTransform(scale);
        //var rotateNode = new SceneGraphTransform(rotate);
        //var translateNode = new SceneGraphTransform(translate);

        var line = new SceneGraphGeometry([pStartPos, pEndPos]);

        //scaleNode.addChild(circle);
        //rotateNode.addChild(scaleNode);
        //translateNode.addChild(rotateNode);

        var topNode = line;

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
        pTranslate
    ) {
        //create transform matrices
        var scale = Matrix.createScale(pScale);
        var rotate = Matrix.createRotation(pRotate);
        var translate = Matrix.createTranslation(pTranslate);

        //create scene graph nodes
        var scaleNode = new SceneGraphTransform(scale);
        var rotateNode = new SceneGraphTransform(rotate);
        var translateNode = new SceneGraphTransform(translate);

        rotateNode.addChild(scaleNode);
        translateNode.addChild(rotateNode);

        var topNode = translateNode;

        return topNode;
    }
}