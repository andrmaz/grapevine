import * as React from 'react'

import {GetSpecialistQueryVariables} from '/__generated__/types'
import {SpecialistInfo} from '@/containers/specialist/info'
import {Spinner} from '@/lib/loaders/spinner'
import styled from '@emotion/styled'
import {theme} from '@/themes'
import {useParams} from 'react-router'

const ContactBar = React.lazy(() => import('@/components/bar/contact'))

export default function About(): JSX.Element {
  const {id} = useParams<{id: GetSpecialistQueryVariables['id']}>()
  // Only editable to Specialist owner'
  return (
    <Container>
      <SpecialistInfo id={id} />
      {/* Only visible to Customer */}
      <React.Suspense fallback={<Spinner size='medium' />}>
        <ContactBar />
      </React.Suspense>
    </Container>
  )
}

const Container = styled.div`
  width: ${theme.sizes.header.width}px;
  min-height: calc(100% - ${theme.sizes.header.height}px - 3px);
  margin: auto;
  padding: 32px;
  border-style: solid;
`
