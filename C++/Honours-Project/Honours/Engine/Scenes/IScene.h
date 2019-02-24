#pragma once
#include <string>

using namespace std;

class IScene {
private:


protected:
	string _name;
	//SceneManager* _sceneManager;

public:
	IScene();
	virtual void Render() = 0;
	virtual void Update(double dt) = 0;
	virtual void Close() = 0;

};