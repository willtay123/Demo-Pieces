#pragma once

#include "IComponent.h"

class ComponentGeometry : public IComponent {
private:

public:
	ComponentGeometry();
	ComponentGeometry(const char* filepath);
};