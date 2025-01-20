import { useState } from "react"

export default function TodoApp() {
  const [tasks, setTasks] = useState([])
  const [taskInput, setTaskInput] = useState("")
  const [filter, setFilter] = useState("All")

  const addTask = () => {
    if (taskInput.trim()) {
      setTasks([...tasks, { id: Date.now(), text: taskInput, completed: false, editing: false }])
      setTaskInput("")
    }
  }

  const toggleTaskCompletion = (id) => {
    setTasks(tasks.map(task => (task.id === id ? { ...task, completed: !task.completed } : task)))
  }

  const deleteTask = (id) => {
    setTasks(tasks.filter(task => task.id !== id))
  }

  const editTask = (id) => {
    setTasks(tasks.map(task => (task.id === id ? { ...task, editing: true } : { ...task, editing: false })))
  }

  const updateTask = (id, newText) => {
    setTasks(tasks.map(task => (task.id === id ? { ...task, text: newText, editing: false } : task)))
  }

  const filteredTasks = tasks.filter(task => {
    if (filter === "All") return true
    if (filter === "Active") return !task.completed
    if (filter === "Completed") return task.completed
    return true
  })

  return (
    <div className="container mx-auto px-4 py-8 min-h-screen flex items-center justify-center bg-secondary">
      <div className="bg-white p-8 rounded-lg shadow-lg w-full max-w-2xl">
        <h1 className="text-3xl font-bold mb-6 text-center text-red-600">Todo List App</h1>
        <div className="flex justify-center mb-4">
          <input
            type="text"
            value={taskInput}
            onChange={(e) => setTaskInput(e.target.value)}
            placeholder="Add a new task"
            className="border p-2 rounded-l w-full"
          />
          <button
            onClick={addTask}
            className="bg-red-600 text-white p-2 rounded-r hover:bg-red-500"
          >
            Add
          </button>
        </div>
        <div className="mb-4">
          <button
            onClick={() => setFilter("All")}
            className={`mr-2 ${filter === "All" ? "bg-red-600 text-white" : "bg-gray-300 text-black"} p-2 rounded hover:bg-red-400`}
          >
            All
          </button>
          <button
            onClick={() => setFilter("Active")}
            className={`mr-2 ${filter === "Active" ? "bg-primary text-white" : "bg-gray-300 text-black"} p-2 rounded hover:bg-red-600 hover:text-white`}
          >
            Active
          </button>
          <button
            onClick={() => setFilter("Completed")}
            className={`${filter === "Completed" ? "bg-primary text-white" : "bg-gray-300 text-black"} p-2 rounded hover:bg-red-600 hover:text-white`}
          >
            Completed
          </button>
        </div>
        <ul className="space-y-2">
          {filteredTasks.map(task => (
            <li key={task.id} className="flex items-center justify-between p-2 bg-gray-100 rounded">
              {task.editing ? (
                <input
                  type="text"
                  value={task.text}
                  onChange={(e) => updateTask(task.id, e.target.value)}
                  onBlur={() => updateTask(task.id, task.text)}
                  className="border p-2 rounded-l w-full"
                />
              ) : (
                <div className="flex items-center">
                  <input
                    type="checkbox"
                    checked={task.completed}
                    onChange={() => toggleTaskCompletion(task.id)}
                    className="mr-2"
                  />
                  <span className={task.completed ? "line-through" : ""}>{task.text}</span>
                </div>
              )}
              <div className="flex space-x-2">
                <button
                  onClick={() => editTask(task.id)}
                  className="bg-green-500 text-white p-2 rounded hover:bg-green-600"
                >
                  Edit
                </button>
                <button
                  onClick={() => deleteTask(task.id)}
                  className="bg-red-500 text-white p-2 rounded hover:bg-red-600"
                >
                  Delete
                </button>
              </div>
            </li>
          ))}
        </ul>
      </div>
    </div>
  )
}