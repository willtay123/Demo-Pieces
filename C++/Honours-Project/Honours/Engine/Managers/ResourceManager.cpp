#include "ResourceManager.h"



map<const char*, Texture*> ResourceManager::_textureMap;
map<const char*, Geometry*> ResourceManager::_modelMap;

Texture* ResourceManager::LoadTexture(const char* filepath) {
	std::cout << "Loading texture: " << filepath << std::endl;

	Texture* texture;

	auto it = _textureMap.find(filepath);
	if (it != _textureMap.end()) {
		cout << "- fetched from _textureMap" << endl;
		texture = it->second;
	}
	else {
		cout << "- created for _textureMap" << endl;

		GLuint textureID;
		int width, height, mipLevel = 0;

		// Use SOIL to load an image file directly as a new OpenGL texture
		textureID = SOIL_load_OGL_texture(
			filepath,
			SOIL_LOAD_AUTO,
			SOIL_CREATE_NEW_ID,
			SOIL_FLAG_INVERT_Y | SOIL_FLAG_MULTIPLY_ALPHA
		);

		// Check for errors loading in texture
		if (textureID == 0) {
			// Loading failed
			std::cout << "ERROR: failed to load texture - " << filepath << std::endl;
			std::cout << "SOIL loading error: " << SOIL_last_result() << std::endl << std::endl;
			return 0;
		}
		else {
			// Get useful texture parameters
			mipLevel = 0;
			glBindTexture(GL_TEXTURE_2D, textureID);
			glGetTexLevelParameteriv(GL_TEXTURE_2D, mipLevel, GL_TEXTURE_WIDTH, &width);
			glGetTexLevelParameteriv(GL_TEXTURE_2D, mipLevel, GL_TEXTURE_HEIGHT, &height);

			// Unbind texture
			glBindTexture(GL_TEXTURE_2D, 0);
		}

		// Create a texture object
		texture = new Texture(textureID, width, height, mipLevel);

		// Add to map
		_textureMap[filepath] = texture;
	}

	// Save texture into map, then return reference
	return texture; //change to return texture object
}

void ResourceManager::ClearTextures() {
	cout << "Clearing: _textureMap" << endl;

	// Delete all contents
	for (map<const char*, Texture*>::iterator itr = _textureMap.begin();
		itr != _textureMap.end();
		itr++)
	{
		//for all the elements of the map
		delete itr->second;
		_textureMap.erase(itr);
	}

	cout << "new _textureMap size: " << _textureMap.size() << endl;
}

Geometry* ResourceManager::LoadObj(const char* filepath) {
	cout << "Loading: .obj - " << filepath << endl;

	Geometry* model;

	auto it = _modelMap.find(filepath);
	if (it != _modelMap.end()) {
		// Fetch from map
		cout << "- fetched from _modelMap" << endl;
		model = it->second;
	}
	else {
		// Not in map
		cout << "- created for _modelMap" << endl;

		ifstream inFile(filepath);
		if (!inFile) {
			cout << "ERROR: unable to load model - " << filepath << endl;;
			throw std::exception("Unable to load model, file missing?");
			return NULL;
		}

		std::vector<unsigned int> vertexIndices, uvIndices, normalIndices;
		std::vector<glm::vec3> temp_vertices;
		std::vector<glm::vec2> temp_uvs;
		std::vector<glm::vec3> temp_normals;

		string line;
		string firstWord;

		while (std::getline(inFile, line)) {
			// Turn line into easily processed stream
			std::stringstream linestream(line);

			// Get the starting word of the line to decide action
			linestream >> firstWord;

			if (firstWord == "v") {
				// Vertex line
				float x, y, z;
				linestream >> x >> y >> z;

				temp_vertices.push_back(glm::vec3(x, y, z));
			}
			else if (firstWord == "vt") {
				// Texture line
				float x, y;
				linestream >> x >> y;

				temp_uvs.push_back(glm::vec2(x, y));
			}
			else if (firstWord == "vn") {
				// Normal line
				float x, y, z;
				linestream >> x >> y >> z;

				temp_normals.push_back(glm::vec3(x, y, z));
			}
			else if (firstWord == "f") {
				// Face line
				string group;

				// Process string "v/vt/vn" into data
				for (int i = 0; i < 3; i += 1) {
					linestream >> group;

					unsigned int v, vt, vn;

					//BUG: using fixed indexes leads to double digit numbers not converting correctly, must split by /
					v = (char)group[0] - '0';
					vt = (char)group[2] - '0';
					vn = (char)group[4] - '0';

					// -1 because indexing for C++ starts at 0, not 1
					vertexIndices.push_back(v - 1);
					uvIndices.push_back(vt - 1);
					normalIndices.push_back(vn - 1);
				}
			}
			else {
				//ignore
			}
		}

		model = new Geometry(vertexIndices, uvIndices, normalIndices, temp_vertices, temp_uvs, temp_normals);

		// Add to map
		_modelMap[filepath] = model;
	}
	
	return model;
}

void ResourceManager::ClearModels() {
	cout << "Clearing: _modelMap" << endl;

	// Delete all contents
	for (map<const char*, Geometry*>::iterator itr = _modelMap.begin();
		itr != _modelMap.end();
		itr++)
	{
		//for all the elements of the map
		delete itr->second;
		_modelMap.erase(itr);
	}

	cout << "new _modelMap size: " << _modelMap.size() << endl;
}

void ResourceManager::End() {
	//delete objects
}