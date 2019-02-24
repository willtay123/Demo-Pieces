#pragma once

#include "GLFW\glfw3.h"

class Mouse {
private:
	static double _x;
	static double _y;
	
	static bool buttons[];
	static bool buttonsDown[];
	static bool buttonsUp[];

public:
	static void MousePosCallback(GLFWwindow* window, double x, double y);
	static void MouseButtonCallback(GLFWwindow* window, int button, int action, int mods);

	static double GetMouseX();
	static double GetMouseY();
	
	static bool ButtonDown(int button);
	static bool ButtonUp(int button);
	static bool ButtonPressed(int button);

};

