import * as React from 'react'

import {Global, css} from '@emotion/react'

import {theme} from '@/themes'

function GlobalStyles(): JSX.Element {
  const {colors} = theme
  return (
    <Global
      styles={css`
        @media (pointer: coarse) {
          html {
            --min-tap-height: 44px;
          }
        }
        html {
          --color-base: ${colors.base};
          --color-text: ${colors.text};
          --color-gray: ${colors.gray};
          --color-gray-10: ${colors.gray10};
          --color-gray-20: ${colors.gray20};
          --color-gray-80: ${colors.gray80};
          --color-indigo: ${colors.indigo};
          --color-indigo-10: ${colors.indigoDarken10};
          --color-indigo-80: ${colors.indigoLighten80};
          --color-yellow: ${colors.yellow};
          --color-green: ${colors.green};
          --color-danger: ${colors.danger};
          --color-orange: ${colors.orange};
          --color-blue: ${colors.blue};
        }
      `}
    />
  )
}

export * from '@emotion/react'
export {GlobalStyles}
