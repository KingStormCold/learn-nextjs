import { PostDetail } from '@/models'
import { Card, CardContent } from '@mui/material'
import { PostItem } from '../common/blog'

export interface PostCardProps {
  post: PostDetail
}

export function PostCard({ post }: PostCardProps) {
  if (!post) return null
  return (
    <Card>
      <CardContent>
        <PostItem post={post}/>
      </CardContent>
    </Card>
  )
}
