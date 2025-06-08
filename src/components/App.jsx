import AccountantBank from "./AccountantBank"
import LoginForm from "./LoginForm"
import NumbersGenerator from "./NumbersGenerator"
import QuantityPassengers from "./QuantityPassengers"
import WeatherAdvisor from "./WeatherAdvisor"


const App = () => {
	const usersData = [
		{
			id: 1,
			login: 'user-1',
			password: 'user-1'
		}, {
			id: 2,
			login: 'user-2',
			password: 'user-2'
		},
	]

	return (
		<>
			<div className="page">
				<div className="task task-pt-40">
					<div className="task-container">
						<h2 className="task-title title">Задача №1. Вводиться кількість пасажирів. Вивести:</h2>
						<ul className="task-list list-quantity">
							<li className="list-quantity-item">скільки потрібно автобусів (кожен автобус на 20 місць)</li>
							<li className="list-quantity-item">скільки пляшок води (кожному пасажиру 2 пляшки)</li>
							<li className="list-quantity-item">кільки бутербродів (кожному пасажиру 3 бутерброди)</li>
						</ul>
					</div>
				</div>
				<QuantityPassengers />
				<div className="task">
					<div className="task-container">
						<h2 className="task-title title">Задача 2. Вводиться номер місяця</h2>
						<div className="task-text text">
							<p>
								Автоматично виводити рекомендований одяг (зима – пальто, літо – шорти ….). Також автоматично виводити зображення з відповідним зображенням лісу (зима – ліс зі снігом, осінь – жовтий ліс, …)
							</p>
						</div>
					</div>
				</div>
				<WeatherAdvisor />
				<div className="task">
					<div className="task-container">
						<h2 className="task-title title">Задача 3. Задано початок та кінець діапазону</h2>
						<div className="task-text text">
							<p>
								При натисканні на кнопку випадковим чином генерувати значення з вказаного діапазону та відображати його
							</p>
						</div>
					</div>
				</div>
				<NumbersGenerator />
				<div className="task">
					<div className="task-container">
						<h2 className="task-title title">Задача 4. “Рахунок у банку”</h2>
						<ul className="task-list list-quantity">
							<li className="list-quantity-item">
								Спочатку сума дорівнює 0грн. Змінити суму у гривнях можна або зарахуванням на рахунок, або зняттям.
							</li>
							<li className="list-quantity-item">
								Сума автоматично переводиться у долари та євро (фіксований курс задається у data)
							</li>
							<li className="list-quantity-item">
								Можливість зарахувати суму (контролювати, щоб не була від’ємною)
							</li>
							<li className="list-quantity-item">
								Можливість зняти (щоб не можна зняти більше ніж є на рахунку)
							</li>
							<li className="list-quantity-item">
								При виконанні зняття і зарахування коштів вираховувати 3% від суми (відображати кількість відсотків автоматично)
							</li>
						</ul>
						<h4 className="task-title title title-small">При зміні суми :</h4>
						<ul className="task-list list-quantity">
							<li className="list-quantity-item">
								Якщо було зняття, то суму відображати червоним
							</li>
							<li className="list-quantity-item">
								Якщо було зарахування, то суму відображати зеленим
							</li>
							<li className="list-quantity-item">
								Якщо сума валюти менша за 100 то відображати червоним кольором, інакше - зеленим
							</li>
						</ul>
					</div>
				</div>
				<AccountantBank />
				<div className="task">
					<div className="task-container">
						<h2 className="task-title title">Задача 5.</h2>
						<div className="task-text text">
							<p>
								Додаток містить масив об’єктів (логін, пароль) --  існуючі логіни і паролі. Користувач вводить логін і пароль, а програма при натисненні на кнопку повідомляє чи може користувач бути авторизованим.
							</p>
							<p>
								Логіни: user-1, user-2
							</p>
							<p>
								Паролі: user-1, user-2
							</p>
						</div>
					</div>
				</div>
				<div className="login-page">
					<div className="login-page-container">
						<LoginForm data={usersData} />
					</div>
				</div>
			</div>
		</>
	)
}

export default App
