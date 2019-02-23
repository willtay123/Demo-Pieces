using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;

namespace Engine.Components
{
    public class ComponentScore : IComponent
    {
        float score;

        public ComponentScore(float pScore = 0)
        {
            score = pScore;
        }

        public ComponentTypes ComponentType
        {
            get { return ComponentTypes.COMPONENT_SCORE; }
        }

        public IComponent Copy()
        {
            return new ComponentScore(score);
        }

        public float Score
        {
            get { return score; }
            set { if (value == 0 || value > score) { score = value; } } //score should only ever go up or be reset to 0
        }
    }
}
