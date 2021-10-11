import { useEffect, useState, useCallback } from 'react'

export const useSearch = (query: string, pageNumber: number) => {

  const REACTT_APP_GITHUB_ACCESS_TOKEN: string = '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'

  const [loading, setLoading] = useState<boolean>(true)
  const [error, setError] = useState<string>("")
  const [hasNextPage, setHasNextPage] = useState<boolean>(true)
  const [queryAfter, setQueryAfter] = useState<string>('')
  const [repos, setRepos] = useState<repoType[]>([])

  const fetchRepo = useCallback((after: string) => {

    if (query.length < 3) {
      setLoading(false)
      return
    }
    setLoading(true)
    fetch('https://api.github.com/graphql', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${REACTT_APP_GITHUB_ACCESS_TOKEN}`
      },
      body: JSON.stringify({
        query: `
          {
            search(query: "${query}", type: REPOSITORY,  first: 30 ${after ? ', after: "' + after + '"' : ''}) {
              repositoryCount
              edges {
                cursor
                node {
                  ... on Repository {
                    id
                    name
                    createdAt
                    homepageUrl
                    owner {
                      login
                      avatarUrl
                    }
                    url
                  }
                }
              }
              pageInfo {
                hasNextPage
                endCursor
              }
            }
          }
            `,
      }),
    })
      .then((res) => res.json())
      .then((res) => {
        setRepos((prevRepos: repoType[]) => {
          const set = new Set([...prevRepos, ...res.data.search.edges])
          const array = Array.from(set)
          return (array)
        })
        setQueryAfter(res.data.search.pageInfo.endCursor)
        setHasNextPage(res.data.search.pageInfo.hasNextPage)
        setLoading(false)

      })
      .catch((err: Error) => {
        setError(err.message)
        setLoading(false)
      })
  }, [queryAfter, query])


  useEffect(() => {
    setRepos([])
    setQueryAfter('')
    fetchRepo("")
    setError('')
  }, [query])

  useEffect(() => {
    if (repos.length && hasNextPage) fetchRepo(queryAfter)
  }, [pageNumber])

  return ({ repos, loading, error, hasNextPage })
}


