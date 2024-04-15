import { redirect } from '@sveltejs/kit';
import { themes } from './lib/themes/index.js';

export const handle = async ({ resolve, event }) => {

	event.locals.message = 'AWSCC-PUP Photobooth is now running...'
	console.log(event.locals.message);

  const theme = event.cookies.get('theme');
  const token = event.cookies.get('token');

  if (token !== undefined) {
    event.locals.authenticated = true;
  } else {
    event.locals.authenticated = false;
  }

  if (event.url.pathname.startsWith('/admin') && !event.locals.authenticated) {
    throw redirect(303, '/login');
  }

  if (!theme || !themes.includes(theme)) {
    const response = await resolve(event);
    return response;
  }

  const response = await resolve(event, {
    transformPageChunk: ({ html }) => {
      return html.replace('data-theme=""', `data-theme="${theme}"`);
    }
  });

  return response;
};