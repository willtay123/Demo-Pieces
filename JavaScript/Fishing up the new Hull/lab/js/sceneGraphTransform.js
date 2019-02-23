class SceneGraphTransform extends SceneGraphGroup {
    constructor(pMatrix) {
        super();
        this.setLocal(pMatrix);
    }

    getType() {
        return 'Transform';
    }

    getLocal() {
        return this.mLocal;
    }

    setLocal(pMatrix) {
        this.mLocal = pMatrix;
    }
}