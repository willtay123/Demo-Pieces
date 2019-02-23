using System;
using System.Collections.Generic;
using OpenTK;
using OpenTK.Graphics.OpenGL;
using OpenTK.Input;
using OpenTK.Audio;
using OpenTK.Audio.OpenAL;
using Engine.Scenes;

namespace Engine.Managers
{
    public class SceneManager : GameWindow
    {
        public EntityManager entityManager;

        Dictionary<string, Scene> scenes;
        Scene scene;

        public static int width = 1600, height = 900;

        public delegate void SceneDelegate(FrameEventArgs e);
        public SceneDelegate renderer;
        public SceneDelegate updater;
        public static float dt;

        bool[] inputArray;

        AudioContext audioContext;

        public SceneManager() : base(width, height, new OpenTK.Graphics.GraphicsMode(new OpenTK.Graphics.ColorFormat(8, 8, 8, 8), 16))
        {
            entityManager = new EntityManager();
            audioContext = new AudioContext();

            dt = 0f;
            inputArray = new bool[140];

            Mouse.ButtonDown += Mouse_ButtonDown;
            Keyboard.KeyDown += Keyboard_KeyDown;
            Keyboard.KeyUp += Keyboard_KeyUp;
        }

        public bool KeyPressed(Key key)
        {
            return inputArray[(int)key];
        }

        protected override void OnLoad(EventArgs e)
        {
            base.OnLoad(e);

            GL.Enable(EnableCap.DepthTest);

            //Load the GUI
            GUI.SetUpGUI(width, height);

            scenes = new Dictionary<string, Scene>();

            if (scene == null)
            {
                scene = new DefaultScene(this);
            }
        }

        protected override void OnUpdateFrame(FrameEventArgs e)
        {
            base.OnUpdateFrame(e);

            dt = (float)e.Time;

            updater?.Invoke(e);
        }

        protected override void OnRenderFrame(FrameEventArgs e)
        {
            base.OnRenderFrame(e);

            renderer?.Invoke(e);

            GL.Flush();
            SwapBuffers();
        }

        private void Mouse_ButtonDown(object sender, MouseButtonEventArgs e)
        {
            
        }

        private void Keyboard_KeyDown(object sender, KeyboardKeyEventArgs e)
        {
            inputArray[(int)e.Key] = true;
        }

        private void Keyboard_KeyUp(object sender, KeyboardKeyEventArgs e)
        {
            inputArray[(int)e.Key] = false;
        }

        public void AddSceneToStored(string id, Scene pScene)
        {
            //will add the scene to the dictionary if there is no scene using the given ID
            if (scenes.ContainsKey(id))
            {
                throw new Exception("A scene alread uses the id: " + id);
            }
            else
            {
                scenes.Add(id, pScene);
            }
        }

        public void RemoveSceneFromStored(string id)
        {
            if (scenes.ContainsKey(id))
            {
                scenes.Remove(id);
            }
            else
            {
                throw new Exception("No scene exists with the id: " + id);
            }
        }

        public void ChangeSceneFromStored(string id)
        {
            //BUG: (possible) changes to scene are not stored, copies value not object reference, i think
            Scene newScene;
            if (!scenes.TryGetValue(id, out newScene)) {
                throw new Exception("No scene exists with the id: " + id);
            }

            ChangeScene(newScene); //WARNING: persistance of data since a new copy of the class isn't used
        }

        public void SetScene(Scene pScene)
        {
            //BUG: if scene was from dictionary, it will close it rather than placing it back into dictionary
            //being able to define the key means you cant automate a check for scene in dict unless it does use a reference and changes are persistant in dict
            //would have to use the scene name as the key, limits you to one scene of a certain type in the dict at once (should be fine)
            if (scene != null)
            {
                string name = scene.name;
                scene.Close();
                entityManager.RemoveEntities(name);
            } //if not null and not in dict, close

            ChangeScene(pScene);
        }

        private void ChangeScene(Scene pScene)
        {
            scene = pScene;
            entityManager.SetEntities(scene.name);

            // Set the title of the window
            Title = scene.name;
            // Set the Render and Update delegates to the Update and Render methods of this class
            updater = scene.Update;
            renderer = scene.Render;
        }

        public static int WindowWidth
        {
            get { return width; }
        }

        public static int WindowHeight
        {
            get { return height; }
        }

        protected override void OnResize(EventArgs e)
        {
            base.OnResize(e);

            GL.Viewport(ClientRectangle.X, ClientRectangle.Y, ClientRectangle.Width, ClientRectangle.Height);
            SceneManager.width = Width;
            SceneManager.height = Height;

            //Load the GUI
            GUI.SetUpGUI(Width, Height);
        }
    }

}

