using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;

namespace Engine.Components
{
    public class ComponentCollision : IComponent
    {
        protected bool collidable;
        protected bool shouldScale;
        
        public virtual ComponentTypes ComponentType
        {
            get { return ComponentTypes.COMPONENT_COLLISION; }
        }

        public virtual IComponent Copy()
        {
            return new ComponentCollision();
        }

        public bool Collidable
        {
            get { return collidable; }
            set { collidable = value; }
        }

        public bool ShouldScale
        {
            get { return shouldScale; }
            set { shouldScale = value; }
        }
    }
}
