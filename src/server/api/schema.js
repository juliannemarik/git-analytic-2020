const { buildSchema } = require('graphql');

const schema = buildSchema(`
  type Query {
    allRepos: [Repo]
    repoById(owner: String, repo: String): Repo,
    userById(username: String): User,
    commitsByRepo(owner: String, repo: String, author: String, since: String, until: String): [Commit],
  }

  type Repo {
    id: ID
    name: String
    owner: User
  }

  type User {
    id: ID
    login: String
    name: String
    avatar_url: String
  }

  type Commit {
    commit: CommitSummary,
    committer: User,
    url: String
  }

  type CommitSummary {
    message: String
    comment_count: Int
  }
`);

module.exports = { schema }
