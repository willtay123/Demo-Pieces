using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.IO;
using OpenTK;
using OpenTK.Graphics.OpenGL;
using Engine.Components;
using Engine.Objects;
using Engine.Scenes;

namespace Engine.Systems
{
    public class SystemRender : ISystem
    {
        const ComponentTypes MASK = (ComponentTypes.COMPONENT_TRANSFORM | ComponentTypes.COMPONENT_GEOMETRY | ComponentTypes.COMPONENT_TEXTURE);

        protected int pgmID;
        protected int vsID;
        protected int fsID;
        protected int attribute_vtex;
        protected int attribute_vpos;
        protected int uniform_stex;
        protected int uniform_mview;

        public SystemRender()
        {
            pgmID = GL.CreateProgram();
            LoadShader("Shaders/vs.glsl", ShaderType.VertexShader, pgmID, out vsID);
            LoadShader("Shaders/fs.glsl", ShaderType.FragmentShader, pgmID, out fsID);
            GL.LinkProgram(pgmID);
            Console.WriteLine(GL.GetProgramInfoLog(pgmID));

            attribute_vpos = GL.GetAttribLocation(pgmID, "a_Position");
            attribute_vtex = GL.GetAttribLocation(pgmID, "a_TexCoord");
            uniform_mview = GL.GetUniformLocation(pgmID, "WorldViewProj");
            uniform_stex  = GL.GetUniformLocation(pgmID, "s_texture");

            if (attribute_vpos == -1 || attribute_vtex == -1 || uniform_stex == -1 || uniform_mview == -1)
            {
                Console.WriteLine("Error binding attributes");
            }
        }

        void LoadShader(String filename, ShaderType type, int program, out int address)
        {
            address = GL.CreateShader(type);
            using (StreamReader sr = new StreamReader(filename))
            {
                GL.ShaderSource(address, sr.ReadToEnd());
            }
            GL.CompileShader(address);
            GL.AttachShader(program, address);
            Console.WriteLine(GL.GetShaderInfoLog(address));
        }

        public string Name
        {
            get { return "SystemRender"; }
        }

        public void OnAction(Entity entity)
        {
            if ((entity.Mask & MASK) == MASK)
            {
                ComponentGeometry geometryComponent = (ComponentGeometry)entity.FindComponent(ComponentTypes.COMPONENT_GEOMETRY);
                Geometry geometry = geometryComponent.Geometry();

                ComponentTransform transformComponent = (ComponentTransform)entity.FindComponent(ComponentTypes.COMPONENT_TRANSFORM);
                //Vector3 position = transformComponent.Position;
                //Vector3 scale = transformComponent.Scale;
                //Vector3 rotation = transformComponent.Rotation;

                //Matrix4 translateMatrix = Matrix4.CreateTranslation(position);
                //Matrix4 scaleMatrix = Matrix4.CreateScale(scale);
                //Matrix4 xRotMatrix = Matrix4.CreateRotationX(rotation.X);
                //Matrix4 yRotMatrix = Matrix4.CreateRotationY(rotation.Y);
                //Matrix4 zRotMatrix = Matrix4.CreateRotationZ(rotation.Z);
                //Matrix4 rotMatrix = xRotMatrix * yRotMatrix * zRotMatrix;

                //Matrix4 world = rotMatrix * scaleMatrix * translateMatrix;
                Matrix4 world = transformComponent.Transform;

                ComponentTexture textureComponent = (ComponentTexture)entity.FindComponent(ComponentTypes.COMPONENT_TEXTURE);
                int texture = textureComponent.Texture;

                Draw(world, geometry, texture);
            }
        }

        public void Draw(Matrix4 world, Geometry geometry, int texture)
        {
            GL.UseProgram(pgmID);

            GL.Uniform1(uniform_stex, 0);
            GL.ActiveTexture(TextureUnit.Texture0);
            GL.BindTexture(TextureTarget.Texture2D, texture);
            GL.Enable(EnableCap.Texture2D);

            Matrix4 worldViewProjection = world * Camera.Instance.View * Camera.Instance.Projection;
            GL.UniformMatrix4(uniform_mview, false, ref worldViewProjection);

            geometry.Render();

            GL.BindVertexArray(0);
            GL.UseProgram(0);
        }
    }
}
