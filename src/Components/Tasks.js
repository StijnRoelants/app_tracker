import Task from "./Task";

const Tasks = ({tasks, setTasks, onDelete, onToggle}) => {

    return (
        <div>
            {tasks.map((task) => (
                <Task key={task.id} task={task} onDelete={() => onDelete(task.id)}
                onToggle={onToggle} />
            ))}
        </div>
    )

}

export default Tasks