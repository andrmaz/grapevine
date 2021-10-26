import * as React from 'react'

import {getSpecialist_specialistForAbout} from '/__generated__/getSpecialist'
import styled from '@emotion/styled'

const Item = styled.div`
  width: 180px;
  height: 200px;
  border: 1px solid;
`

const SpecialistItem = ({
  id,
  name,
  company,
  industry,
  location,
  avatar,
  email,
}: getSpecialist_specialistForAbout): JSX.Element => {
  console.log({id, name, company, industry, location, avatar, email})
  return <Item />
}

export default SpecialistItem
