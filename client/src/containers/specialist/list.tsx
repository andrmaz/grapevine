import * as React from 'react'

import {GetSpecialistsQuery, useGetSpecialistsQuery} from '/__generated__/types'

import {SearchBar} from '@/components/bar/search'
import {SpecialistGrid} from '@/screens/specialist/grid'
import styled from '@emotion/styled'
import {theme} from '@/themes'

export const SpecialistList = (): JSX.Element => {
  const {loading, error, data} = useGetSpecialistsQuery()
  const _specialists = data?.specialistsForDashboard

  const [search, setSearch] = React.useState<string>('')
  const [specialists, setSpecialists] = React.useState<
    GetSpecialistsQuery['specialistsForDashboard'] | undefined
  >(() => _specialists)

  React.useEffect(() => {
    setSpecialists(
      _specialists?.filter(specialist =>
        specialist.company.bs.toLowerCase().includes(search)
      )
    )
  }, [_specialists, search])

  return (
    <Wrapper>
      <SearchBar search={search} setSearch={setSearch} />
      <SpecialistGrid
        loading={loading}
        error={error}
        specialists={specialists}
      />
    </Wrapper>
  )
}

const Wrapper = styled.div`
  width: 568px;
  padding-left: 200px;
  ${theme.breakpoints.medium} {
    width: 100%;
    padding-left: 0;
  }
`
