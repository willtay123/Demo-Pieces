class Sea extends AnimatedDrawable {
    constructor(pImage, pPosition, pAngle, pScale, pFrame, pFrames, pFrameWidth, pFrameHeight, pItemsLeft) {
        super(pImage, pPosition, pAngle, pScale, pFrame, pFrames, pFrameWidth, pFrameHeight);        
        this.setItemsLeft(pItemsLeft);
        this.createSeaSceneGraph();
	}
	
	getItemsLeft() {
		return this.mItemsLeft;
    }
    setItemsLeft(pItemsLeft) {
        this.mItemsLeft = pItemsLeft;
    }

    getItem(pIndex) {
        return this.mItemsLeft[pIndex];
    }

    getLastFrameUpdate() {
        if (this.mLastFrameUpdate === undefined) { this.setLastFrameUpdate(Date.now()); }
        return this.mLastFrameUpdate;
    }
    setLastFrameUpdate(pLastUpdate) {
        this.mLastFrameUpdate = pLastUpdate;
    }

    getDrawNode() {
        return this.mDrawNode;
    }
    setDrawNode(pNode) {
        this.mDrawNode = pNode;
    }
	
	removeItemByObject(object) {
		var index = this.mItemsLeft.indexOf(object);
		
		if (index !== -1) {
			this.mItemsLeft.splice(index, 1);
		}
    }

    update(deltaTime) {
        var timeSinceLast = Date.now() - this.getLastFrameUpdate();
        var frameIndex = this.getFrame();
        var frameNum = this.getFrames();

        //console.log(timeSinceLast);

        if (timeSinceLast > 1000) {
            frameIndex += 1;
            this.setLastFrameUpdate(Date.now());
            //console.log(frameIndex);
        }

        if (frameIndex > frameNum) {
            frameIndex = 0;
        }

        this.setFrame(frameIndex);
        this.getDrawNode().setFrame(this.getFrame());

        for (var i = 0; i < this.getItemsLeft().length; i += 1) {
            var item = this.getItem(i);
            item.update(deltaTime);
        }

        //console.log(this.getDrawNode().getFrame());
    }

    fish() {
        //generate the index of a random item in the list
        var min = 1;
        var max = this.getItemsLeft().length;
        var randomNumber = Math.floor(Math.random() * (max - min + 1)) + min;

        //get the object from the list
        var item = this.getItem(randomNumber - 1);

        var player = getPlayer();

        if (item.getItemName() ==='cod') {
            //tell item to show
            item.setShouldDraw(true);

            //sets current fished
            setCurrentFished(item);

            //add items value to the players score
            //player.addTime(5);
        }
        else {
            //tell item to show
            item.setShouldDraw(true);

            //sets current fished
            setCurrentFished(item);

            //add items value to the players score
            player.addScore(item.getValue());
        }

        for (var i = 0; i < this.getItemsLeft().length; i += 1) {
            console.log(this.getItem(i).getItemName());
        }
    }

    createSeaSceneGraph() {

        var topNode = SceneGraphBranchCreator.createAnimatedImageBranch(this.getImage(),
            this.getFrame(),
            this.getFrames(),
            this.getFrameWidth(),
            this.getFrameHeight(),
            this.getScale(),
            this.getAngle(),
            this.getPosition()
        );

        var drawNode = topNode.getChild(0).getChild(0).getChild(0);
        this.setDrawNode(drawNode);

        this.setTopNode(topNode);
    }
}