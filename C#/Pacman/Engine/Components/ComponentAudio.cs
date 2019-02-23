using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using OpenTK;
using OpenTK.Audio;
using OpenTK.Audio.OpenAL;
using Engine.Managers;

namespace Engine.Components
{
    public class ComponentAudio : IComponent
    {
        int audioID;
        int source;

        bool isTypeInterval;
        float interval;
        DateTime lastPlayed;

        public ComponentAudio(string path)
        {
            Setup(path);
        }

        public ComponentAudio(string path, bool pIsTypeInterval, float pInterval)
        {
            Setup(path);

            isTypeInterval = pIsTypeInterval;
            interval = pInterval;
        }

        private ComponentAudio(int pAudioID, int pSource, bool pIsTypeInterval, float pInterval, DateTime pLastPlayed)
        {
            audioID = pAudioID;
            source = pSource;
            isTypeInterval = pIsTypeInterval;
            interval = pInterval;
            lastPlayed = pLastPlayed;
        }

        private void Setup(string path)
        {
            //sets all flags and default values

            audioID = ResourceManager.LoadAudio(path);
            source = AL.GenSource(); // gen a Source Handle
            AL.Source(source, ALSourcei.Buffer, audioID); // attach the buffer to a source

            isTypeInterval = false;
            interval = 0;
            lastPlayed = DateTime.Now;
        }

        public ComponentTypes ComponentType
        {
            get { return ComponentTypes.COMPONENT_AUDIO; }
        }

        public IComponent Copy()
        {
            return new ComponentAudio(audioID, source, isTypeInterval, interval, lastPlayed);
        }

        public int Source
        {
            get { return source; }
        }

        public bool IsTypeInterval()
        {
            return isTypeInterval;
        }

        public float Period
        {
            get { return interval; }
        }

        public DateTime LastPlayed
        {
            get { return lastPlayed; }
            set { lastPlayed = value; }
        }      

        public void Play()
        {
            AL.SourcePlay(source);
        }

        public void Pause()
        {
            AL.SourcePause(source);
        }

        public void Loop()
        {
            AL.Source(source, ALSourceb.Looping, true);
        }

        public void StopLoop()
        {
            AL.Source(source, ALSourceb.Looping, false);
        }
    }
}
