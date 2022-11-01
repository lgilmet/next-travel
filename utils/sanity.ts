import { createClient } from "next-sanity";
import {
    createPreviewSubscriptionHook,
    createCurrentUserHook,
} from "next-sanity";
import createImageUrlBuilder from "@sanity/image-url";
import { SanityImageSource } from "@sanity/image-url/lib/types/types";
import imageUrlBuilder from "@sanity/image-url";

export const config = {
    dataset: "travel-blog",
    projectId: "1k3qp0o1",
    apiVersion: "2021-10-21",
    useCdn: false,
};

export const sanityClient = createClient(config);

export const urlFor = (source: SanityImageSource) => {
    return imageUrlBuilder(sanityClient).image(source);
};

export const usePreviewSubscription = createPreviewSubscriptionHook(config);

export const useCurrentUser = createCurrentUserHook(config);

export const previewClient = createClient({
    ...config,
    useCdn: false,
    token: "ska0qO5iykojIBSDVW2DMv14ZI9DMyMf9BaRBRm9IQ0AJtX1P6B7t8tF48MSSHmr8xgvFpIGX0Qq3k9l9pVyacEL6UXbsumJ42hDclwneHb2yV0vK0HdjxteNG2MjTPQgtFYccHhLtlklZC0PCouyag6Q7ZtB5UcL4QvwAlrjHnWx8m4gbgv",
});

export const getClient = (usePreview: any) =>
    usePreview ? previewClient : sanityClient;
