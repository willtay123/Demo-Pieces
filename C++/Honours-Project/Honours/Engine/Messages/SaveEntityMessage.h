#pragma once
#include "IMessage.h"

#include <string>

class SaveEntityMessage : IMessage {
public:
	std::string _entityID;
};