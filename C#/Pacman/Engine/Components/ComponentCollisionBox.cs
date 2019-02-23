using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using OpenTK;

namespace Engine.Components
{
    public class ComponentCollisionBox : ComponentCollision
    {
        Vector3 point1, point2;

        public ComponentCollisionBox(Vector3 pPoint1, Vector3 pPoint2, bool pShouldScale)
        {
            collidable = true;
            shouldScale = pShouldScale;
            point1 = pPoint1;
            point2 = pPoint2;
        }

        public override ComponentTypes ComponentType
        {
            get { return ComponentTypes.COMPONENT_COLLISION_BOX; }
        }

        public override IComponent Copy()
        {
            return new ComponentCollisionBox(point1, point2, shouldScale);
        }

        public Vector3 Point1
        {
            get { return point1; }
        }

        public Vector3 Point2
        {
            get { return point2; }
        }
    }
}
