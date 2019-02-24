#pragma once

#include <map>
#include <typeindex>
#include <string>

class IComponent;

using std::map;
using std::make_pair;
using std::type_index;
using std::string;

class ComponentManager {
private:
	static int idCount;
	static map<type_index, int> componentTypeMap;
	static map<string, int> componentStringMap;

public:
	static int GenerateIDByType(IComponent* component);
	static int GenerateIDByString(string key);
	static int GetIDForType(type_index type);
	static int GetIDForString(string label);

	static void End();
};