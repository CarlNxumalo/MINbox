import fetch from 'node-fetch';
import { HUGAPI } from '$env/static/private';
// @ts-ignore
export async function scores(data) {
	const response = await fetch(
		"https://api-inference.huggingface.co/models/sentence-transformers/paraphrase-multilingual-MiniLM-L12-v2",
		{
			headers: { Authorization: HUGAPI },
			method: "POST",
			body: JSON.stringify(data),
		}
	);
	const result = await response.json();
	return result;
}
