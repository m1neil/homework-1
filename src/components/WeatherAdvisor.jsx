import { useState } from "react"

const WeatherAdvisor = () => {
	const [numberMonth, setNumberMonth] = useState(1)
	const MIN_NUMBER_MONTH = 1
	const MAX_NUMBER_MONTH = 12

	const seasons = {
		autumn: {
			imgSrc: 'https://dovidka.biz.ua/wp-content/uploads/2022/09/rechennya-pro-osin.jpg',
			recommendClothes: 'Autumn jacket'
		},
		winter: {
			imgSrc: 'https://img.freepik.com/free-photo/breathtaking-view-forest-covered-with-snow-sunset-norway_181624-37864.jpg?semt=ais_items_boosted&w=740',
			recommendClothes: 'Winter Coat'
		},
		spring: {
			imgSrc: 'https://pibig.info/uploads/posts/2021-06/1623091455_1-pibig_info-p-pozdnyaya-vesna-priroda-krasivo-foto-1.jpg',
			recommendClothes: 'Spring jacket'
		},
		summer: {
			imgSrc: 'https://yedyni.org/wp-content/uploads/2023/06/znimok-ekrana-2023-06-05-o-14.15.50-1170x650.png',
			recommendClothes: 'Shorts'
		},
		placeholder: {
			imgSrc: 'https://developers.elementor.com/docs/assets/img/elementor-placeholder-image.png',
			recommendClothes: 'placeholder'
		}
	}

	const handleNumberMonthChange = (e) => {
		let value = e.target.value
		if (!value) {
			setNumberMonth('')
			return
		}
		setNumberMonth(checkRange(value))
	}

	const checkRange = value => {
		value = parseInt(value)
		if (value > MAX_NUMBER_MONTH)
			value = MIN_NUMBER_MONTH
		else if (value < MIN_NUMBER_MONTH)
			value = MAX_NUMBER_MONTH
		return value
	}

	const getNameSeason = numberMonth => {
		if (!numberMonth) return 'placeholder'

		let season
		if (numberMonth <= 2 || numberMonth === 12)
			season = 'winter'
		else if (numberMonth <= 5)
			season = 'spring'
		else if (numberMonth <= 8)
			season = 'summer'
		else season = 'autumn'

		return season
	}


	const nameSeason = getNameSeason(numberMonth)
	const { imgSrc, recommendClothes } = seasons[nameSeason]

	return (
		<div className="advisor">
			<div className="advisor-container">
				<div className="advisor-form form">
					<div className="form-row">
						<label htmlFor="number-month" className="form-label">
							Number of month:
						</label>
						<input
							className="form-input input"
							onChange={handleNumberMonthChange}
							value={numberMonth}
							name="number-month"
							id="number-month"
							type="number"
						/>
					</div>
				</div>
				<div className="advisor-recommend">
					Recommended clothes: <span>{recommendClothes}</span>
				</div>
				<img className="advisor-img" src={imgSrc} alt={nameSeason} />
			</div>
		</div>
	)
}

export default WeatherAdvisor
