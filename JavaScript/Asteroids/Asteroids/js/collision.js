class Collision {
    constructor() {

    }

    static collisionCheck(obj1, obj2) {
        var collided = false;

        var prime1 = obj1.getPrime();
        var prime2 = obj2.getPrime();
        var mix = prime1 * prime2;

        switch (mix) {
            case 10:
                //player asteroid mix
                collided = this.polygonPolygonCheck(obj1, obj2);
                if (collided) {
                    if (obj1.getType() === "player") {
                        if (obj1.dying === false) {
                            obj1.explode();
                        }
                    }
                    else {
                        if (obj2.dying === false) {
                            obj2.explode();
                        }
                    }
                }
                break;
            case 15:
                //bullet asteroid mix
                var line;
                if (obj1.getType() === "bullet") {
                    line = obj1.getAsLine();
                    collided = this.linePolygonCheck(line, obj2);
                }
                else {
                    line = obj2.getAsLine();
                    collided = this.linePolygonCheck(line, obj1);
                }

                if (collided) {
                    var scoreToAdd;
                    if (obj1.getType() === "bullet") {
                        scoreToAdd = 75 - obj2.timesBroken * 25;
                        obj2.smash();
                        removeObject(obj1);
                    }
                    else {
                        scoreToAdd = 75 - obj1.timesBroken * 25;
                        obj1.smash();
                        removeObject(obj2);
                    }
                    addToScore(scoreToAdd);
                }
                break;
        }

        return collided;
    }

    static lineLineCheck(line1, line2) {
        var det, gamma, lambda;
        var a = line1.getStartPos().getX();
        var b = line1.getStartPos().getY();
        var c = line1.getEndPos().getX();
        var d = line1.getEndPos().getY();
        var p = line2.getStartPos().getX();
        var q = line2.getStartPos().getY();
        var r = line2.getEndPos().getX();
        var s = line2.getEndPos().getY();

        //'det' checks if the lines are parallel
        det = (c - a) * (s - q) - (r - p) * (d - b);
        if (det === 0) {
            //BUG: if lines are parallel and overlap, it wont detect collision
            if (line1.getIntercept() === line2.getIntercept()) {
                if (line1.isPointWithinBounds(line2.getStartPos()) || line1.isPointWithinBounds(line2.getEndPos())) {
                    return true;
                } else {
                    return false;
                }
            } else {
                return false;
            }
            //return false;
        } else {
            //lamba and gamma get how far down each line the intersection is
            lambda = ((s - q) * (r - a) + (p - r) * (s - b)) / det;
            gamma = ((b - d) * (r - a) + (c - a) * (s - b)) / det;

            //will only return true if the point is inside the bounds of both lines
            return 0 < lambda && lambda < 1 && 0 < gamma && gamma < 1;
        }
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
            var distanceFromLine = toNearest.subtract(toCircle); //WRONG: was toCircle - toNearest, should be flipped

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
        //console.log("edges: " + edges.length);

        for (var h = 0; h < edges.length; h += 1) {
            var pos = edges[h].getStartPos();
            //console.log("position - x: " + pos.getX() + " y: " + pos.getY());
        }

        //console.log("");

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
        var edges = polygon.getEdges();

        for (var i = 0; i < edges.length; i += 1) {
            var edge = edges[i];

            var collided = this.lineLineCheck(line, edge);

            if (collided) {
                return true;
            }
        }

        return false;
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
        //get the 2 collection of edges
        var edges1 = polygon1.getEdges();
        var edges2 = polygon2.getEdges();

        //console.log("player?: " + edges1.length);
        //console.log("other?: " + edges2.length);

        for (var i = 0; i < edges1.length; i += 1) {
            var edge1 = edges1[i];
            for (var j = 0; j < edges2.length; j += 1) {
                var edge2 = edges2[j];

                //if edge1 collides with edge2, collision and return true, else keep looping
                var collided = this.lineLineCheck(edge1, edge2);

                if (collided) {
                    return true;
                }
            }
        }

        return false;
    }

    static collided(pObject1, pObject2) {
        
    }
}