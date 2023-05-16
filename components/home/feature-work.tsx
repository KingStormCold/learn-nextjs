import { Work } from '@/models'
import { Box, Container, Typography } from '@mui/material'
import { WorkList } from '../work'

export function FeatureWork() {
  const workList: Work[] = [
    {
      id: '1',
      title: 'Designing Dashboards',
      createAt: '1684033249301',
      updateAt: '1684033249301',
      tagList: ['Dashboard'],
      shortDescripton:
        'Amet minim mollit non deserunt ullamco est sit aliqua dolor do amet sint. Velit officia consequat duis enim velit mollit. Exercitation veniam consequat sunt nostrud amet.',
      fullDescription: '',
      thumbnailUrl:
        'https://res.cloudinary.com/dfnpacwsf/image/upload/v1684044092/nextjs/456_2_b6zblh.jpg',
    },
    {
      id: '2',
      title: 'Vibrant Portraits of 2020',
      createAt: '1684033249301',
      updateAt: '1684033249301',
      tagList: ['Illustration'],
      shortDescripton:
        'Amet minim mollit non deserunt ullamco est sit aliqua dolor do amet sint. Velit officia consequat duis enim velit mollit. Exercitation veniam consequat sunt nostrud amet.',
      fullDescription: '',
      thumbnailUrl:
        'https://res.cloudinary.com/dfnpacwsf/image/upload/v1684044033/nextjs/456_1_uxej1w.jpg',
    },
    {
      id: '3',
      title: '36 Days of Malayalam type',
      createAt: '1684033249301',
      updateAt: '1684033249301',
      tagList: ['Typography'],
      shortDescripton:
        'Amet minim mollit non deserunt ullamco est sit aliqua dolor do amet sint. Velit officia consequat duis enim velit mollit. Exercitation veniam consequat sunt nostrud amet.',
      fullDescription: '',
      thumbnailUrl:
        'https://res.cloudinary.com/dfnpacwsf/image/upload/v1684044020/nextjs/123_kvsc2d.jpg',
    },
  ]
  return (
    <Box component="section" pt={2} pb={4}>
      <Container>
        <Typography variant="h5" mb={4}>Feature works</Typography>

        <WorkList workList={workList} />
      </Container>
    </Box>
  )
}
