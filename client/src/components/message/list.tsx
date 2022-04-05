import * as React from 'react'

import {Message} from '/__generated__/types'
import styled from '@emotion/styled'
import {useAuthState} from '@/services/auth/context'

type Props = {
  messages?: Message[]
  subscribeToMessages: () => void
}
export const MessagesList: React.FC<Props> = ({
  messages,
  subscribeToMessages,
}): JSX.Element => {
  const {user} = useAuthState()
  const ref = React.useRef<HTMLElement | null>(null)
  React.useLayoutEffect(() => ref.current?.scrollIntoView())
  React.useEffect(() => subscribeToMessages(), [subscribeToMessages])
  return (
    <Wrapper>
      {messages?.map(({id, content, from}, index, messages) => {
        const lastIndex = messages.length - 1
        const lastMessage = index === lastIndex
        const author = from === user?.id
        return lastMessage ? (
          <React.Fragment key={id}>
            {author ? (
              <Sent ref={ref}>{content}</Sent>
            ) : (
              <Received ref={ref}>{content}</Received>
            )}
          </React.Fragment>
        ) : (
          <React.Fragment key={id}>
            {author ? <Sent>{content}</Sent> : <Received>{content}</Received>}
          </React.Fragment>
        )
      })}
    </Wrapper>
  )
}

const Wrapper = styled.section`
  --thumb-color: var(--color-orange);
  --track-color: var(--color-base);
  flex: 1;
  overflow: auto;
  display: flex;
  flex-direction: column;
  padding: 0 4px;
  scrollbar-color: var(--thumb-color) var(--track-color);
  scrollbar-width: thin;
  ::-webkit-scrollbar {
    width: 8px;
    background-color: var(--track-color);
  }
  ::-webkit-scrollbar-thumb {
    border-radius: 1000px;
    background-color: var(--thumb-color);
    border: 2px solid var(--track-color);
  }
`
const Sent = styled.article`
  width: fit-content;
  max-width: 70%;
  padding: 1px 2px;
  margin: 4px 0;
  border: 2px solid;
  border-radius: 4px;
`
const Received = styled(Sent)`
  margin-left: auto;
`
