#include "EntityManager.h"

vector<Entity*> EntityManager::entityVector;
map<const char*, vector<Entity*>*> EntityManager::_entityMap;

void EntityManager::AddEntity(const char* id, Entity* entity) {
	auto itr = _entityMap.find(id);
	if (itr != _entityMap.end()) {
		// Entity list match
		vector<Entity*>* entityList = itr->second;
		entityList->push_back(entity);
	}
	else {
		// No Entity list match

		// Create new entity list
		vector<Entity*>* entityList = new vector<Entity*>();
		entityList->push_back(entity);

		// Add entity list to map using the given ID
		_entityMap[id] = entityList;
	}
}

bool EntityManager::GetEntities(const char* id, vector<Entity*>** entityList) {
	auto itr = _entityMap.find(id);
	if (itr != _entityMap.end()) {
		// Entity list match
		*entityList = itr->second;

		return true;
	}
	else {
		// No Entity list match

		return false;
	}
}

bool EntityManager::RemoveEntity(const char* mapID, string entityID) {
	//BUG: doesnt seem to delete the entity? just seems to empty the string
	auto itr = _entityMap.find(mapID);
	if (itr != _entityMap.end()) {
		// Entity list match

		// Search entity list for desired entity to delet
		vector<Entity*> entityList = *(itr->second);
		for (int i = 0; i < entityList.size(); i += 1) {
			Entity* entity = entityList[i];
			string* currentEntityID = entity->GetID();
			if (entityID == *currentEntityID) {
				// Delete matched entity
				delete entity;
				entityList.erase(entityList.begin() + i);
				break;
			}
		}

		return true;
	}
	else {
		// No Entity list match

		return false;
	}
}

void EntityManager::End() {
	for (Entity* entity : entityVector) {
		delete entity;
	}
	
	//delete map
}