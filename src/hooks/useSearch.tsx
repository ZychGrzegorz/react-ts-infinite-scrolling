import { useEffect, useState, useCallback } from 'react'
// import axios from 'axios'
// type useSearch = {
//     query: string,
//     after: string,
//     first: string
// }
type repos = any
export const useSearch = (query: string, pageNumber: number) => {
  const REACTT_APP_GITHUB_ACCESS_TOKEN = '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'
  const [loading, setLoading] = useState<boolean>(true)
  const [error, setError] = useState<string>("")
  const [hasNextPage, setHasNextPage] = useState<boolean>(true)
  const [queryAfter, setQueryAfter] = useState<string>('')
  const [repos, setRepos] = useState<any>([])
 
    const fetchRepo = useCallback((after: string | undefined) => {

    if(query.length<3){
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
            search(query: "${query}", type: REPOSITORY,  first: 25 ${after ? ', after: "' + after + '"' : ''}) {
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

        setRepos((prevRepos: any) => {
          const set = new Set([...prevRepos, ...res.data.search.edges])
          const array = Array.from(set)
          return (array)
        })
       
        setQueryAfter(res.data.search.pageInfo.endCursor)
        setHasNextPage(res.data.search.pageInfo.hasNextPage)
        setLoading(false)

      })
      .catch((err) => {
        setError((err as Error).message)
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
    if(repos.length && hasNextPage) fetchRepo(queryAfter)
  }, [pageNumber])

  return ({ repos, loading, error, hasNextPage })
}


