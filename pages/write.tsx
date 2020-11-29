import { gql, TypedDocumentNode, useMutation, useQuery } from "@apollo/client";
import { useRouter } from "next/router";
import { ChangeEvent, KeyboardEvent, useEffect, useMemo, useState } from "react";
import { Author } from "../components/author";
import { Messages } from "../components/messages";
import { CurrentAuthor, CurrentAuthorVariables } from "../types/CurrentAuthor";
import { WriteMessage, WriteMessageVariables } from "../types/WriteMessage";

function getAuthorId(): number | null {
  if (typeof window === 'undefined') {
    return null
  }
  const raw = localStorage.getItem("authorId");
  if (!raw) {
    return null;
  }
  return parseInt(raw);
}

const authorQuery: TypedDocumentNode<CurrentAuthor, CurrentAuthorVariables> = gql`
  query CurrentAuthor($id: Int!) {
    currentAuthor: author_by_pk(id: $id) {
      id
      name
      image
    }
  }
`

const writeMessage: TypedDocumentNode<WriteMessage, WriteMessageVariables> = gql`
  mutation WriteMessage($text: String!, $authorId: Int!) {
    insert_message_one(object: { text: $text, author_id: $authorId }) {
      id
    }
  }
`

export default function Write() {
  const router = useRouter();

  const currentAuthorId = useMemo(getAuthorId, [typeof window === 'undefined'])

  useEffect(() => {
    if (typeof window !== 'undefined' && currentAuthorId === null) {
      router.push("/")
    }
  }, [currentAuthorId])

  const { data } = useQuery(authorQuery, {
    variables: { id: currentAuthorId },
    skip: currentAuthorId === null
  });

  const currentAuthor = data?.currentAuthor

  const [text, setText] = useState("")

  const [mutate] = useMutation(writeMessage)

  const onChange = (e: ChangeEvent<HTMLInputElement>) => setText(e.target.value)

  const onKeyPress = (e: KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter') {
      mutate({ variables: { text, authorId: currentAuthorId }})
      setText("")
    }
  }

  const onAuthorClick = () => {
    localStorage.removeItem("authorId")
    router.push("/")
  }

  return (
    <div style={{ display: 'flex', flexFlow: 'column', height: '100vh' }}>
      <div style={{ display: 'flex', justifyContent: 'space-between' }}>
        <input value={text} onChange={onChange} onKeyPress={onKeyPress} style={{ fontSize: 40, fontWeight: 800, width: '100%', outline: 'none', margin: 10 }} />
        <Author name={currentAuthor?.name} image={currentAuthor?.image} size={50} hideName onClick={onAuthorClick} />
      </div>
      <Messages />
    </div>
  )

}