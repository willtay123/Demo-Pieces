class Vector {
    constructor(pX, pY, pZ) {
        this.setX(pX);
        this.setY(pY);
        this.setZ(pZ);
    }

    getX() {
        return this.mX;
    }
    setX(pX) {
        this.mX = pX;
    }

    getY() {
        return this.mY;
    }
    setY(pY) {
        this.mY = pY;
    }

    getZ() {
        return this.mZ;
    }
    setZ(pZ) {
        this.mZ = pZ;
        if (this.mZ === undefined) {
            this.mZ = 1;
        }
    }

    add(pVector) {
        var newX, newY;

        newX = this.getX() + pVector.getX();
        newY = this.getY() + pVector.getY();

        return new Vector(newX, newY, 1);
    }

    subtract(pVector) {
        var newX, newY;

        newX = this.getX() - pVector.getX();
        newY = this.getY() - pVector.getY();

        return new Vector(newX, newY, 1);
    }

    multiply(pMultiplier) {
        var newX, newY;

        newX = this.getX() * pMultiplier;
        newY = this.getY() * pMultiplier;

        return new Vector(newX, newY, 1);
    }

    divide(pDivider) {
        var newX, newY;

        newX = this.getX() / pDivider;
        var oldY = this.getY();
        newY = oldY / pDivider;

        return new Vector(newX, newY, 1);
    }

    magnitude() {
        return Math.sqrt(this.getX() * this.getX() + this.getY() * this.getY());
    }

    normalise() {
        var mag, vector;
        mag = this.magnitude();

        vector = new Vector(0, 0);

        if (mag > 0) {
            vector = this.divide(mag);
        }

        return vector;
    }

    limitTo(pLimit) {
        var mag;
        mag = this.magnitude();

        if (mag > pLimit) {
            var vector;
            vector = this.divide(mag / pLimit);
            return vector;
        }
        else {
            return new Vector(this.getX(), this.getY(), 1);
        }
    }

    dotProduct(pVector) {
        return this.getX() * pVector.getX() + this.getY() * pVector.getY(); //x = Ax * Bx + Ay * By
    }

    dotProductWithZ(pVector) {
        return this.getX() * pVector.getX() + this.getY() * pVector.getY() + this.getZ() * pVector.getZ(); //x = Ax * Bx + Ay * By + Az * Bz
    }

    interpolate(pVector, pScalar) {
        var linkVector;

        linkVector = pVector.subtract(this); //C. = B. - A.

        return this.add(linkVector.multiply(pScalar)); //scalar percentage along C
    }

    rotate(pAngle) {
        var newX, newY;
        var x, y;

        x = this.getX();
        y = this.getY();

        newX = x * Math.cos(pAngle) - y * Math.sin(pAngle);
        newY = x * Math.sin(pAngle) + y * Math.cos(pAngle);

        return new Vector(newX, newY, 1);
    }

    angleBetween(pVector) {
        return Math.acos(this.dotProduct(pVector) / (this.magnitude() * pVector.magnitude()));
    }
}