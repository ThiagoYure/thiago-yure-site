import Link from "next/link";
import fs from 'fs';
import grayMatter from 'gray-matter';
import { remark } from 'remark';
import remarkHTML from 'remark-html';
import Image from 'next/image';

const Blog = ({ posts }) => {
    return (
        <>
            <div>
                <div className="bannerSection">
                    <h1>Blog</h1>
                </div>
                <div className="blogContent">
                    <div className="titleBlog"><h2>Últimas Postagens</h2></div>
                    <div className="postList">
                        {posts.map((post) => {
                            return (
                                <Link href={`/posts/${post.metadata.slug}`} key={post.metadata.slug}>
                                    <a>
                                        <div className="post">
                                            <div className="postMetadataImage" style={{
                                                backgroundImage: `url(${post.metadata.banner})`,
                                                backgroundSize: 'cover',
                                                backgroundRepeat: 'no-repeat'
                                            }}>
                                            </div>
                                            <div className="postMetadata">
                                                <div className="titlePostit">{post.metadata.title}</div>
                                                <div className="resumePostit">{post.metadata.excerpt}</div>
                                                <div className="datePostit">{post.metadata.date}</div>
                                            </div>
                                        </div>
                                    </a>
                                </Link>
                            );
                        })}
                    </div>
                </div>
            </div>
        </>
    );
}

export async function getStaticProps() {
    const getAllPosts = () => {
        const allPostsFileNames = fs.readdirSync('./posts');
        const posts = allPostsFileNames.map((filename) => {
            const fileContent = fs.readFileSync(`./posts/${filename}`, 'utf-8');
            const { content, data: metadata } = grayMatter(fileContent);
            const htmlContent = remark()
                .use(remarkHTML)
                .processSync(content)
                .toString();
            return {
                metadata: {
                    ...metadata,
                    slug: filename.replace(".md", ""),
                },
                content: htmlContent
            }
        })

        return posts;
    }
    const posts = getAllPosts();

    return {
        props: {
            posts
        }
    };
}

export default Blog;