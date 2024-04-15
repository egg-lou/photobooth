import { PUBLIC_PHOTOBOOTH_URL } from '$env/static/public';
import { json } from '@sveltejs/kit';

export async function POST({ request, cookies, fetch }) {
	const data = await request.json();

	const response = await fetch(`${PUBLIC_PHOTOBOOTH_URL}/login`, {
		method: 'POST',
		headers: {
			'Content-Type': 'application/json'
		},
		body: JSON.stringify(data)
	});

	const responseData = await response.json();

	cookies.set('token', responseData.token, { path: '/' });
	console.log('Admin Login...');
	console.log(responseData.message);

	return json({ message: responseData.message });
}
