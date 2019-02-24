#include "Texture.h"


Texture::Texture(int textureID) :
	_id(textureID),
	_width(0),
	_height(0),
	_mipLevel(0) {

}

Texture::Texture(int textureID, int width, int height, int mipLevel) :
	_id(textureID),
	_width(width),
	_height(height),
	_mipLevel(mipLevel) {

}

Texture::~Texture() {

}

int Texture::GetID() {
	return _id;
}

int Texture::GetWidth() {
	return _width;
}

int Texture::GetHeight() {
	return _height;
}

int Texture::GetMipLevel() {
	return _mipLevel;
}