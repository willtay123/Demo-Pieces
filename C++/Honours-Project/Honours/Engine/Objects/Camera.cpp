#include "Camera.h"



Camera::Camera() {
	_position = new vec3(4, 3, 3);
	_lookPosition = new vec3(0, 0, 0);
	_up = new vec3(0, 1, 0);
	_view = new mat4x4(1.0f);

	*_view = lookAt(
		*_position,
		*_lookPosition,
		*_up
	);
}

Camera::~Camera() {
	delete _position;
	delete _lookPosition;
	delete _up;
	delete _view;
}

vec3* Camera::GetPosition() {
	return _position;
}

vec3* Camera::GetLookPosition() {
	return _lookPosition;
}

vec3* Camera::GetUp() {
	return _up;
}

mat4x4* Camera::GetView() {
	return _view;
}

void Camera::MoveTo(vec3* position) {
	_position = position;
}

void Camera::MoveBy(vec3* position) {
	*_position += *position;
}

void Camera::LookPosition(vec3* lookPosition) {
	*_lookPosition = *lookPosition;
}

void Camera::TransformLookPosition(mat4x4* transform) {
	//get _lookPosition as vec4
	vec4 lookPosAs4 = vec4(
		_lookPosition->x,
		_lookPosition->y,
		_lookPosition->z,
		1
	);

	//transform _lookPosition
	lookPosAs4 = *transform * lookPosAs4;
	
	//save _lookPosition as vec3
	_lookPosition->x = lookPosAs4.x;
	_lookPosition->y = lookPosAs4.y;
	_lookPosition->z = lookPosAs4.z;
}

void Camera::SetUp(vec3* up) {
	*_up = *up;
}

void Camera::TransformUp(mat4x4* transform) {
	//get _up as vec4
		vec4 upAs4 = vec4(
			_up->x,
			_up->y,
			_up->z,
			1
		);

	//transform _up
	upAs4 = *transform * upAs4;

	//save _up as vec3
	_up->x = upAs4.x;
	_up->y = upAs4.y;
	_up->z = upAs4.z;
}

