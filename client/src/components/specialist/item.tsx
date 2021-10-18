import * as React from 'react'

import {Query_specialistsForDashboard} from '/__generated__/Query'
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
}: Query_specialistsForDashboard): JSX.Element => {
  return <Item>{JSON.stringify({id, name, company, industry}, null, 2)}</Item>
}

export default SpecialistItem
