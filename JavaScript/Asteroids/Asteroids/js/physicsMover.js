class PhysicsMover extends Drawable {
    constructor(pPosition, pVel, pMass) {
        super(pPosition, 0, new Vector(1, 1));

        this.setAcceleration(new Vector(0, 0));
        this.setVelocity(pVel);
        this.setMass(pMass);

        this.gravity = new Vector(0, 0);
        this.frictionFactor = 0.1;
        this.maxSpeed = 250;

        this.mForceList = [];
    }

    getMass() {
        return this.mMass;
    }
    setMass(pMass) {
        this.mMass = pMass;
    }

    getAcceleration() {
        return this.mAcceleration;
    }
    setAcceleration(pAcc) {
        if (this.mAcceleration === undefined) {
            this.oldAcc = new Vector(0, 0);
            this.mAcceleration = pAcc;
        }
        else {
            this.oldAcc = this.mAcceleration;
            this.mAcceleration = pAcc;
        }
    }

    getVelocity() {
        return this.mVelocity;
    }
    setVelocity(pVel) {
        this.mVelocity = pVel;
    }

    getOldVelocity() {
        return this.mOldVelocity;
    }
    setOldVelocity(pVel) {
        this.mOldVelocity = pVel;
    }

    getForceList() {
        return this.mForceList;
    }
    addForce(pForce) {
        //console.log("x: " + pForce.getX() + " y: " + pForce.getY());
        this.mForceList.push(pForce);
    }
    clearForceList() {
        this.mForceList = [];
    }

    getDirection() {
        //make a vector out of the angle of the object
        var angle = this.getAngle();
        var unit = new Vector(0, 1);
        var rotateMatrix = Matrix.createRotation(angle);
        var direction = rotateMatrix.multiplyVector(unit);

        return direction;
    }
    getDirectionOfMovement() {
        var vel = this.getVelocity();
        var direction = vel.normalise();

        return direction;
    }

    update(deltaTime) {
        this.moveObject(deltaTime);

        this.updatePositionNode(this.getPosition());
        this.updateAngleNode(this.getAngle());
        this.updateScaleNode(this.getScale());
    }

    moveObject(deltaTime) {
        this.updateAcceleration(deltaTime);

        this.updateVelocity(deltaTime);

        this.applyFriction(deltaTime);

        this.updatePosition(deltaTime);

        if (this.isOffScreen()) {
            //move to the opposite side of the screen
            var position = this.getPosition();

            if (position.getX() < 0 - getScreenWidth() * 0.5) {
                //move to the right side
                //move to edge + rough width - 5 --- the 5 prevents the object being moved back and forth
                position.setX(getScreenWidth() * 0.5);
            }
            else if (position.getX() > getScreenWidth() * 0.5) {
                //move to the left side
                position.setX(0 - getScreenWidth() * 0.5);
            }

            if (position.getY() < 0 - getScreenHeight() * 0.5) {
                //move to the bottom?
                position.setY(getScreenHeight() * 0.5);
            }
            else if (position.getY() > getScreenHeight() * 0.5) {
                //move to the top?
                position.setY(0 - getScreenHeight() * 0.5);
            }
        }
    }

    calculateNetForce() {
        //for each force to apply in list, sum
        var forceList = this.getForceList();
        var netForce = new Vector(0, 0);

        for (var i = 0; i < forceList.length; i += 1) {
            netForce = netForce.add(forceList[i]);
        }

        this.clearForceList();

        return netForce;
    }

    updateAcceleration(deltaTime) {
        //use net force to work out the acceleration
        //acceleration = netforce / mass

        var netForce = this.calculateNetForce();

        var acc = netForce.divide(this.getMass());
        acc = acc.add(this.gravity);

        this.setAcceleration(acc);
    }

    updateVelocity(deltaTime) {
        //use acc to calculate vel

        //move the old velocity to the old velocity store
        this.setOldVelocity(this.getVelocity());

        //V = V' + acceleration * deltaTime
        var deltaAcc = this.getAcceleration().multiply(deltaTime);
        var newVel = this.getOldVelocity().add(deltaAcc);

        if (newVel.magnitude() > this.maxSpeed) {
            newVel = newVel.limitTo(this.maxSpeed);
        }

        this.setVelocity(newVel);
    }

    applyFriction(deltaTime) {
        //--work out friction
        //frictionLim = frictionFactor * (mass * downforce) * inverseDirection
        var frictionLim, friction, inverseDirection;

        //get the direction opposite to movement
        inverseDirection = this.getDirectionOfMovement().inverse();

        frictionLim = inverseDirection.multiply(this.frictionFactor * this.getMass());

        if (frictionLim.magnitude() > this.getVelocity().magnitude()) {
            friction = frictionLim.limitTo(this.getVelocity().magnitude());
        }
        else {
            friction = frictionLim;
        }

        //apply the friction to the velocity
        var vel = this.getVelocity();
        var newVel = vel.add(friction);
        this.setVelocity(newVel);
    }

    updatePosition(deltaTime) {
        //use vel to calculate pos

        var deltaVel = this.getVelocity().multiply(deltaTime);
        var deltaVelOld = this.getOldVelocity().multiply(deltaTime);

        //velocity average is the average of the old velocity and the new one
        var velAverage = deltaVel.add(deltaVelOld).divide(2);

        //P = P' + velAverage * deltaTime
        var newPos = this.getPosition().add(velAverage);

        this.setPosition(newPos);
    }
}