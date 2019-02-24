#pragma once

#define GLM_ENABLE_EXPERIMENTAL

#include <glm\glm.hpp>
#include <glm\gtx\transform.hpp>
//#include <glm\vec3.hpp>
//#include <glm\vec4.hpp>
//#include <glm\mat4x4.hpp>

using glm::vec3;
using glm::vec4;
using glm::mat4x4;
using glm::lookAt;

class Camera {
private:
	vec3* _position;
	vec3* _lookPosition;
	vec3* _up;
	mat4x4* _view;

public:
	Camera();
	~Camera();

	vec3* GetPosition();
	vec3* GetLookPosition();
	vec3* GetUp();
	mat4x4* GetView();

	void MoveTo(vec3* position);
	void MoveBy(vec3* translation);

	void LookPosition(vec3* lookPosition);
	void TransformLookPosition(mat4x4* transform);

	void SetUp(vec3* up);
	void TransformUp(mat4x4* transform);
};