using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using OpenTK;
using OpenTK.Audio;
using OpenTK.Audio.OpenAL;
using Engine.Objects;
using Engine.Components;

namespace Engine.Systems
{
    public class SystemAudio : ISystem
    {
        const ComponentTypes MASK = (ComponentTypes.COMPONENT_TRANSFORM | ComponentTypes.COMPONENT_AUDIO);

        public SystemAudio()
        {

        }

        public void OnAction(Entity entity)
        {
            if ((entity.Mask & MASK) == MASK)
            {
                List<IComponent> components = entity.Components;

                IComponent transformComponent = components.Find(delegate (IComponent component)
                {
                    return component.ComponentType == ComponentTypes.COMPONENT_TRANSFORM;
                }
                );

                IComponent audioComponent = components.Find(delegate (IComponent component)
                {
                    return component.ComponentType == ComponentTypes.COMPONENT_AUDIO;
                }
                );

                if (((ComponentAudio)audioComponent).IsTypeInterval())
                {
                    float period = ((ComponentAudio)audioComponent).Period;
                    TimeSpan sinceLastPlayed = DateTime.Now - ((ComponentAudio)audioComponent).LastPlayed;

                    if (sinceLastPlayed.TotalSeconds >= period)
                    {
                        Vector3 emitterPosition = ((ComponentTransform)transformComponent).Position;
                        int source = ((ComponentAudio)audioComponent).Source;

                        AL.Source(source, ALSource3f.Position, ref emitterPosition);

                        ((ComponentAudio)audioComponent).Play();
                        ((ComponentAudio)audioComponent).LastPlayed = DateTime.Now;
                    }
                }
            }
        }

        // Property signatures: 
        public string Name
        {
            get { return "SystemAudio"; }
        }
    }
}
