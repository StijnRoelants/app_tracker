import {useState, useEffect} from "react";
import {useParams, Link} from "react-router-dom";
import Button from "./Button";

const TaskDetail = () => {
    const [loading, setLoading] = useState(true)
    const [task, setTask] = useState({})
    const [error, setError] = useState(null)

    const params = useParams()

    useEffect(() => {
        const fetchTask = async () => {
            const res = await fetch(`http://localhost:5000/tasks/${params.id}`)
            const data = await res.json()

            if (res.status === 404) {
                setError('Task not found')
                console.log(error)
            }

            setTask(data)
            setLoading(false)
        }

        fetchTask()
    },[params.id, error])



    if (error !== null) {
        return (
            <div>
                <h2>{error}</h2>
                <br/>
                <Link to='/'><Button text='Back' color={'black'}> </Button></Link>
            </div>
        )
    }
    else {
        return loading ? (
            <h3>Loading</h3>
        ) : (

            <div>
                <h2>{task.text}</h2>
                <h3>{task.day}</h3>
                <br/>
                <Link to='/'><Button text='Back' color={'black'}> </Button></Link>
            </div>

        )
    }

}

export default TaskDetail