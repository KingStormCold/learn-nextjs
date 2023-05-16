import { Seo } from '@/components/common'
import { FeatureWork, HeroSection, RecentPosts } from '@/components/home'
import { MainLayout } from '@/components/layout'
import { Box } from '@mui/material'
import { Inter } from 'next/font/google'
import { useRouter } from 'next/router'
import { NextPageWithLayout } from '../models'

const inter = Inter({ subsets: ['latin'] })

const Home: NextPageWithLayout = () => {
  const router = useRouter()

  function goToDetailPage() {
    router.push({
      pathname: '/posts/[postId]',
      query: {
        postId: 123,
        ref: 'social',
      },
    })
  }

  return (
    <Box>
      <Seo
        data={{
          title: 'Tuan Kul',
          description:
            'Step by step tutorials to build a full CRUD website using NextJS for beginners',
          url: 'https://mrbang.vn',
          thumbnaiUrl:
            'https://res.cloudinary.com/dfnpacwsf/image/upload/v1684044033/nextjs/456_1_uxej1w.jpg',
        }}
      />
      <HeroSection />
      <RecentPosts />
      <FeatureWork />
    </Box>
  )
}

Home.Layout = MainLayout

export default Home
