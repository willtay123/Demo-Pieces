using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using OpenTK;
using Engine.Systems;
using Engine.Objects;
using Engine.Components;
using Engine.Managers;
using OpenGL_Game.Components;

namespace OpenGL_Game.Systems
{
    public enum GhostAIState
    {
        Chasing,
        Fleeing,
        Dead
    }

    public class SystemGhostAI : ISystem
    {
        const ComponentTypes MASK = (ComponentTypes.COMPONENT_TRANSFORM | ComponentTypes.COMPONENT_AI_GHOST | ComponentTypes.COMPONENT_MOVEMENT);

        EntityManager entityManager;

        GhostAIState state;

        public SystemGhostAI(EntityManager pEntityManager)
        {
            entityManager = pEntityManager;
            state = GhostAIState.Chasing;
        }

        public string Name
        {
            get { return "SystemGhostAI"; }
        }

        public void OnAction(Entity entity)
        {
            if ((entity.Mask & MASK) == MASK) {
                
                ComponentMovement movementComponent = (ComponentMovement)entity.FindComponent(ComponentTypes.COMPONENT_MOVEMENT);
                ComponentAIGhost aiComponent = (ComponentAIGhost)entity.FindComponent(ComponentTypes.COMPONENT_AI_GHOST);

                string targetID = aiComponent.Target;

                //get the target location
                Entity target = entityManager.FindEntity(targetID);

                if (target != null && target.HasComponent(ComponentTypes.COMPONENT_TRANSFORM))
                {
                    ComponentTransform transformComponent = (ComponentTransform)entity.FindComponent(ComponentTypes.COMPONENT_TRANSFORM);
                    ComponentTransform targetTransform = (ComponentTransform)target.FindComponent(ComponentTypes.COMPONENT_TRANSFORM);

                    Vector3 ghostPosition = transformComponent.Position;
                    Vector3 targetPosition = targetTransform.Position;
                    
                    //get direction between entity and target
                    Vector3 direction = targetPosition - ghostPosition;
                    direction.Y = 0;
                    if (direction.Length != 0) { direction.Normalize(); }

                    //set direction to max speed of ghost
                    if (movementComponent.HasMaxSpeed) { direction *= movementComponent.MaxSpeed; }

                    //set velocity
                    if (state == GhostAIState.Chasing)
                    {
                        movementComponent.Velocity = direction;
                    }
                    else if (state == GhostAIState.Fleeing)
                    {
                        movementComponent.Velocity = -direction;
                    }
                    else if (state == GhostAIState.Dead)
                    {
                        //stay still for a time
                        TimeSpan timeSinceDeath = DateTime.Now - aiComponent.DeathTime;

                        if (timeSinceDeath.Seconds >= 5)
                        {
                            state = GhostAIState.Chasing;
                        }
                        else
                        {
                            movementComponent.Velocity = new Vector3(0, 0, 0);
                        }
                    }
                }
                else
                {
                    movementComponent.Velocity = new Vector3(0, 0, 0);
                }
            }
        }
    }
}
