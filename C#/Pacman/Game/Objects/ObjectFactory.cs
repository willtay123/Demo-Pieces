using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Diagnostics;
using System.IO;
using System.Xml;
using OpenTK;
using Engine.Managers;
using Engine.Components;
using Engine.Objects;
using OpenGL_Game.Components;

namespace OpenGL_Game.Objects
{
    public static class ObjectFactory
    {

        public static bool SaveFile(string key, string filename, EntityManager entityManager)
        {
            bool success = false;

            try
            {
                XmlDocument file = new XmlDocument();
                XmlNode rootNode = file.CreateElement(key);

                List<Entity> entities = entityManager.Entities();

                List<Entity> walls = new List<Entity>();

                foreach (Entity entity in entities)
                {
                    string name = entity.Name;

                    if (name.StartsWith("Wall"))
                    {
                        walls.Add(entity);
                    }
                    else
                    {
                        //save entity
                        XmlNode entityNode = SaveEntity(file, entity);
                        rootNode.AppendChild(entityNode);
                    }
                }


                XmlNode wallsSharedNode = SaveWalls(file, walls);

                rootNode.AppendChild(wallsSharedNode);


                file.AppendChild(rootNode);
                file.Save(filename);
                success = true;
            }
            catch(Exception e)
            {
                Debug.WriteLine(e);
            }

            return success;
        }

        private static XmlNode SaveEntity(XmlDocument file, Entity entity)
        {
            XmlNode entityNode = file.CreateElement("Entity");

            //id
            XmlNode idNode = file.CreateElement("ID");
            string name = entity.Name;
            idNode.InnerText = name;

            //components
            XmlNode componentsNode = file.CreateElement("Components");
            entityNode.AppendChild(componentsNode);
            List<IComponent> components = entity.Components;

            foreach (IComponent component in components)
            {
                XmlNode componentNode = SaveComponent(file, component);
                componentsNode.AppendChild(componentNode);
            }

            return entityNode;
        }

        private static XmlNode SaveComponent(XmlDocument file, IComponent component)
        {
            ComponentTypes type = component.ComponentType;

            XmlNode componentNode;

            switch (type)
            {
                case ComponentTypes.COMPONENT_TRANSFORM:
                    componentNode = SaveComponentTransform(file, (ComponentTransform)component);
                    break;
                case ComponentTypes.COMPONENT_GEOMETRY:
                    componentNode = SaveComponentGeometry(file, (ComponentGeometry)component);
                    break;
                case ComponentTypes.COMPONENT_TEXTURE:
                    componentNode = SaveComponentTexture(file, (ComponentTexture)component);
                    break;
                case ComponentTypes.COMPONENT_COLLISION_BOX:
                    componentNode = SaveComponentCollisionBox(file, (ComponentCollisionBox)component);
                    break;
                default:
                    return null;
            }

            return componentNode;
        }

        private static XmlNode SaveWalls(XmlDocument file, List<Entity> walls)
        {
            XmlNode sharedNode = file.CreateElement("Shared");
            XmlNode sharedComponentsNode = file.CreateElement("Components");

            sharedNode.AppendChild(sharedComponentsNode);

            //shared components
            XmlNode geometry = file.CreateElement("Geometry");
            XmlNode geometryPath = file.CreateElement("path");
            geometryPath.InnerText = "Geometry/CubeGeometry.txt";
            geometry.AppendChild(geometryPath);
            sharedComponentsNode.AppendChild(geometry);

            XmlNode texture = file.CreateElement("Texture");
            XmlNode texturePath = file.CreateElement("path");
            texturePath.InnerText = "Textures/wall.png";
            texture.AppendChild(texturePath);
            sharedComponentsNode.AppendChild(texture);

            XmlNode collisionBox = file.CreateElement("CollisionBox");
            XmlNode point1 = file.CreateElement("point1");
            XmlNode point2 = file.CreateElement("point2");
            XmlNode x = file.CreateElement("x");
            XmlNode y = file.CreateElement("y");
            XmlNode z = file.CreateElement("z");
            x.InnerText = "-0.5";
            y.InnerText = "-0.5";
            z.InnerText = "-0.5";
            point1.AppendChild(x);
            point1.AppendChild(y);
            point1.AppendChild(z);
            x = file.CreateElement("x");
            y = file.CreateElement("y");
            z = file.CreateElement("z");
            x.InnerText = "0.5";
            y.InnerText = "0.5";
            z.InnerText = "0.5";
            point2.AppendChild(x);
            point2.AppendChild(y);
            point2.AppendChild(z);
            collisionBox.AppendChild(point1);
            collisionBox.AppendChild(point2);
            sharedComponentsNode.AppendChild(collisionBox);

            //int idNumber = 1;

            foreach (Entity wall in walls)
            {
                //turn id into a node
                XmlNode idNode = file.CreateElement("ID");
                string id = wall.Name;//"Wall_" + idNumber;
                //idNumber += 1;
                idNode.InnerText = id;

                XmlNode componentsNode = file.CreateElement("Components");

                //turn transform component into xml
                ComponentTransform transformComponent = (ComponentTransform)wall.FindComponent(ComponentTypes.COMPONENT_TRANSFORM);
                XmlNode transformNode = SaveComponentTransform(file, transformComponent);
                componentsNode.AppendChild(transformNode);

                //add nodes to an entity node
                XmlNode entityNode = file.CreateElement("Entity");
                entityNode.AppendChild(idNode);
                entityNode.AppendChild(componentsNode);

                //add entity node to sharedNode
                sharedNode.AppendChild(entityNode);
            }

            return sharedNode;
        }

        private static XmlNode SaveComponentTransform(XmlDocument file, ComponentTransform component)
        {
            XmlNode transformNode = file.CreateElement("Transform");

            //position
            Vector3 position = component.Position;

            XmlNode posXNode = file.CreateElement("posX");
            posXNode.InnerText = position.X.ToString();
            transformNode.AppendChild(posXNode);

            XmlNode posYNode = file.CreateElement("posY");
            posYNode.InnerText = position.Y.ToString();
            transformNode.AppendChild(posYNode);

            XmlNode posZNode = file.CreateElement("posZ");
            posZNode.InnerText = position.Z.ToString();
            transformNode.AppendChild(posZNode);

            //scale
            Vector3 scale = component.Scale;

            XmlNode scaleXNode = file.CreateElement("scaleX");
            scaleXNode.InnerText = scale.X.ToString();
            transformNode.AppendChild(scaleXNode);

            XmlNode scaleYNode = file.CreateElement("scaleY");
            scaleYNode.InnerText = scale.Y.ToString();
            transformNode.AppendChild(scaleYNode);

            XmlNode scaleZNode = file.CreateElement("scaleZ");
            scaleZNode.InnerText = scale.Z.ToString();
            transformNode.AppendChild(scaleZNode);

            //rotation
            Vector3 rotation = component.Rotation;

            XmlNode rotXNode = file.CreateElement("rotX");
            rotXNode.InnerText = rotation.Z.ToString();
            transformNode.AppendChild(rotXNode);

            XmlNode rotYNode = file.CreateElement("rotZ");
            rotYNode.InnerText = rotation.Z.ToString();
            transformNode.AppendChild(rotYNode);

            XmlNode rotZNode = file.CreateElement("rotZ");
            rotZNode.InnerText = rotation.Z.ToString();
            transformNode.AppendChild(rotZNode);


            return transformNode;
        }

        private static XmlNode SaveComponentGeometry(XmlDocument file, ComponentGeometry component)
        {
            XmlNode componentNode = file.CreateElement("Geometry");
            return null;
        }

        private static XmlNode SaveComponentTexture(XmlDocument file, ComponentTexture component)
        {
            return null;
        }

        private static XmlNode SaveComponentCollisionBox(XmlDocument file, ComponentCollisionBox component)
        {
            XmlNode collisionBoxNode = file.CreateElement("CollisionBox");

            //point1
            Vector3 point1 = component.Point1;
            XmlNode point1Node = file.CreateElement("point1");
            collisionBoxNode.AppendChild(point1Node);

            XmlNode xNode = file.CreateElement("x");
            xNode.InnerText = point1.X.ToString();
            point1Node.AppendChild(xNode);

            XmlNode yNode = file.CreateElement("y");
            yNode.InnerText = point1.Y.ToString();
            point1Node.AppendChild(yNode);

            XmlNode zNode = file.CreateElement("z");
            zNode.InnerText = point1.Z.ToString();
            point1Node.AppendChild(zNode);

            //point2
            Vector3 point2 = component.Point2;
            XmlNode point2Node = file.CreateElement("point1");
            collisionBoxNode.AppendChild(point2Node);

            xNode = file.CreateElement("x");
            xNode.InnerText = point2.X.ToString();
            point2Node.AppendChild(xNode);

            yNode = file.CreateElement("y");
            yNode.InnerText = point2.Y.ToString();
            point2Node.AppendChild(yNode);

            zNode = file.CreateElement("z");
            zNode.InnerText = point2.Z.ToString();
            point2Node.AppendChild(zNode);


            return collisionBoxNode;
        }

        private static XmlNode SaveWall(XmlDocument file, Entity wall)
        {
            return null;
        }

        public static bool LoadFile(string filename, EntityManager entityManager)
        {
            bool success = false;

            try
            {
                XmlDocument file = new XmlDocument();
                file.Load(filename);

                XmlNode topNode = file.FirstChild;

                for (int i = 0; i < topNode.ChildNodes.Count; i += 1)
                {
                    XmlNode child = topNode.ChildNodes[i];
                    
                    if (child.Name == "Shared")
                    {
                        LoadShared(topNode.Name, child, entityManager);
                    }
                    else if (child.Name == "Entity")
                    {
                        Entity entity = LoadEntity(child);
                        entityManager.AddEntityToDictionary(topNode.Name, entity);
                    }
                }
            }
            catch(Exception e)
            {
                //load failed
                Debug.WriteLine(e);
            }

            return success;
        }

        static void LoadShared(string name, XmlNode node, EntityManager entityManager)
        {
            XmlNode sharedComponentsNode = node.FirstChild;
            List<IComponent> sharedComponents = new List<IComponent>();
            //load shared components for use
            for (int j = 0; j < sharedComponentsNode.ChildNodes.Count; j += 1)
            {
                XmlNode sharedComponentNode = sharedComponentsNode.ChildNodes[j];
                IComponent newComponent = LoadComponent(sharedComponentNode);

                if (newComponent != null)
                {
                    sharedComponents.Add(newComponent);
                }
            }

            //create the new entities
            for (int i = 1; i < node.ChildNodes.Count; i += 1) //for all the entities
            {
                XmlNode entityNode = node.ChildNodes[i];

                string id = entityNode.FirstChild.InnerText;
                Entity newEntity = new Entity(id);

                //add all of the shared components to the entity BUG: not a new instance of the object, same object reference added to all
                for (int j = 0; j < sharedComponents.Count; j += 1)
                {
                    newEntity.AddComponent(sharedComponents[j].Copy());
                }

                //load the unique components and add them to the entity
                XmlNode componentsNode = entityNode.FirstChild.NextSibling;
                for (int j = 0; j < componentsNode.ChildNodes.Count; j += 1)
                {
                    //pointing wrong place
                    XmlNode componentNode = componentsNode.ChildNodes[j];
                    IComponent newComponent = LoadComponent(componentNode);

                    newEntity.AddComponent(newComponent);
                }

                entityManager.AddEntityToDictionary(name, newEntity);
            }
        }

        static Entity LoadEntity(XmlNode node)
        {
            string id = node.FirstChild.InnerText;

            Entity entity = new Entity(id);

            XmlNode components = node.FirstChild.NextSibling;

            for (int i = 0; i < components.ChildNodes.Count; i += 1)
            {
                XmlNode child = components.ChildNodes[i];

                IComponent component = LoadComponent(child);
                entity.AddComponent(component);
            }

            return entity;
        }

        static IComponent LoadComponent(XmlNode node)
        {
            IComponent component;
            string nodeType = node.Name;

            switch (nodeType)
            {
                case "Transform":
                    component = LoadComponentTransform(node);
                    break;
                case "Geometry":
                    component = LoadComponentGeometry(node);
                    break;
                case "Texture":
                    component = LoadComponentTexture(node);
                    break;
                case "CollisionBox":
                    component = LoadComponentCollisionBox(node);
                    break;
                case "Movement":
                    component = LoadComponentMovement(node);
                    break;
                case "PlayerControl":
                    component = LoadComponentPlayerControl(node);
                    break;
                case "Score":
                    component = LoadComponentScore(node);
                    break;
                case "Value":
                    component = LoadComponentValue(node);
                    break;
                case "Lives":
                    component = LoadComponentLives(node);
                    break;
                case "Audio":
                    component = LoadComponentAudio(node);
                    break;
                case "AIGhost":
                    component = LoadComponentAIGhost(node);
                    break;
                default:
                    return null;
            }

            return component;
        }

        static ComponentTransform LoadComponentTransform(XmlNode node)
        {
            //position
            float posX = float.Parse(node.ChildNodes[0].InnerText);
            float posY = float.Parse(node.ChildNodes[1].InnerText);
            float posZ = float.Parse(node.ChildNodes[2].InnerText);
            Vector3 position = new Vector3(posX, posY, posZ);
            
            //scale
            float scaleX = float.Parse(node.ChildNodes[3].InnerText);
            float scaleY = float.Parse(node.ChildNodes[4].InnerText);
            float scaleZ = float.Parse(node.ChildNodes[5].InnerText);
            Vector3 scale = new Vector3(scaleX, scaleY, scaleZ);

            //rotation
            float rotationX = float.Parse(node.ChildNodes[6].InnerText);
            float rotationY = float.Parse(node.ChildNodes[7].InnerText);
            float rotationZ = float.Parse(node.ChildNodes[8].InnerText);
            Vector3 rotation = new Vector3(rotationX, rotationY, rotationZ);

            return new ComponentTransform(position, scale, rotation);
        }

        static ComponentGeometry LoadComponentGeometry(XmlNode node)
        {
            string path = node.FirstChild.InnerText;

            return new ComponentGeometry(path);
        }

        static ComponentTexture LoadComponentTexture(XmlNode node)
        {
            string path = node.FirstChild.InnerText;

            return new ComponentTexture(path);
        }

        static ComponentCollisionBox LoadComponentCollisionBox(XmlNode node)
        {
            XmlNode point1Node = node.FirstChild;
            float x = float.Parse(point1Node.ChildNodes[0].InnerText);
            float y = float.Parse(point1Node.ChildNodes[1].InnerText);
            float z = float.Parse(point1Node.ChildNodes[2].InnerText);
            Vector3 point1 = new Vector3(x, y, z);

            XmlNode point2Node = node.FirstChild.NextSibling;
            x = float.Parse(point2Node.ChildNodes[0].InnerText);
            y = float.Parse(point2Node.ChildNodes[1].InnerText);
            z = float.Parse(point2Node.ChildNodes[2].InnerText);
            Vector3 point2 = new Vector3(x, y, z);

            return new ComponentCollisionBox(point1, point2, true);
        }

        static ComponentMovement LoadComponentMovement(XmlNode node)
        {
            XmlNode maxSpeedNode = node.FirstChild;
            float maxSpeed = float.Parse(maxSpeedNode.InnerText);

            return new ComponentMovement(maxSpeed);
        }

        static ComponentPlayerControl LoadComponentPlayerControl(XmlNode node)
        {
            XmlNode enabledNode = node.FirstChild;
            bool enabled = bool.Parse(enabledNode.InnerText);

            return new ComponentPlayerControl(enabled);
        }

        static ComponentScore LoadComponentScore(XmlNode node)
        {
            return new ComponentScore();
        }

        static ComponentValue LoadComponentValue(XmlNode node)
        {
            XmlNode valueNode = node.FirstChild;
            float value = float.Parse(valueNode.InnerText);

            return new ComponentValue(value);
        }

        static ComponentAIGhost LoadComponentAIGhost(XmlNode node)
        {
            XmlNode targetNode = node.FirstChild;
            string target = targetNode.InnerText;

            return new ComponentAIGhost(target);
        }

        static ComponentLives LoadComponentLives(XmlNode node)
        {
            XmlNode lifeCountNode = node.FirstChild;
            int lifeCount = Int32.Parse(lifeCountNode.InnerText);

            return new ComponentLives(lifeCount);
        }

        static ComponentAudio LoadComponentAudio(XmlNode node)
        {
            XmlNode pathNode = node.FirstChild;
            XmlNode isTypeIntervalNode = pathNode.NextSibling;
            XmlNode intervalNode = isTypeIntervalNode.NextSibling;

            string path = pathNode.InnerText;
            bool isTypeInterval = bool.Parse(isTypeIntervalNode.InnerText);
            float interval = float.Parse(intervalNode.InnerText);

            return new ComponentAudio(path, isTypeInterval, interval);
        }
    }
}
