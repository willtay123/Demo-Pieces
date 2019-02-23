using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;

namespace Engine.Objects
{
    public struct Score
    {
        public string name;
        public float value;
    }

    public class Scoreboard
    {
        List<Score> scores;
        int recordCount = 10;   //the number of score records saved

        public Scoreboard()
        {
            scores = new List<Score>();
        }

        public List<Score> Scores
        {
            get { return scores; }
        }

        public void AddScore(string pName, float pValue)
        {
            Score score = new Score
            {
                name = pName,
                value = pValue
            };

            float currentScore = 0;
            float lastScore = 0;
            for (int i = 0; i <= recordCount; i += 1)
            {
                Score record = scores[i];

                lastScore = currentScore;
                currentScore = record.value;

                if (pValue < currentScore)
                {
                    continue;
                }
                else if (i > 0)
                {
                    scores.Insert(i - 1, score);
                }
                else
                {
                    scores.Add(score);
                }
            }

            while (scores.Count > recordCount)
            {
                scores.RemoveAt(scores.Count - 1);
            }
        }

        public void ClearScores()
        {
            scores.Clear();
        }
    }
}
