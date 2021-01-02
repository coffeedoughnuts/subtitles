import { gql, TypedDocumentNode, useQuery } from "@apollo/client"
import { Author } from "../components/author"
import { Authors } from "../types/Authors"
import { useRouter } from 'next/router'
import Head from 'next/head'

const query: TypedDocumentNode<Authors> = gql`
  query Authors {
    authors: author {
      id
      name
      image
    }
  }
`

export default function Index() {
  const router = useRouter()
  const { data } = useQuery(query)

  const onClick = (id: number) => () => {
    localStorage.setItem("authorId", id.toString())
    router.push("/write")
  }

  return (
    <>
      <Head>
        <meta name="viewport" content="width=device-width, initial-scale=1, maximum-scale=1,user-scalable=0" />
      </Head>
      <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100vh' }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
          {data?.authors.map(author => (
            <Author
              key={author.id}
              name={author.name}
              image={author.image}
              onClick={onClick(author.id)}
              size="10vw"
              minSize={80}
              style={{ margin: '2vw' }}
            />
          ))}
        </div>
      </div>
    </>
  )
}
