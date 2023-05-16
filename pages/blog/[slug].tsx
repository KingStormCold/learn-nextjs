import { MainLayout } from '@/components/layout'
import { PostDetail } from '@/models'
import { getPostList } from '@/utils/posts'
import { Box, Container, Divider } from '@mui/material'
import { GetStaticPaths, GetStaticProps, GetStaticPropsContext } from 'next'
import { useRouter } from 'next/router'
import React from 'react'
import {unified} from 'unified'
import remarkParse from 'remark-parse'
import remarkRehype from 'remark-rehype'
import rehypeDocument from 'rehype-document'
import rehypeFormat from 'rehype-format'
import rehypeStringify from 'rehype-stringify'
import {reporter} from 'vfile-reporter'
import remarkToc from 'remark-toc'
import rehypeSlug from 'rehype-slug'
import rehypeAutolinkHeadings from 'rehype-autolink-headings'
import remarkPrism from 'remark-prism'
import Script from 'next/script'

export interface BlogDetailPageProps {
  post: PostDetail
}

export default function BlogDetailPage({ post }: BlogDetailPageProps) {
  const router = useRouter()

  if (!post) return null
  return (
    <Box>
      <Container>
        <h1> Post Detail Page</h1>
        <p>{post.title}</p>
        <p>{post.author?.name}</p>
        <p>{post.description}</p>

        <Divider />
        <div dangerouslySetInnerHTML={{ __html: post.htmlContent || '' }}></div>
      </Container>
      {/* afterInteractive đảm bảo load những cái qtrong trước, sau mới load cái script này */}
      <Script src="/prism.js" strategy='afterInteractive'></Script>
    </Box>
  )
}

BlogDetailPage.Layout = MainLayout

export const getStaticPaths: GetStaticPaths = async () => {
  const postList = await getPostList()

  return {
    paths: postList.map((post: PostDetail) => ({ params: { slug: post.slug } })),
    fallback: false,
  }
}

export const getStaticProps: GetStaticProps<BlogDetailPageProps> = async (
  context: GetStaticPropsContext
) => {
  const postList = await getPostList()
  const slug = context.params?.slug
  if (!slug) return { notFound: true }

  const post = postList.find((x) => x.slug === slug)
  if (!post) return { notFound: true }

  //convert markdown to html
  const file = await unified()
    .use(remarkParse)
    .use(remarkToc, {heading: 'agenda.*'})
    .use(remarkPrism)
    .use(remarkRehype)
    .use(rehypeSlug)
    .use(rehypeAutolinkHeadings, {behavior: 'wrap'})
    .use(rehypeDocument, {title: 'Blog detail page'})
    .use(rehypeFormat)
    .use(rehypeStringify)
    .process(post.mdContent|| '')

    post.htmlContent = file.toString()


  return {
    props: {
      post,
    },
  }
}
