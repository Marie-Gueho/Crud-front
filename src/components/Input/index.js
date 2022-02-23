import './style.css';

const Input = ({ className, name, type, placeholder, onChangeField }) => (
	<input
		className={className}
		type={type}
		name={name}
		placeholder={placeholder}
		onChange={onChangeField}
	>
	</input>
)



export default Input;