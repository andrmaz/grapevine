import 'mapbox-gl/dist/mapbox-gl.css'

import * as React from 'react'

import {Marker, StaticMap} from 'react-map-gl'

import {GeolocationFields} from '/__generated__/GeolocationFields'
import {MapPin} from 'react-feather'
import {gql} from '@apollo/client'
import styled from '@emotion/styled'
import {theme} from '@/themes'

const MAPBOX_TOKEN = import.meta.env.VITE_MAPBOX_TOKEN as string
const MAPBOX_STYLE = import.meta.env.VITE_MAPBOX_STYLE as string

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

const Wrapper = styled.section`
  height: 280px;
  width: 100%;
  margin-left: -24px;
`

export const SpecialistLocation = ({
  geo: {lat, lng},
}: {
  geo: GeolocationFields
}): JSX.Element => {
  const latitude = Number(lat)
  const longitude = Number(lng)
  return (
    <Wrapper>
      <StaticMap
        mapboxApiAccessToken={MAPBOX_TOKEN}
        width={280}
        height={280}
        latitude={latitude}
        longitude={longitude}
        zoom={8}
        preventStyleDiffing
        mapStyle={MAPBOX_STYLE}
      >
        <Marker
          latitude={latitude}
          longitude={longitude}
          offsetLeft={-20}
          offsetTop={-10}
        >
          <MapPin size={16} color={theme.colors.danger} />
        </Marker>
      </StaticMap>
    </Wrapper>
  )
}

SpecialistLocation.fragments = {
  specialist: GEOLOCATION_FIELDS,
}
