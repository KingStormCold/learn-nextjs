import { PostItem } from '@/components/common/blog/post-item'
import { MainLayout } from '@/components/layout'
import { PostDetail } from '@/models'
import { getPostList } from '@/utils/posts'
import { Box, Container, Divider } from '@mui/material'
import { GetStaticProps } from 'next'
import Link from 'next/link'
import React from 'react'

export interface BlogListPageProps {
  posts: PostDetail[]
}

export default function BlogListPage({ posts }: BlogListPageProps) {
  return (
    <Box>
      <Container>
        <h1>Blog</h1>
        <Box component="ul" sx={{ listStyleType: 'none', p: 0 }}>
          {posts.map((post) => (
            <li key={post.id}>
              <Link href={`/blog/${post.slug}`} passHref>
                <a style={{ color: '#21243D', textDecoration : 'none'}}>
                  <PostItem post={post} />
                </a>
              </Link>
              <Divider sx={{ my: 3 }} />
            </li>
          ))}
        </Box>
      </Container>
    </Box>
  )
}

BlogListPage.Layout = MainLayout

export const getStaticProps: GetStaticProps<BlogListPageProps> = async () => {
  const postList = await getPostList()

  return {
    props: {
      posts: postList,
    },
  }
}
