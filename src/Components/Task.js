import { FaTimes } from "react-icons/fa";
import Moment from 'moment';

const Task = ({task, onDelete, onToggle}) => {
    const dateFormat = Moment(task.day).format('DD-MM-YYYY')

    return (
        <div className={`task ${task.reminder ? 'reminder' : ''}`} onDoubleClick={() => onToggle(task.id)} >
            <h3>
                {task.text}
                <FaTimes style={{color: 'red', cursor: 'pointer'}} onClick={onDelete}/>
            </h3>
            <p>{dateFormat}</p>
        </div>
    )

}

export default Task