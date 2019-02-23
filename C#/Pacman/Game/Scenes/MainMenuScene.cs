using System;
using OpenTK;
using OpenTK.Input;
using OpenTK.Graphics.OpenGL;
using System.Drawing;
using Engine.Managers;
using Engine.Scenes;

namespace OpenGL_Game.Scenes
{
    class MainMenuScene : Scene
    {
        public MainMenuScene(SceneManager sceneManager) : base(sceneManager)
        {
            name = "Main Menu";

            sceneManager.Mouse.ButtonDown += Mouse_ButtonDown;
        }

        public override void Update(FrameEventArgs e)
        {
        }

        public override void Render(FrameEventArgs e)
        {
            GL.Viewport(0, 0, sceneManager.Width, sceneManager.Height);
            GL.Clear(ClearBufferMask.ColorBufferBit | ClearBufferMask.DepthBufferBit);

            GL.MatrixMode(MatrixMode.Projection);
            GL.LoadIdentity();
            GL.Ortho(0, sceneManager.Width, 0, sceneManager.Height, -1, 1);

            GUI.clearColour = Color.CornflowerBlue;

            //Display the Title
            float width = sceneManager.Width, height = sceneManager.Height, fontSize = Math.Min(width, height) / 10f;
            GUI.Label(new Rectangle(0, (int)(fontSize / 2f), (int)width, (int)(fontSize * 2f)), "Main Menu", (int)fontSize, StringAlignment.Center);

            GUI.Label(new Rectangle(20, (int)(height / 3f - fontSize / 2f), (int)width, (int)(fontSize * 2f)), "\"Left Click\" to start the game", (int)(fontSize / 2f), StringAlignment.Center);
            GUI.Label(new Rectangle(20, (int)(height / 2f - fontSize / 2f), (int)width, (int)(fontSize * 2f)), "Use the arrow keys to move", (int)(fontSize / 2f), StringAlignment.Center);
            GUI.Label(new Rectangle(20, (int)(height / 1.5f - fontSize / 2f), (int)width, (int)(fontSize * 2f)), "Collect all of the food and avoid the ghost", (int)(fontSize / 2f), StringAlignment.Center);


            GUI.Render();
        }

        private void Mouse_ButtonDown(object sender, MouseButtonEventArgs e)
        {
            switch (e.Button)
            {
                case MouseButton.Left:
                    //swap to gameScene
                    sceneManager.SetScene(new GameScene(sceneManager));
                    break;
            }
        }

        public override void Close()
        {
            sceneManager.Mouse.ButtonDown -= Mouse_ButtonDown;
        }
    }
}