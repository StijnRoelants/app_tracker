import ButtonComp from "./Button";
import {useLocation} from "react-router-dom";


const Header = ({title, onAdd, showAddTask}) => {
    const onClick =  () => {
        console.log("click")
    }

    const location = useLocation()

    return (
        <header className='header'>
            <h1 >{title}</h1>
            { location.pathname === '/' && <ButtonComp color={showAddTask ? 'red' : 'green'} text={showAddTask ? 'Close' : 'Add'} onClick={onAdd}/>}
        </header>
    )
  
}

Header.defaultProps = {
    title: 'Task Tracker'
}

export default Header