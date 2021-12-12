import * as React from 'react'

import SpecialistGrid from '@/components/specialist/grid'
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

const SideBar = styled.nav`
  width: 200px;
  height: 100%;
  position: fixed; /* Fixed Sidebar (stay in place on scroll) */
  z-index: 1; /* Stay on top */
  background-color: yellow;
  overflow-x: hidden; /* Disable horizontal scroll */
  ${theme.breakpoints.medium} {
    display: none;
  }
`
const Wrapper = styled.div`
  width: 568px;
  padding-left: 200px;
  ${theme.breakpoints.medium} {
    width: 100%;
    padding-left: 0;
  }
`
const SearchBar = styled.header`
  position: fixed; /* Fixed SearchBar (stay in place on scroll) */
  z-index: 1; /* Stay on top */
  height: 100px;
  width: 568px;
  border-bottom: 1px solid black;
  background-color: green;
  ${theme.breakpoints.medium} {
    width: 100%;
  }
`

export default function Dashboard(): JSX.Element {
  return (
    <Container>
      <SideBar />
      <Wrapper>
        <SearchBar />
        <SpecialistGrid />
      </Wrapper>
    </Container>
  )
}
