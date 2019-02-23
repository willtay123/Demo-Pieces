using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using OpenTK;
using Engine.Managers;
using Engine.Components;

namespace Engine.Objects
{
    public class Camera
    {
        Matrix4 view;
        Matrix4 projection;

        Vector3 position;
        Vector3 direction;
        Vector3 up;

        Entity owner;
        string ownerID;
        bool isFreeCamera;

        private static Camera instance;

        private Camera()
        {
            position = new Vector3(0, 1, 2);
            direction = new Vector3(0, 0, -1);
            up = Vector3.UnitY;

            view = Matrix4.LookAt(position, position + direction, up);
            projection = Matrix4.CreatePerspectiveFieldOfView(MathHelper.DegreesToRadians(45), 800f / 480f, 0.01f, 100f);

            owner = null;
            ownerID = "";
            isFreeCamera = true;
        }

        public static Camera Instance
        {
            get
            {
                if (instance == null)
                {
                    instance = new Camera();
                }
                return instance;
            }
        }

        public Vector3 Position
        {
            get { return position; }
            set { if (value != null) { position = value; } }
        }

        public Vector3 Direction
        {
            get { return direction; }
            set { if (value != null) { direction = value; } }
        }

        public Vector3 Up
        {
            get { return up; }
            set { if (value != null) { up = value; } }
        }

        public Matrix4 View
        {
            get { return view; }
            set { if (value != null) { view = value; } }
        }

        public Matrix4 Projection
        {
            get { return projection; }
            set { if (value != null) { projection = value; } }
        }

        public bool IsFreeCamera
        {
            get { return isFreeCamera; }
            set { isFreeCamera = value; }
        }

        public void Update()
        {
            if (owner == null && ownerID.Length != 0)
            {
                AttachTo(ownerID);
            }
            if (owner != null)
            {
                if (owner.HasComponent(ComponentTypes.COMPONENT_TRANSFORM))
                {
                    ComponentTransform transformComponent = (ComponentTransform)owner.FindComponent(ComponentTypes.COMPONENT_TRANSFORM);
                    Vector3 ownerPos = transformComponent.Position;
                    Vector3 ownerDirection = transformComponent.Direction;
                    position = ownerPos + new Vector3(0, 0.7f, 0);
                    direction = ownerDirection;
                }
            }
            view = Matrix4.LookAt(position, position + direction, up);
        }

        public void AttachTo(string entityID)
        {
            EntityManager entityManager = EntityManager.Instance;

            Entity entity = entityManager.FindEntity(entityID);
            if (entity != null)
            {
                ownerID = entityID;
                owner = entity;
            }
        }

        public void Control(string entityID)
        {
            EntityManager entityManager = EntityManager.Instance;

            Entity entity = entityManager.FindEntity(entityID);
            if (entity != null)
            {
                ownerID = entityID;
                owner = entity;

                if (entity.HasComponent(ComponentTypes.COMPONENT_PLAYER_CONTROL))
                {
                    IComponentControl controlComponent = (IComponentControl)entity.FindComponent(ComponentTypes.COMPONENT_PLAYER_CONTROL);
                    controlComponent.Enabled = true;
                    IsFreeCamera = false;
                }
            }
        }

        public void Detatch()
        {
            if (owner != null && owner.HasComponent(ComponentTypes.COMPONENT_PLAYER_CONTROL))
            {
                IComponentControl controlComponent = (IComponentControl)owner.FindComponent(ComponentTypes.COMPONENT_PLAYER_CONTROL);
                controlComponent.Enabled = false;
                IsFreeCamera = true;
            }
            owner = null;
            ownerID = "";
        }

        public void MoveTo(Vector3 position)
        {
            if (position != null)
            {
                this.position = position;
            }
        }

        public void LookAt(Vector3 eye, Vector3 target, Vector3 up)
        {
            view = Matrix4.LookAt(eye, target, up);
        }

        public void MoveUp(float shift)
        {
            if (isFreeCamera)
            {
                position += up * shift;
            }
        }

        public void MoveLeft(float shift)
        {
            if (isFreeCamera)
            {
                Matrix4 turn = Matrix4.CreateRotationY(1.5708f); //90 degrees left
                Vector4 moveVector = turn * new Vector4(direction, 0);
                position -= moveVector.Xyz * shift;
            }
        }

        public void MoveDown(float shift)
        {
            if (isFreeCamera)
            {
                position -= up * shift;
            }
        }

        public void MoveRight(float shift)
        {
            if (isFreeCamera)
            {
                Matrix4 turn = Matrix4.CreateRotationY(-1.5708f); //90 degrees right
                Vector4 moveVector = turn * new Vector4(direction, 0);
                position -= moveVector.Xyz * shift;
            }
        }

        public void MoveForward(float shift)
        {
            if (isFreeCamera)
            {
                position += direction * shift;
            }
        }

        public void MoveBackward(float shift)
        {
            if (isFreeCamera)
            {
                position -= direction * shift;
            }
        }

        public void TurnRight(float angleInDeg)
        {
            if (isFreeCamera)
            {
                float angleInRad = angleInDeg * (float)Math.PI / 180;
                Matrix4 turn = Matrix4.CreateRotationY(angleInRad); //90 degrees right
                Vector4 newDirection = turn * new Vector4(direction, 0);
                direction = newDirection.Xyz;
            }
        }

        public void TurnLeft(float angleInDeg)
        {
            if (isFreeCamera)
            {
                float angleInRad = -angleInDeg * (float)Math.PI / 180;
                Matrix4 turn = Matrix4.CreateRotationY(angleInRad); //90 degrees right
                Vector4 newDirection = turn * new Vector4(direction, 0);
                direction = newDirection.Xyz;
            }
        }
    }
}
