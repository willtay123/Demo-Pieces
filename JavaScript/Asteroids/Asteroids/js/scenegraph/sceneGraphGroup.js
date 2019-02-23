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

    removeChild(childNode) {
        var children = this.getChildren();

        //get the position of the child
        var index = children.indexOf(childNode);

        if (index > -1) {
            children.splice(index, 1);
            this.mChildren = children;
        }
    }
}