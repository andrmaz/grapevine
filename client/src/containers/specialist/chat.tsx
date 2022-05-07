import * as React from 'react'

import {
  GetSpecialistQueryVariables,
  MessageAddedDocument,
  MessageAddedSubscription,
  useMessagesForChatQuery,
} from '/__generated__/types'

import {MessageInput} from '@/screens/message/input'
import {MessagesList} from '@/screens/message/list'
import {QueryResult} from '@/components/results/query-result'
import styled from '@emotion/styled'
import {theme} from '@/themes'
import {useAuthState} from '@/services/auth/context'

export default function SpecialistChat({
  id,
}: GetSpecialistQueryVariables): JSX.Element {
  const {user} = useAuthState()
  const {subscribeToMore, loading, error, data} = useMessagesForChatQuery({
    variables: {
      from: user?.id || '',
      to: id,
    },
  })
  return (
    <Wrapper>
      <QueryResult loading={loading} error={error} data={data}>
        <MessagesList
          messages={data?.messagesForChat}
          subscribeToMessages={() =>
            subscribeToMore<MessageAddedSubscription>({
              document: MessageAddedDocument,
              updateQuery: (prev, {subscriptionData}) => {
                if (!subscriptionData.data) return prev
                const newMessage = subscriptionData.data.messageAdded
                return Object.assign({}, prev, {
                  messagesForChat: [...prev.messagesForChat, newMessage],
                })
              },
              onError: error => console.error(error.message),
            })
          }
        />
      </QueryResult>
      <MessageInput id={id} />
    </Wrapper>
  )
}

const Wrapper = styled.div`
  height: 100%;
  width: 100%;
  padding: 8px 4px;
  display: flex;
  flex-direction: column;
  ${theme.mode.dark} {
    color: var(--color-gray-10);
  }
`
