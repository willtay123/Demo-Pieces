using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using Engine.Managers;
using Engine.Objects;

namespace Engine.Components
{
    public class ComponentGeometry : IComponent
    {
        Geometry geometry;

        public ComponentGeometry(string geometryName)
        {
            this.geometry = ResourceManager.LoadGeometry(geometryName);
        }

        private ComponentGeometry(Geometry pGeometry)
        {
            geometry = pGeometry;
        }

        public ComponentTypes ComponentType
        {
            get { return ComponentTypes.COMPONENT_GEOMETRY; }
        }

        public IComponent Copy()
        {
            //WARNING: may give a reference and not a value
            return new ComponentGeometry(geometry);
        }

        public Geometry Geometry()
        {
            return geometry;
        }
    }
}
