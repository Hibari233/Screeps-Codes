var queen = {
    run: function(creep) {

        if(creep.memory.queen && creep.store[RESOURCE_ENERGY] == 0) {
            creep.memory.queen = false;
	    }
	    if(!creep.memory.queen && creep.store.getFreeCapacity() == 0) {
	        creep.memory.queen = true;
        }
	    if(creep.memory.queen) {
            var str = creep.pos.findClosestByPath(FIND_STRUCTURES, {
                filter: (structure) => {
                    return (structure.structureType == STRUCTURE_EXTENSION ||
                            structure.structureType == STRUCTURE_SPAWN ||
                            (structure.structureType == STRUCTURE_TOWER && structure.store.energy < 900)||
                            structure.structureType == STRUCTURE_LINK && structure.id != '5e8d48bbe1ebfe7eb1a00221') &&
                            structure.store.getFreeCapacity(RESOURCE_ENERGY) > 0;
                }
            });
            if(creep.transfer(str, RESOURCE_ENERGY) == ERR_NOT_IN_RANGE) {
                creep.moveTo(str, {visualizePathStyle: {stroke: '#ffffff'}});
            }
        }
        else {
            const targets = creep.room.find(FIND_STRUCTURES, {
                filter: object => {
                    return (object.structureType == STRUCTURE_STORAGE) &&
                            object.store.energy > 0;
                }
            });
            if(creep.withdraw(targets[0], RESOURCE_ENERGY) == ERR_NOT_IN_RANGE) {
                creep.moveTo(targets[0], {visualizePathStyle: {stroke: '#ffffff'}});
            }
        }
	}
};

module.exports = queen;