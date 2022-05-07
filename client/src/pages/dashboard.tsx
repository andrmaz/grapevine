import * as React from 'react'

import {RecommendationList} from '@/containers/recommendation/list'
import {SpecialistList} from '@/containers/specialist/list'
import styled from '@emotion/styled'
import {theme} from '@/themes'

export default function Dashboard(): JSX.Element {
  return (
    <Container>
      <RecommendationList />
      <SpecialistList />
    </Container>
  )
}

const Container = styled.div`
  width: ${theme.sizes.header.width}px;
  min-height: calc(100% - ${theme.sizes.header.height}px - 3px);
  margin: auto;
  display: flex;
`
