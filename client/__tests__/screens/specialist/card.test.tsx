import * as React from 'react'

import {
  bs,
  catchPhrase,
  city,
  companyName,
  email,
  name,
  phone,
  street,
  suite,
  website,
  zipcode,
} from '/mocks/constants'
import {render, screen} from 'test-utils'

import {GetSpecialistQuery} from '/__generated__/types'
import {SpecialistCard} from '@/screens/specialist/card'

const props = {
  name,
  email,
  address: {city},
  company: {bs, name: companyName},
} as GetSpecialistQuery['specialistForAbout']

it('expects the specialist name to be present', () => {
  render(<SpecialistCard {...props} />)
  expect(screen.getByText(name)).toBeInTheDocument()
})
it('expects the specialist email to be present', () => {
  render(<SpecialistCard {...props} />)
  expect(screen.getByText(email)).toBeInTheDocument()
})
it('expects the specialist company city to be present', () => {
  render(<SpecialistCard {...props} />)
  expect(screen.getByText(city)).toBeInTheDocument()
})
it('expects the specialist company business to be present', () => {
  render(<SpecialistCard {...props} />)
  expect(screen.getByText(bs)).toBeInTheDocument()
})
it('expects the specialist company name to be present', () => {
  render(<SpecialistCard {...props} />)
  expect(screen.getByText(companyName)).toBeInTheDocument()
})
it('expects the specialist company street not to be present', () => {
  render(<SpecialistCard {...props} />)
  expect(screen.queryByText(street)).not.toBeInTheDocument()
})
it('expects the specialist company street to be present', () => {
  render(<SpecialistCard {...props} address={{city, street}} />)
  expect(screen.queryByText(street)).toBeInTheDocument()
})
it('expects the specialist company suite not to be present', () => {
  render(<SpecialistCard {...props} />)
  expect(screen.queryByText(suite)).not.toBeInTheDocument()
})
it('expects the specialist company suite to be present', () => {
  render(<SpecialistCard {...props} address={{city, suite}} />)
  expect(screen.queryByText(suite)).toBeInTheDocument()
})
it('expects the specialist company zipcode not to be present', () => {
  render(<SpecialistCard {...props} />)
  expect(screen.queryByText(zipcode)).not.toBeInTheDocument()
})
it('expects the specialist company zipcode to be present', () => {
  render(<SpecialistCard {...props} address={{city, zipcode}} />)
  expect(screen.queryByText(zipcode)).toBeInTheDocument()
})
it('expects the specialist company phone not to be present', () => {
  render(<SpecialistCard {...props} />)
  expect(screen.queryByText(phone)).not.toBeInTheDocument()
})
it('expects the specialist company phone to be present', () => {
  render(<SpecialistCard {...props} phone={phone} />)
  expect(screen.queryByText(phone)).toBeInTheDocument()
})
it('expects the specialist company website not to be present', () => {
  render(<SpecialistCard {...props} />)
  expect(screen.queryByText(website)).not.toBeInTheDocument()
})
it('expects the specialist company website to be present', () => {
  render(<SpecialistCard {...props} website={website} />)
  expect(screen.queryByText(website)).toBeInTheDocument()
})
it('expects the specialist company catch phrase not to be present', () => {
  render(<SpecialistCard {...props} />)
  expect(screen.queryByText(catchPhrase)).not.toBeInTheDocument()
})
it('expects the specialist company catch phrase to be present', () => {
  render(
    <SpecialistCard {...props} company={{bs, name: companyName, catchPhrase}} />
  )
  expect(screen.queryByText(catchPhrase)).toBeInTheDocument()
})
