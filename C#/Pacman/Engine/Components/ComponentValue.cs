using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;

namespace Engine.Components
{
    public class ComponentValue : IComponent
    {
        float value;

        public ComponentValue(float pValue)
        {
            value = pValue;
        }

        public ComponentTypes ComponentType
        {
            get { return ComponentTypes.COMPONENT_VALUE; }
        }

        public IComponent Copy()
        {
            return new ComponentValue(value);
        }

        public float Value
        {
            get { return value; }
        }
    }
}
