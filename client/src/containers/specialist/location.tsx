import * as React from 'react'

import {Geo, GeolocationFieldsFragmentDoc} from '/__generated__/types'
import {MAPBOX_STYLE, MAPBOX_TOKEN} from '@/helpers/constants'
import {Marker, StaticMap} from 'react-map-gl'

import {MapPin} from 'react-feather'
import styled from '@emotion/styled'
import {theme} from '@/themes'

export const SpecialistLocation = ({
  geo: {lat, lng},
}: {
  geo: Geo
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
  specialist: GeolocationFieldsFragmentDoc,
}

const Wrapper = styled.section`
  height: 280px;
  width: 100%;
  margin-left: -24px;
`
