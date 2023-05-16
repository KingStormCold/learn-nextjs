import { LayoutProps } from '@/models/index'
import { Box, Container, Stack } from '@mui/material'
import Link from 'next/link'
import React, { useEffect } from 'react'
import { Footer } from '../common'
import Header from '../common/header'

export interface IMainLayoutProps {}

export function MainLayout({ children }: LayoutProps) {
  useEffect(() => {
    console.log('MainLayout mounting')
    return () => console.log('MainLayout unmounting')
  }, [])
  return (
    <Stack minHeight="100vh">
      <Header />
      {/* flexGrow={1} đảm bảo phần main chiếm hết nếu còn khoản trống ở giữa và đẩy element tiếp theo xuống dưới cùng */}
      <Box component="main" flexGrow={1}>
        {children}
      </Box>
      <Footer />
    </Stack>
  )
}
