// import Header from '@/components/common/header'
import { AdminLayout, MainLayout } from '@/components/layout'
import { Typography } from '@mui/material'
import { Box } from '@mui/material'
import dynamic from 'next/dynamic'
import { useRouter } from 'next/router'
import React, { useEffect, useState } from 'react'
import { NextPageWithLayout } from '../models'

//nếu muốn render ở phía server hk cần làm gì chỉ cần import bình thường
//Nếu bạn muốn 1 component nào đó chỉ được render ở phía trình duyệt thôi(client thôi) thì dùng dynamic
const Header = dynamic(() => import('../components/common/header/index'), { ssr: false })

export interface AboutPageProps {}

const About: NextPageWithLayout = (props: AboutPageProps) => {
  const [postList, setPostList] = useState([])

  const router = useRouter()
  console.log('About query ', router.query)

  const page = router.query?.page

  useEffect(() => {
    if (!page) return
    //useEffect chỉ chạy ở phía client thôi
    //fetch data from API cho client
    ;(async () => {
      const response = await fetch(`https://js-post-api.herokuapp.com/api/posts?_page=${page}`)
      const data = await response.json()
      setPostList(data.data)
    })()
  }, [page])

  function handleOnClick() {
    //khi có shallow == true thì nó trigger update bên phía client thôi hk chạy staticProps nữa
    router.push(
      {
        pathname: '/about',
        query: {
          page: (Number(page) || 1) + 1,
        },
      },
      undefined,
      { shallow: true }
    )
  }

  return (
    <Box>
      <Typography component="h1" variant="h3" color="primary.main">
        About page
      </Typography>
      <Header />
      <ul>
        {postList.map((post: any) => (
          <li key={post.id}>{post.title}</li>
        ))}
      </ul>
      <button onClick={handleOnClick}>Next page</button>
    </Box>
  )
}

// export async function getStaticProps() {
//   console.log('props 123')

//   return {
//     props: {},
//   }
// }
About.Layout = AdminLayout

export default About
