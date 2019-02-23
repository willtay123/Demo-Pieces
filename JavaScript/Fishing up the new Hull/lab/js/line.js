class Line {
    constructor(pStart, pEnd) {
        this.setStart(pStart);
        this.setEnd(pEnd);
        this.createSceneGraph();
    }

    getStart() {
        return this.mStart;
    }
    setStart(pPosition) {
        this.mStart = pPosition;
    }

    getEnd() {
        return this.mEnd;
    }
    setEnd(pPosition) {
        this.mEnd = pPosition;
    }

    getTopNode() {
        return this.mTopNode;
    }
    setTopNode(pTopNode) {
        this.mTopNode = pTopNode;
    }

    update(deltaTime) {
        //get new end
        var currentItem = getCurrentFished();

        if (currentItem !== undefined) {
            var endPos = currentItem.getLinePoint();
            this.setEnd(endPos);
        }
        else {
            this.setEnd(new Vector(30, 300));
        }

        var points = [];
        points.push(this.getStart());
        points.push(this.getEnd());
        this.mTopNode.setPointList(points);
    }

    createSceneGraph() {
        var points = [];
        points.push(this.getStart());
        points.push(this.getEnd());

        var node = new SceneGraphGeometry(points);
        this.setTopNode(node); 
    }
}