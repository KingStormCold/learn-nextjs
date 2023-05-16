import { Work } from '@/models'
import { Box, Divider } from '@mui/material'
import React, { Fragment } from 'react'
import { WorkCard } from './work-card'

export interface WorkListProps {
  workList: Work[]
}

export function WorkList({ workList }: WorkListProps) {
  if (!Array.isArray(workList)) return null
  return (
    <Box>
      {workList.map((work) => (
        <Fragment key={work.id}>
          <WorkCard work={work} />
          <Divider sx={{my: 3}}/>
        </Fragment>
      ))}
    </Box>
  )
}
