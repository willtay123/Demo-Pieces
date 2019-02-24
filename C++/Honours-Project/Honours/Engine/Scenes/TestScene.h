#pragma once

#include "Scenes\IScene.h"

#include <iostream>
#include <glad\glad.h>
#include <GLFW\glfw3.h>

#include <Managers\RenderManager.h>
#include <Managers\ResourceManager.h>
#include <Objects\Camera.h>

#include "Objects\Geometry.h"

class TestScene : public IScene {
private:
	GLuint VertexArrayID;
	GLuint vertexbuffer;
	GLuint textureBuffer;

	Camera* _camera;
	Geometry* model;

public:
	TestScene();
	~TestScene();
	
	void Update(double dt);
	void Render();
	void Close();
};