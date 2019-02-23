class SceneGraphNode {
    constructor() {

    }

    getType() {
        return "blank node";
    }

    accept(visitor) {
        visitor.visit(this);
    }
}