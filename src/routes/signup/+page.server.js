import { redirect } from '@sveltejs/kit';
import { createUser } from '$lib/db/queries.js';
import { hashPassword, generateSessionToken, createSessionExpiry } from '$lib/auth/utils.js';
import { createSession } from '$lib/db/queries.js';

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

        if (password.length < 6) {
            return {
                error: 'Password must be at least 6 characters long'
            };
        }

        // Check if database is available
        if (!platform?.env?.DB) {
            return {
                error: 'Database connection not available. Please try again.'
            };
        }

        try {
            // Hash the password
            const passwordHash = await hashPassword(password);
            
            // Create the user in the database
            const user = await createUser(platform.env.DB, email, passwordHash);
            
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
            console.error('Signup error:', error);
            
            // Check if it's a unique constraint error (email already exists)
            if (error.message && (
                error.message.includes('UNIQUE constraint failed') || 
                error.message.includes('users.email') ||
                error.cause?.message?.includes('UNIQUE constraint failed')
            )) {
                return {
                    error: 'An account with this email already exists'
                };
            }
            
            // Check if it's a redirect (which shouldn't be caught as error)
            if (error.status === 302) {
                throw error; // Re-throw redirect
            }
            
            return {
                error: 'An error occurred during signup. Please try again.'
            };
        }
    }
};
