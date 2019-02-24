#pragma once

#define GLM_ENABLE_EXPERIMENTAL

#include <glad\glad.h>
#include <GLFW\glfw3.h>

#include <iostream>
#include <fstream>
#include <strstream>
#include <sstream>
#include <vector>

#include <glm\vec4.hpp>
#include <glm\mat4x4.hpp>
#include <glm\gtx\transform.hpp>

#include <Objects\Camera.h>
#include "Objects\Entity.h"
#include "Components\DrawComponents.h"
#include "Objects\Geometry.h"

using glm::vec4;
using glm::mat4x4;
using std::vector;


class RenderManager {
private:
	static int _pgmID; //shader program ID
	static int _vsID; //vector shader ID
	static int _fsID; //fragment shader ID

	static GLuint _uniform_MVP;
	static int _uniform_mView; //view matrix
	static mat4x4 _projection;

protected:

public:
	static void Initialise();

	static int LoadShader(const char* filename, int shaderType);
	static bool LoadShaders(const char* filenameVert, const char* filenameFrag, int pgmID);
	static bool LinkShaders(int pgmID, int vertShaderID, int fragShaderID);

	static void Draw(Camera* camera, int vertBufferID);
	static void Draw(Camera* camera, Geometry* geometry, int textureID);
	static void Draw(mat4x4 world, Geometry geometry, int texture);
	static void DrawEntity(Entity* entity);
	static void DrawEntityList(vector<Entity*> entityList);

	static void End();
};