#pragma once

#include <iostream>


class Texture {
private:
	int _id;
	int _width;
	int _height;
	int _mipLevel;

public:
	Texture(int textureID);
	Texture(int textureID, int width, int height, int mipLevel);
	~Texture();

	int GetID();
	int GetWidth();
	int GetHeight();
	int GetMipLevel();
};