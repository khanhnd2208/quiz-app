<script>
    export let data;
    
    let showQuiz = false;
    let currentQuestion = 0;
    let answers = [];
    let score = 0;
    let quizCompleted = false;
    
    function startQuiz() {
        showQuiz = true;
        currentQuestion = 0;
        answers = [];
        score = 0;
        quizCompleted = false;
    }
    
    function selectAnswer(answer) {
        answers[currentQuestion] = answer;
    }
    
    function nextQuestion() {
        if (currentQuestion < data.questions.length - 1) {
            currentQuestion++;
        } else {
            // Calculate score and show results
            score = 0;
            for (let i = 0; i < data.questions.length; i++) {
                if (answers[i] === data.questions[i].correct_answer) {
                    score++;
                }
            }
            quizCompleted = true;
        }
    }
    
    function resetQuiz() {
        showQuiz = false;
        currentQuestion = 0;
        answers = [];
        score = 0;
        quizCompleted = false;
    }
</script>

<svelte:head>
    <title>{data.unit.name} - {data.class?.name || ''} - Quiz App</title>
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
            <a href="/">Classes</a> → 
            <a href="/class/{data.class?.id}">{data.class?.name}</a> → 
            {data.unit.name}
        </div>
        
        {#if !showQuiz}
            <!-- Unit Content View -->
            <section class="unit-section">
                <h2>{data.unit.name}</h2>
                <div class="unit-content">
                    <p>{data.unit.content}</p>
                </div>
                
                {#if data.questions && data.questions.length > 0}
                    <div class="quiz-section">
                        <h3>Ready to Test Your Knowledge?</h3>
                        <p>This unit has {data.questions.length} question{data.questions.length !== 1 ? 's' : ''}.</p>
                        <button class="start-quiz-btn" on:click={startQuiz}>
                            Start Quiz
                        </button>
                    </div>
                {:else}
                    <div class="no-quiz">
                        <p>No quiz available for this unit yet.</p>
                    </div>
                {/if}
            </section>
        {:else if !quizCompleted}
            <!-- Quiz View -->
            <section class="quiz-section">
                <div class="quiz-header">
                    <h2>Quiz: {data.unit.name}</h2>
                    <div class="progress">
                        Question {currentQuestion + 1} of {data.questions.length}
                    </div>
                </div>
                
                <div class="question-card">
                    <h3>{data.questions[currentQuestion].question_text}</h3>
                    
                    <div class="options">
                        <label class="option" class:selected={answers[currentQuestion] === 'A'}>
                            <input 
                                type="radio" 
                                name="answer" 
                                value="A" 
                                on:change={() => selectAnswer('A')}
                            />
                            <span>A. {data.questions[currentQuestion].option_a}</span>
                        </label>
                        
                        <label class="option" class:selected={answers[currentQuestion] === 'B'}>
                            <input 
                                type="radio" 
                                name="answer" 
                                value="B" 
                                on:change={() => selectAnswer('B')}
                            />
                            <span>B. {data.questions[currentQuestion].option_b}</span>
                        </label>
                        
                        <label class="option" class:selected={answers[currentQuestion] === 'C'}>
                            <input 
                                type="radio" 
                                name="answer" 
                                value="C" 
                                on:change={() => selectAnswer('C')}
                            />
                            <span>C. {data.questions[currentQuestion].option_c}</span>
                        </label>
                        
                        <label class="option" class:selected={answers[currentQuestion] === 'D'}>
                            <input 
                                type="radio" 
                                name="answer" 
                                value="D" 
                                on:change={() => selectAnswer('D')}
                            />
                            <span>D. {data.questions[currentQuestion].option_d}</span>
                        </label>
                    </div>
                    
                    <div class="quiz-controls">
                        <button class="cancel-btn" on:click={resetQuiz}>Cancel Quiz</button>
                        <button 
                            class="next-btn" 
                            on:click={nextQuestion}
                            disabled={!answers[currentQuestion]}
                        >
                            {currentQuestion < data.questions.length - 1 ? 'Next Question' : 'Finish Quiz'}
                        </button>
                    </div>
                </div>
            </section>
        {:else}
            <!-- Quiz Results View -->
            <section class="results-section">
                <h2>Quiz Complete!</h2>
                <div class="score-card">
                    <div class="score-display">
                        <span class="score">{score}</span>
                        <span class="total">/ {data.questions.length}</span>
                    </div>
                    <div class="percentage">
                        {Math.round((score / data.questions.length) * 100)}%
                    </div>
                    
                    {#if score === data.questions.length}
                        <p class="feedback excellent">Excellent! Perfect score! 🎉</p>
                    {:else if score >= data.questions.length * 0.8}
                        <p class="feedback good">Great job! You did very well! 👏</p>
                    {:else if score >= data.questions.length * 0.6}
                        <p class="feedback okay">Good effort! Keep practicing! 📚</p>
                    {:else}
                        <p class="feedback needs-work">Keep studying and try again! 💪</p>
                    {/if}
                    
                    <div class="results-controls">
                        <button class="retry-btn" on:click={resetQuiz}>Take Quiz Again</button>
                        <a href="/class/{data.class?.id}" class="back-btn">Back to {data.class?.name}</a>
                    </div>
                </div>
            </section>
        {/if}
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
        color: #666;
    }
    
    .breadcrumb a {
        color: #667eea;
        text-decoration: none;
        font-weight: 500;
    }
    
    .breadcrumb a:hover {
        text-decoration: underline;
    }
    
    .unit-section h2 {
        color: #333;
        font-size: 36px;
        margin-bottom: 20px;
    }
    
    .unit-content {
        background: white;
        padding: 30px;
        border-radius: 15px;
        box-shadow: 0 5px 20px rgba(0, 0, 0, 0.1);
        margin-bottom: 30px;
    }
    
    .unit-content p {
        color: #666;
        font-size: 18px;
        line-height: 1.6;
        margin: 0;
    }
    
    .quiz-section {
        background: white;
        padding: 30px;
        border-radius: 15px;
        box-shadow: 0 5px 20px rgba(0, 0, 0, 0.1);
    }
    
    .quiz-section h3 {
        color: #333;
        margin-bottom: 10px;
    }
    
    .start-quiz-btn {
        background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
        color: white;
        border: none;
        padding: 15px 30px;
        border-radius: 8px;
        font-size: 16px;
        font-weight: 600;
        cursor: pointer;
        transition: transform 0.2s;
    }
    
    .start-quiz-btn:hover {
        transform: translateY(-2px);
    }
    
    .quiz-header {
        display: flex;
        justify-content: space-between;
        align-items: center;
        margin-bottom: 30px;
    }
    
    .progress {
        background: #f8f9fa;
        padding: 10px 20px;
        border-radius: 20px;
        color: #666;
        font-weight: 500;
    }
    
    .question-card {
        background: #f8f9fa;
        padding: 30px;
        border-radius: 10px;
        margin-bottom: 20px;
    }
    
    .question-card h3 {
        color: #333;
        margin-bottom: 20px;
        font-size: 20px;
    }
    
    .options {
        display: flex;
        flex-direction: column;
        gap: 15px;
        margin-bottom: 30px;
    }
    
    .option {
        display: flex;
        align-items: center;
        padding: 15px;
        background: white;
        border-radius: 8px;
        border: 2px solid #e1e1e1;
        cursor: pointer;
        transition: all 0.3s;
    }
    
    .option:hover, .option.selected {
        border-color: #667eea;
        background: #f0f2ff;
    }
    
    .option input {
        margin-right: 15px;
    }
    
    .quiz-controls {
        display: flex;
        justify-content: space-between;
        gap: 15px;
    }
    
    .cancel-btn {
        background: #6c757d;
        color: white;
        border: none;
        padding: 12px 24px;
        border-radius: 8px;
        cursor: pointer;
        transition: background 0.3s;
    }
    
    .cancel-btn:hover {
        background: #5a6268;
    }
    
    .next-btn {
        background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
        color: white;
        border: none;
        padding: 12px 24px;
        border-radius: 8px;
        cursor: pointer;
        transition: transform 0.2s;
    }
    
    .next-btn:hover:not(:disabled) {
        transform: translateY(-2px);
    }
    
    .next-btn:disabled {
        opacity: 0.6;
        cursor: not-allowed;
    }
    
    .results-section {
        background: white;
        padding: 40px;
        border-radius: 15px;
        box-shadow: 0 5px 20px rgba(0, 0, 0, 0.1);
        text-align: center;
    }
    
    .results-section h2 {
        color: #333;
        margin-bottom: 30px;
    }
    
    .score-card {
        max-width: 500px;
        margin: 0 auto;
    }
    
    .score-display {
        font-size: 48px;
        font-weight: bold;
        margin-bottom: 10px;
    }
    
    .score {
        color: #28a745;
    }
    
    .total {
        color: #666;
    }
    
    .percentage {
        font-size: 24px;
        color: #667eea;
        margin-bottom: 20px;
    }
    
    .feedback {
        font-size: 18px;
        font-weight: 500;
        margin-bottom: 30px;
    }
    
    .feedback.excellent { color: #28a745; }
    .feedback.good { color: #17a2b8; }
    .feedback.okay { color: #ffc107; }
    .feedback.needs-work { color: #dc3545; }
    
    .results-controls {
        display: flex;
        gap: 15px;
        justify-content: center;
    }
    
    .retry-btn, .back-btn {
        padding: 12px 24px;
        border-radius: 8px;
        text-decoration: none;
        font-weight: 600;
        transition: transform 0.2s;
    }
    
    .retry-btn {
        background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
        color: white;
        border: none;
        cursor: pointer;
    }
    
    .back-btn {
        background: #6c757d;
        color: white;
    }
    
    .retry-btn:hover, .back-btn:hover {
        transform: translateY(-2px);
    }
    
    .no-quiz {
        text-align: center;
        padding: 40px;
        color: #666;
    }
    
    @media (max-width: 768px) {
        .header-content {
            flex-direction: column;
            gap: 15px;
            text-align: center;
        }
        
        .quiz-header {
            flex-direction: column;
            gap: 15px;
            text-align: center;
        }
        
        .quiz-controls, .results-controls {
            flex-direction: column;
        }
        
        main {
            padding: 20px;
        }
        
        .unit-section h2 {
            font-size: 28px;
        }
        
        .score-display {
            font-size: 36px;
        }
    }
</style>
