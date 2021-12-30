export const environment = {
  production: true,
  apiUrl: 'https://api-genealogia.herokuapp.com',
  tokenAllowedDomains: [ /api-genealogia.herokuapp.com/ ],
  tokenDisallowedRoutes: [/\/oauth\/token/]
}