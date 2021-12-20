const ButtonComp = ({color, text, onClick}) => {
  return <button style={{backgroundColor: color}}
                 onClick={onClick}
                 className='btn'>{text}</button>
}

ButtonComp.defaultProps = {
    color: 'black',
    text: 'Button'
}

export default ButtonComp