class RenderVisitor {
    constructor(pContext) {
        this.mMatrixStack = [];
        this.setContext(pContext);
    }

    getContext() {
        return this.mContext;
    }
    setContext(pContext) {
        this.mContext = pContext;
    }

    getMatrixStack() {
        return this.mMatrixStack;
    }
    setMatrixStack(pMatrixStack) {
        this.mMatrixStack = pMatrixStack;
    }

    visit(pNode) {
        //get object type and handle it accordingly

        var type = pNode.getType();

        switch (type) {
            case 'Group':
                this.visitGroup(pNode);
                break;
            case 'Transform':
                this.visitTransform(pNode);
                break;
            case 'Geometry':
                this.visitGeometry(pNode);
                break;
            case 'Image':
                this.visitImage(pNode);
                break;
            case 'Animated Image':
                this.visitAnimatedImage(pNode);
                break;
            case 'Bool Draw':
                this.visitBoolDraw(pNode);
                break;
            case 'State':
                this.visitState(pNode);
                break;
        }
    }

    visitGroup(pNode) {
        var index, child;
        for (index = 0; index < pNode.getChildCount(); index += 1) {
            child = pNode.getChild(index);
            child.accept(this);
        }
    }

    visitTransform(pNode) {
        this.pushTransform(pNode.getLocal());
        this.visitGroup(pNode);
        this.popTransform();
    }

    visitGeometry(pNode) {
        //sets the context matrix
        this.peekTransform().setTransform(this.mContext);

        //draws the node
        pNode.draw(this.mContext);
    }

    visitImage(pNode) {
        //sets the context matrix
        this.peekTransform().setTransform(this.mContext);

        //draw the image
        pNode.draw(this.mContext);
    }

    visitAnimatedImage(pNode) {
        //sets the context matrix
        this.peekTransform().setTransform(this.mContext);

        //draw the image
        pNode.draw(this.mContext);
    }

    visitState(pNode) {
        //changes the state of the context effects
        var key = pNode.getKey();
        var value = pNode.getValue();

        var oldVal = this.mContext[key]; //store the old canvas value
        this.mContext[key] = value; //change the canvas value to the new value

        this.visitGroup(pNode); //use the new value on the children

        this.mContext[key] = oldVal; //set the canvas value back to the previous one
    }

    visitBoolDraw(pNode) {
        //sets the context matrix
        this.peekTransform().setTransform(this.mContext);

        //if node is true, draw
        if (pNode.getShouldDraw() === true) {
            pNode.draw(this.getContext());
        }
    }

    pushTransform(pMatrix) {
        if (this.mMatrixStack.length === 0) {
            this.mMatrixStack.push(pMatrix);
        } else {
            var oldTop = this.peekTransform();

            var newTop = oldTop.multiply(pMatrix);

            this.mMatrixStack.push(newTop);
        }
    }

    popTransform() {
        this.mMatrixStack.pop();
    }

    peekTransform() {
        var num = this.mMatrixStack.length;

        return this.mMatrixStack[num - 1];
    }
}