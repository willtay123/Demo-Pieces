using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using OpenTK;
using Engine.Managers;
using Engine.Components;
using Engine.Objects;
using Engine.Scenes;

namespace Engine.Systems
{
    public class SystemLinearMovement : ISystem
    {
        const ComponentTypes MASK = (ComponentTypes.COMPONENT_TRANSFORM | ComponentTypes.COMPONENT_MOVEMENT);

        public SystemLinearMovement()
        {

        }

        public string Name
        {
            get { return "SystemLinearMovement"; }
        }

        public void OnAction(Entity entity)
        {
            if ((entity.Mask & MASK) == MASK)
            {
                ComponentTransform transformComponent = (ComponentTransform)entity.FindComponent(ComponentTypes.COMPONENT_TRANSFORM);
                Vector3 location = transformComponent.Position;

                ComponentMovement movementComponent = (ComponentMovement)entity.FindComponent(ComponentTypes.COMPONENT_MOVEMENT);
                Vector3 velocity = movementComponent.Velocity;
                velocity.Y = 0;

                location += velocity * SceneManager.dt;
                movementComponent.DesiredLocation = location;
            }
        }
    }
}
