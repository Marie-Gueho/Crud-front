
import './style.css';

const Button = ({ className, type, onClickBtn, value, content, reference }) => (
	<button
		className={className}
		type={type}
		onClick={onClickBtn}
		value={value}
		ref={reference}>
		{content}
	</button>
)



export default Button;