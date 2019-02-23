using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using OpenTK.Graphics;
using Engine.Managers;

namespace Engine.Components
{
    public class ComponentTexture : IComponent
    {
        int texture;

        public ComponentTexture(string textureName)
        {
            texture = ResourceManager.LoadTexture(textureName);
        }

        private ComponentTexture(int pTexture)
        {
            texture = pTexture;
        }

        public int Texture
        {
            get { return texture; }
        }

        public ComponentTypes ComponentType
        {
            get { return ComponentTypes.COMPONENT_TEXTURE; }
        }

        public IComponent Copy()
        {
            return new ComponentTexture(texture);
        }
    }
}
