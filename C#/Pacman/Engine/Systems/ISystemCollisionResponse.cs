using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;

namespace Engine.Systems
{
    public interface ISystemCollisionResponse : ISystem
    {
        void Respond(List<Collision> collisions);
    }
}
