using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using Engine;
using Engine.Objects;

namespace Engine.Systems
{
    public interface ISystem
    {
        void OnAction(Entity entity);

        // Property signatures: 
        string Name
        {
            get;
        }
    }
}
