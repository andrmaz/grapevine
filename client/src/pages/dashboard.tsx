import * as React from 'react'

import styled from '@emotion/styled'
import {theme} from '@/themes'
import {SpecialistList} from '@/containers/specialist/list'

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

export default function Dashboard(): JSX.Element {
  return (
    <Container>
      <SideBar />
      <SpecialistList />
    </Container>
  )
}
