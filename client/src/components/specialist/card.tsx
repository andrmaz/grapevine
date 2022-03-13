import * as React from 'react'

import {GetSpecialistQuery} from '/__generated__/types'
import styled from '@emotion/styled'
import {theme} from '@/themes'

export const SpecialistCard = ({
  name,
  email,
  address: {street, suite, city, zipcode},
  phone,
  website,
  company: {bs, catchPhrase, name: company},
}: GetSpecialistQuery['specialistForAbout']): JSX.Element => {
  return (
    <Wrapper>
      <Header>
        <h2>{name}</h2>
        <h5>{company}</h5>
      </Header>
      <Information>
        <div>
          <span>{catchPhrase}</span>
          <span>{bs}</span>
          <span>{website}</span>
        </div>
        <p>
          <span>{street}</span>
          <span>{suite}</span>
          <span>{city}</span>
          <span>{zipcode}</span>
        </p>
      </Information>
      <Contacts>
        <span>{email}</span>
        <span>{phone}</span>
      </Contacts>
    </Wrapper>
  )
}

  const Wrapper = styled.article`
    height: 100%;
    width: 100%;
    padding: 32px;
    margin: 0;
    margin-left: -32px;
    border: 1px solid black;
    z-index: 1;
    ${theme.mode.dark} {
      color: var(--color-gray-10);
    }
  `
  const Header = styled.header`
    width: 100%;
    height: 30%;
  `
  const Information = styled.section`
    width: 100%;
    height: 50%;
  `
  const Contacts = styled.aside`
    width: 100%;
    height: 20%;
  `