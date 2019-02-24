#pragma once
#include "IMessage.h"

#include <string>

class NewEntityMessage : IMessage {
public:
	std::string _entityID;
};