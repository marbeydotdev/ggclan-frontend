export const settings = {
	apiDomain:
		process.env.NODE_ENV === 'production'
			? 'https://ggclan.net/api/v1'
			: 'http://localhost:5229/v1',
	redirectUri:
		process.env.NODE_ENV === 'production' ? 'https://www.ggclan.net' : 'http://localhost:5173'
};
