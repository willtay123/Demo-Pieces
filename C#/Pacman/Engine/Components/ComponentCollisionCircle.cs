using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;

namespace Engine.Components
{
    public class ComponentCollisionCircle : ComponentCollision
    {
        float radius;

        public ComponentCollisionCircle(float pRadius, bool pShouldScale)
        {
            collidable = true;
            shouldScale = pShouldScale;
            radius = pRadius;
        }

        public override ComponentTypes ComponentType
        {
            get { return ComponentTypes.COMPONENT_COLLISION_CIRCLE; }
        }

        public override IComponent Copy()
        {
            return new ComponentCollisionCircle(radius, shouldScale);
        }

        public float Radius
        {
            get { return radius; }
        }
    }
}
