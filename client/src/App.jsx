import React, { useEffect, useState } from "react";

function App() {
  const [todo, setTodo] = useState([]);
  const [title, setTitle] = useState("");
  const [update, setUpdate] = useState(false);
  const [isUpdated, setIsUpdated] = useState(false);
  const [id, setId] = useState("")

  useEffect(() => {
    try {
      const getallTodos = async () => {
        const res = await fetch("/api/get-all-todo");
        if (res.ok) {
          const data = await res.json();
          setTodo(data.todos);
        }
      };
      getallTodos();
    } catch (error) {
      console.log(error.message);
    }
  }, [isUpdated]);

  const handleDelete = async (id) => {
    try {
      const res = await fetch(`/api/delete-todo/${id}`, { method: "DELETE" });
      if (res.ok) {
        const newTodo = todo.filter((t) => t._id !== id);
        setTodo(newTodo);
      }
    } catch (error) {
      console.log(error.message);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const form = e.target;
    try {
      form.reset();
      const response = await fetch("/api/create-new-todo", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ title }),
      });

      if (response.ok) {
        const newTodo = await response.json();
        setTodo((prevTodos) => [newTodo, ...prevTodos]);
      } else {
        // Handle non-OK responses
        console.error("Failed to create a new todo");
      }
    } catch (error) {
      console.error("Error:", error);
    }
  };

  const handleEdit = async (id) => {
    try {
      console.log(id);
      setUpdate(true);
      setId(id)
    } catch (error) {
      console.log(error);
    }
  };

  const handleUpdate = async (e) => {
    e.preventDefault()
    console.log(id)
    try {
      const response = await fetch("/api/update-todo/" + id, {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ title }),
      });
      setIsUpdated(true);
      const data = await response.json()
      console.log(data)
    } catch (error) {
      
    }

  }



 console.log(title);

  return (
    <div className="w-full flex items-center flex-col">
      <div className="w-3/4">
        <div className="text-2xl  font-semibold text-center my-10">
          Todo App
        </div>
        <div className="flex w-full justify-between">
          <form
            onSubmit={handleSubmit}
            className="flex w-full  justify-start  items-center gap-5"
          >
            <input
              onChange={(e) => setTitle(e.target.value)}
              className="w-3/6 border-2 border-blue-400 rounded-md p-3 shadow-md"
              type="text"
              placeholder="Write a todo..."
              required
            />
            <button
              type="submit"
              className="font-semibold px-5 py-2 bg-blue-400 rounded-md shadow-md"
            >
              Add
            </button>
          </form>
          {update && <form
            onSubmit={handleUpdate}
            className="flex w-full  justify-end  items-center gap-5"
          >
            <input
              onChange={(e) => setTitle(e.target.value)}
              value={!update ? title : undefined}
              className="w-3/6 border-2 border-blue-400 rounded-md p-3 shadow-md"
              type="text"
              placeholder="Write a todo..."
              required
            />
            <button
              type="submit"
              className="font-semibold px-5 py-2 bg-blue-400 rounded-md shadow-md"
            >
              Add
            </button>
          </form> }
        </div>
        <section className="mt-5 border-2 rounded-xl p-5 border-black flex w-full m-auto flex-col gap-5">
          {todo.length > 0 ? (
            todo.map((todo, i) => (
              <div key={i} className="flex items-center justify-between  p-2">
                <p className="font-semibold w-3/4 ">{todo.title}</p>
                <button
                  onClick={() => handleDelete(todo._id)}
                  className="bg-red-600 p-3 rounded-md shadow-md"
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                    strokeWidth={1.5}
                    stroke="currentColor"
                    className="size-6"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="m14.74 9-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 0 1-2.244 2.077H8.084a2.25 2.25 0 0 1-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 0 0-3.478-.397m-12 .562c.34-.059.68-.114 1.022-.165m0 0a48.11 48.11 0 0 1 3.478-.397m7.5 0v-.916c0-1.18-.91-2.164-2.09-2.201a51.964 51.964 0 0 0-3.32 0c-1.18.037-2.09 1.022-2.09 2.201v.916m7.5 0a48.667 48.667 0 0 0-7.5 0"
                    />
                  </svg>
                </button>
                <button
                  onClick={() => handleEdit(todo._id)}
                  className="bg-yellow-400 p-3 rounded-md shadow-md"
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                    strokeWidth={1.5}
                    stroke="currentColor"
                    className="size-6"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="m16.862 4.487 1.687-1.688a1.875 1.875 0 1 1 2.652 2.652L10.582 16.07a4.5 4.5 0 0 1-1.897 1.13L6 18l.8-2.685a4.5 4.5 0 0 1 1.13-1.897l8.932-8.931Zm0 0L19.5 7.125M18 14v4.75A2.25 2.25 0 0 1 15.75 21H5.25A2.25 2.25 0 0 1 3 18.75V8.25A2.25 2.25 0 0 1 5.25 6H10"
                    />
                  </svg>
                </button>
              </div>
            ))
          ) : (
            <div className="text-center text-gray-600 text-xl">
              You Have No Todoes!
            </div>
          )}
        </section>
      </div>
    </div>
  );
}

export default App;
