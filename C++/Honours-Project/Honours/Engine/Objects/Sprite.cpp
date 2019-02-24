#include "Sprite.h"

Sprite::Sprite() {
	_pos = vec4(0, 0, 0, 1);
	//_texture = Texture();
}

Sprite::Sprite(string imagePath) {
	//_texture = Texture(imagePath);
	_pos = vec4(0, 0, 0, 1);
}

Sprite::Sprite(string imagePath, float xPos, float yPos, float zPos) {
	//_texture = Texture(imagePath);
	_pos = vec4(xPos, yPos, zPos, 1);
}

Sprite::~Sprite() {

}

void Sprite::Update() {

}

void Sprite::Render() {
	glEnable(GL_TEXTURE_2D);
	glBindTexture(GL_TEXTURE_2D, _texture->GetID());
	glLoadIdentity();

	//Translate -> Rotate -> Scale
	glTranslatef(_pos.x, _pos.y, _pos.z);
	//glRotatef(_rot.x, 1, 0, 0);
	//glRotatef(_rot.y, 0, 1, 0);
	//glRotatef(_rot.z, 0, 0, 1);
	//glScalef(_scale.x, _scale.y, _scale.z);
	
	//Rendering

	glDisable(GL_TEXTURE_2D);
}