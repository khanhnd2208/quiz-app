<script>
    import { enhance } from '$app/forms';
    
    export let form;
</script>

<svelte:head>
    <title>Sign Up - Quiz App</title>
</svelte:head>

<div class="container">
    <div class="signup-form">
        <h1>Create Your Account</h1>
        <p>Join our quiz app to start learning!</p>
        
        {#if form?.error}
            <div class="error">
                {form.error}
            </div>
        {/if}
        
        <form method="POST" use:enhance>
            <div class="form-group">
                <label for="email">Email Address</label>
                <input 
                    type="email" 
                    id="email" 
                    name="email" 
                    required 
                    placeholder="Enter your email"
                />
            </div>
            
            <div class="form-group">
                <label for="password">Password</label>
                <input 
                    type="password" 
                    id="password" 
                    name="password" 
                    required 
                    minlength="6"
                    placeholder="Enter your password (min 6 characters)"
                />
            </div>
            
            <button type="submit" class="submit-btn">
                Create Account
            </button>
        </form>
        
        <p class="login-link">
            Already have an account? 
            <a href="/login">Sign in here</a>
        </p>
    </div>
</div>

<style>
    .container {
        display: flex;
        justify-content: center;
        align-items: center;
        min-height: 100vh;
        padding: 20px;
        background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
    }
    
    .signup-form {
        background: white;
        padding: 40px;
        border-radius: 10px;
        box-shadow: 0 10px 25px rgba(0, 0, 0, 0.1);
        width: 100%;
        max-width: 400px;
    }
    
    h1 {
        text-align: center;
        color: #333;
        margin-bottom: 10px;
        font-size: 28px;
    }
    
    p {
        text-align: center;
        color: #666;
        margin-bottom: 30px;
    }
    
    .form-group {
        margin-bottom: 20px;
    }
    
    label {
        display: block;
        margin-bottom: 5px;
        color: #333;
        font-weight: 500;
    }
    
    input {
        width: 100%;
        padding: 12px;
        border: 2px solid #e1e1e1;
        border-radius: 5px;
        font-size: 16px;
        transition: border-color 0.3s;
        box-sizing: border-box;
    }
    
    input:focus {
        outline: none;
        border-color: #667eea;
    }
    
    .submit-btn {
        width: 100%;
        padding: 12px;
        background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
        color: white;
        border: none;
        border-radius: 5px;
        font-size: 16px;
        font-weight: 600;
        cursor: pointer;
        transition: transform 0.2s;
    }
    
    .submit-btn:hover {
        transform: translateY(-2px);
    }
    
    .login-link {
        text-align: center;
        margin-top: 20px;
    }
    
    .login-link a {
        color: #667eea;
        text-decoration: none;
        font-weight: 500;
    }
    
    .login-link a:hover {
        text-decoration: underline;
    }
    
    .error {
        background: #fee;
        color: #c33;
        padding: 10px;
        border-radius: 5px;
        margin-bottom: 20px;
        border: 1px solid #fcc;
    }
</style>
