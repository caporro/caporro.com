import { getCollection } from "astro:content";

export async function GET(context) {
  const siteUrl = context.site ?? new URL("https://caporro.com");

  const posts = await getCollection("post");
  const notes = await getCollection("note");

  const staticPages = [
    { url: "/", priority: "1.0", changefreq: "weekly" },
    { url: "/posts/", priority: "0.8", changefreq: "weekly" },
    { url: "/notes/", priority: "0.8", changefreq: "weekly" },
    { url: "/about/", priority: "0.5", changefreq: "monthly" },
  ];

  const postPages = posts.map((post) => ({
    url: `/post/${post.slug}/`,
    priority: "0.9",
    changefreq: "monthly",
  }));

  const notePages = notes.map((note) => ({
    url: `/notes/${note.slug}/`,
    priority: "0.6",
    changefreq: "monthly",
  }));

  const allPages = [...staticPages, ...postPages, ...notePages];

  const xml = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${allPages
  .map(
    (page) => `  <url>
    <loc>${new URL(page.url, siteUrl).href}</loc>
    <changefreq>${page.changefreq}</changefreq>
    <priority>${page.priority}</priority>
  </url>`
  )
  .join("\n")}
</urlset>`;

  return new Response(xml, {
    headers: {
      "Content-Type": "application/xml; charset=utf-8",
    },
  });
}
