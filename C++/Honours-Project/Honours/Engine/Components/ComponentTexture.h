#pragma once

#include "IComponent.h"

class ComponentTexture : public IComponent {
private:

public:
	ComponentTexture();
	ComponentTexture(const char* filepath);

	int GetID() {
		return 0;
	}
	int GetWidth() {
		return 0;
	}
	int GetHeight() {
		return 0;
	}
};