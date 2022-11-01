import groq from "groq";
import { GetStaticProps } from "next";
import Head from "next/head";
import Link from "next/link";
import Card from "../../components/Card";
import Map from "../../components/Map";
import { Post, Slug } from "../../typings";
import Image from "next/image";
import { urlFor } from "../../utils/sanity";
import { getClient } from "../../utils/sanity";

type Props = {
    post: Post;
};

// type Slug = { ???
//     slug: Slug;
// };

export default function Home({ post }: Props) {
    console.log("is there a post", post);

    return (
        <div>
            {" "}
            post page {post?._id}
            <Image
                className="object-contain"
                alt={post.title}
                src={urlFor(post.mainImage)?.url()}
                width={200}
                height={200}
            />
        </div>
    );
}

export async function getStaticPaths() {
    const paths = await getClient().fetch(
        groq`*[_type == "post" && defined(slug.current)][].slug.current`
    );

    console.log("there", paths);

    return {
        paths: paths.map((slug: any) => ({ params: { slug } })),
        fallback: true,
    };
}

const query = groq`*[_type=="post" && slug.current == $slug][0] {
  _id,
  title,
  "username": author->username,
  "categories": categories[]->{id, title},
  mainImage,
  publishedAt
}
`;

export const getStaticProps: GetStaticProps<Props> = async ({ params }) => {
    console.log(params);

    const slug = params?.slug;
    const post = await getClient(false).fetch(query, { slug });

    console.log("here", post, slug);
    return {
        props: {
            post,
        },
    };
};
