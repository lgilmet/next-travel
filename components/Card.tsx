import { Post } from "../typings";
import { urlFor } from "../utils/sanity";
import Image from "next/image";

type Props = {
    post: Post;
};

export default function Card({ post }: Props) {
    return (
        <article>
            <div className="underline">
                {post.title} - {post.username} -{" "}
                {post.categories?.map((category, i) => (
                    <div key={i}>{category.title}</div>
                ))}
                <Image
                    className="object-contain"
                    alt={post.title}
                    src={urlFor(post.mainImage)?.url()}
                    width={200}
                    height={200}
                />
            </div>
        </article>
    );
}
