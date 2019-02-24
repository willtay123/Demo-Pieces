#pragma once
#include "IMessage.h"

#include <string>

class SaveComponentMessage : IMessage {
public:
	std::string _entityID;
	int _componentID;
};