<script>
    export let data;
</script>

<svelte:head>
    <title>{data.class.name} - Quiz App</title>
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
        <div class="breadcrumb">
            <a href="/">← Back to Classes</a>
        </div>
        
        <section class="class-section">
            <h2>{data.class.name}</h2>
            <p class="class-description">{data.class.description}</p>
            
            {#if data.units && data.units.length > 0}
                <div class="units-grid">
                    {#each data.units as unit}
                        <div class="unit-card">
                            <h3>{unit.name}</h3>
                            <p>{unit.content}</p>
                            <a href="/unit/{unit.id}" class="unit-link">
                                Start Unit →
                            </a>
                        </div>
                    {/each}
                </div>
            {:else}
                <div class="no-units">
                    <p>No units available for this class yet.</p>
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
    
    .breadcrumb {
        margin-bottom: 30px;
    }
    
    .breadcrumb a {
        color: #667eea;
        text-decoration: none;
        font-weight: 500;
        transition: color 0.3s;
    }
    
    .breadcrumb a:hover {
        color: #764ba2;
        text-decoration: underline;
    }
    
    .class-section h2 {
        color: #333;
        font-size: 36px;
        margin-bottom: 10px;
    }
    
    .class-description {
        color: #666;
        font-size: 18px;
        margin-bottom: 40px;
        line-height: 1.6;
    }
    
    .units-grid {
        display: grid;
        grid-template-columns: repeat(auto-fit, minmax(350px, 1fr));
        gap: 30px;
        margin-top: 30px;
    }
    
    .unit-card {
        background: white;
        padding: 30px;
        border-radius: 15px;
        box-shadow: 0 5px 20px rgba(0, 0, 0, 0.1);
        transition: transform 0.3s, box-shadow 0.3s;
        border: 2px solid transparent;
    }
    
    .unit-card:hover {
        transform: translateY(-5px);
        box-shadow: 0 10px 30px rgba(0, 0, 0, 0.15);
        border-color: #667eea;
    }
    
    .unit-card h3 {
        color: #333;
        margin: 0 0 15px 0;
        font-size: 24px;
    }
    
    .unit-card p {
        color: #666;
        margin: 0 0 20px 0;
        line-height: 1.6;
    }
    
    .unit-link {
        display: inline-block;
        background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
        color: white;
        text-decoration: none;
        padding: 12px 24px;
        border-radius: 8px;
        font-weight: 600;
        transition: transform 0.2s;
    }
    
    .unit-link:hover {
        transform: translateY(-2px);
    }
    
    .no-units {
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
        
        .units-grid {
            grid-template-columns: 1fr;
        }
        
        main {
            padding: 20px;
        }
        
        .class-section h2 {
            font-size: 28px;
        }
    }
</style>
