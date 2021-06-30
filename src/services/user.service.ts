const users = require(process.env.DEPLOYMENT_USERS || '../../users.json')

/**
 * @desc   Retrieve user (without password)
 */
export const get = (username: string) => {
  if (username in users) {
    const { password, ...user } = (users as any)[username]
    return { username, ...user }
  }
  return null
}

/**
 * @desc   Authenticate user from username and password
 */
export const authenticate = (username: string, password: string) => {
  if (username in users) {
    const { password: userPassword } = (users as any)[username]
    return password === userPassword
  }
  return false
}

export const hasPermission = (user: any, environment: string, target: string) => {
  if ( !(environment in user.permissions) ) {
    return false
  }
  if ( !user.permissions[environment].includes(target) ) {
    return false
  }
  return true
}
