import path from 'path'
import fs from 'fs'
import matter from 'gray-matter'
import { PostDetail } from '@/models'

const BLOG_FLODER = path.join(process.cwd(), 'blog')

export async function getPostList(): Promise<PostDetail[]> {
  const fileNameList = fs.readdirSync(BLOG_FLODER)

  const postList: PostDetail[] = []

  for (const fileName of fileNameList) {
    const filePath = path.join(BLOG_FLODER, fileName)
    const fileContents = fs.readFileSync(filePath, 'utf-8')
    const {data, excerpt, content} = matter(fileContents, {excerpt_separator: '<!-- truncate-->'});
    postList.push({
      id: fileName,
      slug: data.slug,
      title: data.title,
      author: {
        name: data.author,
        title: data.author_title,
        profileUrl: data.author_url,
        avatarUrl: data.author_image_url
      },
      tagList: data.tags,
      publishedDate: data.date,
      description: excerpt || '',
      mdContent: content
    })
  }
  return postList
}
