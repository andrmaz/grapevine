import * as React from 'react'

import {sizes} from '@/styles/sizes'
import styled from '@emotion/styled'

const Container = styled.div`
  width: ${sizes.header.width}px;
  min-height: calc(100vh - ${sizes.header.height}px - 3px);
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
`
const Wrapper = styled.div`
  width: 568px;
  height: 100%;
  padding-left: 200px;
`
const SearchBar = styled.header`
  position: fixed; /* Fixed SearchBar (stay in place on scroll) */
  z-index: 1; /* Stay on top */
  width: 568px;
  height: 100px;
  border-bottom: 1px solid black;
  background-color: green;
`
const Grid = styled.div`
  width: 568px;
  height: auto;
  display: grid;
  grid-template-rows: repeat(auto-fill, minmax(200px, 1fr));
  grid-template-columns: repeat(auto-fill, minmax(150px, 1fr));
  justify-items: center;
  align-items: center;
  gap: 8px;
  padding-top: 100px;
  margin: 8px 0;
`

const Item = styled.div`
  width: 180px;
  height: 200px;
  background-color: tomato;
`

export default function Dashboard(): JSX.Element {
  return (
    <Container>
      <SideBar />
      <Wrapper>
        <SearchBar />
        <Grid>
          <Item />
          <Item />
          <Item />
          <Item />
          <Item />
          <Item />
          <Item />
          <Item />
          <Item />
          <Item />
          <Item />
          <Item />
          <Item />
          <Item />
          <Item />
        </Grid>
      </Wrapper>
    </Container>
  )
}