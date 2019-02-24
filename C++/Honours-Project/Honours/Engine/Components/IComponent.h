#pragma once
#include "Managers\ComponentManager.h"



class IComponent {
protected:
	int _componentType;

public:
	int ComponentType() {
		return _componentType;
	};
};
