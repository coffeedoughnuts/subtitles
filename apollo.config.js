module.exports = {
  client: {
    includes: ['./**/*.tsx'],
    service: {
      name: "Hasura",
      url: "https://subtitles.hasura.app/v1/graphql",
      skipSSLValidation: true
      // headers: {
      //   "x-hasura-admin-secret": "<your-admin-secret>"
      // }
    }
  }
};