import bcrypt from 'bcryptjs';

// Hash a password
export async function hashPassword(password) {
    const saltRounds = 10;
    return await bcrypt.hash(password, saltRounds);
}

// Verify a password against its hash
export async function verifyPassword(password, hash) {
    return await bcrypt.compare(password, hash);
}

// Generate a random session token
export function generateSessionToken() {
    const array = new Uint8Array(32);
    crypto.getRandomValues(array);
    return Array.from(array, byte => byte.toString(16).padStart(2, '0')).join('');
}

// Create a session that expires in 7 days
export function createSessionExpiry() {
    const expiryDate = new Date();
    expiryDate.setDate(expiryDate.getDate() + 7);
    return expiryDate.toISOString();
}

// Check if session is expired
export function isSessionExpired(expiryDate) {
    return new Date() > new Date(expiryDate);
}
