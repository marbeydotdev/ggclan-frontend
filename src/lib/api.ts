const apiUrl = "http://localhost:5229/"

export type SearchResult = {name: string, iconUrl: string, gameId: string}

export async function gameSearch(query: string): Promise<Array<SearchResult>>{

	const request = await fetch(apiUrl + 'game/list?' + new URLSearchParams({ query: query }));
	return await request.json()
}