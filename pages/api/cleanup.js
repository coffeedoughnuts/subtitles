import fetch from 'node-fetch'

const query = `
  query NeedsRemoval {
    needs_removal {
      id
    }
  }
`

const mutation = `
  mutation DeleteMessage($id: Int!) {
    delete_message_by_pk(id: $id) {
      id
    }
  }
`

async function fetchGraphQL(operationsDoc, operationName, variables) {
  const result = await fetch(
    "https://subtitles.hasura.app/v1/graphql",
    {
      method: "POST",
      body: JSON.stringify({
        query: operationsDoc,
        variables: variables,
        operationName: operationName
      })
    }
  );

  return await result.json();
}

export default async function handler(req, res) {
  const response = await fetchGraphQL(query, "NeedsRemoval", undefined)
  const ids = response.data.needs_removal.map(node => node.id)
  res.statusCode = 200
  res.setHeader('Content-Type', 'application/json')
  if (ids.length < 1) {
    res.end(JSON.stringify({ ids: [] }))
  } else {
    await Promise.all(ids.map(async id => {
      await fetchGraphQL(mutation, "DeleteMessage", { id })
    }))
    res.end(JSON.stringify({ ids }))
  }
}