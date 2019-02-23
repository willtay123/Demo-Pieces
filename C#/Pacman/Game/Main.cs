#region Using Statements
using System;
using Engine.Managers;
using System.Collections.Generic;
using System.Linq;
using Engine.Scenes;
using OpenGL_Game.Scenes;
#endregion

namespace OpenGL_Game
{
#if WINDOWS || LINUX
    /// <summary>
    /// The main class.
    /// </summary>
    public static class MainEntry
    {
        /// <summary>
        /// The main entry point for the application.
        /// </summary>
        [STAThread]
        static void Main()
        {
            using (var game = new SceneManager())
            {
                Scene scene = new MainMenuScene(game);
                game.SetScene(scene);
                game.Run();
            }
        }
    }
#endif
}
