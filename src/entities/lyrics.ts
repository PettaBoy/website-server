import { Field, ObjectType, ID } from "type-graphql";
import { Entity, ObjectIdColumn, ObjectId, Column, BaseEntity } from "typeorm";

@ObjectType()
@Entity()
export class Lyrics extends BaseEntity{
    @Field(() => ID)
    @ObjectIdColumn()
    _id!: ObjectId;

    @Field()
    @Column()
    name!: string;

    @Field()
    @Column()
    title!: string;

    @Field()
    @Column()
    album!: string;

    @Field()
    @Column()
    language!: string;

    @Field()
    @Column()
    year!: string;

    @Field()
    @Column()
    description!: string;

    @Field()
    @Column()
    cover!: string;

    @Field()
    @Column()
    content!: string;
}