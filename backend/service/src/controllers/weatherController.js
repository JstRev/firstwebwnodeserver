const fetch = require('node-fetch'); // npm install node-fetch@2

const API_KEY = process.env.OPENWEATHER_API_KEY || '11285f08bb363a34dda96432d5c6eb8b';

exports.weatherController = async (req, res) => {
	try {
		const city = (req.body && req.body.city) || req.query.city;
		if (!city) {
			return res.status(400).json({ error: true, message: 'Parametro "city" mancante' });
		}

		const url = `https://api.openweathermap.org/data/2.5/weather?q=${encodeURIComponent(
			city
		)}&appid=${API_KEY}&units=metric&lang=it`;

		const response = await fetch(url);
		const data = await response.json();

		if (!response.ok || data.cod !== 200) {
			const message = data.message || 'Città non trovata';
			return res.status(response.status === 200 ? 404 : response.status).json({ error: true, message });
		}

		return res.json({
			city: data.name,
			description: data.weather && data.weather[0] && data.weather[0].description,
			icon: data.weather && data.weather[0] && data.weather[0].icon,
			temperature: data.main && data.main.temp,
			humidity: data.main && data.main.humidity,
			wind: data.wind && data.wind.speed
		});
	} catch (err) {
		console.error('weatherController error:', err);
		return res.status(500).json({ error: true, message: 'Errore nel server' });
	}
};