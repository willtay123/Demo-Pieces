using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;

namespace Engine.Components
{
    public class ComponentLives : IComponent
    {
        int lives;

        public ComponentLives(int pLives)
        {
            lives = pLives;
        }

        public ComponentTypes ComponentType
        {
            get { return ComponentTypes.COMPONENT_LIVES; }
        }

        public int Lives
        {
            get { return lives; }
            set { lives = value; }
        }

        public IComponent Copy()
        {
            return new ComponentLives(lives);
        }
    }
}
