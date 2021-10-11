import * as React from 'react'

import {sizes} from '@/styles/sizes'
import styled from '@emotion/styled'

const Container = styled.div`
  width: ${sizes.header.width}px;
  min-height: calc(100vh - ${sizes.header.height}px - 3px);
  margin: auto;
  border-style: solid;
  border-width: 0 1px;
`

export default function About(): JSX.Element {
  return (
    <Container>
      <span>About</span>
    </Container>
  )
}
