import * as React from 'react'

import {SpecialistInfo} from '@/containers/specialist/info'
import {getSpecialistVariables} from '/__generated__/getSpecialist'
import {sizes} from '@/styles/sizes'
import styled from '@emotion/styled'
import {useParams} from 'react-router'

const Container = styled.div`
  width: ${sizes.header.width}px;
  min-height: calc(100vh - ${sizes.header.height}px - 3px);
  margin: auto;
  padding: 32px;
  border-style: solid;
`

const Wrapper = styled.main`
  isolation: isolate;
  height: 640px;
  width: 100%;
  display: flex;
  margin-bottom: 16px;
`

const Contact = styled.aside`
  height: 50px;
  width: 100%;
  background-color: yellow;
`

const Column = styled.aside`
  height: 90%;
  width: 40%;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
`

const Picture = styled.section`
  height: 250px;
  width: 100%;
  background-color: red;
  z-index: 2;
`

const Box = styled.section`
  height: 280px;
  width: 100%;
  margin-left: -24px;
`

const Map = styled.div`
  height: 100%;
  width: 100%;
  background-color: green;
`

const Details = styled.section`
  height: 100%;
  width: 60%;
  padding: 16px;
  padding-top: 200px;
  display: flex;
`

export default function About(): JSX.Element {
  const {id} = useParams<{id: getSpecialistVariables['id']}>()
  // Only editable to Specialist owner'
  return (
    <Container>
      <Wrapper>
        <Column>
          <Picture />
          <Box>
            <Map />
          </Box>
        </Column>
        <Details>
          <SpecialistInfo id={id} />
        </Details>
      </Wrapper>
      {/* Only visible to Customer */}
      <Contact />
    </Container>
  )
}
