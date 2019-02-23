using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using OpenTK;

namespace Engine.Objects
{
    public struct NavLink
    {
        public int node1;
        public int node2;
        public float length;
    }

    public class NavMap
    {
        List<NavNode> nodes;
        List<NavLink> nodeLinks;
        static int idGen;

        public NavMap()
        {
            nodes = new List<NavNode>();
            nodeLinks = new List<NavLink>();
            idGen = 0;
        }

        public void AddNode(Vector3 position)
        {
            NavNode node = new NavNode(position);
            nodes.Add(node);
        }

        public void AddNode(NavNode node)
        {
            nodes.Add(node);
        }

        public void AddLink(int id1, int id2)
        {
            NavNode node1 = FindNodeByID(id1);
            NavNode node2 = FindNodeByID(id2);

            Vector3 distance = node1.Position - node2.Position;

            NavLink link = new NavLink
            {
                node1 = id1,
                node2 = id2,
                length = distance.Length
            };

            nodeLinks.Add(link);
        }

        public NavNode FindNodeByID(int id)
        {
            return nodes.Find(delegate (NavNode e) { return e.ID == id; });
        }

        public List<NavNode> FindNeighbours(int id)
        {
            List<NavNode> neighbours = new List<NavNode>();

            return neighbours;
        }

        public int NearestNode(Vector3 pPosition)
        {
            //WARNING: crashes if no nodes
            int bestNode = nodes[0].ID;
            Vector3 dist = pPosition - nodes[0].Position;
            float bestDistance = Math.Abs(dist.X) + Math.Abs(dist.Z);

            for (int i = 1; i < nodes.Count; i += 1)
            {
                int currentNode = nodes[i].ID;
                dist = pPosition - nodes[i].Position;
                float currentDistance = Math.Abs(dist.X) + Math.Abs(dist.Z);

                if (currentDistance < bestDistance)
                {
                    bestNode = currentNode;
                    bestDistance = currentDistance;
                }
            }

            return bestNode;
        }

        public List<NavNode> Navigate(int startID, int targetID)
        {
            List<NavNode> route = new List<NavNode>();

            //A* to find fastest route between 2 nodes
            List<NavNode> openList = new List<NavNode>();
            List<NavNode> closedList = new List<NavNode>();

            NavNode startNode = FindNodeByID(startID);
            NavNode targetNode = FindNodeByID(targetID);

            foreach (NavNode node in nodes)
            {
                node.SetDistanceTo(targetNode.Position);
            }

            openList.Add(startNode);

            do
            {
                //node with lowest pathDistance
                NavNode bestPathNode = openList[0];
                float smallestPath = openList[0].PathDistance;

                for (int i = 1; i < openList.Count; i += 1)
                {
                    NavNode currentOpen = openList[i];
                    float currentPath = currentOpen.PathDistance;

                    if (currentPath < smallestPath)
                    {
                        bestPathNode = currentOpen;
                        smallestPath = currentPath;
                    }
                }
                NavNode currentNode = bestPathNode;
                

                closedList.Add(currentNode);
                openList.Remove(currentNode);

                if (closedList.Contains(targetNode)) {
                    //found path
                    break;
                }

                List<NavNode> neighbours = FindNeighbours(currentNode.ID);

                foreach (NavNode neighbour in neighbours)
                {
                    if (closedList.Contains(neighbour))
                    {
                        //ignore
                        continue;
                    }

                    if (!openList.Contains(neighbour))
                    {
                        //work out the score
                        openList.Add(neighbour);
                    }
                    else
                    {
                        //if using G gives better F, better route found
                    }
                }
            } while (openList.Count > 0);

            return route;
        }

        public static int GenerateID()
        {
            return idGen++;
        }
    }
}
