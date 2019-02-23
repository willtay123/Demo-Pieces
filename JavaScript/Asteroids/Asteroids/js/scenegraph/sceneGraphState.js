class SceneGraphState extends SceneGraphGroup {
    constructor(pKey, pValue) {
        super();
        this.setKey(pKey);
        this.setValue(pValue);
    }

    getType() {
        return 'State';
    }

    getKey() {
        return this.mKey;
    }
    setKey(pKey) {
        this.mKey = pKey;
    }

    getValue() {
        return this.mValue;
    }
    setValue(pValue) {
        this.mValue = pValue;
    }
}