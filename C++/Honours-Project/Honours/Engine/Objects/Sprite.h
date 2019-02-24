#pragma once

#include <GLFW\glfw3.h>
#include "Texture.h"

#include <iostream>
#include <string>
#include <glm\vec4.hpp>
#include <glm\mat4x4.hpp>
using std::string;
using glm::vec4;
using glm::mat4x4;

class Sprite {
private:
	Texture* _texture;
	vec4 _pos;
	vec4 _rot;
	vec4 _scale;

public:
	Sprite();
	Sprite(string imagePath);
	Sprite(string imagePath, float xPos, float yPos, float zPos);
	~Sprite();

	void Update();
	void Render();
};