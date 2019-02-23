class ShapeGenerator {
    constructor() {

    }

    static generateNewShapes(toSpawn) {
        //spawn new items
        var numberOfShapeTypes = 1;

        //list of items that needed to be added to the scene graph
        var entitiesToAdd = [];

        for (var i = 0; i < toSpawn.length; i += 1) {
            //spawn shape from given position
            var position = toSpawn[i];

            //random number to decide which shape
            var num = Math.floor(Math.random() * numberOfShapeTypes);

            //create shape based upon random number
            switch (num) {
                case 0:
                    this.generateCircle(entitiesToAdd, position);
                    break;
                default:
                    console.log("shape spawn failed");
                    break;
            }
        }

        return entitiesToAdd;
    }

    static generateCircle(entitiesToAdd, position) {
        //circle
        var radius = Math.floor(Math.random() * 20);
        radius += 10;

        var shape = new PhysicsCircle(position, radius);
        entitiesToAdd.push(shape);
    }
}