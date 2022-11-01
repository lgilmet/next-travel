interface SanityBody {
    _createdAt: string;
    _id: string;
    _rev: string;
    _updatedAt: string;
}

interface Image {
    _type: "image";
    asset: {
        _ref: string;
        _type: "reference";
    };
}

export interface Category extends SanityBody {
    _type: "category";
    title: string;
    id: string;
}

export interface Slug extends SanityBody {
    _type: "slug";
    current: "string";
}

export interface Post extends SanityBody {
    _type: "post";
    title: string;
    postedAt: string;
    slug: Slug;
    username: string;
    mainImage: Image;
    categories: Category[];
    publishedAt: string;
    body: Image;
}
