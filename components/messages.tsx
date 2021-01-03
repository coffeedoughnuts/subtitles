import { gql, TypedDocumentNode, useSubscription } from "@apollo/client";
import { CSSProperties, FC } from "react";
import { Messages as Subscription } from "../types/Messages";
import { Author } from "./author";

const subscription: TypedDocumentNode<Subscription> = gql`
  subscription Messages {
    recent(order_by: { timestamp: desc }) {
      id
      text
      author {
        id
        name
        image
      }
    }
  }
`

const messageStyle: CSSProperties = {
  display: 'flex',
}

const messageTextStyle: CSSProperties = {
  fontSize: 60,
  fontWeight: 800
}

export const Messages: FC = () => {
  const { data, loading } = useSubscription(subscription)
  const noMessages = !loading && ((data?.recent ?? []).length === 0)
  return (
    <div style={{ overflow: 'auto', flexGrow: 1 }}>
        {data?.recent?.map((message, i) => (
          <div key={message.id} style={{ ...messageStyle, opacity: i === 0 ? 1 : 0.3}}>
            <Author name={message.author.name} image={message.author.image} size={50} hideName />
            <span style={messageTextStyle}>
              {message.author.name} says: {message.text}
            </span>
          </div>
        ))}
        {loading && <span style={{ ...messageTextStyle, opacity: 0.1 }}>Loading...</span>}
        {noMessages && <span style={{ ...messageTextStyle, opacity: 0.1 }}>No one has said anything yet</span>}
    </div>
  )
}