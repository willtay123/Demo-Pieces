using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;

namespace Engine.Components
{
    [FlagsAttribute]
    public enum ComponentTypes {
        COMPONENT_NONE              = 0,
	    COMPONENT_TRANSFORM         = 1 << 0,
        COMPONENT_GEOMETRY          = 1 << 1,
        COMPONENT_TEXTURE           = 1 << 2,
        COMPONENT_MOVEMENT          = 1 << 3,
        COMPONENT_COLLISION         = 1 << 4,
        COMPONENT_COLLISION_BOX     = 1 << 5,
        COMPONENT_COLLISION_CIRCLE  = 1 << 6,
        COMPONENT_SCORE             = 1 << 7,
        COMPONENT_VALUE             = 1 << 8,
        COMPONENT_AUDIO             = 1 << 9,
        COMPONENT_PLAYER_CONTROL    = 1 << 10,
        COMPONENT_AI_GHOST          = 1 << 11,
        COMPONENT_LIVES             = 1 << 12
    }

    public interface IComponent
    {
        ComponentTypes ComponentType
        {
            get;
        }

        IComponent Copy();
    }
}
