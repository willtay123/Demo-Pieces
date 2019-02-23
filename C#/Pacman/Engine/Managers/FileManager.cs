using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.IO;
using System.Diagnostics;
using Engine.Objects;

namespace Engine.Managers
{
    public static class FileManager
    {
        static string scorePath = "Data/Scores.txt";

        public static bool SaveScores(Scoreboard scoreboard)
        {
            bool success = true;

            try
            {
                StreamWriter outFile = new StreamWriter(scorePath);

                List<Score> scores = scoreboard.Scores;

                foreach (Score score in scores)
                {
                    outFile.WriteLine(score.name);
                    outFile.WriteLine(score.value);
                }

                outFile.Close();
            }
            catch
            {
                success = false;
            }

            return success;
        }

        public static List<Score> LoadScores()
        {
            List<Score> scores = new List<Score>();

            try
            {
                StreamReader inFile = new StreamReader(scorePath);

                while (!inFile.EndOfStream)
                {
                    Score score = new Score()
                    {
                        name = inFile.ReadLine(),
                        value = float.Parse(inFile.ReadLine())
                    };                   
                }

                inFile.Close();
            }
            catch
            {
                Debug.WriteLine("scoreboard load failed");
            }

            return scores;
        }
    }
}
