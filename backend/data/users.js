import bcrypt from 'bcryptjs'

const users = [
  {
     name: 'Admin User',
     email: 'admin@example.com',
     password: bcrypt.hashSync('123456', 10),
     isAdmin: true
  },
  {
    name: 'Eric Jackson',
    email: 'eric@example.com',
    password: bcrypt.hashSync('123456', 10)
 },
 {
    name: 'James Black',
    email: 'james@example.com',
    password: bcrypt.hashSync('123456', 10),
 },
]
export default users