import { useState } from "react"

const NumbersGenerator = ({ initStartRange = 0, initEndRange = 250 }) => {

	const [randomValue, setRandomValue] = useState(null)
	const [isErrorStartRange, setIsErrorStartRange] = useState(false)
	const [isErrorEndRange, setIsErrorEndRange] = useState(false)
	const [range, setRange] = useState(() => (
		{
			start: initStartRange,
			end: initEndRange
		}
	))
	const regExp = /[^\d-]/

	const handleRangeChange = e => {
		const target = e.target
		const nameField = target.name
		let value = target.value

		if (regExp.test(value))
			value = value.replace(regExp, '')

		setRange({ ...range, [nameField]: value })

		switch (nameField) {
			case 'start':
				if (!value) setIsErrorStartRange(`Required field!`)
				else setIsErrorStartRange('')
				break
			case 'end':
				if (!value) setIsErrorEndRange(`Required field!`)
				else setIsErrorEndRange('')
				break
		}
	}

	const generateValue = () => {
		const startRange = parseInt(range.start)
		const endRange = parseInt(range.end)

		if (!startRange && startRange !== 0 || !endRange && endRange !== 0)
			return
		else if (startRange > endRange) {
			setIsErrorStartRange('The start of the gap should not be more than its end!')
			return
		} else setIsErrorStartRange('')

		setRandomValue(getRandomValue(startRange, endRange))
	}

	const getRandomValue = (minValue, maxValue) => {
		return Math.floor(Math.random() * (maxValue - minValue + 1) + minValue)
	}

	const createError = text => <div className="error">{text}</div>

	const result = randomValue || randomValue === 0 ?
		<div className="form-result">
			The number is generate: <span>{randomValue}</span>
		</div>
		: null

	const { start, end } = range


	return (
		<div className="range">
			<div className="range-container">
				<div className="range-form form">
					<div className="form-items">
						<div className="form-row">
							<label htmlFor="start-range" className="form-label label">The start of the range</label>
							<input
								className="form-input input"
								type="text"
								name='start'
								value={start}
								id="start-range"
								onChange={handleRangeChange}
								placeholder="Type here"
							/>
							{isErrorStartRange && createError(isErrorStartRange)}
						</div>
						<div className="form-row">
							<label htmlFor="end-range" className="form-label label">The end of the diagram</label>
							<input
								className="form-input input"
								type="text"
								name='end'
								value={end}
								id="end-range"
								onChange={handleRangeChange}
								placeholder="Type here"
							/>
							{isErrorEndRange && createError(isErrorEndRange)}
						</div>
					</div>
					{result}
					<button className="form-button button" onClick={generateValue} type="button">Generate value</button>
				</div>

			</div>
		</div>
	)

}


export default NumbersGenerator
