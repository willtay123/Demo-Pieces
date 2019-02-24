#include <iostream>
#include "Engine.h"
#include "Managers/SceneManager.h"
#include "Scenes/TestScene.h"

#include "Objects\Sprite.h"

using namespace std;

int main(void)
{	
	Engine engine;
	bool engineInitialised = engine.Initialise("Component-Based Game Engine");

	//Sprite testSprite = Sprite("Assets/Textures/biplane.png", 100, 100, 0);

	if (engineInitialised) {
		engine.SetInitialScene(new TestScene());

		while (true) {
			engine.Update();
			engine.Render();
		}
	}

	engine.End();

	return 0;
}