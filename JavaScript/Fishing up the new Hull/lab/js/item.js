class Item extends BoolDrawable {
    constructor(pImage, pItemName, pShow, pPosition, pScale, pValue) {
        super(pImage, pPosition, 0, pScale, pShow);
        this.setItemName(pItemName);
        this.setValue(pValue);
        this.setVelocity(new Vector(-200, -100));
        this.setOriginalPos(this.getPosition());
    }

    getItemName() {
        return this.mItemName;
    }
    setItemName(pItemName) {
        this.mItemName = pItemName;
    }

    getVelocity() {
        return this.mVelocity;
    }
    setVelocity(pVelocity) {
        this.mVelocity = pVelocity;
    }

    getValue() {
        return this.mValue;
    }
    setValue(pValue) {
        this.mValue = pValue;
    }

    getOriginalPos() {
        return this.mOriginalPos;
    }
    setOriginalPos(pPos) {
        this.mOriginalPos = pPos;
    }

    getPartner() {
        return this.mPartner;
    }
    setPartner(pPartner) {
        this.mPartner = pPartner;
    }

    getTimeShown() {
        if (this.mTimeShown === undefined) { this.setTimeShown(0); }
        return this.mTimeShown;
    }
    setTimeShown(pSeconds) {
        this.mTimeShown = pSeconds;
    }

    getLinePoint() {
        return this.mLinePosition;
    }
    setLinePoint(pPosition) {
        this.mLinePosition = pPosition;
    }
    updateLinePoint() {
        var itemPos = this.getPosition();
        var linePos = itemPos.add(new Vector(20, 50));
        this.setLinePoint(linePos);
    }

    update(deltaTime) {
        var timeShown = this.getTimeShown();
        //console.log("item show time: " + timeShown);

        this.updateLinePoint();

        var showing = this.getShouldDraw();

        if (showing === true) {
            timeShown += deltaTime;

            var moveAmount = this.mVelocity.multiply(deltaTime);
            var newPos = this.mPosition.add(moveAmount);
            this.setPosition(newPos);
            var translation = Matrix.createTranslation(newPos);
            this.getPositionNode().setLocal(translation);

            //console.log(this.getPosition().getX() + " " + this.getPosition().getY());

            var drawNode = this.getDrawNode();
            drawNode.setShouldDraw(true);

            if (timeShown > 2) {
                //show the partner of the item
                var hasPartner = false;
                if (this.getPartner() !== undefined) {
                    this.getPartner().show();
                    hasPartner = true;
                }

                //hide item
                drawNode.setShouldDraw(false);
                var item = getCurrentFished();
                item.setShouldDraw(false);
                this.setPosition(this.getOriginalPos());

                //remove the current item
                setCurrentFished(undefined);

                if (hasPartner === true) {
                    //remove item
                    getSea().removeItemByObject(this);
                }

                this.setTimeShown(0);
            }
            else {
                this.setTimeShown(timeShown);
            }
        }
    }
}