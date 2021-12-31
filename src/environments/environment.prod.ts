export const environment = {
  production: true,
  apiUrl: 'https://api-genealogia.herokuapp.com',
  tokenAllowedDomains: [ new RegExp('agile-fjord-35937.herokuapp') ],
  tokenDisallowedRoutes: [ new RegExp('\/oauth\/token')]
}
