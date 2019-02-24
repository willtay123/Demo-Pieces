#pragma once

#include <iostream>
#include <SOIL.h>
#include <glad\glad.h>
#include <GLFW\glfw3.h>
#include <map>
#include <vector>
#include <fstream>
#include <string>
#include <sstream>
#include <glm\vec2.hpp>
#include <glm\vec3.hpp>

#include "Objects\Texture.h"
#include "Objects\Geometry.h"

using std::map;
using std::make_pair;
using std::ifstream;
using std::cout;
using std::endl;
using std::string;

class ResourceManager {
private:
	//static map<char*, Geometry> geometryMap;
	static map<const char*, Texture*> _textureMap;
	static map<const char*, Geometry*> _modelMap;

public:
	static Texture* LoadTexture(const char* filepath);
	static void ClearTextures();

	static Geometry* LoadObj(const char* filepath);
	static void ClearModels();

	static void End();
};