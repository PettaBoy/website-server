import { Resolver, Query, Arg, Mutation } from "type-graphql";
import { ObjectId } from "mongodb";
import { Lyrics } from "../entities/lyrics";
import { addLyricsInput, updateLyricsInput } from "../types/lyrics";

@Resolver(Lyrics)
export class LyricsResolver {
    @Query(() => [Lyrics])
    async getLyrics() {
        return await Lyrics.find();
    }

    @Query(() => Lyrics)
    async getLyricsByName(
        @Arg("name") name: string
    ) {
        const lyrics = await Lyrics.findOne({ where: { name } });
        if (!lyrics) throw new Error("Lyrics not found!");
        return lyrics;
    }

    @Mutation(() => Lyrics)
    async addSongLyrics(
        @Arg("data") data: addLyricsInput
    ) {
        const alreadyExists = await Lyrics.findOne({ where: { name: data.name } });
        if (alreadyExists) throw new Error("Lyrics already exists!");

        const lyrics = await Lyrics.create({
            ...data
        }).save();

        return lyrics;
    }

    @Mutation(() => Boolean)
    async updateLyrics(
        @Arg("data") data: updateLyricsInput
    ) {
        const lyrics = await Lyrics.findOne({ where: { name: data.oldName } });
        if (!lyrics) throw new Error("Lyrics not found!");

        const { affected } = await Lyrics.update({ name: data.oldName }, {
            name: data.newName ? data.newName : lyrics.name,
            title: data.title ? data.title : lyrics.title,
            album: data.album ? data.album : lyrics.album,
            language: data.language ? data.language : lyrics.language,
            year: data.year ? data.year : lyrics.year,
            description: data.description ? data.description : lyrics.description,
            cover: data.cover ? data.cover : lyrics.cover,
            content: data.content ? data.content : lyrics.content,
        });
        return affected === 1;
    }
}