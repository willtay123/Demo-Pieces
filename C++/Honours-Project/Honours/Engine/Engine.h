#pragma once
#include <glad\glad.h>
#include <GLFW\glfw3.h>

#include "Managers\Managers.h"

class Engine {
private:
	static GLFWwindow* window;

	static double dt;
	double lastTime;

	SceneManager* sceneManager;

public:
	static int _screenWidth;
	static int _screenHeight;
	static double GetDT();

	Engine();
	~Engine();

	bool Initialise(const char *windowTitle);
	void SetInitialScene(IScene* scene);

	void Update();
	void Render();
	static void End();
};