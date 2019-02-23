using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using OpenTK;

namespace Engine.Components
{
    public class ComponentMovement : IComponent
    {
        //WARNING: defining component with blank desired location could move it to origin on first update call
        Vector3 acceleration;
        Vector3 velocity;
        Vector3 desiredLocation;
        bool hasMaxSpeed;
        float maxSpeed;

        public ComponentMovement()
        {
            acceleration = new Vector3(0, 0, 0);
            velocity = new Vector3(0, 0, 0);
            desiredLocation = new Vector3(0, 0, 0);
            hasMaxSpeed = false;
            maxSpeed = 0;
        }

        public ComponentMovement(Vector3 acc, Vector3 vel)
        {
            acceleration = acc;
            velocity = vel;
            desiredLocation = new Vector3(0, 0, 0);
            hasMaxSpeed = false;
            maxSpeed = 0;
        }

        public ComponentMovement(float pMaxSpeed)
        {
            acceleration = new Vector3(0, 0, 0);
            velocity = new Vector3(0, 0, 0);
            desiredLocation = new Vector3(0, 0, 0);
            hasMaxSpeed = true;
            maxSpeed = pMaxSpeed;
        }

        public Vector3 Acceleration
        {
            get { return acceleration; }
            set { acceleration = value; }
        }

        public Vector3 Velocity
        {
            get { return velocity; }
            set { velocity = value; }
        }

        public Vector3 DesiredLocation
        {
            get { return desiredLocation; }
            set { desiredLocation = value; }
        }

        public bool HasMaxSpeed
        {
            get { return hasMaxSpeed; }
            set { hasMaxSpeed = value; }
        }

        public float MaxSpeed
        {
            get { return maxSpeed; }
            set { maxSpeed = value; }
        }

        public ComponentTypes ComponentType
        {
            get { return ComponentTypes.COMPONENT_MOVEMENT; }
        }

        public IComponent Copy()
        {
            return new ComponentMovement(acceleration, velocity);
        }
    }
}
