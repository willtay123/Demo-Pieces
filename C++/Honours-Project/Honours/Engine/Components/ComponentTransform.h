#pragma once
#include "IComponent.h"
#include "glm\vec3.hpp"
#include "glm\vec4.hpp"
#include "glm\mat4x4.hpp"

using glm::vec3;
using glm::vec4;
using glm::mat4x4;

class ComponentTransform : public IComponent {
private:
	vec4 _pos;
	vec3 _rot;
	vec3 _scale;

public:
	ComponentTransform();
	ComponentTransform(float x, float y, float z);
	ComponentTransform(float xPos, float yPos, float zPos, float xRot, float yRot, float zRot);
	ComponentTransform(float xPos, float yPos, float zPos, float scale);
	ComponentTransform(float xPos, float yPos, float zPos, float xRot, float yRot, float zRot, float xScale, float yScale, float zScale);
	~ComponentTransform();

	vec4* GetPosition() {
		return &_pos;
	}
	void SetPosition(vec4* pos) {
		_pos = *pos;
	}
	void SetPosition(float x, float y, float z) {
		_pos.x = x;
		_pos.y = y;
		_pos.z = z;
	}

	vec3* GetRotation() {
		return &_rot;
	}
	void SetRotation(vec3* rot) {
		_rot = *rot;
	}
	void SetRotation(float x, float y, float z) {
		_rot.x = x;
		_rot.y = y;
		_rot.z = z;
	}

	vec3* GetScale() {
		return &_scale;
	}
	void SetScale(vec3* scale) {
		_scale = *scale;
	}
	void SetScale(float a) {
		_scale.x = a;
		_scale.y = a;
		_scale.z = a;
	}
	void SetScale(float x, float y, float z) {
		_scale.x = x;
		_scale.y = y;
		_scale.z = z;
	}
};