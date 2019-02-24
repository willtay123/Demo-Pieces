#include "RenderManager.h"


int RenderManager::_pgmID = -1;
int RenderManager::_vsID = -1;
int RenderManager::_fsID = -1;

GLuint RenderManager::_uniform_MVP = -1;
int RenderManager::_uniform_mView = -1;
mat4x4 RenderManager::_projection(1.0f);

void RenderManager::Initialise() {
	//initialise matrices
	//projection
	_projection = glm::perspective(
		(float)glm::radians(80.0f),
		1280.0f / 780.0f,
		0.1f,
		100.0f
	);

	//get program id
	int pgmID = glCreateProgram();
	
	//load default shaders
	//LoadShaders("Assets/Shaders/basic.v", "Assets/Shaders/basic.f", _pgmID);
	int vertShaderID = LoadShader("Assets/Shaders/basic.v", GL_VERTEX_SHADER);
	int fragShaderID = LoadShader("Assets/Shaders/basic.f", GL_FRAGMENT_SHADER);
	LinkShaders(pgmID, vertShaderID, fragShaderID);

	glUseProgram(pgmID);
	_pgmID = pgmID;
}

int RenderManager::LoadShader(const char* filename, int shaderType) {
	GLuint shaderID = glCreateShader(shaderType);

	// Read the shader code from the file
	std::string shaderCode;
	std::ifstream shaderStream(filename, std::ios::in);
	if (shaderStream.is_open()) {
		std::stringstream sstr;
		sstr << shaderStream.rdbuf();
		shaderCode = sstr.str();
		shaderStream.close();
	}
	else {
		std::cout << "Impossible to open " << filename << ". Are you in the right directory?" << std::endl;
		getchar();
		return 0;
	}

	GLint result = GL_FALSE;
	int infoLogLength;

	// Compile Vertex Shader
	std::cout << "Compiling shader : " << filename << std::endl;
	char const * shaderSourcePointer = shaderCode.c_str();
	glShaderSource(shaderID, 1, &shaderSourcePointer, NULL);
	glCompileShader(shaderID);

	// Check Vertex Shader
	glGetShaderiv(shaderID, GL_COMPILE_STATUS, &result);
	glGetShaderiv(shaderID, GL_INFO_LOG_LENGTH, &infoLogLength);
	if (infoLogLength > 0) {
		std::vector<char> shaderErrorMessage(infoLogLength + 1);
		glGetShaderInfoLog(shaderID, infoLogLength, NULL, &shaderErrorMessage[0]);
		std::cout << "ERROR: " << &shaderErrorMessage[0] << std::endl;
		return 0;
	}

	return shaderID;
}

bool RenderManager::LinkShaders(int pgmID, int vertShaderID, int fragShaderID) {
	//NOTICE: do not use this method, use LoadShader() and LinkShaders() instead

	GLint result;
	int infoLogLength;

	// Link the program
	std::cout << "linking shaders..." << std::endl;

	glAttachShader(pgmID, vertShaderID);
	glAttachShader(pgmID, fragShaderID);
	glLinkProgram(pgmID);

	// Check the program
	glGetProgramiv(pgmID, GL_LINK_STATUS, &result);
	glGetProgramiv(pgmID, GL_INFO_LOG_LENGTH, &infoLogLength);
	if (infoLogLength > 0) {
		std::vector<char> ProgramErrorMessage(infoLogLength + 1);
		glGetProgramInfoLog(pgmID, infoLogLength, NULL, &ProgramErrorMessage[0]);
		std::cout << "ERROR: " << &ProgramErrorMessage[0] << std::endl;
		return false;
	}

	_pgmID = pgmID;
	_vsID = vertShaderID;
	_fsID = fragShaderID;

	_uniform_MVP = glGetUniformLocation(_pgmID, "MVP");

	std::cout << "shaders  linked" << std::endl << std::endl;
	return true;
}

bool RenderManager::LoadShaders(const char* filenameVert, const char* filenameFrag, int pgmID) {
	// Create the shaders
	GLuint VertexShaderID = glCreateShader(GL_VERTEX_SHADER);
	GLuint FragmentShaderID = glCreateShader(GL_FRAGMENT_SHADER);

	// Read the Vertex Shader code from the file
	std::string VertexShaderCode;
	std::ifstream VertexShaderStream(filenameVert, std::ios::in);
	if (VertexShaderStream.is_open()) {
		std::stringstream sstr;
		sstr << VertexShaderStream.rdbuf();
		VertexShaderCode = sstr.str();
		VertexShaderStream.close();
	}
	else {
		std::cout << "Impossible to open " << filenameVert <<". Are you in the right directory?" << std::endl;
		getchar();
		return false;
	}

	// Read the Fragment Shader code from the file
	std::string FragmentShaderCode;
	std::ifstream FragmentShaderStream(filenameFrag, std::ios::in);
	if (FragmentShaderStream.is_open()) {
		std::stringstream sstr;
		sstr << FragmentShaderStream.rdbuf();
		FragmentShaderCode = sstr.str();
		FragmentShaderStream.close();
	}
	else {
		std::cout << "Impossible to open " << filenameFrag << ". Are you in the right directory?" << std::endl;
		getchar();
		return false;
	}

	GLint Result = GL_FALSE;
	int InfoLogLength;

	// Compile Vertex Shader
	std::cout << "Compiling shader : " << filenameVert << std::endl;
	char const * VertexSourcePointer = VertexShaderCode.c_str();
	glShaderSource(VertexShaderID, 1, &VertexSourcePointer, NULL);
	glCompileShader(VertexShaderID);

	// Check Vertex Shader
	glGetShaderiv(VertexShaderID, GL_COMPILE_STATUS, &Result);
	glGetShaderiv(VertexShaderID, GL_INFO_LOG_LENGTH, &InfoLogLength);
	if (InfoLogLength > 0) {
		std::vector<char> VertexShaderErrorMessage(InfoLogLength + 1);
		glGetShaderInfoLog(VertexShaderID, InfoLogLength, NULL, &VertexShaderErrorMessage[0]);
		std::cout << "ERROR: " << &VertexShaderErrorMessage[0] << std::endl;
	}

	// Compile Fragment Shader
	std::cout << "Compiling shader : " << filenameFrag << std::endl;
	char const * FragmentSourcePointer = FragmentShaderCode.c_str();
	glShaderSource(FragmentShaderID, 1, &FragmentSourcePointer, NULL);
	glCompileShader(FragmentShaderID);

	// Check Fragment Shader
	glGetShaderiv(FragmentShaderID, GL_COMPILE_STATUS, &Result);
	glGetShaderiv(FragmentShaderID, GL_INFO_LOG_LENGTH, &InfoLogLength);
	if (InfoLogLength > 0) {
		std::vector<char> FragmentShaderErrorMessage(InfoLogLength + 1);
		glGetShaderInfoLog(FragmentShaderID, InfoLogLength, NULL, &FragmentShaderErrorMessage[0]);
		std::cout << "ERROR: " << &FragmentShaderErrorMessage[0] << std::endl;
	}

	// Link the program
	std::cout << "linking program..." << std::endl;

	glAttachShader(pgmID, VertexShaderID);
	glAttachShader(pgmID, FragmentShaderID);
	glLinkProgram(pgmID);

	// Check the program
	glGetProgramiv(pgmID, GL_LINK_STATUS, &Result);
	glGetProgramiv(pgmID, GL_INFO_LOG_LENGTH, &InfoLogLength);
	if (InfoLogLength > 0) {
		std::vector<char> ProgramErrorMessage(InfoLogLength + 1);
		glGetProgramInfoLog(pgmID, InfoLogLength, NULL, &ProgramErrorMessage[0]);
		std::cout << "ERROR: " << &ProgramErrorMessage[0] << std::endl;
	}

	std::cout << "program  linked" << std::endl;

	glDetachShader(pgmID, VertexShaderID);
	glDetachShader(pgmID, FragmentShaderID);

	glDeleteShader(VertexShaderID);
	glDeleteShader(FragmentShaderID);

	_vsID = VertexShaderID;
	_fsID = FragmentShaderID;

	std::cout << endl;
	return true;
}

void RenderManager::Draw(Camera* camera, int vertBufferID) {

	// Camera matrix
	glm::mat4x4* view = camera->GetView();

	// Model matrix : an identity matrix (model will be at the origin)
	glm::mat4 modelScale = glm::mat4(1.0f);
	glm::mat4 modelRotate = glm::mat4(1.0f);
	glm::mat4 modelTranslate = glm::mat4(1.0f);
	glm::mat4 model = modelTranslate * modelRotate * modelScale;

	// Our ModelViewProjection : multiplication of our 3 matrices
	mat4x4 mvp = _projection * (*view) * model;

	// Get a handle for our "MVP" uniform
	// Only during the initialisation
	GLuint MatrixID = glGetUniformLocation(_pgmID, "MVP");

	// Send our transformation to the currently bound shader, in the "MVP" uniform
	// This is done in the main loop since each model will have a different MVP matrix (At least for the M part)
	glUniformMatrix4fv(MatrixID, 1, GL_FALSE, &mvp[0][0]);


	// Draw the triangle !
	glDrawArrays(GL_TRIANGLES, 0, 12 * 3); // Starting from vertex 0; 3 vertices total -> 1 triangle
	glDisableVertexAttribArray(0);
}

void RenderManager::Draw(Camera* camera, Geometry* geometry, int textureID) {

	// Camera matrix
	glm::mat4x4* view = camera->GetView();

	// Model matrix : an identity matrix (model will be at the origin)
	glm::mat4 modelScale = glm::mat4(1.0f);
	glm::mat4 modelRotate = glm::mat4(1.0f);
	glm::mat4 modelTranslate = glm::mat4(1.0f);
	glm::mat4 model = modelTranslate * modelRotate * modelScale;

	// Our ModelViewProjection : multiplication of our 3 matrices
	mat4x4 mvp = _projection * (*view) * model;

	//fetch geometry data
	GLuint vertBufferID = geometry->GetVBOHandle();
	GLuint textureBufferID = geometry->GetTBOHandle();
	GLuint triangleCount = geometry->GetTriangleCount();


	// Update uniform shader variables
	glUniformMatrix4fv(_uniform_MVP, 1, GL_FALSE, &mvp[0][0]);

	// Vertex
	glBindVertexArray(vertBufferID);

	// Texture
	glActiveTexture(GL_TEXTURE0);
	glBindTexture(GL_TEXTURE_2D, textureID);
	glEnable(GL_TEXTURE_2D);

	glEnableVertexAttribArray(0);
	glBindBuffer(GL_ARRAY_BUFFER, vertBufferID);
	glVertexAttribPointer(
		0,							// attribute 0. No particular reason for 0, but must match the layout in the shader.
		3,							// size
		GL_FLOAT,					// type
		GL_FALSE,					// normalized?
		0,							// stride
		(void*)0					// array buffer offset
	);

	glEnableVertexAttribArray(1);
	glBindBuffer(GL_ARRAY_BUFFER, textureBufferID);
	glVertexAttribPointer(
		1,                                // attribute. No particular reason for 1, but must match the layout in the shader.
		2,                                // size
		GL_FLOAT,                         // type
		GL_FALSE,                         // normalized?
		0,                                // stride
		(void*)0                          // array buffer offset
	);

	// Draw Triangles
	//glDrawArrays(GL_TRIANGLES, 0, triangleCount * 3);
	
	// Index buffer
	glBindBuffer(GL_ELEMENT_ARRAY_BUFFER, geometry->GetVIBOHandle());
	
	// Draw the triangles !
	glDrawElements(
		GL_TRIANGLES,      // mode
		geometry->GetVIBOSize(),    // count
		GL_UNSIGNED_INT,   // type
		(void*)0           // element array buffer offset
	);

	glDisableVertexAttribArray(0);
	glDisableVertexAttribArray(1);
}

void RenderManager::Draw(mat4x4 world, Geometry geometry, int texture) {
	//GL.UseProgram(pgmID);
	glUseProgram(_pgmID);

	glEnable(GL_TEXTURE_2D);
	glBindTexture(GL_TEXTURE_2D, texture);
	//GL.Uniform1(uniform_stex, 0);
	//GL.ActiveTexture(TextureUnit.Texture0);
	//GL.Enable(EnableCap.Texture2D);

	//Matrix4 worldViewProjection = world * Camera.Instance.View * Camera.Instance.Projection;
	mat4x4 worldViewProjection = world; //* camera.GetView * camera.GetProjection;
	//GL.UniformMatrix4(uniform_mview, false, ref worldViewProjection);
	glUniformMatrix4fv(_uniform_mView, 1, false, &worldViewProjection[0][0]);
	
	//geometry render
	glBindVertexArray(geometry.GetVBOHandle());
	glDrawArrays(GL_TRIANGLES, 0, geometry.GetTriangleCount() * 3);

	glBindTexture(GL_TEXTURE_2D, 0);
	glDisable(GL_TEXTURE_2D);
	glBindVertexArray(0);
	glUseProgram(0);
}

void RenderManager::DrawEntity(Entity* entity) {
	ComponentTransform transfComponent;
	ComponentGeometry geomComponent;
	ComponentTexture textureComponent;

	if (entity->GetComponent("transform", &transfComponent) &&
		entity->GetComponent("geometry", &geomComponent) &&
		entity->GetComponent("texture", &textureComponent)) {

		vec4* position = transfComponent.GetPosition();
		vec3* rotation = transfComponent.GetRotation();
		vec3* scale = transfComponent.GetScale();

		//geometry
		//Geometry geometry = geomComponent.GetGeometry();

		//texture ID
		int texture = textureComponent.GetID();
		
		////Translate -> Rotate -> Scale
		//translate
		mat4x4 mPos = glm::translate(vec3(position->x, position->y, position->z));

		//rot
		mat4x4 mXRot = glm::rotate(rotation->x, vec3(1, 0, 0));
		mat4x4 mYRot = glm::rotate(rotation->y, vec3(0, 1, 0));
		mat4x4 mZRot = glm::rotate(rotation->z, vec3(0, 0, 1));
		mat4x4 mRot = mXRot * mYRot * mZRot;

		//scale
		mat4x4 mScale = glm::scale(*scale);
		
		//world
		mat4x4 world = mScale * mRot * mPos;

		////gl
		////worldViewProj = world * view * projection
		////gluniformmatrix4(shader var, false, ref worldViewProj);
		////GL.BindVertexArray(vao_Handle); //from the model
		////GL.DrawArrays(PrimitiveType.Triangles, 0, numberOfTriangles * 3); //numOfTri is from model info
		//
		
		//Draw(world, geometry, texture);
	}
}

void RenderManager::DrawEntityList(vector<Entity*> entityList) {

}

void RenderManager::End() {
	//delete objects;
	glDetachShader(_pgmID, _vsID);
	glDetachShader(_pgmID, _fsID);
	glDeleteShader(_vsID);
	glDeleteShader(_fsID);
	glDeleteProgram(_pgmID);
}