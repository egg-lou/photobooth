import { PUBLIC_PHOTOBOOTH_URL } from '$env/static/public';

export async function POST({ request, fetch }) {
	const data = await request.json();
	console.log(data);

	const response = await fetch(`${PUBLIC_PHOTOBOOTH_URL}/create_request`, {
		method: 'POST',
		headers: {
			'Content-Type': 'application/json'
		},
		body: JSON.stringify(data)
	});

	console.log('Create Request...', data)
	return response;
}
