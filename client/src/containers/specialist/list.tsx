import {gql, useQuery} from '@apollo/client'
import styled from '@emotion/styled'
import {theme} from '@/themes'
import {SpecialistGrid} from '@/components/specialist/grid'
import SearchBar from '@/lib/bars/search'
import * as React from 'react'
import {
  getSpecialists,
  getSpecialists_specialistsForDashboard,
} from '/__generated__/getSpecialists'

const GET_SPECIALISTS = gql`
  query getSpecialists {
    specialistsForDashboard {
      id
      name
      address {
        city
      }
      company {
        bs
      }
    }
  }
`

const Wrapper = styled.div`
  width: 568px;
  padding-left: 200px;
  ${theme.breakpoints.medium} {
    width: 100%;
    padding-left: 0;
  }
`

export const SpecialistList = (): JSX.Element => {
  const {loading, error, data} = useQuery<getSpecialists>(GET_SPECIALISTS)
  const [specialists, setSpecialists] = React.useState<
    getSpecialists_specialistsForDashboard[] | undefined
  >(() => data?.specialistsForDashboard)
  const [search, setSearch] = React.useState<string>('')
  React.useEffect(() => {
    setSpecialists(
      data?.specialistsForDashboard?.filter(specialist =>
        specialist.company.bs.includes(search)
      )
    )
  }, [data?.specialistsForDashboard, search])
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
