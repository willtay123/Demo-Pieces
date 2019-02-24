#include "ComponentManager.h"

int ComponentManager::idCount = 0;
map<type_index, int> ComponentManager::componentTypeMap;
map<string, int> ComponentManager::componentStringMap;

int ComponentManager::GenerateIDByType(IComponent* component) {
	//try finding the key in the map
	if (componentTypeMap.find(typeid(component)) != componentTypeMap.end()) {
		//found
		return componentTypeMap[typeid(component)];
	}
	else {
		//not found
		idCount += 1;
		componentTypeMap[typeid(component)] = idCount;
		return idCount;
	}
	return -1;
}

int ComponentManager::GenerateIDByString(string label) {
	//try finding the key in the map
	if (componentStringMap.find(label) != componentStringMap.end()) {
	//found
	return componentStringMap[label];
	}
	else {
		//not found
		idCount += 1;
		componentStringMap[label] = idCount;
		return idCount;
	}
	return -1;
}

int ComponentManager::GetIDForType(type_index type) {
	if (componentTypeMap.find(type) != componentTypeMap.end()) {
		//found
		return componentTypeMap[type];
	}
	return -1;
}

int ComponentManager::GetIDForString(string label) {
	if (componentStringMap.find(label) != componentStringMap.end()) {
		//found
		return componentStringMap[label];
	}
	return -1;
}

void ComponentManager::End() {
	//delete objects
}