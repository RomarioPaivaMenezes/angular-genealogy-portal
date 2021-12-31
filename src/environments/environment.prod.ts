export const environment = {
  production: true,
  apiUrl: 'https://api-genealogia.herokuapp.com',
  tokenAllowedDomains: [ new RegExp('api-genealogia.herokuapp.com') ],
  tokenDisallowedRoutes: [ new RegExp('/\/oauth\/token')]
}
