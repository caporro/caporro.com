import rss from "@astrojs/rss";
import { getCollection } from "astro:content";

function parseDate(dateStr) {
	const parts = dateStr.replace(",", "").split(" ");
	if (parts.length === 2) {
		return new Date(`${parts[0]} 1, ${parts[1]}`);
	}
	return new Date(dateStr);
}

export async function GET(context) {
	const posts = await getCollection("post");
	const sorted = posts.sort(
		(a, b) =>
			parseDate(b.data.dateFormatted).getTime() -
			parseDate(a.data.dateFormatted).getTime(),
	);

	return rss({
		title: "Claudio Caporro",
		description:
			"Engineering Manager at TeamSystem. I write about software development, AI, team leadership, and the art of surviving legacy code.",
		site: context.site,
		items: sorted.map((post) => ({
			title: post.data.title,
			description: post.data.description,
			pubDate: parseDate(post.data.dateFormatted),
			link: `/post/${post.slug}/`,
		})),
		customData: `<language>en-us</language>`,
	});
}
