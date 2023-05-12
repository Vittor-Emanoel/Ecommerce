interface User {
  id: String,
  firstName: string,
  lastName: string
  email: string,
  provider: 'firebase' | 'google.com',
}

export default User
