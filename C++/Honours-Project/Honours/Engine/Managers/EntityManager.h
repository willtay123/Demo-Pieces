#pragma once

#include <map>
#include <vector>
#include <string>
#include <Objects\Entity.h>

using std::map;
using std::vector;
using std::string;

class EntityManager {
private:
	static vector<Entity*> entityVector;
	static map<const char*, vector<Entity*>*> _entityMap;

public:
	static void AddEntity(const char* id, Entity* entity);
	static bool GetEntities(const char* id, vector<Entity*>** entityList);
	static bool RemoveEntity(const char* mapID, string entityID);

	static void End();
};