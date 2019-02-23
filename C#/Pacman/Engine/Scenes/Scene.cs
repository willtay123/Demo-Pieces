using OpenTK;
using Engine.Managers;

namespace Engine.Scenes
{
    abstract public class Scene : IScene
    {
        protected SceneManager sceneManager;

        public string name;

        public Scene(SceneManager sceneManager)
        {
            this.sceneManager = sceneManager;
            name = "default";
        }

        public abstract void Render(FrameEventArgs e);

        public abstract void Update(FrameEventArgs e);

        public abstract void Close();
    }
}
