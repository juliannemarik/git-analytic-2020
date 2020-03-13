export const contributorsByRepo = `
  query ContributorsByRepo($owner: String, $repo: String) {
    contributorsByRepo(owner: $owner, repo: $repo){
      login,
      avatar_url,
      contributions
    }
  }
`
