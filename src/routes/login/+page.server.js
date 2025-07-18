import { redirect } from '@sveltejs/kit';
import { getUserByEmail, createSession } from '$lib/db/queries.js';
import { verifyPassword, generateSessionToken, createSessionExpiry } from '$lib/auth/utils.js';

export const actions = {
    default: async ({ request, platform, cookies }) => {
        const data = await request.formData();
        const email = data.get('email');
        const password = data.get('password');

        // Basic validation
        if (!email || !password) {
            return {
                error: 'Email and password are required'
            };
        }

        // Check if database is available
        if (!platform?.env?.DB) {
            return {
                error: 'Database connection not available. Please try again.'
            };
        }

        try {
            // Find the user by email
            const user = await getUserByEmail(platform.env.DB, email);
            
            if (!user) {
                return {
                    error: 'Invalid email or password'
                };
            }
            
            // Verify the password
            const isValidPassword = await verifyPassword(password, user.password_hash);
            
            if (!isValidPassword) {
                return {
                    error: 'Invalid email or password'
                };
            }
            
            // Create a session
            const sessionToken = generateSessionToken();
            const expiresAt = createSessionExpiry();
            await createSession(platform.env.DB, user.id, sessionToken, expiresAt);
            
            // Set the session cookie
            cookies.set('session', sessionToken, {
                path: '/',
                httpOnly: true,
                secure: false, // Set to true in production
                sameSite: 'lax',
                maxAge: 60 * 60 * 24 * 7 // 7 days
            });
            
            // Redirect to homepage
            throw redirect(302, '/');
            
        } catch (error) {
            console.error('Login error:', error);
            
            // Check if it's a redirect (which shouldn't be caught as error)
            if (error.status === 302) {
                throw error; // Re-throw redirect
            }
            
            return {
                error: 'An error occurred during login. Please try again.'
            };
        }
    }
};
