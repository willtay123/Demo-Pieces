class SceneGraphGroup extends SceneGraphNode {
    constructor() {
        super();
        this.mChildren = [];
    }

    getType() {
        return 'Group';
    }

    getChildren() {
        return this.mChildren;
    }

    getChildCount() {
        return this.mChildren.length;
    }

    getChild(pNum) {
        return this.mChildren[pNum];
    }

    addChild(pChild) {
        this.mChildren.push(pChild);
    }
}