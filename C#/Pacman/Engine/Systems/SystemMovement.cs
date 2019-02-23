using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using Engine.Components;
using Engine.Objects;

namespace Engine.Systems
{
    public class SystemMovement : ISystem
    {
        const ComponentTypes mask = (ComponentTypes.COMPONENT_TRANSFORM | ComponentTypes.COMPONENT_MOVEMENT);

        public SystemMovement()
        {

        }

        public string Name
        {
            get { return "SystemMovement"; }
        }

        public void OnAction(Entity entity)
        {
            if ((entity.Mask & mask) == mask) {
                ComponentTransform transformComponent = (ComponentTransform)entity.FindComponent(ComponentTypes.COMPONENT_TRANSFORM);
                ComponentMovement movementComponent = (ComponentMovement)entity.FindComponent(ComponentTypes.COMPONENT_MOVEMENT);

                transformComponent.Position = movementComponent.DesiredLocation;
            }
        }
    }
}
