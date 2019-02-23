using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Diagnostics;
using OpenTK;
using OpenTK.Audio.OpenAL;
using Engine.Systems;
using Engine.Components;
using Engine.Objects;
using Engine.Managers;

namespace OpenGL_Game.Systems
{
    public class SystemCollisionResponse : ISystemCollisionResponse
    {
        EntityManager entityManager;

        public SystemCollisionResponse(EntityManager pEntityManager)
        {
            entityManager = pEntityManager;
        }

        public string Name
        {
            get { return "SystemCollisionDetection"; }
        }

        public void OnAction(Entity entity)
        {

        }

        public void Respond(List<Collision> collisions)
        {
            foreach (Collision collision in collisions)
            {
                if (collision.collider1.Name == "Player" && collision.collider2.Name.StartsWith("Wall"))
                {
                    RespondCreatureWall(collision.collider1, collision.collider2);
                }
                else if (collision.collider1.Name.StartsWith("Wall") && collision.collider2.Name == ("Player"))
                {
                    RespondCreatureWall(collision.collider2, collision.collider1);
                }
                else if (collision.collider1.Name.StartsWith("Ghost") && collision.collider2.Name.StartsWith("Wall"))
                {
                    RespondCreatureWall(collision.collider1, collision.collider2);
                }
                else if (collision.collider1.Name.StartsWith("Wall") && collision.collider2.Name.StartsWith("Ghost"))
                {
                    RespondCreatureWall(collision.collider2, collision.collider1);
                }
                else if (collision.collider1.Name == "Player" && collision.collider2.Name.StartsWith("Ghost"))
                {
                    RespondPlayerGhost(collision.collider1, collision.collider2);
                }
                else if (collision.collider1.Name.StartsWith("Ghost") && collision.collider2.Name == "Player")
                {
                    RespondPlayerGhost(collision.collider2, collision.collider1);
                }
                else if (collision.collider1.Name == "Player" && collision.collider2.Name.StartsWith("Food"))
                {
                    //player food
                    RespondPlayerFood(collision.collider1, collision.collider2);
                }
                else if (collision.collider1.Name.StartsWith("Food") && collision.collider2.Name == "Player")
                {
                    //food player
                    RespondPlayerFood(collision.collider2, collision.collider1);
                }
                else if (collision.collider1.Name == "Player" && collision.collider2.Name.StartsWith("Powerup"))
                {
                    //player food
                    RespondPlayerPowerup(collision.collider1, collision.collider2);
                }
                else if (collision.collider1.Name.StartsWith("Powerup") && collision.collider2.Name == "Player")
                {
                    //food player
                    RespondPlayerPowerup(collision.collider2, collision.collider1);
                }
            }
        }

        private void RespondCreatureWall(Entity creature, Entity wall)
        {
            //dont allow them to move
            //Debug.WriteLine("collsion between creature and wall");

            ComponentTransform transformComponent = (ComponentTransform)creature.FindComponent(ComponentTypes.COMPONENT_TRANSFORM);
            Vector3 position = transformComponent.Position;

            ComponentMovement movementComponent = (ComponentMovement)creature.FindComponent(ComponentTypes.COMPONENT_MOVEMENT);
            Vector3 desiredLocation = movementComponent.DesiredLocation;

            movementComponent.DesiredLocation = position;
        }

        private void RespondPlayerGhost(Entity player, Entity ghost)
        {
            //Debug.WriteLine("collision between player and ghost");

            //if ghost is chasing
            {
                //play ghost sound
                ComponentTransform ghostTransform = (ComponentTransform)ghost.FindComponent(ComponentTypes.COMPONENT_TRANSFORM);
                ComponentAudio ghostAudio = (ComponentAudio)ghost.FindComponent(ComponentTypes.COMPONENT_AUDIO);

                Vector3 emitterPosition = (ghostTransform).Position;
                int source = (ghostAudio).Source;

                AL.Source(source, ALSource3f.Position, ref emitterPosition);

                ghostAudio.Play();

                //kill player
                ComponentLives livesComponent = (ComponentLives)player.FindComponent(ComponentTypes.COMPONENT_LIVES);
                livesComponent.Lives -= 1;

                ComponentTransform transformComponent = (ComponentTransform)player.FindComponent(ComponentTypes.COMPONENT_TRANSFORM);
                transformComponent.Position = new Vector3(0, 1, 2);
                ComponentMovement movementComponent = (ComponentMovement)player.FindComponent(ComponentTypes.COMPONENT_MOVEMENT);
                movementComponent.DesiredLocation = new Vector3(0, 1, 2);
            }
            //else if ghost is fleeing
            //kill ghost
            //add 100 points to player
        }

        private void RespondPlayerFood(Entity player, Entity food)
        {
            //play food sound
            ComponentTransform foodTransform = (ComponentTransform)food.FindComponent(ComponentTypes.COMPONENT_TRANSFORM);
            ComponentAudio foodAudio = (ComponentAudio)food.FindComponent(ComponentTypes.COMPONENT_AUDIO);

            Vector3 emitterPosition = (foodTransform).Position;
            int source = (foodAudio).Source;

            AL.Source(source, ALSource3f.Position, ref emitterPosition);

            foodAudio.Play();

            //increase the score
            ComponentScore scoreComponent = (ComponentScore)player.FindComponent(ComponentTypes.COMPONENT_SCORE);
            float score = scoreComponent.Score;

            ComponentValue valueComponent = (ComponentValue)food.FindComponent(ComponentTypes.COMPONENT_VALUE);
            float value = valueComponent.Value;

            score += value;

            scoreComponent.Score = score;
            food.Enabled = false;
        }

        private void RespondPlayerPowerup(Entity player, Entity food)
        {
            ComponentScore scoreComponent = (ComponentScore)player.FindComponent(ComponentTypes.COMPONENT_SCORE);
            float score = scoreComponent.Score;

            ComponentValue valueComponent = (ComponentValue)food.FindComponent(ComponentTypes.COMPONENT_VALUE);
            float value = valueComponent.Value;

            score += value;

            //change AI state
            //done through the AI system

            scoreComponent.Score = score;
            food.Enabled = false;
        }
    }
}
