class Player extends Drawable {
    constructor(pImage, pPosition, pAngle, pScale, pSea) {
        super(pImage, pPosition, pAngle, pScale);
        this.setScore(0);
        this.setSea(pSea);
        this.setTimeToDisplay(1);
        this.setTimeToWait(2);
        this.mousePressed = false;

        //rod
        var fishingRodImage = new Image();
        fishingRodImage.src = 'content/FishingRod.png';

        var rodPosition = pPosition.add(new Vector(820, 30));

        var rod = new Rod(fishingRodImage, rodPosition, 0, new Vector(0.75, 0.75));
        this.setRod(rod);

        this.setTopNode(this.createPlayerSceneGraph());
    }

    getScore() {
        return this.mScore;
    }
    setScore(pScore) {
        this.mScore = pScore;
    }

    getSea() {
        return this.mSea;
    }
    setSea(pSea) {
        this.mSea = pSea;
    }

    getRod() {
        return this.mRod;
    }
    setRod(pRod) {
        this.mRod = pRod;
    }

    getMarker() {
        return this.mMarker;
    }
    setMarker(pMarker) {
        this.mMarker = pMarker;
    }

    getTimeSinceLast() {
        if (this.mTimeSinceLast === undefined) { this.setTimeSinceLast(Date.now()); }
        return this.mTimeSinceLast;
    }
    setTimeSinceLast(pTime) {
        this.mTimeSinceLast = pTime;
    }

    getTimeToWait() {
        return this.mTimeToWait;
    }
    setTimeToWait(pSeconds) {
        this.mTimeToWait = pSeconds;
    }

    getTimeToDisplay() {
        return this.mTimeToDisplay;
    }
    setTimeToDisplay(pSeconds) {
        this.mTimeToDisplay = pSeconds;
    }

    getTimeDisplaying() {
        if (this.mTimeDisplaying === undefined) { this.setTimeDisplaying(0); }
        return this.mTimeDisplaying;
    }
    setTimeDisplaying(pSeconds) {
        this.mTimeDisplaying = pSeconds;
    }

    addScore(pValue) {
        this.mScore += pValue;
    }

    getShouldPress() {
        return this.mShouldPress;
    }
    setShouldPress(pBool) {
        this.mShouldPress = pBool;
    }

    update(deltaTime) {
        //console.log("time since last: " + this.getTimeSinceLast());
        //console.log("time displaying: " + this.getTimeDisplaying());


        //update whether or not to fish
        if (this.getShouldPress() === false) {
            this.setTimeSinceLast(this.getTimeSinceLast() + deltaTime);

            var timeToWait = this.getTimeToWait();
            if (this.getTimeSinceLast() > timeToWait) {
                //display it
                this.getMarker().setShouldDraw(true);
                this.setShouldPress(true);
            }
        }
        else {
            this.setTimeDisplaying(this.getTimeDisplaying() + deltaTime);
            //keep displaying it until timer is out
            if (this.getTimeDisplaying() > this.getTimeToDisplay()) {
                this.getMarker().setShouldDraw(false);
                //generate random number
                var min = 2;
                var max = 4;
                var randomNumber = Math.floor(Math.random() * (max - min + 1)) + min;
                this.setTimeToDisplay(randomNumber);

                //reset
                this.setShouldPress(false);
                this.setTimeSinceLast(0);
                this.setTimeDisplaying(0);
            }
        }

        if (this.mousePressed === true) {
            console.log("mouse pressed");
            //get item if timed right
            if (this.getShouldPress() === true) {
                //get item
                this.getSea().fish();
            }
            else {
                //removing 10 points for missing the time
                this.addScore(-10);
            }
            this.mousePressed = false;
        }

        //update where line is drawn
        this.getRod().getLine().update(deltaTime);
    }

    mouseClicked() {
        this.mousePressed = true;
    }

    createPlayerSceneGraph() {
        //create transform matrices
        var scale = Matrix.createScale(this.getScale());
        var rotate = Matrix.createRotation(this.getAngle());
        var translate = Matrix.createTranslation(this.getPosition());

        //create scene graph nodes
        var scaleNode = new SceneGraphTransform(scale);
        var rotateNode = new SceneGraphTransform(rotate);
        var translateNode = new SceneGraphTransform(translate);

        var imageNode = new SceneGraphImage(this.getImage());

        var rod = this.getRod();
        var rodTopNode = rod.getTopNode();

        //marker
        var markerImage = new Image();
        markerImage.src = 'content/marker.png';

        var markerTopNode = SceneGraphBranchCreator.createBoolDrawBranch(markerImage, new Vector(0.5, 0.5), 0, new Vector(100, -300), false);
        var marker = markerTopNode.getChild(0).getChild(0).getChild(0);
        this.setMarker(marker);

        scaleNode.addChild(markerTopNode);
        scaleNode.addChild(imageNode);
        scaleNode.addChild(rodTopNode);
        rotateNode.addChild(scaleNode);
        translateNode.addChild(rotateNode);

        var topNode = translateNode;

        return topNode;
    }

    getLineNode() {
        var rod = this.getRod();
        var line = rod.getLine();
        var node = line.getTopNode();
        return node;
    }
}