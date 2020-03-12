export const commitsByRepo = `
  query CommitsByRepo($owner: String, $repo: String) {
    commitsByRepo(owner: $owner, repo: $repo){
      commit{
        message,
        comment_count,
        author {
          name,
          date
        }
      },
      url
    }
  }
`
