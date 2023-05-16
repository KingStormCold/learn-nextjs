import { PostDetail } from '@/models/index'
import { Box, Container, Stack, Typography, Link as MuiLink } from '@mui/material'
import Link from 'next/link'
import * as React from 'react'
import { PostCard } from './post-card'

export function RecentPosts() {
    const postList: PostDetail [] = [
        {
            id: '1',
            title:'Making a design system from scratch',
            publishedDate:'2022-06-18T12:00:00Z',
            tagList: ['Design', 'Pattern'],
            description: 'Amet minim mollit non deserunt ullamco est sit aliqua dolor do amet sint. Velit officia consequat duis enim velit mollit. Exercitation veniam consequat sunt nostrud amet.',
            slug: ''
          },
        {
            id: '2',
            title:'Creating pixel perfect icons in Figma',
            publishedDate:'2022-06-18T12:00:00Z',
            tagList: ['Figma', 'Icon Design'],
            description: 'Amet minim mollit non deserunt ullamco est sit aliqua dolor do amet sint. Velit officia consequat duis enim velit mollit. Exercitation veniam consequat sunt nostrud amet.',
            slug: ''
          }
    ]
  return (
    <Box component="section" bgcolor="secondary.light" pt={2} pb={4}>
      <Container>
        <Stack
          direction="row"
          justifyContent={{ sx: 'center', md: 'space-between' }}
          mb={2}
          alignItems="center"
        >
          <Typography variant="h5">Recent Posts</Typography>
          <Link passHref href="/blog" legacyBehavior>
            <MuiLink sx={{ display: { xs: 'none', md: 'inline-block' } }}>View all</MuiLink>
          </Link>
        </Stack>

        <Stack
          direction={{
            xs: 'column',
            md: 'row',
          }}
          spacing={3}
          sx={{
            '& > div': {
              width: {
                xs: '100%',
                md: '50%',
              },
            },
          }}
        >
            {postList.map(post => (
                <Box key={post.id}>
                    <PostCard post={post} />
                </Box>
            ))}
        </Stack>
      </Container>
    </Box>
  )
}
