import { PUBLIC_PHOTOBOOTH_URL } from '$env/static/public';

export async function POST({ request, fetch, cookies }) {
	const data = await request.json();
	const objects = data.objects;
	const folderName = data.folderName;

	console.log('objects', objects);
	console.log('folderName', folderName);
	const token = cookies.get('token');
	const response = await fetch(`${PUBLIC_PHOTOBOOTH_URL}/generate_presigned`, {
		method: 'POST',
		headers: {
			'Content-Type': 'application/json',
			Authorization: `${token}`
		},
		body: JSON.stringify({ objects, folderName })
	});
	console.log('Request Sent', response);
	return response;
}
