/* eslint-disable camelcase */
const get = require('lodash/get');
const axios = require('axios');
const qs = require('qs');

const baseURL = "https://api.github.com";

const resolvers = {
  allRepos: () => {
    return axios.get(`${baseURL}/repositories`)
      .then( response => get(response, 'data', []));
  },
  repoById: (args) => {
    const { owner, repo } = args;
    return axios.get(`${baseURL}/repos/${owner}/${repo}`)
      .then(response => get(response, 'data', {}));
  },
  userById: (args) => {
    const { username } = args;
    return axios.get(`${baseURL}/users/${username}`)
      .then(response => get(response, 'data', {}));
  },
  commitsByRepo: (args) => {
    const { owner, repo, author, since, until } = args;

    const queryParams = {
      per_page: 100,
      ...(author && { author }),
      ...(since && { since }),
      ...(until && { until }),
    };
    const queryString = qs.stringify(queryParams);

    return axios.get(`${baseURL}/repos/${owner}/${repo}/commits?${queryString}`)
      .then(response => get(response, 'data', []));
  },
  pullsByRepo: (args) => {
    const { owner, repo, author } = args;

    const queryParams = {
      per_page: 100,
      ...(author && { author })
    };
    const queryString = qs.stringify(queryParams);

    return axios.get(`${baseURL}/repos/${owner}/${repo}/pulls?${queryString}`)
      .then(response => get(response, 'data', []));
  }
};

module.exports = {
  resolvers
}
