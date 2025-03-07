import fs from 'fs';
import path from 'path';
import matter from 'gray-matter';
import { notFound } from 'next/navigation';
import { BlogType } from '@/app/type';
import { BlogDetails } from '@/lib/component';

type paramsType = Promise<{ blogid: string }>;

const BLOG_DIR = path.join(process.cwd(), 'app/blogs/post');

async function getBlog(blogid: string) {
  const filePath = path.join(BLOG_DIR, `${blogid}.mdx`);

  if (!fs.existsSync(filePath)) {
    return null;
  }

  return fs.promises
    .readFile(filePath, 'utf8')
    .then((source) => {
      const { content, data } = matter(source);

      return {
        content,
        metadata: {
          filename: blogid,
          title: data?.title || 'Untitled Post',
          description: data?.description || 'No description available',
          date: data?.date || '',
          category: data?.category || 'Uncategorized',
        } as BlogType,
      };
    })
    .catch(() => {
      return null;
    });
}

export async function generateStaticParams() {
  if (!fs.existsSync(BLOG_DIR)) {
    console.error('Post directory does not exist:', BLOG_DIR);
    return [];
  }

  return fs
    .readdirSync(BLOG_DIR)
    .filter((filename) => filename.endsWith('.mdx'))
    .map((filename) => ({
      blogid: filename.replace(/\.mdx$/, ''),
    }));
}

export async function generateMetadata({ params }: { params: paramsType }) {
  const { blogid } = await params;

  const blog = await getBlog(blogid);

  if (!blog) {
    return {
      title: 'Post not found',
      description: 'The requested blog post does not exist',
    };
  }

  const { metadata } = blog;
  return {
    title: metadata.title,
    description: metadata.description,
    openGraph: {
      title: metadata.title,
      description: metadata.description,
      type: 'article',
      publishedTime: metadata.date,
    },
  };
}

export default async function BlogDetailsPage({
  params,
}: {
  params: paramsType;
}) {
  const { blogid } = await params;
  const blog = await getBlog(blogid);

  if (!blog) return notFound();

  const { content, metadata } = blog;
  return <BlogDetails content={content} meta={metadata} />;
}
