#pragma once
#include "IMessage.h"

#include <string>

class LoseComponentMessage : IMessage {
public:
	std::string _entityID;
	int _componentID;
};