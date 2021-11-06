import * as React from 'react'

import {Link} from 'react-router-dom'
import {getSpecialists_specialistsForDashboard} from '/__generated__/getSpecialists'
import styled from '@emotion/styled'
import {theme} from '@/styles/theme'

const Item = styled.article`
  width: 176px;
  height: 200px;
  border: 1px solid;
  padding: 8px;
  letter-spacing: 1px;
  background-color: ${theme.colors.orange};
  border-radius: 4px;
  z-index: 1;
  &:hover {
    z-index: 2;
    transform: scale(1.1);
  }
`
const Header = styled.header`
  width: 100%;
  height: 30%;
`
const Avatar = styled.div`
  height: 48px;
  width: 48px;
  margin: auto;
  border-radius: 50%;
  background-color: ${theme.colors.gray10};
`

const Information = styled.main`
  width: 100%;
  height: 50%;
  display: flex;
  flex-direction: column;
  justify-content: space-around;
  align-items: center;
  text-align: center;
  font-size: 0.8rem;
`
const Name = styled.p``
const Business = styled.p``
const Address = styled.p``

const Contact = styled.aside`
  width: 100%;
  height: 20%;
  display: flex;
  justify-content: center;
  align-items: center;
`
const Button = styled.button`
  background-color: ${theme.colors.indigo};
  border-radius: 8px;
  cursor: pointer;
  &:hover {
    background-color: ${theme.colors.indigoDarken10};
  }
`
const StyledLink = styled(Link)`
  font-size: 0.7rem;
  color: ${theme.colors.base};
  text-decoration: none;
`

const SpecialistItem = ({
  id,
  name,
  address: {city},
  company: {bs},
}: getSpecialists_specialistsForDashboard): JSX.Element => {
  return (
    <Item>
      <Header>
        <Avatar />
      </Header>
      <Information>
        <Name>{name}</Name>
        <Business>{bs}</Business>
        <Address>{city}</Address>
      </Information>
      <Contact>
        <Button>
          <StyledLink to={`/about/${id}`}>See all information</StyledLink>
        </Button>
      </Contact>
    </Item>
  )
}

export default SpecialistItem
