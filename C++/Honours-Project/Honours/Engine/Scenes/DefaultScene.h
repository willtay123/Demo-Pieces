#pragma once

#include <iostream>
#include "Scenes\IScene.h"

class DefaultScene : public IScene {
private:

public:
	DefaultScene();
	~DefaultScene();

	void Update(double dt);
	void Render();
	void Close();
};