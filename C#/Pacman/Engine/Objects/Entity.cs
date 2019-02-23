using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Diagnostics;
using Engine.Components;

namespace Engine.Objects
{
    public class Entity
    {
        string name;
        List<IComponent> componentList = new List<IComponent>();
        ComponentTypes mask;
        bool enabled;
 
        public Entity(string name)
        {
            this.name = name;
            enabled = true;
        }

        /// <summary>Adds a single component</summary>
        public void AddComponent(IComponent component)
        {
            Debug.Assert(component != null, "Component cannot be null");

            componentList.Add(component);
            mask |= component.ComponentType;
        }

        public String Name
        {
            get { return name; }
        }

        public ComponentTypes Mask
        {
            get { return mask; }
        }

        public bool Enabled
        {
            get { return enabled; }
            set { enabled = value; }
        }

        public List<IComponent> Components
        {
            get { return componentList; }
        }

        public IComponent FindComponent(ComponentTypes type)
        {
            return componentList.Find(delegate (IComponent component)
            {
                return component.ComponentType == type;
            }
            );
        }

        public bool HasComponent(ComponentTypes type)
        {
            return ((mask & type) == type);
        }
    }
}
