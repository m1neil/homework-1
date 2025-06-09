import { useEffect, useState } from "react"

const AccountantBank = ({
	usdRate = 42,
	euroRate = 49,
	taxService = 3,
	minAmountReplenishment = 1,
	minWithdrawalAmount = 20 }
) => {
	const [sumAccount, setSumAccount] = useState(0)
	const [valueAccrual, setValueAccrual] = useState('') // сума зарахування
	const [valueWithdraw, setValueWithdraw] = useState('') // сума зняття
	const [sumForServices, setSumForServices] = useState(0)
	const [errorValueWithdraw, setErrorValueWithdraw] = useState('')
	const [errorValueAccrual, setErrorValueAccrual] = useState('')
	const [typeEvent, setTypeEvent] = useState(null)
	const regExp = /[^\d.]/

	useEffect(() => {
		updateSumForServices(valueAccrual)
	}, [valueAccrual])

	useEffect(() => {
		updateSumForServices(valueWithdraw)
	}, [valueWithdraw])

	useEffect(() => {
		if (!typeEvent) return
		const timeout = setTimeout(() => setTypeEvent(null), 3000)
		return () => clearTimeout(timeout)
	}, [sumAccount])

	const updateSumForServices = value => {
		const valueParse = parseFloat(value)
		setSumForServices(isNaN(valueParse) ? 0 : getSumCommission(valueParse))
	}

	const handleValueAccrual = e => {
		try {
			setValueAccrual(validateValue(e.target.value))
		} catch (error) {
			console.error(error.message)
		}
	}

	const handleValueWithdraw = e => {
		try {
			setValueWithdraw(validateValue(e.target.value))
		} catch (error) {
			console.error(error.message)
		}
	}

	const validateValue = value => {
		if (regExp.test(value))
			throw new TypeError("Not a number!")
		return value
	}

	const currencyConverter = (currency = 'usd') => {
		let convertedCurrency
		switch (currency.toLowerCase()) {
			case 'usd': convertedCurrency = sumAccount / usdRate; break
			case 'euro': convertedCurrency = sumAccount / euroRate; break
			default: throw TypeError('Not provided for currency!')
		}
		return convertedCurrency
	}

	const withdrawMoney = () => {
		if (!valueWithdraw) {
			setErrorValueWithdraw(`Required field!`)
			return
		}

		const sumWithdraw = parseFloat(valueWithdraw)
		const costService = getSumCommission(sumWithdraw)

		if (sumWithdraw + costService > sumAccount) {
			setErrorValueWithdraw('The account is not enough money! Do not forget to take into account the commission!')
		} else if (sumWithdraw < minWithdrawalAmount) {
			setErrorValueWithdraw(`The minimum removal amount ${minWithdrawalAmount} UAH.`)
		} else {
			const totalSumWithdraw = sumWithdraw + costService

			setSumAccount(prevSumAccount => prevSumAccount - totalSumWithdraw)
			setValueWithdraw('')
			setErrorValueWithdraw('')
			setTypeEvent('withdraw')
		}
	}

	const replenishMoney = () => {
		if (!valueAccrual) {
			setErrorValueAccrual(`Required field!`)
			return
		}

		const sumAccrual = parseFloat(valueAccrual)

		if (sumAccrual < minAmountReplenishment)
			setErrorValueAccrual(`The minimum amount of replenishment ${minAmountReplenishment} UAH`)
		else {
			const costService = getSumCommission(sumAccrual)
			const totalSumAccrual = sumAccrual - costService

			setSumAccount(prevSumAccount => prevSumAccount + totalSumAccrual)
			setValueAccrual('')
			setErrorValueAccrual('')
			setTypeEvent('replenish')
		}
	}

	const getSumCommission = value => {
		return value * taxService / 100
	}

	const getColorSum = () => {
		return !typeEvent ? 'inherit' : typeEvent === 'withdraw' ? 'withdraw' : 'set'
	}

	const getColorCurrency = currency => {
		return currency < 100 ? 'red' : 'green'
	}

	const handleFocusChange = e => {
		const nameField = e.target.name
		if (nameField === 'value-withdraw')
			setErrorValueWithdraw('')
		else setErrorValueAccrual('')
	}

	const createError = (text = 'error') => {
		return <div className="form-error error">{text}</div>
	}

	const sumInUsd = currencyConverter('usd')
	const sumInEuro = currencyConverter('euro')

	return (
		<div className="account">
			<div className="account-container">
				<div className="account-sum">Amount on account:
					<span className={getColorSum()}>{sumAccount.toFixed(2)}</span> UAH
				</div>
				<div className="account-form form">
					<div className="form-row">
						<label htmlFor="value-accrual" className="form-label label">Enroll in an account</label>
						<input className="form-input input" onChange={handleValueAccrual} onFocus={handleFocusChange} name="value-accrual" id="value-accrual"
							value={valueAccrual}
							type="text"
							placeholder="Type here"
						/>
						{errorValueAccrual && createError(errorValueAccrual)}
						<button
							className="form-button button"
							onClick={replenishMoney}
							type="button"
						>
							Set money
						</button>
					</div>
					<div className="form-row">
						<label htmlFor="value-withdraw" className="form-label label">Withdraw money from in an account!</label>
						<input
							className="form-input input"
							onChange={handleValueWithdraw}
							onFocus={handleFocusChange}
							name="value-withdraw"
							id="value-withdraw"
							value={valueWithdraw}
							type="text"
							placeholder="Type here"
						/>
						{errorValueWithdraw && createError(errorValueWithdraw)}
						<button
							className="form-button button"
							onClick={withdrawMoney}
							type="button"
						>
							Withdraw money
						</button>
					</div>
				</div>
				<ul className="account-list list-quantity">
					<li className="list-quantity-item">Service fees: {sumForServices.toFixed(2)} UAH</li>
					<li className="list-quantity-item">
						Amount in dollars: <span className={getColorCurrency(sumInUsd)}>${sumInUsd.toFixed(2)}</span>
					</li>
					<li className="list-quantity-item">
						Amount in euros: <span className={getColorCurrency(sumInEuro)}>€{sumInEuro.toFixed(2)}</span>
					</li>
				</ul>
			</div>
		</div>
	)
}

export default AccountantBank