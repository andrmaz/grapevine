import * as React from 'react'

import { Button } from '@/blocs/buttons/base'
import {GetSpecialistsQuery} from '/__generated__/types'
import styled from '@emotion/styled'
import {theme} from '@/themes'
import {useHistory} from 'react-router-dom'

export const SpecialistItem = ({
  id,
  name,
  address: {city},
  company: {bs},
}: GetSpecialistsQuery['specialistsForDashboard'][0]): JSX.Element => {
  const history = useHistory()
  const onClick = (): void => history.push(`/about/${id}`)
  return (
    <Item>
      <Header>
        <Avatar>
          <Image
            src={`https://avatars.dicebear.com/api/personas/${name}.svg`}
          />
        </Avatar>
      </Header>
      <Information>
        <Name>{name}</Name>
        <Business>{bs}</Business>
        <Address>{city}</Address>
      </Information>
      <Contact>
        <Button onClick={onClick}>See more</Button>
      </Contact>
    </Item>
  )
}

const Item = styled.article`
  width: 100%;
  height: 200px;
  border: 1px solid;
  padding: 8px;
  letter-spacing: 1px;
  background-color: var(--color-orange);
  border-radius: 4px;
  z-index: 1;
  ${theme.mode.dark} {
    background-color: var(--color-blue);
  }
  ${theme.motion.enabled} {
    transition: transform 500ms ease-out;
    transition-delay: 100ms;
    &:hover {
      z-index: 2;
      transform: scale(1.1);
      transition: transform 250ms;
      transition-delay: 100ms;
    }
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
  background-color: var(--color-gray-10);
  overflow: hidden;
`
const Image = styled.img`
  height: 100%;
  width: 100%;
  object-fit: cover;
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
  text-transform: capitalize;
  ${theme.mode.dark} {
    color: var(--color-gray-10);
  }
`
const Name = styled.p`
  font-weight: 800;
`
const Business = styled.p``
const Address = styled.p``
const Contact = styled.aside`
  width: 100%;
  height: 20%;
  display: flex;
  justify-content: center;
  align-items: center;
`
