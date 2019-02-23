using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using OpenTK;

namespace Engine.Objects
{
    public class NavNode
    {
        int id;
        Vector3 position;
        float distanceFromStart;
        float distanceToTarget;
        float pathDistance;

        public NavNode(Vector3 pPosition)
        {
            id = NavMap.GenerateID();
            position = pPosition;
        }

        public int ID
        {
            get { return id; }
        }

        public Vector3 Position
        {
            get { return position; }
        }

        public float DistanceFromStart
        {
            get { return distanceFromStart; }
        }

        public float DistanceToTarget
        {
            get { return distanceToTarget; }
        }

        public float PathDistance
        {
            get { return pathDistance; }
        }

        public void SetDistanceTo(Vector3 target)
        {
            Vector3 distanceVector = position - target;
            float distance = Math.Abs(distanceVector.X) + Math.Abs(distanceVector.Z);
            distanceToTarget = distance;
        }
    }
}
