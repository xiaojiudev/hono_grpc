import { Post, PostResponse, } from "../deps.ts";
import { PostSchema, getPostsCollection } from "../model/PostSchema.ts";
import { indexEsDocument } from "../model/es.ts";

export class CreatePostCommandHandler {
    async handle(post: Post): Promise<PostResponse> {
        const PostCollection = await getPostsCollection();

        const { title, content, categories } = post;

        const payload: PostSchema = {
            title,
            content,
            categories,
            interactions: {
                likes: 0,
                comments: 0,
                shares: 0,
                clicked: 0,
                profileClicked: 0,
                bookmarked: 0,
                photoExpanded: 0,
                videoPlayback: 0,
            },
            trendingScore: 0.0,
            createdAt: new Date(),
            updatedAt: new Date(),
        }

        const insetId = await PostCollection.insertOne({ ...payload, });
        if (insetId) {
            indexEsDocument("posts", { id: insetId.toString(), ...payload });
        }

        return { success: !!insetId };
    }
}