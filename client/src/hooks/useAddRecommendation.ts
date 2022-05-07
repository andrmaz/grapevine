import {
  AddRecommendationMutationHookResult,
  GetSpecialistQuery,
  useAddRecommendationMutation,
} from '/__generated__/types'

import gql from 'graphql-tag'

export const useAddRecommendation = (
  data: GetSpecialistQuery['specialistForAbout']
): AddRecommendationMutationHookResult => {
  return useAddRecommendationMutation({
    variables: {id: data.id},
    update(cache) {
      cache.modify({
        fields: {
          recommendationsForDashboard(
            existingRecommendations = [],
            {readField}
          ) {
            const newRecommendationRef = cache.writeFragment({
              data,
              fragment: gql`
                fragment Recommendation on Specialist {
                  id
                  name
                }
              `,
            })
            // Quick safety check - if the new recommendation is already
            // present in the cache, we don't need to add it again.
            if (
              existingRecommendations.some(
                (ref: {id: string}) => readField('id', ref) === data.id
              )
            ) {
              return existingRecommendations
            }
            return [...existingRecommendations, newRecommendationRef]
          },
        },
      })
    },
  })
}
