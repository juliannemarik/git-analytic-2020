export const pullsByRepo = `
  query PullsByRepo($owner: String, $repo: String) {
    pullsByRepo(owner: $owner, repo: $repo){
      created_at
    }
  }
`
