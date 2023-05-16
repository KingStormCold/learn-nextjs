import { Work } from '@/models'
import { Box, Chip, Stack, Typography } from '@mui/material'
import { format } from 'date-fns'
import Image from 'next/image'
import React from 'react'

export interface WorkCardProps {
  work: Work
}

export function WorkCard({ work }: WorkCardProps) {
  return (
    <Stack direction={{ xs: 'column', md: 'row' }} spacing={2}>
      <Box
        width={{ xs: '100%', md: '246px' }}
        flexShrink={0}
        sx={{ '& > img': { borderRadius: '5px' } }}
      >
        <Image src={work.thumbnailUrl} alt="logo" width={246} height={180} layout="responsive" />
      </Box>
      <Box>
        <Typography variant="h5" fontWeight="bold">
          {work.title}
        </Typography>
        <Stack direction="row" my={2}>
          <Chip color="secondary" label={format(Number(work.createAt), 'yyyy')} size="small"></Chip>
          <Typography ml={3} color="GrayText">
            {work.tagList.join(', ')}
          </Typography>
        </Stack>
        <Typography>{work.shortDescripton}</Typography>
      </Box>
    </Stack>
  )
}
