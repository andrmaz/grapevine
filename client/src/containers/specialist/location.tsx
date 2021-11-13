import * as React from 'react'

import {GeolocationFields} from '/__generated__/GeolocationFields'
import {gql} from '@apollo/client'
import styled from '@emotion/styled'

/*
 * Query to get latitude and longitude of the specialist's location
 * (exported for tests)
 */
export const GEOLOCATION_FIELDS = gql`
  fragment GeolocationFields on Geo {
    lat
    lng
  }
`

const Box = styled.section`
  height: 280px;
  width: 100%;
  margin-left: -24px;
`

const Map = styled.div`
  height: 100%;
  width: 100%;
  border: 1px solid;
`

export const SpecialistLocation = ({
  geo,
}: {
  geo: GeolocationFields
}): JSX.Element => {
  return (
    <Box>
      <Map>{JSON.stringify(geo, null, 2)}</Map>
    </Box>
  )
}

SpecialistLocation.fragments = {
  specialist: GEOLOCATION_FIELDS,
}
