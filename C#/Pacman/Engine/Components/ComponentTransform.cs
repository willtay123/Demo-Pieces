using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using OpenTK;

namespace Engine.Components
{
    public class ComponentTransform : IComponent
    {
        Vector3 position;
        Vector3 scale;
        Vector3 rotation;

        public ComponentTransform(float x, float y, float z)
        {
            position = new Vector3(x, y, z);
            scale = new Vector3(1, 1, 1);
            rotation = new Vector3(0, 0, 0);
        }

        public ComponentTransform(Vector3 pos)
        {
            position = pos;
            scale = new Vector3(1, 1, 1);
            rotation = new Vector3(0, 0, 0);
        }

        public ComponentTransform(Vector3 pPosition, Vector3 pScale, Vector3 pRotation)
        {
            position = pPosition;
            scale = pScale;
            rotation = pRotation;
        }

        public Vector3 Position
        {
            get { return position; }
            set { position = value; }
        }

        public Matrix4 PositionMatrix
        {
            get
            {
                return Matrix4.CreateTranslation(position);
            }
        }

        public Vector3 Scale
        {
            get { return scale; }
            set { scale = value; }
        }

        public Matrix4 ScaleMatrix
        {
            get
            {
                return Matrix4.CreateScale(scale);
            }
        }

        public Vector3 Rotation
        {
            get { return rotation; }
            set { rotation = value; }
        }

        public Matrix4 RotationMatrix
        {
            get
            {
                Matrix4 matrix = Matrix4.CreateRotationZ(rotation.Z) *
                                 Matrix4.CreateRotationY(rotation.Y) *
                                 Matrix4.CreateRotationX(rotation.X);
                return matrix;
            }
        }

        public Vector3 Direction
        {
            get
            {
                Vector4 direction = RotationMatrix * new Vector4(0, 0, -1, 0);
                return direction.Xyz;
            }
        }

        public Matrix4 Transform
        {
            get
            {
                Matrix4 transform = Matrix4.CreateRotationZ(rotation.Z) *
                                    Matrix4.CreateRotationY(rotation.Y) *
                                    Matrix4.CreateRotationX(rotation.X) *
                                    Matrix4.CreateScale(scale) *
                                    Matrix4.CreateTranslation(position);
                return transform;
            }
        }

        public ComponentTypes ComponentType
        {
            get { return ComponentTypes.COMPONENT_TRANSFORM; }
        }

        public IComponent Copy()
        {
            return new ComponentTransform(position, scale, rotation);
        }
    }
}
