import { dev } from '$app/environment';

export async function handle({ event, resolve }) {
    // In development, we need to ensure platform.env is available
    if (dev && !event.platform?.env?.DB) {
        // Create a mock platform object for development
        event.platform = {
            env: {
                DB: null // This will be handled by Wrangler in dev mode
            }
        };
    }
    
    return await resolve(event);
}
