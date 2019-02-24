#pragma once
#include "IMessage.h"

#include <string>

class NewComponentMessage : IMessage {
public:
	std::string _entityID;
	int _componentID;
};