import * as React from 'react'

import {sizes} from '@/styles/sizes'
import styled from '@emotion/styled'

const Container = styled.div`
  width: ${sizes.header.width}px;
  min-height: calc(100vh - ${sizes.header.height}px - 3px);
  margin: auto;
  padding: 32px;
  border-style: solid;
  border-width: 0 1px;
`

const Wrapper = styled.main`
  height: 800px;
  width: 100%;
  display: flex;
  margin-bottom: 16px;
`

const Contact = styled.aside`
  height: 50px;
  width: 100%;
  background-color: yellow;
`

const Picture = styled.aside`
  height: 100%;
  width: 40%;
  display: flex;
`
const Info = styled.article`
  height: 100%;
  width: 60%;
  padding: 16px;
  padding-top: 200px;
  display: flex;
`

const Image = styled.section`
  height: 250px;
  width: 100%;
  background-color: red;
  z-index: 999;
`

const Card = styled.section`
  height: 100%;
  width: 100%;
  padding: 32px;
  margin: 0 -32px;
  background-color: orange;
  z-index: 1;
`

export default function About(): JSX.Element {
  return (
    <Container>
      <Wrapper>
        <Picture>
          <Image />
        </Picture>
        <Info>
          <Card />
        </Info>
      </Wrapper>
      <Contact />
    </Container>
  )
}
