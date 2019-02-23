using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using OpenTK;
using OpenTK.Input;
using Engine.Managers;
using Engine.Systems;
using Engine.Objects;
using Engine.Components;
using OpenGL_Game.Components;

namespace OpenGL_Game.Systems
{
    class SystemPlayerControl : ISystem
    {
        const ComponentTypes mask = (
            ComponentTypes.COMPONENT_PLAYER_CONTROL |
            ComponentTypes.COMPONENT_TRANSFORM |
            ComponentTypes.COMPONENT_MOVEMENT
        );

        SceneManager sceneManager;

        public SystemPlayerControl(SceneManager pSceneManager)
        {
            sceneManager = pSceneManager;
        }

        public string Name
        {
            get { return "SystemPlayerControl"; }
        }

        public void OnAction(Entity entity)
        {
            if ((entity.Mask & mask) == mask)
            {
                ComponentPlayerControl playerControl = (ComponentPlayerControl)entity.FindComponent(ComponentTypes.COMPONENT_PLAYER_CONTROL);

                if (playerControl.Enabled)
                {
                    ComponentTransform transformComponent = (ComponentTransform)entity.FindComponent(ComponentTypes.COMPONENT_TRANSFORM);
                    ComponentMovement movementComponent = (ComponentMovement)entity.FindComponent(ComponentTypes.COMPONENT_MOVEMENT);

                    Vector3 rotation = transformComponent.Rotation;
                    float maxSpeed;
                    if (movementComponent.HasMaxSpeed)
                    {
                        maxSpeed = movementComponent.MaxSpeed;
                    }
                    else maxSpeed = 0.5f;
                    Vector3 velocity = new Vector3(0, 0, 0);

                    //movement
                    if (sceneManager.KeyPressed(Key.Up))
                    {
                        //move entity forward
                        Matrix4 turn = Matrix4.CreateRotationY(0f); //0 degrees
                        Matrix4 facing = Matrix4.CreateRotationY(rotation.Y);
                        Vector4 moveVector = turn * facing * new Vector4(0, 0, -1, 0);

                        velocity += moveVector.Xyz * maxSpeed;
                    }
                    if (sceneManager.KeyPressed(Key.A))
                    {
                        //move entity left
                        Matrix4 turn = Matrix4.CreateRotationY(-1.5708f); //90 degrees left
                        Matrix4 facing = Matrix4.CreateRotationY(rotation.Y);
                        Vector4 moveVector = turn * facing * new Vector4(0, 0, -1, 0);

                        velocity += moveVector.Xyz * maxSpeed;
                    }
                    if (sceneManager.KeyPressed(Key.Down))
                    {
                        //move entity back
                        Matrix4 turn = Matrix4.CreateRotationY(3.1415f); //180 degrees
                        Matrix4 facing = Matrix4.CreateRotationY(rotation.Y);
                        Vector4 moveVector = turn * facing * new Vector4(0, 0, -1, 0);

                        velocity += moveVector.Xyz * maxSpeed;
                    }
                    if (sceneManager.KeyPressed(Key.D))
                    {
                        //move entity right
                        Matrix4 turn = Matrix4.CreateRotationY(1.5708f); //90 degrees right
                        Matrix4 facing = Matrix4.CreateRotationY(rotation.Y);
                        Vector4 moveVector = turn * facing * new Vector4(0, 0, -1, 0);

                        velocity += moveVector.Xyz * maxSpeed;
                    }

                    //turning
                    if (sceneManager.KeyPressed(Key.Right))
                    {
                        //turn entity right
                        float angleInDeg = 60f;
                        float angleInRad = angleInDeg * (float)Math.PI / 180;
                        rotation.Y += angleInRad * SceneManager.dt;
                    }
                    if (sceneManager.KeyPressed(Key.Left))
                    {
                        //turn entity left
                        float angleInDeg = 60f;
                        float angleInRad = angleInDeg * (float)Math.PI / 180;
                        rotation.Y -= angleInRad * SceneManager.dt;                        
                    }

                    movementComponent.Velocity = velocity;
                    transformComponent.Rotation = rotation;
                }
            }
        }
    }
}
