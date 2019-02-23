class Collision {
    constructor() {

    }

    static lineLineCheck(line1, line2) {
        var couldCollide = false;
        var pointsToCheck = [];

        if (line1.getGradient() !== line2.getGradient()) {
            //line1 = line2, to find intercepting point
            var x = (line2.getGradient() - line1.getGradient()) / (line1.getIntercept() - line2.getIntercept());
            var y = (line2.getGradient() * line1.getIntercept() - line1.getGradient() * line2.getIntercept()) / (line1.getIntercept() - line2.getIntercept());

            pointsToCheck.push(new Vector(x, y));

            couldCollide = true;
        }
        else {
            //if gradient is the same
            if (line1.getIntercept() === line2.getIntercept()) {
                couldCollide = true;
                pointsToCheck.push(line1.getStartPos());
                pointsToCheck.push(line1.getEndPos());
            }
        }

        if (couldCollide) {
            for (var i = 0; i < pointsToCheck.length; i += 1) {

                var xIn = false;
                var yIn = false;

                //if intercepting point is contained within line2, collision
                if (pointsToCheck[i].getX() > line2.getStartPos.getX() &&
                    pointsToCheck[i].getX() < line2.getEndPos.getX()) {
                    xIn = true;
                }
                if (pointsToCheck[i].getY() > line2.getStartPos.getY() &&
                    pointsToCheck[i].getY() < line2.getEndPos.getY()) {
                    yIn = true;
                }

                if (xIn && yIn) {
                    //collision
                    return true;
                }
            }
        }

        //hits if not returning true (apparently)
        return false;
    }

    static lineCircleCheck(line, circle) {
        //THE ANSWER https://en.wikipedia.org/wiki/Vector_projection

        //using circle position and inverse of gradient, get a formula of line2
        var circlePos = circle.getPosition();
        var circleRadius = circle.getRadius();

        var lineAsVector = line.getAsVector();
        var lineMag = lineAsVector.magnitude();

        var toCircle = circlePos.subtract(line.getStartPos());
        var toCircleMag = toCircle.magnitude();

        var direction = lineAsVector.normalise();
        var angleBetween = lineAsVector.angleBetween(toCircle);

        var toNearestScale = toCircleMag * Math.cos(angleBetween);
        var toNearest = direction.multiply(toNearestScale);

        //is nearest intersection in the line
        if (0 < toNearestScale && toNearestScale < lineMag) {
            var distanceFromLine = toCircle.subtract(toNearest);

            //distance between collision point and circle centre is used to work out collision or not
            if (circleRadius >= distanceFromLine.magnitude()) {
                //collision
                return true;
            }
        }

        return false;
    }

    static circleBoxCheck(circle, box) {
        var collided = false;
        var edges = box.getEdges();

        for (var i = 0; i < edges.length; i += 1) {
            var edge = edges[i];

            collided = this.lineCircleCheck(edge, circle);

            if (collided) {
                break;
            }
        }

        if (collided) {
            return true;
        }

        return false;
    }

    static linePolygonCheck(line, polygon) {

    }

    static circleCircleCheck(circle1, circle2) {
        var position1 = circle1.getPosition();
        var position2 = circle2.getPosition();

        var vectorDistanceBetween = position1.subtract(position2);
        var magnitudeBetween = vectorDistanceBetween.magnitude();

        var radius1 = circle1.getRadius();
        var radius2 = circle2.getRadius();

        var radiiSum = radius1 + radius2;

        if (magnitudeBetween <= radiiSum) {
            //collided
            //only tells you if collided, if you want to push back, use "VectorBetween" to produce a push value (maybe use velocity too)
            return true;
        }
        else {
            return false;
        }
    }

    static circlePolygonCheck(circle, polygon) {

    }

    static polygonPolygonCheck(polygon1, polygon2) {

    }

    static collided(pObject1, pObject2) {
        //console.log("collisionHandler hit");
        var positionOfFirst = pObject1.getPosition();
        var positionOfSecond = pObject2.getPosition();
        var distanceApart = positionOfFirst.subtract(positionOfSecond);
        var normalised = distanceApart.normalise();

        var push = normalised.multiply(1000);
        var divisor = distanceApart.magnitude();

        if (divisor == 0) {
            divisor = 1;
            push = new Vector(1000, 0);
        }

        pObject1.addForce(push.divide(divisor));
        pObject2.addForce(push.divide(divisor * -1));
    }
}