import { defineCollection, z } from "astro:content";

const postCollection = defineCollection({
	type: "content",
	schema: z.object({
		title: z.string(),
		description: z.string(),
		dateFormatted: z.string(),
		tags: z.array(z.string()).optional().default([]),
	}),
});

const noteCollection = defineCollection({
	type: "content",
	schema: z.object({
		title: z.string(),
		description: z.string(),
		dateFormatted: z.string(),
		type: z.string().optional().default("note"),
	}),
});

export const collections = {
	post: postCollection,
	note: noteCollection,
};
