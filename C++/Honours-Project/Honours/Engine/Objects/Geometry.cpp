#include "Geometry.h"


Geometry::Geometry() {

}

Geometry::Geometry(float* vertices, int vertCount, float* indices, int indexCount, float* texCoords, int texCoordCount, float* normals, int normalCount) {
	// Vertices
	_vertices = new float[vertCount];
	_verticesSize = vertCount;
	for (int i = 0; i < vertCount; i += 1) {
		_vertices[i] = vertices[i];
	}
	_triangleCount = vertCount / 9;

	// Indices
	//_vertIndices = new float[indexCount];
	//_vertIndicesSize = indexCount;
	//for (int i = 0; i < indexCount; i += 1) {
	//	_vertIndices[i] = indices[i];
	//}

	// TexCoords
	_texCoords = new float[texCoordCount];
	_texCoordsSize = texCoordCount;
	for (int i = 0; i < texCoordCount; i += 1) {
		_texCoords[i] = texCoords[i];
	}

	// Normals
	//_normals = new float[normalCount];
	//_normalsSize = normalCount;
	//for (int i = 0; i < normalCount; i += 1) {
	//	_normals[i] = normals[i];
	//}

	//missing vertex array?

	// Vertex Buffer
	glGenBuffers(1, &_VBO_Handle);
	glBindBuffer(GL_ARRAY_BUFFER, _VBO_Handle);
	glBufferData(GL_ARRAY_BUFFER, vertCount * 4, &_vertices[0], GL_STATIC_DRAW);

	// Index Buffer
	//glGenBuffers(1, &_IBO_Handle);
	//glBindBuffer(GL_ARRAY_BUFFER, _IBO_Handle);
	//glBufferData(GL_ARRAY_BUFFER, indexCount * 4, &_vertIndices[0], GL_STATIC_DRAW);

	// TexCoord Buffer
	glGenBuffers(1, &_TBO_Handle);
	glBindBuffer(GL_ARRAY_BUFFER, _TBO_Handle);
	glBufferData(GL_ARRAY_BUFFER, texCoordCount * 4, &_texCoords[0], GL_STATIC_DRAW);

	// Normal Buffer
	//glGenBuffers(1, &_NBO_Handle);
	//glBindBuffer(GL_ARRAY_BUFFER, _NBO_Handle);
	//glBufferData(GL_ARRAY_BUFFER, normalCount * 4, &_normals[0], GL_STATIC_DRAW);
}

Geometry::Geometry(vector<unsigned int> vertexIndices, vector<unsigned int> textureIndices, vector<unsigned int> normalIndices,
	vector<vec3> vertices, vector<vec2> texCoords, vector<vec3> normals) {

	// Vertices
	_verticesSize = vertices.size() * 3;
	_vertices = new float[_verticesSize];
	for (int i = 0; i < _verticesSize; i += 3) {
		_vertices[i + 0] = vertices[i / 3].x;
		_vertices[i + 1] = vertices[i / 3].y;
		_vertices[i + 2] = vertices[i / 3].z;
	}
	_triangleCount = _verticesSize / 9;

	// TexCoords
	_texCoordsSize = texCoords.size() * 2;
	_texCoords = new float[_texCoordsSize];
	for (int i = 0; i < _texCoordsSize; i += 2) {
		_texCoords[i + 0] = texCoords[i / 2].x;
		_texCoords[i + 1] = texCoords[i / 2].y;
	}

	// Normals
	_normalsSize = normals.size() * 3;
	_normals = new float[_normalsSize];
	for (int i = 0; i < _normalsSize; i += 3) {
		_normals[i + 0] = normals[i / 3].x;
		_normals[i + 1] = normals[i / 3].y;
		_normals[i + 2] = normals[i / 3].z;
	}

	// Vertex Indices
	_vertIndicesSize = vertexIndices.size();
	_vertIndices = new unsigned int[_vertIndicesSize];
	for (int i = 0; i < _vertIndicesSize; i += 1) {
		_vertIndices[i] = vertexIndices[i];
	}

	// Texture Indices
	_texIndicesSize = textureIndices.size();
	_texIndices = new unsigned int[_texIndicesSize];
	for (int i = 0; i < _texIndicesSize; i += 1) {
		_texIndices[i] = textureIndices[i];
	}

	// Normal Indices
	_normIndicesSize = normalIndices.size();
	_normIndices = new unsigned int[_normIndicesSize];
	for (int i = 0; i < _normIndicesSize; i += 1) {
		_normIndices[i] = normalIndices[i];
	}

	// Vertex buffer
	glGenBuffers(1, &_VBO_Handle);
	glBindBuffer(GL_ARRAY_BUFFER, _VBO_Handle);
	glBufferData(GL_ARRAY_BUFFER, _verticesSize * 4, &_vertices[0], GL_STATIC_DRAW);

	// TexCoord Buffer
	glGenBuffers(1, &_TBO_Handle);
	glBindBuffer(GL_ARRAY_BUFFER, _TBO_Handle);
	glBufferData(GL_ARRAY_BUFFER, _texCoordsSize * 4, &_texCoords[0], GL_STATIC_DRAW);

	// Normal Buffer
	//glGenBuffers(1, &_NBO_Handle);
	//glBindBuffer(GL_ARRAY_BUFFER, _NBO_Handle);
	//glBufferData(GL_ARRAY_BUFFER, normalCount * 4, &_normals[0], GL_STATIC_DRAW);

	// Vertex Indices
	glGenBuffers(1, &_VIBO_Handle);
	glBindBuffer(GL_ELEMENT_ARRAY_BUFFER, _VIBO_Handle);
	glBufferData(GL_ELEMENT_ARRAY_BUFFER, _vertIndicesSize * sizeof(unsigned int), &_vertIndices[0], GL_STATIC_DRAW);
}

Geometry::~Geometry() {
}

GLuint Geometry::GetVBOHandle() {
	return _VBO_Handle;
}

GLuint Geometry::GetVIBOHandle() {
	return _VIBO_Handle;
}

GLuint Geometry::GetTBOHandle() {
	return _TBO_Handle;
}

GLuint Geometry::GetNBOHandle() {
	return _NBO_Handle;
}

int Geometry::GetTriangleCount() {
	return _triangleCount;
}

int Geometry::GetVIBOSize() {
	return _vertIndicesSize;
}