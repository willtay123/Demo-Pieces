#include "Entity.h"

Entity::Entity() : _enabled(true), _components(0) {
	//generate a unique id from entity manager;
}

Entity::Entity(const char* id) : _id(id), _enabled(true), _components(0) {
	
}

Entity::Entity(const Entity& rhs) :
	_id(rhs._id),
	_enabled(rhs._enabled),
	_components(rhs._components) {

}

Entity& Entity::operator=(const Entity& rhs) {
	if (&rhs != this) {
		_id = rhs._id;
		_enabled = rhs._enabled;
		_components = rhs._components;
	}
	return *this;
}

Entity::~Entity() {
	if (_components.size() > 0) {
		for (IComponent* component : _components) {
			delete component;
		}
	}
	_components.clear();
}

void Entity::AddComponent(IComponent* component) {
	_components.push_back(component);
}

void Entity::RemoveComponent(int id) {
	int index;
	bool hasComponent = GetComponentIndex(id, &index);

	if (hasComponent) {
		_components.erase(_components.begin() + index);
	}
}

bool Entity::HasComponent(int id) {
	for (IComponent* component : _components) {
		//	if match, return true
		//if (component->id == id) { return true; }
	}
	return false;
}

bool Entity::GetComponent(int id, IComponent* outComponent) {
	for (IComponent* component : _components) {
		if (component->ComponentType() == id) {
			outComponent = component;
			return true;
		}
	}
	return false;
}

bool Entity::GetComponent(string label, IComponent* outComponent) {
	int id = ComponentManager::GetIDForString(label);
	for (IComponent* component : _components) {
		if (component->ComponentType() == id) {
			outComponent = component;
			return true;
		}
	}
	return false;
}


bool Entity::GetComponentIndex(int id, int* outIndex) {
	for (size_t i = 0, length = _components.size(); i < length; i += 1) {
		//if (component->id == id) { 
		//	*outIndex = (int)i;
		//	return true;
		//}
	}
	return false;
}

