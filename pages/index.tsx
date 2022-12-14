import groq from "groq";
import { GetStaticProps } from "next";
import Head from "next/head";
import Link from "next/link";
import Card from "../components/Card";
import Map from "../components/Map";
import { Post } from "../typings";
import { getClient } from "../utils/sanity";

type Props = {
    posts: Post[];
};

export default function Home({ posts }: Props) {
    console.log("⏩", posts);

    return (
        <div>
            <Head>
                <title>Next-Travel blog</title>
                <meta
                    name="description"
                    content="Generated by create next app"
                />
                <link rel="icon" href="/favicon.ico" />
            </Head>

            {posts?.map((post, index) => (
                <Link
                    key={post._id}
                    href="/post/[slug]"
                    as={`post/${post.slug.current}`}>
                    <Card post={post} />
                    {`post/${post.slug.current}`}
                </Link>
            ))}
            <Map />
        </div>
    );
}

export const getStaticProps: GetStaticProps<Props> = async ({
    preview = false,
}) => {
    const posts: Post[] = await getClient(preview).fetch(groq`
  *[_type=="post" && publishedAt < now()] | order(publishedAt desc) {
    _id,
    title,
    "username": author->username,
    "categories": categories[]->{id, title},
    mainImage,
    slug,
    publishedAt
  }
  `);

    console.log("🔙 backend", posts);

    return {
        props: {
            posts,
        },
    };
};
