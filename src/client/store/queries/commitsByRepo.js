export const commitsByRepo = `
  query CommitsByRepo($owner: String, $repo: String) {
    commitsByRepo(owner: $owner, repo: $repo){
      commit{
        message,
        comment_count
      },
      committer{
        login,
        avatar_url
      },
      url
    }
  }
`
