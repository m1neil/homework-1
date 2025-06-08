import { useState } from "react"

const QuantityPassengers = ({ min = 1, initValue = 1 }) => {
	const message = 'Not calculated!'
	const [valueInput, setValueInput] = useState(() => initValue)
	const [amountBus, setAmountBus] = useState(message)
	const [amountBottleWater, setBottleWater] = useState(message)
	const [amountSandwiches, setAmountSandwiches] = useState(message)
	const [valueInputError, setValueInputError] = useState('')
	const regExp = /\D/

	const PLACES_BUS = 20
	const WATER_BOTTLE_PER_PERSON = 2
	const SANDWICHES_PER_PERSON = 3

	const handleValueInputChange = e => {
		let value = e.target.value
		if (regExp.test(value)) {
			value = value.replace(regExp, '')
			return
		}
		setValueInput(parseInt(value) < min ? min : value)
	}

	const submitForm = e => {
		e.preventDefault()
		if (!valueInput) {
			setValueInputError('Required field!')
			setAmountBus(message)
			setBottleWater(message)
			setAmountSandwiches(message)
			return
		} else setValueInputError('')
		setAmountBus(Math.ceil(valueInput / PLACES_BUS))
		setBottleWater(valueInput * WATER_BOTTLE_PER_PERSON)
		setAmountSandwiches(valueInput * SANDWICHES_PER_PERSON)
	}

	const removeError = () => {
		setValueInputError('')
	}

	return (
		<div className="quantity">
			<div className="quantity-container">
				<div className="quantity-body">
					<form className="quantity-form form" onSubmit={submitForm} action="#">
						<div className="form-row">
							<label htmlFor="quantity-passengers" className="form-label label">Amount Passengers</label>
							<input
								name="quantity-passengers"
								id="quantity-passengers"
								className="form-input input"
								type="text"
								value={valueInput}
								onChange={handleValueInputChange}
								onFocus={removeError}
							/>
							{valueInputError && <div className="error">{valueInputError}</div>}
						</div>
						<div className="form-row">
							<div className="form-label label">Information</div>
							<ul className="quantity-list list-quantity">
								<li className="list-quantity-item">Amount bus - <span>{amountBus}</span></li>
								<li className="list-quantity-item">Amount bottle of water - <span>{amountBottleWater}</span></li>
								<li className="list-quantity-item">Amount Sandwiches - <span>{amountSandwiches}</span></li>
							</ul>
						</div>

						<button className="form-button button" type="submit">Calculate</button>
					</form>

				</div>
			</div>
		</div>
	)
}

export default QuantityPassengers