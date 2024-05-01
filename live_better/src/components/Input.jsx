

const Input = ({type, placeholder, id, onchange}) => {
  return  <input type={type} className='p-3 rounded-lg border' placeholder={placeholder} id={id} onChange={onchange} />
}

export default Input ;
