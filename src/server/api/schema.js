const { buildSchema } = require('graphql');

const schema = buildSchema(`
  type Query {
    allRepos: [Repo]
    repoById(owner: String, repo: String): Repo,
    userById(username: String): User,
    commitsByRepo(owner: String, repo: String, author: String, since: String, until: String): [Commit],
    pullsByRepo(owner: String, repo: String, author: String) : [Pull]
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
    url: String
  }

  type CommitSummary {
    message: String
    comment_count: Int
    author: Author
  }

  type Pull {
    created_at: String
  }

  type Author {
    name: String,
    email: String,
    date: String
  }
`);

module.exports = { schema }
