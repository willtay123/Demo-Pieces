class SceneGraphGeometry extends SceneGraphNode {
    constructor(pPointList) {
        super();
        this.mPointList = [];
        this.setPointList(pPointList);
    }

    getType() {
        return 'Geometry';
    }

    getPointList() {
        return this.mPointList;
    }
    setPointList(pPointList) {
        this.mPointList = pPointList;
    }

    draw(pContext) {
        //move to the first point
        pContext.beginPath();
        pContext.moveTo(this.mPointList[0].getX(), this.mPointList[0].getY());

        for (var i = 1; i < this.mPointList.length; i += 1) {
            //line to that point
            pContext.lineTo(this.mPointList[i].getX(), this.mPointList[i].getY());
        }

        pContext.closePath();

        pContext.fill();
        pContext.stroke();
    }
}