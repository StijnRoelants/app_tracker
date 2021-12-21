import {useState} from "react";
import {BrowserRouter as Router, Route, Routes} from "react-router-dom";
import {useEffect} from "react";
import Header from "./Components/Header";
import Tasks from "./Components/Tasks";
import AddTask from "./Components/AddTask";
import Footer from "./Components/Footer";
import About from "./About";
import TaskDetail from "./Components/TaskDetail";

function App() {
    const [tasks, setTasks] = useState([])
    const [showAddTask, setShowAddTask] = useState(false)

    useEffect(() => {
        const  getTasks = async  () => {
            const taskFromServer = await fetchTasks()
            setTasks(taskFromServer)
        }

        getTasks()
    },[])

    // fetch tasks
    const fetchTasks = async () => {
        const res = await fetch('http://localhost:5000/tasks')
        const data = await res.json()

        return data
    }

    // fetch single task
    const fetchSingleTask = async (id) => {
        const res = await fetch(`http://localhost:5000/tasks/${id}`)
        const data = await res.json()

        return data
    }

    // delete task
    const deleteTask = async (id) => {
        await fetch(`http://localhost:5000/tasks/${id}`, {
            method: "DELETE"
        })

        setTasks(tasks.filter((task) => task.id !== id))
    }

    // Toggle Reminder
    const toggleReminder = async (id) => {
        const findTask = await fetchSingleTask(id)
        const update = {...findTask, reminder: !findTask.reminder}

        const res = await fetch(`http://localhost:5000/tasks/${id}`, {
            method: 'PUT',
            headers: {
                'content-type': 'application/json'
            },
            body: JSON.stringify(update)

        })

        const data = await res.json()

        setTasks(tasks.map((task) => task.id === id ? {...task, reminder: data.reminder} : task))
    }

    // Add Task
    const addTask = async (task) => {
        const res = await fetch('http://localhost:5000/tasks', {
            method: 'POST',
            headers: {
                'Content-type': 'application/json'
            },
            body: JSON.stringify(task)
        })

        const data = await res.json()

        setTasks([...tasks, data])
    }

  return (
      <Router>
        <div className="container">
            <Header onAdd={() => setShowAddTask(!showAddTask)} showAddTask={showAddTask}/>

            <Routes>
                <Route path='/' element={
                    <>
                        {showAddTask && <AddTask onAdd={addTask}/>}
                        {tasks.length > 0 ? <Tasks tasks={tasks} setTasks={setTasks} onDelete={deleteTask}
                                                   onToggle={toggleReminder} /> : 'Nothing to see here'}
                    </>} />
                <Route path='/about' element={<About/>}/>
                <Route path='/task/:id' element={<TaskDetail/>}/>
            </Routes>
            <Footer />
        </div>
      </Router>
  );
}

export default App;
