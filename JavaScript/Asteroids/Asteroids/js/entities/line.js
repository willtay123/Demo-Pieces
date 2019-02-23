class Line {
    constructor(pStartPos, pEndPos) {
        this.setStartPos(pStartPos);
        this.setEndPos(pEndPos);
    }

    getType() {
        return "line";
    }

    getStartPos() {
        return this.mStartPos;
    }
    setStartPos(pPos) {
        this.mStartPos = pPos;
    }

    getEndPos() {
        return this.mEndPos;
    }
    setEndPos(pPos) {
        this.mEndPos = pPos;
    }

    getPoints() {
        var points = [];
        points.push(this.getStartPos());
        points.push(this.getEndPos());

        return points;
    }

    getGradient() {
        var startPos = this.getStartPos();
        var endPos = this.getEndPos();

        var changePos = endPos.subtract(startPos);
        var gradient = changePos.getY() / changePos.getX();

        return gradient;
    }

    getNormal() {
        var startPos = this.getStartPos();
        var endPos = this.getEndPos();

        var changePos = endPos.subtract(startPos);

        var normal = new Vector(changePos.getX() * -1, changePos.getY());

        return normal;
    }

    getIntercept() {
        //c = y - mx

        var grad = this.getGradient();
        var pos = this.getStartPos();

        var intercept = pos.getY() - grad * pos.getX();

        return intercept;
    }

    getAsVector() {
        var asVector = this.getEndPos().subtract(this.getStartPos());

        return asVector;
    }

    isPointWithinBounds(point) {
        var pointX = point.getX();
        var pointY = point.getY();

        var startX = this.getStartPos().getX();
        var startY = this.getStartPos().getY();
        var endX = this.getEndPos().getX();
        var endY = this.getEndPos().getY();

        if (pointX > startX && pointX < endX) {
            if (pointY > startY && pointY < endY) {
                //point is within the bounds
                return true;
            }
        }

        return false;
    }

    collisionCheck(pObject) {
        var typeOfObject = pObject.getType();

        if (typeOfObject === "line") {
            //line-line
            Collision.lineLineCheck(this, pObject);
        }
        else if (typeOfObject === "circle") {
            //line-circle
            Collision.lineCircleCheck(this, pObject);
        }
        else if (typeOfObject === "polygon") {
            //line-polygon
            Collision.linePolygonCheck(this, pObject);
        }
        else {
            console.log("collision in line found no matching partner");
            console.log("type of: " + typeOfObject);
        }
    }
}