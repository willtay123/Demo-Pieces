﻿using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Drawing;
using OpenTK;
using OpenTK.Input;
using OpenTK.Graphics.OpenGL;
using Engine.Managers;
using Engine.Scenes;

namespace OpenGL_Game.Scenes
{
    class GameOverScene : Scene
    {
        float score;

        public GameOverScene(SceneManager sceneManager, float pScore) : base(sceneManager)
        {
            name = "Game Over";
            score = pScore;

            sceneManager.Keyboard.KeyDown += Keyboard_KeyDown;
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
            GUI.Label(new Rectangle(0, (int)(fontSize / 2f), (int)width, (int)(fontSize * 2f)), "Game Over!", (int)fontSize, StringAlignment.Center);

            GUI.Label(new Rectangle(20, (int)(height / 2f - fontSize / 2f), (int)width, (int)(fontSize * 2f)), "Score: " + score, (int)fontSize, StringAlignment.Center);

            GUI.Render();
        }

        public void Keyboard_KeyDown(object sender, KeyboardKeyEventArgs e)
        {
            //inputArray[(int)e.Key] = true;
            if (e.Key == Key.Q) { sceneManager.SetScene(new MainMenuScene(sceneManager)); }
        }

        public override void Close()
        {
            sceneManager.Keyboard.KeyDown -= Keyboard_KeyDown;
        }
    }
}
