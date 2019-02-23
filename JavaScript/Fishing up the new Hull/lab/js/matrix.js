class Matrix {
    constructor(d1, d2, d3, d4, d5, d6, d7, d8, d9) {
        this.mData = [];
        this.mData.push(d1);
        this.mData.push(d2);
        this.mData.push(d3);
        this.mData.push(d4);
        this.mData.push(d5);
        this.mData.push(d6);
        this.mData.push(d7);
        this.mData.push(d8);
        this.mData.push(d9);
    }

    getElement(pRow, pColumn) {
        var position;
        position = 3 * pRow + pColumn;

        return this.mData[position];
    }

    multiply(pMatrix) {
        //loop throw rows, then columns, place numbers into vectors, dot product
        var result = [];

        for (var row = 0; row < 3; row += 1) {
            var rowData = new Vector(this.getElement(row, 0), this.getElement(row, 1), this.getElement(row, 2));

            for (var column = 0; column < 3; column += 1) {
                var colData = new Vector(pMatrix.getElement(0, column), pMatrix.getElement(1, column), pMatrix.getElement(2, column));

                //place dot product in position (colNum, rowNum) of matrix
                result.push(rowData.dotProductWithZ(colData));
            }
        }

        return new Matrix(
            result[0], result[1], result[2],
            result[3], result[4], result[5],
            result[6], result[7], result[8]
        );
    }

    multiplyVector(pVector) {
        return new Vector(
            this.mData[0] * pVector.getX() + this.mData[1] * pVector.getY() + this.mData[2] * pVector.getZ(),
            this.mData[3] * pVector.getX() + this.mData[4] * pVector.getY() + this.mData[5] * pVector.getZ(),
            this.mData[6] * pVector.getX() + this.mData[7] * pVector.getY() + this.mData[8] * pVector.getZ()
        );
    }

    alert() {
        //create a messagebox with the contents of the matrix for inspection
        alert('Matrix Content: ' + "\n" +
            this.mData[0] + " " + this.mData[1] + " " + this.mData[2] + "\n" +
            this.mData[3] + " " + this.mData[4] + " " + this.mData[5] + "\n" +
            this.mData[6] + " " + this.mData[7] + " " + this.mData[8]
        );
    }

    transform(pContext) {
        pContext.transform(this.mData[0], this.mData[3], this.mData[1], this.mData[4], this.mData[2], this.mData[5]);
    }

    setTransform(pContext) {
        pContext.setTransform(this.mData[0], this.mData[3], this.mData[1], this.mData[4], this.mData[2], this.mData[5]);
    }

    static createIdentity() {
        return new Matrix(
            1, 0, 0,
            0, 1, 0,
            0, 0, 1
        );
    }

    static createTranslation(pVector) {
        return new Matrix(
            1, 0, pVector.getX(),
            0, 1, pVector.getY(),
            0, 0, 1
        );
    }

    static createScale(pVector) {
        return new Matrix(
            pVector.getX(), 0, 0,
            0, pVector.getY(), 0,
            0, 0, 1
        );
    }

    static createRotation(pAngle) {
        return new Matrix(
            Math.cos(pAngle), 0 - Math.sin(pAngle), 0,
            Math.sin(pAngle), Math.cos(pAngle), 0,
            0, 0, 1);
    }
}