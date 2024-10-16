export const settings = {
	apiDomain:
		process.env.NODE_ENV === 'production'
			? 'https://ggclan-backend-gsaqgrbxamgraxa7.canadacentral-01.azurewebsites.net/v1'
			: 'http://localhost:5229/v1',
	redirectUri:
		process.env.NODE_ENV === 'production' ? 'https://www.ggclan.net' : 'http://localhost:5173'
};
