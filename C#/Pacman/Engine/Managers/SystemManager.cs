using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Diagnostics;
using Engine.Systems;
using Engine.Objects;

namespace Engine.Managers
{
    public class SystemManager
    {
        List<ISystem> updateSystemList = new List<ISystem>();
        List<ISystem> renderSystemList = new List<ISystem>();
        SystemCollisionDetection collisionDetectionSystem;
        ISystemCollisionResponse collisionResponseSystem;
        List<ISystem> finalSystemList = new List<ISystem>();

        public SystemManager()
        {
        }

        public void ActionUpdateSystems(EntityManager entityManager)
        {
            List<Entity> entityList = entityManager.Entities();
            foreach(ISystem system in updateSystemList)
            {
                foreach(Entity entity in entityList)
                {
                    if (entity.Enabled)
                    {
                        system.OnAction(entity);
                    }
                }
            }
        }

        public void ActionRenderSystems(EntityManager entityManager)
        {
            List<Entity> entityList = entityManager.Entities();
            foreach (ISystem system in renderSystemList)
            {
                foreach (Entity entity in entityList)
                {
                    if (entity.Enabled)
                    {
                        system.OnAction(entity);
                    }
                }
            }
        }

        public void ActionCollisionSystems(EntityManager entityManager)
        {
            if (collisionDetectionSystem != null && collisionResponseSystem != null)
            {
                List<Entity> entityList = entityManager.Entities();
                collisionDetectionSystem.ClearCollisions();

                //detect collisions
                for (int i = 0; i < entityList.Count; i += 1)
                {
                    Entity entity1 = entityList[i];
                    if (!entity1.Enabled) { continue; }
                    collisionDetectionSystem.SetCollider(entity1);

                    for (int j = i + 1; j < entityList.Count; j += 1)
                    {
                        Entity entity2 = entityList[j];
                        if (!entity2.Enabled) { continue; }

                        collisionDetectionSystem.OnAction(entity2);
                    }
                }

                //respond to collisions
                List<Collision> collisions = collisionDetectionSystem.Collisions;
                collisionResponseSystem.Respond(collisions);
            }
            else
            {
                Debug.WriteLine("ERROR: 'collision' or 'response' system missing");
            }
        }

        public void ActionFinalSystems(EntityManager entityManager)
        {
            List<Entity> entityList = entityManager.Entities();
            foreach (ISystem system in finalSystemList)
            {
                foreach (Entity entity in entityList)
                {
                    if (entity.Enabled)
                    {
                        system.OnAction(entity);
                    }
                }
            }
        }

        public void AddUpdateSystem(ISystem system)
        {
            updateSystemList.Add(system);
        }

        public void AddRenderSystem(ISystem system)
        {
            renderSystemList.Add(system);
        }

        public void AddCollisionSystem(SystemCollisionDetection system)
        {
            collisionDetectionSystem = system;
        }

        public void AddResponseSystem(ISystemCollisionResponse system)
        {
            collisionResponseSystem = system;
        }

        public void AddFinalSystem(ISystem system)
        {
            finalSystemList.Add(system);
        }

        private ISystem FindUpdateSystem(string name)
        {
            return updateSystemList.Find(delegate(ISystem system)
            {
                return system.Name == name;
            }
            );
        }

        private ISystem FindRenderSystem(string name)
        {
            return updateSystemList.Find(delegate (ISystem system)
            {
                return system.Name == name;
            }
            );
        }

        private SystemCollisionDetection FindCollisionSystem()
        {
            if (collisionDetectionSystem != null)
            {
                return collisionDetectionSystem;
            }
            else
            {
                return null;
            }
        }
    }
}
