#include "Engine.h"
#include "IO\Mouse.h"
#include "IO\Keyboard.h"
#include <iostream>

#include "Objects\Entity.h"
#include "Components\ComponentTransform.h"
#include "Components\IComponent.h"
#include <gl\GLU.h>
#include <gl\GL.h>

int Engine::_screenWidth = 1280;
int Engine::_screenHeight = 720;
GLFWwindow* Engine::window = NULL;
double Engine::dt = 0;

Engine::Engine() {
	std::cout << "Enging creation started" << endl;
	
	sceneManager = new SceneManager();

	std::cout << "Engine creation ended" << endl << endl;
}

Engine::~Engine() {
	delete sceneManager;
}

bool Engine::Initialise(const char *windowTitle) {
	std::cout << "Engine initialisation started" << endl;

	if (!glfwInit()) {
		std::cout << "Error initialising GLFW" << std::endl;
		return false;
	}

	//glfwWindowHint(GLFW_CONTEXT_VERSION_MAJOR, 3);
	//glfwWindowHint(GLFW_CONTEXT_VERSION_MINOR, 3);
	//glfwWindowHint(GLFW_OPENGL_PROFILE, GLFW_OPENGL_CORE_PROFILE);
	//glfwWindowHint(GLFW_RESIZABLE, GL_FALSE);

	window = glfwCreateWindow(_screenWidth, _screenHeight, windowTitle, NULL, NULL);
	if (!window) {
		glfwTerminate();
		std::cout << "Error creating window" << std::endl;
		return false;
	}

	//--GLFW setup
	glfwMakeContextCurrent(window);
	int width, height;
	glfwGetFramebufferSize(window, &width, &height);

	const GLFWvidmode* mode = glfwGetVideoMode(glfwGetPrimaryMonitor());
	int screenWidth = 1080, screenHeight = 720;
	int xPos = (mode->width - screenWidth) / 2;
	int yPos = (mode->height - screenHeight) / 2;
	glfwSetWindowPos(window, xPos, yPos);

	//GLAD setup
	gladLoadGLLoader((GLADloadproc)glfwGetProcAddress);


	//--callbacks
	
	//window
	//glfwSetWindowCloseCallback(window, Engine::End); //works but doesnt seem to actually close

	//mouse
	glfwSetCursorPosCallback(window, Mouse::MousePosCallback);
	glfwSetMouseButtonCallback(window, Mouse::MouseButtonCallback);
	//keyboard
	glfwSetKeyCallback(window, Keyboard::KeyCallback);

	//--OpenGL setup

	//viewport
	glViewport(0, 0, width, height);
	glClear(GL_COLOR_BUFFER_BIT);

	//depth
	glEnable(GL_DEPTH);
	glDepthFunc(GL_LESS);
	glPolygonMode(GL_FRONT, GL_LINE);
	glPolygonMode(GL_BACK, GL_FILL);

	//alpha blending
	glEnable(GL_ALPHA);
	glBlendFunc(GL_SRC_ALPHA, GL_ONE_MINUS_SRC_ALPHA);

	//initial settings
	glClearColor(0, 100, 100, 1);

	//--dt
	lastTime = glfwGetTime();

	//--temp
	Entity* entity = new Entity("temp");
	IComponent* comp = new ComponentTransform(10, 10, 10, 0, 0, 0, 1, 1, 2);
	entity->AddComponent(comp);
	comp = new ComponentGeometry("Assets/Models/SquareGeometry.txt");
	entity->AddComponent(comp);
	comp = new ComponentTexture("Assets/Textures/Biplane.png");
	entity->AddComponent(comp);
	EntityManager::AddEntity("test", entity);

	Entity* newEnt = new Entity("tester");
	EntityManager::AddEntity("test", newEnt);

	if (EntityManager::RemoveEntity("test", "tester")) {
		cout << "Entity deleted" << endl;
	}

	vector<Entity*>* entityList = NULL;
	bool success = EntityManager::GetEntities("test", &entityList);

	ResourceManager::LoadTexture("Assets/Textures/testImage.png");
	//ResourceManager::LoadTexture("Assets/Textures/Pokeball.png");
	//---

	std::cout << "Engine initialisation ended" << endl << endl;

	std::cout << "Initialising Managers" << std::endl << std::endl;

	RenderManager::Initialise();

	std::cout << "Managers Initialised" << std::endl << std::endl;

	return true;
}

void Engine::SetInitialScene(IScene* scene) {
	sceneManager->SetScene(scene);
}

void Engine::Update() {
	glfwPollEvents();
	
	//dt
	double now = glfwGetTime();
	dt = (now - lastTime);
	lastTime = now;

	sceneManager->Update(dt);
}

void Engine::Render() {
	glClear(GL_COLOR_BUFFER_BIT | GL_DEPTH_BUFFER_BIT);

	sceneManager->Render();

	glfwSwapBuffers(window);
}

double Engine::GetDT() {
	return dt;
}

void Engine::End() {
	SceneManager::End();
	ResourceManager::End();
	EntityManager::End();
	ComponentManager::End();
	RenderManager::End();
	glfwTerminate();
}