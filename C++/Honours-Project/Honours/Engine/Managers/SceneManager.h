#pragma once
#include "Scenes\IScene.h"
#include "Scenes\DefaultScene.h"

class SceneManager {
private:
	IScene* _scene;

public:
	SceneManager();
	~SceneManager();

	static float dt;

	void Update(double dt);
	void Render();

	void(*Updater)(double);
	void(*Renderer)();

	void SetScene(IScene* scene);

	static void End();
};