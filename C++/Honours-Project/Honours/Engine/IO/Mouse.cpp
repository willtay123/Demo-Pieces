#include "Mouse.h"

double Mouse::_x = 0;
double Mouse::_y = 0;

bool Mouse::buttons[GLFW_MOUSE_BUTTON_LAST] = { 0 };
bool Mouse::buttonsDown[GLFW_MOUSE_BUTTON_LAST] = { 0 };
bool Mouse::buttonsUp[GLFW_MOUSE_BUTTON_LAST] = { 0 };

void Mouse::MousePosCallback(GLFWwindow* window, double x, double y) {
	int width, height;

	glfwGetFramebufferSize(window, &width, &height);


	_x = x;
	_y = height - y;
}

void Mouse::MouseButtonCallback(GLFWwindow* window, int button, int action, int mods) {
	if (button < 0)
		return;

	if (action != GLFW_RELEASE && buttons[button] == false) {
		buttonsDown[button] = true;
		buttonsUp[button] = false;
	}

	if (action == GLFW_RELEASE && buttons[button] == true) {
		buttonsDown[button] = false;
		buttonsUp[button] = true;
	}

	buttons[button] = action != GLFW_RELEASE; //decides if the button is being held
}

double Mouse::GetMouseX() {
	return _x;
}

double Mouse::GetMouseY() {
	return _y;
}

bool Mouse::ButtonDown(int button) {
	//NOTE: approach may not work if multiple things want to know if button was just pressed
	bool x = buttonsDown[button];
	buttonsDown[button] = false;
	return x;
}

bool Mouse::ButtonUp(int button) {
	bool x = buttonsUp[button];
	buttonsUp[button] = false;
	return x;
}

bool Mouse::ButtonPressed(int button) {
	return buttons[button];
}