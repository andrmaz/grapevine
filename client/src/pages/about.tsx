import * as React from 'react'

import {SpecialistInfo} from '@/containers/specialist/info'
import {getSpecialistVariables} from '/__generated__/getSpecialist'
import styled from '@emotion/styled'
import {theme} from '@/themes'
import {useParams} from 'react-router'

const Container = styled.div`
  width: ${theme.sizes.header.width}px;
  min-height: calc(100vh - ${theme.sizes.header.height}px - 3px);
  margin: auto;
  padding: 32px;
  border-style: solid;
`

const Contact = styled.aside`
  height: 50px;
  width: 100%;
  background-color: yellow;
`

export default function About(): JSX.Element {
  const {id} = useParams<{id: getSpecialistVariables['id']}>()
  // Only editable to Specialist owner'
  return (
    <Container>
      <SpecialistInfo id={id} />
      {/* Only visible to Customer */}
      <Contact />
    </Container>
  )
}
