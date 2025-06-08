import { useState } from "react"
import iconEyeClose from '../img/icons/eye-close.svg'
import iconEyeOpen from '../img/icons/eye-open.svg'

const LoginForm = ({ data }) => {
	const [isShowPassword, setIsShowPassword] = useState(false)
	const [login, setLogin] = useState('')
	const [password, setPassword] = useState('')
	const [loginError, setLoginError] = useState('')
	const [passwordError, setPasswordError] = useState('')
	const [entranceError, setEntranceError] = useState('')
	const [isAccessAllowed, setIsAccessAllowed] = useState(false)

	const handleShowPasswordChange = () => {
		setIsShowPassword(prevIsShowPassword => !prevIsShowPassword)
	}

	const handleLoginChange = e => {
		setLogin(e.target.value)
	}

	const handlePasswordChange = e => {
		setPassword(e.target.value)
	}

	const handleFocusChange = e => {
		const nameField = e.target.name
		if (nameField === 'login')
			setLoginError('')
		else setPasswordError('')
	}

	const submitForm = e => {
		e.preventDefault()
		if (!isValidData()) return
		const isAccessAllowed = data.some(user => user.login === login && user.password === password)
		if (!isAccessAllowed)
			setEntranceError('Not the right login or password!')
		else {
			setEntranceError('')
			setIsAccessAllowed(true)
		}
	}

	const isValidData = () => {
		if (!login) setLoginError('The required field!')
		else setLoginError('')

		if (!password) setPasswordError('The required field!')
		else setPasswordError('')

		return !login || !password ? false : true
	}

	const createError = text => <div className="form-error error">{text}</div>

	if (isAccessAllowed) {
		return (
			<div className="access">Access is allowed!</div>
		)
	}

	return (
		<form onSubmit={submitForm} action="#" className="form">
			<div className="form-row">
				<label htmlFor="login" className="form-label">Login</label>
				<input
					className="form-input input"
					placeholder="Type here"
					type="text"
					id="login"
					name="login"
					value={login}
					onChange={handleLoginChange}
					onFocus={handleFocusChange}
				/>
				{loginError && createError(loginError)}
			</div>
			<div className="form-row">
				<label htmlFor="password" className="form-label">Password</label>
				<div className="form-button-icon">
					<input
						className="form-input input input-pr-45"
						placeholder="Type here" type={isShowPassword ? 'text' : 'password'}
						name="password"
						id="password"
						value={password}
						onChange={handlePasswordChange}
						onFocus={handleFocusChange}
					/>
					<button type="button" onClick={handleShowPasswordChange} className="form-button-show-hide">
						<img src={isShowPassword ? iconEyeOpen : iconEyeClose} alt="icon eye" />
					</button>
					{passwordError && createError(passwordError)}
				</div>
			</div>
			{entranceError && createError(entranceError)}
			<button className="login-button button" type="submit">log in!</button>
		</form>
	)
}

export default LoginForm