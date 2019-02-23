class PhysicsMover extends Drawable {
    constructor(pPosition, pVel, pMass) {
        super(pPosition, 0, new Vector(1, 1));

        this.setAcceleration(new Vector(0, 0));
        this.setVelocity(pVel);
        this.setMass(pMass);
        this.gravity = new Vector(0, 9.8);

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
        if (this.mVelocity === undefined) {
            this.oldVel = new Vector(0, 0);
            this.mVelocity = pVel;
        }
        else {
            this.oldVel = this.mVelocity;
            this.mVelocity = pVel;
        }
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

    update(deltaTime) {
        this.moveObject(deltaTime);
    }

    moveObject(deltaTime) {
        var netForce = this.calculateNetForce();

        //get new acc
        var acc = this.calculateAcceleration(netForce);
        this.setAcceleration(acc);

        //get new vel
        var vel = this.calculateVelocity(deltaTime);
        this.setVelocity(vel);

        //get new pos
        var pos = this.calculatePosition(deltaTime);
        this.setPosition(pos);
    }

    calculateNetForce() {
        //for each force to apply in list, sum
        var forceList = this.getForceList();
        var netForce = new Vector(0, 0);

        for (var i = 0; i < forceList.length; i += 1) {
            netForce = netForce.add(forceList[i]);
        }

        //if (forceList.length > 0) {
        //    console.log(forceList.length);
        //    console.log("x: " + netForce.getX() + " y: " + netForce.getY());
        //}
        
        this.clearForceList();

        return netForce;
    }

    calculateAcceleration(netForce) {
        //use net force and mass to work out acceleration

        var acc = netForce.divide(this.getMass());
        //var acc = netForce;
        acc = acc.add(this.gravity);

        //console.log("x acc: " + acc.getX() + " y acc: " + acc.getY());

        return acc;
    }

    calculateVelocity(deltaTime) {
        //use acc to calculate vel
        //V = V' + acceleration * deltaTime
        var newVel = this.oldVel.add(this.getAcceleration().multiply(deltaTime));

        //apply friction here if wanted
        var newX = newVel.getX() * 0.999;

        if (Math.abs(newX) <= 0.00002) {
            newX = 0;
        }

        newVel.setX(newX);

        //console.log("vel - x: " + newVel.getX() + " y: " + newVel.getY());

        return newVel;
    }

    calculatePosition(deltaTime) {
        //use vel to calculate pos
        //velocity average is the average of the old velocity and the new one
        var velAverage = this.getVelocity().add(this.oldVel).divide(2);
        
        //P = P' + velAverage * deltaTime
        var newPos = this.getPosition().add(velAverage.multiply(deltaTime));

        return newPos;
    }
}