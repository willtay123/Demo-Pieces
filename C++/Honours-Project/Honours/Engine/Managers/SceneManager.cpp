#include "SceneManager.h"

#include <GLFW\glfw3.h>

SceneManager::SceneManager() {
	SetScene(new DefaultScene());
}

SceneManager::~SceneManager() {
	delete _scene;
}

void SceneManager::SetScene(IScene* scene) {
	if (_scene != NULL) {
		delete _scene;
	}
	_scene = scene;

	//--IF USING POINTERS
	//change update
	//Updater = &_scene->Update;
	//change render
}

void SceneManager::Update(double dt) {
	//enact general logic

	//call update of the scene
	_scene->Update(dt);
}

void SceneManager::Render() {
	_scene->Render();
}

void SceneManager::End() {
	//delete objects
}