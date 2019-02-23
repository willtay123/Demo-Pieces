//************** Audio ****************
using System;
using System.IO;
using OpenTK.Audio;
using OpenTK.Audio.OpenAL;
//*************************************

using System.Collections.Generic;
using System.Diagnostics;
using OpenTK;
using OpenTK.Graphics.OpenGL;
using OpenTK.Input;
using Engine.Components;
using Engine.Systems;
using Engine.Managers;
using Engine.Objects;
using Engine.Scenes;
using OpenGL_Game.Systems;
using OpenGL_Game.Objects;
using OpenGL_Game.Components;

namespace OpenGL_Game.Scenes
{
    /// <summary>
    /// This is the main type for your game
    /// </summary>
    class GameScene : Scene
    {
        //************** Audio ****************
        Vector3 listenerPosition;
        Vector3 listenerDirection;
        Vector3 listenerUp;
        //*************************************

        Camera camera;
        EntityManager entityManager;
        SystemManager systemManager;

        public static GameScene gameInstance;

        bool freeCam;

        public GameScene(SceneManager sceneManager) : base(sceneManager)
        {
            gameInstance = this;
            entityManager = sceneManager.entityManager;
            systemManager = new SystemManager();

            name = "Game";

            // Set Keyboard events to go to a method in this class
            sceneManager.Keyboard.KeyDown += Keyboard_KeyDown;
            sceneManager.Keyboard.KeyUp += Keyboard_KeyUp;

            camera = Camera.Instance;

            GL.ClearColor(0.0f, 0.0f, 0.0f, 1.0f);
            GL.Enable(EnableCap.DepthTest);
            GL.DepthFunc(DepthFunction.Lequal);
            GL.Enable(EnableCap.CullFace);
            GL.CullFace(CullFaceMode.Back);

            CreateEntities();
            CreateSystems();

            freeCam = false;

            // TODO: Add your initialization logic here

            //************** Audio ****************
            SetupAudio();
            //*************************************
        }

        private void SetupAudio()
        {
            // Setup OpenAL Listener
            listenerPosition = camera.Position;
            listenerDirection = camera.Direction;
            listenerUp = camera.Up;
        }

        public void CreateEntities()
        {
            //Entity newEntity;

            //entities from file
            ObjectFactory.LoadFile("Data/map.xml", entityManager);

            //set the current entities to be used
            entityManager.SetEntities(name);

            camera.Control("Player");
        }

        private void CreateSystems()
        {
            ISystem newSystem;

            //--update
            newSystem = new SystemAudio();
            systemManager.AddUpdateSystem(newSystem);

            newSystem = new SystemLinearMovement();
            systemManager.AddUpdateSystem(newSystem);

            newSystem = new SystemAudio();
            systemManager.AddUpdateSystem(newSystem);

            newSystem = new SystemGhostAI(entityManager);
            systemManager.AddUpdateSystem(newSystem);

            newSystem = new SystemPlayerControl(sceneManager);
            systemManager.AddUpdateSystem(newSystem);

            //--collision
            newSystem = new SystemCollisionDetection();
            systemManager.AddCollisionSystem((SystemCollisionDetection)newSystem);
            newSystem = new SystemCollisionResponse(entityManager);
            systemManager.AddResponseSystem((ISystemCollisionResponse)newSystem);

            //--render
            newSystem = new SystemRender();
            systemManager.AddRenderSystem(newSystem);

            //--final
            newSystem = new SystemMovement();
            systemManager.AddFinalSystem(newSystem);
        }

        /// <summary>
        /// Allows the game to run logic such as updating the world,
        /// checking for collisions, gathering input, and playing audio.
        /// </summary>
        /// <param name="e">Provides a snapshot of timing values.</param>
        public override void Update(FrameEventArgs e)
        {
            if (GamePad.GetState(1).Buttons.Back == ButtonState.Pressed || Keyboard.GetState().IsKeyDown(Key.Escape))
                sceneManager.Exit();

            CheckInput();
            //ai input

            systemManager.ActionUpdateSystems(entityManager);

            //Add your update logic here

            Entity player = entityManager.FindEntity("Player");
            if (player != null)
            {
                ComponentLives playerLivesComponent = (ComponentLives)player.FindComponent(ComponentTypes.COMPONENT_LIVES);

                ComponentScore scoreComp = (ComponentScore)player.FindComponent(ComponentTypes.COMPONENT_SCORE);
                float score = scoreComp.Score;

                if (playerLivesComponent.Lives <= 0)
                { 
                    sceneManager.SetScene(new GameOverScene(sceneManager, score));
                }

                List<Entity> foodList = entityManager.FindEntities("Food_");
                if (foodList.Count == 0)
                {
                    sceneManager.SetScene(new GameOverScene(sceneManager, score));
                }
            }

            //--------------------
            
            systemManager.ActionCollisionSystems(entityManager);

            //final systems must action last
            systemManager.ActionFinalSystems(entityManager);

            //move camera
            camera.Update();
            
            // update OpenAL
            listenerPosition = camera.Position;
            listenerDirection = camera.Direction;
            listenerUp = camera.Up;
            AL.Listener(ALListener3f.Position, ref listenerPosition);
            AL.Listener(ALListenerfv.Orientation, ref listenerDirection, ref listenerUp);
        }

        /// <summary>
        /// This is called when the game should draw itself.
        /// </summary>
        /// <param name="e">Provides a snapshot of timing values.</param>
        public override void Render(FrameEventArgs e)
        {
            GL.Viewport(0, 0, sceneManager.Width, sceneManager.Height);
            GL.Clear(ClearBufferMask.ColorBufferBit | ClearBufferMask.DepthBufferBit);

            systemManager.ActionRenderSystems(entityManager);
        }

        /// <summary>
        /// This is called when the game exits.
        /// </summary>
        public override void Close()
        {
            //remove entities from entity manager
            sceneManager.entityManager.ClearEntities(name);
            camera.Detatch();

            sceneManager.Keyboard.KeyDown -= Keyboard_KeyDown;
            sceneManager.Keyboard.KeyUp -= Keyboard_KeyUp;
        }

        private void CheckInput()
        {
            float dt = SceneManager.dt;

            //height
            if (sceneManager.KeyPressed(Key.Up))    { camera.MoveUp(1f * dt); }
            if (sceneManager.KeyPressed(Key.Down))  { camera.MoveDown(1f * dt); }
            
            //turn
            if (sceneManager.KeyPressed(Key.Left))  { camera.TurnLeft(60f * dt); }
            if (sceneManager.KeyPressed(Key.Right)) { camera.TurnRight(60f * dt); }

            //movement
            if (sceneManager.KeyPressed(Key.W))     { camera.MoveForward(2f * dt); }
            if (sceneManager.KeyPressed(Key.A))     { camera.MoveLeft(2f * dt); }
            if (sceneManager.KeyPressed(Key.S))     { camera.MoveBackward(2f * dt); }
            if (sceneManager.KeyPressed(Key.D))     { camera.MoveRight(2f * dt); }

            //scene change
            if (sceneManager.KeyPressed(Key.Q))     { sceneManager.SetScene(new MainMenuScene(sceneManager)); }
        }

        private void CreateWall()
        {
            Vector3 position = camera.Position;
            Vector3 direction = camera.Direction.Normalized() * 1;
            position += direction;
            Debug.WriteLine("Position: " + position);
            position.X = (float)Math.Floor(position.X + 0.4f);
            position.Y = 1f;
            position.Z = (float)Math.Ceiling(position.Z - 0.4f);

            Entity newWall = new Entity("Wall_");
            newWall.AddComponent(new ComponentTransform(position, new Vector3(1, 1, 1), new Vector3(0, 0, 0)));
            newWall.AddComponent(new ComponentGeometry("Geometry/CubeGeometry.txt"));
            newWall.AddComponent(new ComponentTexture("Textures/wall.png"));
            newWall.AddComponent(new ComponentCollisionBox(new Vector3(-0.5f, -0.5f, -0.5f), new Vector3(0.5f, 0.5f, 0.5f), true));
            entityManager.AddEntityToDictionary(name, newWall);
        }

        private void CreateFood()
        {
            Vector3 position = camera.Position;
            Vector3 direction = camera.Direction.Normalized() * 1;
            position += direction;
            Debug.WriteLine("Position: " + position);
            position.X = (float)Math.Floor(position.X + 0.4f);
            position.Y = 1.5f;
            position.Z = (float)Math.Ceiling(position.Z - 0.4f);

            Entity newFood = new Entity("Food_");
            newFood.AddComponent(new ComponentTransform(position, new Vector3(0.3f, 0.3f, 0.3f), new Vector3(0, 0, 0)));
            newFood.AddComponent(new ComponentGeometry("Geometry/CubeGeometry.txt"));
            newFood.AddComponent(new ComponentTexture("Textures/spaceship.png"));
            newFood.AddComponent(new ComponentCollisionBox(new Vector3(-0.3f, -0.3f, -0.3f), new Vector3(0.3f, 0.3f, 0.3f), false));
            newFood.AddComponent(new ComponentValue(10f));
            entityManager.AddEntityToDictionary(name, newFood);
        }

        public void Keyboard_KeyDown(object sender, KeyboardKeyEventArgs e)
        {
            if (e.Key == Key.B) { CreateFood(); }
            if (e.Key == Key.L) { Debug.WriteLine("Position: " + camera.Position); }

            if (e.Key == Key.C)
            {
                if (freeCam)
                {
                    camera.Control("Player");
                    freeCam = !freeCam;
                }
                else
                {
                    camera.Detatch();
                    freeCam = !freeCam;
                }
            }

            if (e.Key == Key.G)
            {
                List<Entity> ghosts = entityManager.FindEntities("Ghost");

                foreach (Entity ghost in ghosts)
                {
                    ghost.Enabled = !ghost.Enabled;
                }
            }

            if (e.Key == Key.BackSpace)
            {
                ComponentScore scoreComp = (ComponentScore)entityManager.FindEntity("Player").FindComponent(ComponentTypes.COMPONENT_SCORE);
                float score = scoreComp.Score;
                sceneManager.SetScene(new GameOverScene(sceneManager, score));
            }
        }

        public void Keyboard_KeyUp(object sender, KeyboardKeyEventArgs e)
        {
        }

    }
}
