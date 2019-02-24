#version 330 core

in vec2 texCoord;
out vec3 color;

uniform sampler2D textureSampler;

void main(){
	color = texture(textureSampler, texCoord).rgb;
}