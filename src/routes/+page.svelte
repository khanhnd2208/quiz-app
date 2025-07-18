<script>
    export let data;
</script>

<svelte:head>
    <title>Quiz App - Learn & Test Your Knowledge</title>
</svelte:head>

<div class="container">
    <header>
        <div class="header-content">
            <h1>Quiz App</h1>
            <div class="user-info">
                <span>Welcome, {data.user.email}!</span>
                <form action="/logout" method="POST" style="display: inline;">
                    <button type="submit" class="logout-btn">Logout</button>
                </form>
            </div>
        </div>
    </header>
    
    <main>
        <section class="classes-section">
            <h2>Available Classes</h2>
            <p>Choose a class to start learning and testing your knowledge!</p>
            
            {#if data.classes && data.classes.length > 0}
                <div class="classes-grid">
                    {#each data.classes as classItem}
                        <div class="class-card">
                            <h3>{classItem.name}</h3>
                            <p>{classItem.description}</p>
                            <a href="/class/{classItem.id}" class="class-link">
                                Start Learning →
                            </a>
                        </div>
                    {/each}
                </div>
            {:else}
                <div class="no-classes">
                    <p>No classes available at the moment.</p>
                </div>
            {/if}
        </section>
    </main>
</div>

<style>
    .container {
        min-height: 100vh;
        background: linear-gradient(135deg, #f5f7fa 0%, #c3cfe2 100%);
    }
    
    header {
        background: white;
        box-shadow: 0 2px 10px rgba(0, 0, 0, 0.1);
        padding: 0;
    }
    
    .header-content {
        max-width: 1200px;
        margin: 0 auto;
        padding: 20px;
        display: flex;
        justify-content: space-between;
        align-items: center;
    }
    
    h1 {
        color: #333;
        margin: 0;
        font-size: 32px;
        background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
        -webkit-background-clip: text;
        -webkit-text-fill-color: transparent;
        background-clip: text;
    }
    
    .user-info {
        display: flex;
        align-items: center;
        gap: 15px;
        color: #666;
    }
    
    .logout-btn {
        background: #dc3545;
        color: white;
        border: none;
        padding: 8px 16px;
        border-radius: 5px;
        cursor: pointer;
        font-size: 14px;
        transition: background 0.3s;
    }
    
    .logout-btn:hover {
        background: #c82333;
    }
    
    main {
        max-width: 1200px;
        margin: 0 auto;
        padding: 40px 20px;
    }
    
    .classes-section h2 {
        color: #333;
        font-size: 28px;
        margin-bottom: 10px;
        text-align: center;
    }
    
    .classes-section > p {
        text-align: center;
        color: #666;
        margin-bottom: 40px;
        font-size: 18px;
    }
    
    .classes-grid {
        display: grid;
        grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
        gap: 30px;
        margin-top: 30px;
    }
    
    .class-card {
        background: white;
        padding: 30px;
        border-radius: 15px;
        box-shadow: 0 5px 20px rgba(0, 0, 0, 0.1);
        transition: transform 0.3s, box-shadow 0.3s;
        border: 2px solid transparent;
    }
    
    .class-card:hover {
        transform: translateY(-5px);
        box-shadow: 0 10px 30px rgba(0, 0, 0, 0.15);
        border-color: #667eea;
    }
    
    .class-card h3 {
        color: #333;
        margin: 0 0 15px 0;
        font-size: 24px;
    }
    
    .class-card p {
        color: #666;
        margin: 0 0 20px 0;
        line-height: 1.6;
    }
    
    .class-link {
        display: inline-block;
        background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
        color: white;
        text-decoration: none;
        padding: 12px 24px;
        border-radius: 8px;
        font-weight: 600;
        transition: transform 0.2s;
    }
    
    .class-link:hover {
        transform: translateY(-2px);
    }
    
    .no-classes {
        text-align: center;
        padding: 60px 20px;
        color: #666;
        font-size: 18px;
    }
    
    @media (max-width: 768px) {
        .header-content {
            flex-direction: column;
            gap: 15px;
            text-align: center;
        }
        
        .classes-grid {
            grid-template-columns: 1fr;
        }
        
        main {
            padding: 20px;
        }
    }
</style>
