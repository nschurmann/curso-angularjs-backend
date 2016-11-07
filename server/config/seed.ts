/**
 * Populate DB with sample data on server start
 * to disable, edit config/environment/index.ts, and set `seedDB: false`
 */

import { Model as User, IUser } from '../api/user/user.model'
import { Model as Todo, ITodo } from '../api/todo/todo.model'
import { users, todos } from './seeddb'

/**
 * Load users: normal user, supervisor and admin
 */
function loadUsers () {
  return (<any>User.find({}).remove())
    .then(() => User.create(users))
    .then(loadTodos)
}

/**
 * load companies
 */
const loadTodos = (us: IUser[]) => {
  const updatedTodos = todos.map((c, i) =>
    Object.assign({}, c, { createdBy: us[i]._id }))

  return (<any>Todo.find({}).remove())
    .then(() => Todo.create(updatedTodos))
}

loadUsers()