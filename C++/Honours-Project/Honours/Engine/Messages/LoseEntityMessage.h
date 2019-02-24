#pragma once
#include "IMessage.h"

#include <string>

class LoseEntityMessage : IMessage {
public:
	std::string _entityID;
};