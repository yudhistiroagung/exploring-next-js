import Link from 'next/link';

import di from '@/di';

const {
  usecases: { getTodosUseCase },
} = di;

import { TodoToggle } from './todo-toggle';

export default async function Home() {
  const todos = await getTodosUseCase();

  const todoItems = () => (
    <tbody>
      {todos.map((todo, index) => (
        <tr key={todo.id}>
          <th>{index + 1}</th>
          <td>{todo.name}</td>
          <td>{todo.isFinished ? 'Done' : 'To do'}</td>
          <td className="">
            <TodoToggle todo={todo} />
          </td>
        </tr>
      ))}
    </tbody>
  );

  const table = () => (
    <table className="table table-sm ">
      <thead>
        <tr>
          <th></th>
          <th>Name</th>
          <th>Status</th>
          <th className="flex justify-center">Action</th>
        </tr>
      </thead>
      {todoItems()}
    </table>
  );

  return (
    <main className="container m-auto flex flex-1 flex-col items-center p-4 gap-4">
      <h1>My Todo List</h1>
      {table()}
      <button className="btn btn-primary btn-sm self-end">
        <Link href="/add-todo">Add Todo</Link>
      </button>
    </main>
  );
}
