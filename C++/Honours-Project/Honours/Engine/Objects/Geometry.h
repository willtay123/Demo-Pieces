#pragma once

#include <glad\glad.h>
#include <GLFW\glfw3.h>
#include <vector>
#include <glm\vec2.hpp>
#include <glm\vec3.hpp>

using std::vector;
using glm::vec2;
using glm::vec3;

class Geometry
{
private:
	GLuint _VBO_Handle;		// Vertex buffer
	GLuint _TBO_Handle;		// Texture Co-ord buffer
	GLuint _NBO_Handle;		// Normal buffer
	GLuint _VIBO_Handle;	// Vertex Index buffer
	GLuint _TIBO_Handle;	// Texture Index buffer
	GLuint _NIBO_Handle;	// Normal Index buffer
	
	float* _vertices;
	float* _texCoords;
	float* _normals;
	unsigned int* _vertIndices;
	unsigned int* _texIndices;
	unsigned int* _normIndices;

	int _triangleCount;
	
	int _verticesSize;
	int _texCoordsSize;
	int _normalsSize;
	int _vertIndicesSize;
	int _texIndicesSize;
	int _normIndicesSize;

public:
	Geometry();
	Geometry(float* vertices, int vertCount, float* indices, int indexCount, float* texCoords, int texCoordCount, float* normals, int normalCount);
	Geometry(vector<unsigned int> vertexIndices, vector<unsigned int> textureIndices, vector<unsigned int> normalIndices,
		vector<vec3> vertices, vector<vec2> texCoords, vector<vec3> normals);
	~Geometry();

	GLuint GetVBOHandle();
	GLuint GetVIBOHandle();
	GLuint GetTBOHandle();
	GLuint GetNBOHandle();
	int GetTriangleCount();
	int GetVIBOSize();
};

