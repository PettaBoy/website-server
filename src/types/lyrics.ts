import { Field, InputType } from "type-graphql";
import { ObjectId } from "mongodb";

@InputType()
export class addLyricsInput {
    @Field()
    name!: string;

    @Field()
    title!: string;

    @Field()
    album!: string;

    @Field()
    language!: string;

    @Field()
    year!: string;

    @Field()
    description!: string;

    @Field()
    cover!: string;

    @Field()
    content!: string;
}

@InputType()
export class updateLyricsInput {
    @Field()
    oldName!: string;

    @Field({ nullable: true })
    newName?: string;

    @Field({ nullable: true })
    title?: string;

    @Field({ nullable: true })
    album?: string;

    @Field({ nullable: true })
    language?: string;

    @Field({ nullable: true })
    year?: string;

    @Field({ nullable: true })
    description?: string;

    @Field({ nullable: true })
    content?: string;

    @Field({ nullable: true })
    cover?: string;
}