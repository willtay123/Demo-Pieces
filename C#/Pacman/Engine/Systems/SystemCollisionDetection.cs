using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Diagnostics;
using OpenTK;
using Engine.Components;
using Engine.Objects;

namespace Engine.Systems
{
    public struct Collision
    {
        public Entity collider1;
        public Entity collider2;
    }

    public class SystemCollisionDetection : ISystem
    {
        const ComponentTypes maskCircle = (ComponentTypes.COMPONENT_TRANSFORM | ComponentTypes.COMPONENT_COLLISION_CIRCLE);
        const ComponentTypes maskSquare = (ComponentTypes.COMPONENT_TRANSFORM | ComponentTypes.COMPONENT_COLLISION_BOX);
        Entity collider;
        List<Collision> collisionList;

        public SystemCollisionDetection()
        {
            collisionList = new List<Collision>();
        }

        public string Name
        {
            get { return "SystemCollisionDetection"; }
        }

        public List<Collision> Collisions
        {
            get { return collisionList; }
        }

        public void SetCollider(Entity entity)
        {
            collider = entity;
        }

        public void ClearCollisions()
        {
            collisionList.Clear();
        }

        public void OnAction(Entity entity)
        {
            if ((collider.Mask & maskCircle) == maskCircle && (entity.Mask & maskCircle) == maskCircle ||
                (entity.Mask & maskCircle) == maskCircle && (collider.Mask & maskCircle) == maskCircle)
            {
                if (CircleCircleCheck(collider, entity))
                {
                    Collision collided = new Collision { collider1 = collider, collider2 = entity };
                    collisionList.Add(collided);
                }
            }

            if ((collider.Mask & maskCircle) == maskCircle && (entity.Mask & maskSquare) == maskSquare ||
                (entity.Mask & maskCircle) == maskCircle && (collider.Mask & maskSquare) == maskSquare)
            {
                if (CircleSquareCheck(collider, entity))
                {
                    Collision collided = new Collision { collider1 = collider, collider2 = entity };
                    collisionList.Add(collided);
                }
            }

            if ((collider.Mask & maskSquare) == maskSquare && (entity.Mask & maskSquare) == maskSquare ||
                (entity.Mask & maskSquare) == maskSquare && (collider.Mask & maskSquare) == maskSquare)
            {
                if (SquareSquareCheck(collider, entity))
                {
                    Collision collided = new Collision {
                        collider1 = collider,
                        collider2 = entity
                    };
                    collisionList.Add(collided);
                }
            }
        }

        private Vector3 GetPosition(Entity entity)
        {
            Vector3 position;

            if (entity.HasComponent(ComponentTypes.COMPONENT_MOVEMENT))
            {
                ComponentMovement movementComponent = (ComponentMovement)entity.FindComponent(ComponentTypes.COMPONENT_MOVEMENT);
                position = movementComponent.DesiredLocation;
            }
            else
            {
                ComponentTransform transformComponent = (ComponentTransform)entity.FindComponent(ComponentTypes.COMPONENT_TRANSFORM);
                position = transformComponent.Position;
            }

            return position;
        }

        private Matrix4 GetTransform(Entity entity, bool shouldScale)
        {
            Matrix4 transformMatrix;

            ComponentTransform transformComponent = (ComponentTransform)entity.FindComponent(ComponentTypes.COMPONENT_TRANSFORM);

            Matrix4 translationMatrix;
            if (entity.HasComponent(ComponentTypes.COMPONENT_MOVEMENT))
            {
                ComponentMovement movementComponent = (ComponentMovement)entity.FindComponent(ComponentTypes.COMPONENT_MOVEMENT);
                translationMatrix = Matrix4.CreateTranslation(movementComponent.DesiredLocation);
            }
            else
            {
                translationMatrix = transformComponent.PositionMatrix;
            }

            Matrix4 scaleMatrix;
            if (shouldScale)
            {
                scaleMatrix = transformComponent.ScaleMatrix;
            }
            else
            {
                scaleMatrix = Matrix4.CreateScale(1, 1, 1); //this
            }
            //scaleMatrix = transformComponent.ScaleMatrix;

            //Matrix4 rotationMatrix = transformComponent.RotationMatrix;
            Matrix4 rotationMatrix = Matrix4.Identity;

            transformMatrix = scaleMatrix * rotationMatrix * translationMatrix;
            //transformMatrix = rotationMatrix * scaleMatrix * translationMatrix;

            return transformMatrix;
        }

        private bool CircleCircleCheck(Entity circle1, Entity circle2)
        {
            //entity 1
            Vector3 position1 = GetPosition(circle1); 

            ComponentCollisionCircle collisionCircleComponent1 = (ComponentCollisionCircle)circle1.FindComponent(ComponentTypes.COMPONENT_COLLISION_CIRCLE);
            float radius1 = collisionCircleComponent1.Radius;

            //entity 2
            Vector3 position2 = GetPosition(circle2);

            ComponentCollisionCircle collisionCircleComponent2 = (ComponentCollisionCircle)circle2.FindComponent(ComponentTypes.COMPONENT_COLLISION_CIRCLE);
            float radius2 = collisionCircleComponent2.Radius;


            //check for collision
            Vector3 vectorDistanceApart = position2 - position1;
            float scalarDistanceApart = vectorDistanceApart.Length;

            float radiiSum = radius1 + radius2;

            if (radiiSum < scalarDistanceApart)
            {
                return true;
            }
            else
            {
                return false;
            }
        }

        private bool CircleSquareCheck(Entity circle, Entity square)
        {
            //square
            ComponentTransform squareTransformComponent = (ComponentTransform)square.FindComponent(ComponentTypes.COMPONENT_TRANSFORM);
            ComponentCollisionBox collisionBoxComponent = (ComponentCollisionBox)square.FindComponent(ComponentTypes.COMPONENT_COLLISION_BOX);
            Matrix4 squareTransform = squareTransformComponent.Transform;
            Vector4 point1 = squareTransform * new Vector4(collisionBoxComponent.Point1, 1);
            Vector4 point2 = squareTransform * new Vector4(collisionBoxComponent.Point2.X, point1.Y, point1.Z, 1);
            Vector4 point3 = squareTransform * new Vector4(point1.X, point1.Y, collisionBoxComponent.Point2.Z, 1);
            Vector4 point4 = squareTransform * new Vector4(collisionBoxComponent.Point2, 1);
            Vector3[] points = { point1.Xyz, point2.Xyz, point3.Xyz, point4.Xyz };

            //circle
            ComponentTransform circleTransformComponent = (ComponentTransform)circle.FindComponent(ComponentTypes.COMPONENT_TRANSFORM);
            ComponentCollisionCircle collisionCircleComponent = (ComponentCollisionCircle)circle.FindComponent(ComponentTypes.COMPONENT_COLLISION_CIRCLE);
            Vector3 circlePosition = circleTransformComponent.Position;
            float radius = collisionCircleComponent.Radius * circleTransformComponent.Scale.X;
            //WARNING: radius scales off of X, not the largest scalar

            return (IsPointInPolygon(points, circlePosition) ||
                    IsIntersectingCircle(circlePosition, radius, point1.Xyz, point2.Xyz) ||
                    IsIntersectingCircle(circlePosition, radius, point2.Xyz, point3.Xyz) ||
                    IsIntersectingCircle(circlePosition, radius, point3.Xyz, point4.Xyz) ||
                    IsIntersectingCircle(circlePosition, radius, point4.Xyz, point1.Xyz));
        }

        private bool SquareSquareCheck(Entity square1, Entity square2)
        {
            //square1
            ComponentCollisionBox collisionComponent1 = (ComponentCollisionBox)square1.FindComponent(ComponentTypes.COMPONENT_COLLISION_BOX);
            bool shouldScale = collisionComponent1.ShouldScale;
            Matrix4 transform1 = GetTransform(square1, shouldScale);
            Vector3 collision1_1 = collisionComponent1.Point1;
            Vector3 collision1_2 = collisionComponent1.Point2;

            //square2
            ComponentCollisionBox collisionComponent2 = (ComponentCollisionBox)square2.FindComponent(ComponentTypes.COMPONENT_COLLISION_BOX);
            shouldScale = collisionComponent2.ShouldScale;
            Matrix4 transform2 = GetTransform(square2, shouldScale);
            Vector3 collision2_1 = collisionComponent2.Point1;
            Vector3 collision2_2 = collisionComponent2.Point2;

            Vector4 p1_1 = new Vector4(collision1_1, 1) * transform1;
            Vector4 p1_2 = new Vector4(collision1_2, 1) * transform1;
            Vector4 p2_1 = new Vector4(collision2_1, 1) * transform2;
            Vector4 p2_2 = new Vector4(collision2_2, 1) * transform2;

            // Collision x-axis?
            bool collisionX = p1_2.X >= p2_1.X &&
                                p1_1.X <= p2_2.X;

            // Collision z-axis?
            bool collisionZ = p1_2.Z >= p2_1.Z &&
                                p1_1.Z <= p2_2.Z;

            // Collision only if on both axes
            return collisionX && collisionZ;
        }

        private bool IsPointInPolygon(Vector3[] polygon, Vector3 point)
        {
            //logic from http://dominoc925.blogspot.com/2012/02/c-code-snippet-to-determine-if-point-is.html

            bool isInside = false;
            for (int i = 0, j = polygon.Length - 1; i < polygon.Length; j = i++)
            {
                if (((polygon[i].Y > point.Y) != (polygon[j].Y > point.Y)) &&
                (point.X < (polygon[j].X - polygon[i].X) * (point.Y - polygon[i].Y) / (polygon[j].Y - polygon[i].Y) + polygon[i].X))
                {
                    isInside = !isInside;
                }
            }
            return isInside;
        }

        private bool IsIntersectingCircle(Vector3 circlePos, float radius, Vector3 lineStart, Vector3 lineEnd)
        {
            //logic from https://stackoverflow.com/questions/1073336/circle-line-segment-collision-detection-algorithm

            Vector3 line = lineEnd - lineStart;
            Vector3 circleToLineStart = lineStart - circlePos;

            float a = Vector3.Dot(line, line);
            float b = 2 * Vector3.Dot(circleToLineStart, line);
            float c = Vector3.Dot(circleToLineStart, circleToLineStart) - radius * radius;

            float discriminant = b * b - 4 * a * c;
            if (discriminant < 0)
            {
                // no intersection
                return false;
            }
            else
            {
                discriminant = (float)Math.Sqrt(discriminant);

                // either solution may be on or off the ray so need to test both
                // t1 is always the smaller value, because BOTH discriminant and
                // a are nonnegative.
                float t1 = (-b - discriminant) / (2 * a);
                float t2 = (-b + discriminant) / (2 * a);

                // 3x HIT cases:
                //          -o->             --|-->  |            |  --|->
                // Impale(t1 hit,t2 hit), Poke(t1 hit,t2>1), ExitWound(t1<0, t2 hit), 

                // 3x MISS cases:
                //       ->  o                     o ->              | -> |
                // FallShort (t1>1,t2>1), Past (t1<0,t2<0), CompletelyInside(t1<0, t2>1)

                if (t1 >= 0 && t1 <= 1)
                {
                    // t1 is the intersection, and it's closer than t2
                    // (since t1 uses -b - discriminant)
                    // Impale, Poke
                    return true;
                }

                // here t1 didn't intersect so we are either started
                // inside the sphere or completely past it
                if (t2 >= 0 && t2 <= 1)
                {
                    // ExitWound
                    return true;
                }

                // no intn: FallShort, Past, CompletelyInside
                return false;
            }
        }
    }
}
