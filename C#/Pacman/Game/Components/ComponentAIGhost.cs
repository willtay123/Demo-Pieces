using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using OpenTK;
using Engine.Components;

namespace OpenGL_Game.Components
{
    public class ComponentAIGhost : IComponent
    {
        string target;
        Vector3 targetLocation;
        DateTime deathTime;

        public ComponentAIGhost(string pTarget)
        {
            target = pTarget;
            targetLocation = new Vector3(0, 0, 0);
            deathTime = DateTime.Now;
        }

        public ComponentTypes ComponentType
        {
            get { return ComponentTypes.COMPONENT_AI_GHOST; }
        }

        public string Target
        {
            get { return target; }
            set { target = value; }
        }

        public Vector3 TargetLocation
        {
            get { return targetLocation; }
            set { targetLocation = value; }
        }

        public DateTime DeathTime
        {
            get { return deathTime; }
            set { DeathTime = value; }
        }

        public IComponent Copy()
        {
            return new ComponentAIGhost(target);
        }
    }
}
