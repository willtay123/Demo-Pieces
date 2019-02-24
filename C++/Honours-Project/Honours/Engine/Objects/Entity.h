#pragma once
#include <vector>
#include <string>
#include "Components/IComponent.h"

using namespace std;

class Entity {
private:
	string _id;
	vector<IComponent*> _components;
	bool _enabled;

public:
	Entity();
	Entity(const char* id);
	Entity(const Entity& rhs);
	~Entity();
	Entity& operator= (const Entity& rhs);

	string* GetID() {
		return &_id;
	}
	void SetID(string value) {
		_id = value;
	}

	vector<IComponent*>& GetComponents() {
		return _components;
	}
	void AddComponent(IComponent* component);
	void RemoveComponent(int id);
	bool HasComponent(int id);
	bool GetComponent(int id, IComponent* outComponent);
	bool GetComponent(string id, IComponent* outComponent);
	bool GetComponentIndex(int id, int* outIndex);
};