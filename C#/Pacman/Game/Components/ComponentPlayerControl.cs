using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using Engine.Components;

namespace OpenGL_Game.Components
{
    class ComponentPlayerControl : IComponentControl
    {
        bool enabled;

        public ComponentPlayerControl(bool pEnabled)
        {
            enabled = pEnabled;
        }

        public ComponentTypes ComponentType
        {
            get { return ComponentTypes.COMPONENT_PLAYER_CONTROL; }
        }

        public bool Enabled
        {
            get { return enabled; }
            set { enabled = value; }
        }

        public IComponent Copy()
        {
            return new ComponentPlayerControl(enabled);
        }
    }
}
