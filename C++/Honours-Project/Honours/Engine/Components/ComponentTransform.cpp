#include "ComponentTransform.h"
#include <typeindex>
using std::type_index;


ComponentTransform::ComponentTransform() :
	_pos(0, 0, 0, 1),
	_rot(0, 0, 0),
	_scale(1, 1, 1) {
	//_componentType = ComponentManager::GenerateIDByType(this);
	_componentType = ComponentManager::GenerateIDByString("transform");
}

ComponentTransform::ComponentTransform(float x, float y, float z) :
	_pos(x, y, z, 1),
	_rot(0, 0, 0),
	_scale(1, 1, 1) {
	//_componentType = ComponentManager::GenerateIDByType(this);
	_componentType = ComponentManager::GenerateIDByString("transform");
}

ComponentTransform::ComponentTransform(float xPos, float yPos, float zPos, float xRot, float yRot, float zRot) :
	_pos(xPos, yPos, zPos, 1),
	_rot(xRot, yRot, zRot),
	_scale(1, 1, 1) {
	//_componentType = ComponentManager::GenerateIDByType(this);
	_componentType = ComponentManager::GenerateIDByString("transform");
}

ComponentTransform::ComponentTransform(float xPos, float yPos, float zPos, float scale) :
	_pos(xPos, yPos, zPos, 1),
	_rot(0, 0, 0),
	_scale(scale) {
	//_componentType = ComponentManager::GenerateIDByType(this);
	_componentType = ComponentManager::GenerateIDByString("transform");
}

ComponentTransform::ComponentTransform(float xPos, float yPos, float zPos, float xRot, float yRot, float zRot, float xScale, float yScale, float zScale) :
	_pos(xPos, yPos, zPos, 1),
	_rot(xRot, yRot, zRot),
	_scale(xScale, yScale, zScale) {
	//_componentType = ComponentManager::GenerateIDByType(this);
	_componentType = ComponentManager::GenerateIDByString("transform");
}

ComponentTransform::~ComponentTransform() {

}

