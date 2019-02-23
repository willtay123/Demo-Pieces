using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Diagnostics;
using Engine.Objects;

namespace Engine.Managers
{
    public class EntityManager
    {
        public static EntityManager Instance;
        List<Entity> entityList;
        Dictionary<string, List<Entity>> entityDictionary;

        public EntityManager()
        {
            Instance = this;
            entityList = new List<Entity>();
            entityDictionary = new Dictionary<string, List<Entity>>();
        }

        public void AddEntity(Entity entity)
        {
            Entity result = FindEntity(entity.Name);
            //Debug.Assert(result != null, "Entity '" + entity.Name + "' already exists");
            entityList.Add(entity);
        }

        public void AddEntityToDictionary(string key, Entity entity)
        {
            List<Entity> entities;

            if (entityDictionary.TryGetValue(key, out entities))
            {
                entities.Add(entity);
            }
            else
            {
                entities = new List<Entity>();
                entities.Add(entity);
                entityDictionary.Add(key, entities);
            }
        }

        public Entity FindEntity(string name)
        {
            return entityList.Find(delegate(Entity e)
                {
                    return e.Name == name;
                }
            );
        }

        public List<Entity> FindEntities(string nameStart)
        {
            return entityList.FindAll(delegate (Entity e)
            {
                return e.Name.StartsWith(nameStart);
            }
            );
        }

        public List<Entity> Entities()
        {
            return entityList;
        }

        public void RemoveEntity(string name)
        {

        }

        public void RemoveEntities(string name)
        {
            if (entityDictionary.ContainsKey(name))
            {
                entityDictionary.Remove(name);
            }
        }

        public void ClearEntities(string key)
        {
            List<Entity> entities;
            if (entityDictionary.TryGetValue(key, out entities))
            {
                entities.Clear();
            }
        }

        public void SetEntities(string key)
        {
            List<Entity> entities;
            if (entityDictionary.TryGetValue(key, out entities))
            {
                entityList = entities;
            }
        }
    }
}
