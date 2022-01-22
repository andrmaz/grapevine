import * as React from 'react'

import {RecommendationList} from '@/components/recommendation/list'
import {SpecialistList} from '@/containers/specialist/list'
import styled from '@emotion/styled'
import {theme} from '@/themes'

const Container = styled.div`
  width: ${theme.sizes.header.width}px;
  min-height: calc(100vh - ${theme.sizes.header.height}px - 3px);
  margin: auto;
  border-style: solid;
  border-width: 0 1px;
  display: flex;
`

export default function Dashboard(): JSX.Element {
  return (
    <Container>
      <RecommendationList />
      <SpecialistList />
    </Container>
  )
}
