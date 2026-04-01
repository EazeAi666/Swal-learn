<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>SWAL Learn - Free AI Courses</title>
    <style>
        * { margin: 0; padding: 0; box-sizing: border-box; }
        body { 
            font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif;
            background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
            min-height: 100vh;
            padding: 40px 20px;
        }
        .container { max-width: 900px; margin: 0 auto; }
        h1 { color: white; text-align: center; margin-bottom: 10px; font-size: 2.5em; }
        .subtitle { color: rgba(255,255,255,0.9); text-align: center; margin-bottom: 20px; }
        
        /* Auth Section */
        .auth-box {
            background: white;
            border-radius: 12px;
            padding: 20px;
            text-align: center;
            margin-bottom: 30px;
            box-shadow: 0 4px 6px rgba(0,0,0,0.1);
        }
        #user-info { display: none; }
        #user-info img {
            width: 50px; height: 50px; border-radius: 50%; vertical-align: middle;
        }
        .login-btn {
            background: #4285f4; color: white; border: none; padding: 12px 24px;
            border-radius: 6px; font-size: 16px; cursor: pointer;
            display: inline-flex; align-items: center; gap: 10px;
        }
        .logout-btn {
            background: #dc3545; color: white; border: none; padding: 8px 16px;
            border-radius: 6px; cursor: pointer; margin-left: 10px;
        }
        
        /* Course Grid */
        .course-grid {
            display: grid;
            grid-template-columns: repeat(auto-fit, minmax(280px, 1fr));
            gap: 20px;
            opacity: 0.5;
            pointer-events: none;
            filter: blur(2px);
        }
        .course-grid.unlocked {
            opacity: 1;
            pointer-events: auto;
            filter: none;
        }
        .course-card {
            background: white;
            border-radius: 12px;
            padding: 25px;
            text-decoration: none;
            color: #333;
            transition: transform 0.2s, box-shadow 0.2s;
            box-shadow: 0 4px 6px rgba(0,0,0,0.1);
        }
        .course-card:hover {
            transform: translateY(-5px);
            box-shadow: 0 10px 25px rgba(0,0,0,0.2);
        }
        .course-icon { font-size: 2.5em; margin-bottom: 15px; }
        .course-title { font-size: 1.2em; font-weight: 600; margin-bottom: 8px; }
        .course-desc { color: #666; font-size: 0.9em; }
        .lock-overlay {
            position: absolute; top: 50%; left: 50%;
            transform: translate(-50%, -50%);
            font-size: 3em; opacity: 0.5;
        }
        
        /* Locked Message */
        .locked-message {
            background: rgba(255,255,255,0.95);
            border-radius: 12px;
            padding: 30px;
            text-align: center;
            margin-bottom: 20px;
            color: #333;
        }
        .locked-message h3 { margin-bottom: 10px; color: #667eea; }
    </style>
</head>
<body>
    <div class="container">
        <h1>🎓 SWAL Learn</h1>
        <p class="subtitle">Free AI & Tech Courses</p>
        
        <!-- Auth Box -->
        <div class="auth-box">
            <div id="login-section">
                <p>🔒 Sign in to access all courses for free</p><br>
                <button class="login-btn" onclick="signInWithGoogle()">
                    <img src="https://www.google.com/favicon.ico" width="20">
                    Sign in with Google
                </button>
            </div>
            <div id="user-info">
                <img id="user-photo" src="" alt="">
                <span id="user-name"></span>
                <button class="logout-btn" onclick="signOut()">Logout</button>
            </div>
        </div>
        
        <!-- Locked Message (shown when not logged in) -->
        <div id="locked-msg" class="locked-message">
            <h3>🔐 Courses Locked</h3>
            <p>Please sign in with Google to unlock all 14 free courses</p>
        </div>
        
        <!-- Course Grid -->
        <div id="course-grid" class="course-grid">
            <a href="courses/ai-basics.html" class="course-card" data-course="ai-basics">
                <div class="course-icon">🤖</div>
                <div class="course-title">AI Basics</div>
                <div class="course-desc">Introduction to Artificial Intelligence</div>
            </a>
            
            <a href="courses/prompt-engineering.html" class="course-card" data-course="prompt-engineering">
                <div class="course-icon">✨</div>
                <div class="course-title">Prompt Engineering</div>
                <div class="course-desc">Master AI communication</div>
            </a>
            
            <a href="courses/building-ai-apps.html" class="course-card" data-course="building-ai-apps">
                <div class="course-icon">⚡</div>
                <div class="course-title">Building AI Apps</div>
                <div class="course-desc">Create real AI applications</div>
            </a>
            
            <a href="courses/machine-learning.html" class="course-card" data-course="machine-learning">
                <div class="course-icon">🧠</div>
                <div class="course-title">Machine Learning</div>
                <div class="course-desc">ML fundamentals & models</div>
            </a>
            
            <a href="courses/cybersecurity.html" class="course-card" data-course="cybersecurity">
                <div class="course-icon">🔒</div>
                <div class="course-title">Cybersecurity</div>
                <div class="course-desc">Protect systems & data</div>
            </a>
            
            <a href="courses/web-development.html" class="course-card" data-course="web-development">
                <div class="course-icon">🌐</div>
                <div class="course-title">Web Development</div>
                <div class="course-desc">Build modern websites</div>
            </a>
            
            <a href="courses/english-it-module-1.html" class="course-card" data-course="english-it-1">
                <div class="course-icon">📚</div>
                <div class="course-title">English IT Module 1</div>
                <div class="course-desc">IT English fundamentals</div>
            </a>
            
            <a href="courses/english-it-module-2.html" class="course-card" data-course="english-it-2">
                <div class="course-icon">📖</div>
                <div class="course-title">English IT Module 2</div>
                <div class="course-desc">Advanced IT English</div>
            </a>
            
            <a href="courses/python-module-1.html" class="course-card" data-course="python-1">
                <div class="course-icon">🐍</div>
                <div class="course-title">Python Module 1</div>
                <div class="course-desc">Python basics</div>
            </a>
            
            <a href="courses/python-module-2.html" class="course-card" data-course="python-2">
                <div class="course-icon">🐍</div>
                <div class="course-title">Python Module 2</div>
                <div class="course-desc">Functions & loops</div>
            </a>
            
            <a href="courses/python-module-3.html" class="course-card" data-course="python-3">
                <div class="course-icon">🐍</div>
                <div class="course-title">Python Module 3</div>
                <div class="course-desc">Data structures</div>
            </a>
            
            <a href="courses/python-module-4.html" class="course-card" data-course="python-4">
                <div class="course-icon">🐍</div>
                <div class="course-title">Python Module 4</div>
                <div class="course-desc">File handling & OOP</div>
            </a>
            
            <a href="courses/python-module-5.html" class="course-card" data-course="python-5">
                <div class="course-icon">🐍</div>
                <div class="course-title">Python Module 5</div>
                <div class="course-desc">Modules & packages</div>
            </a>
            
            <a href="courses/python-module-6.html" class="course-card" data-course="python-6">
                <div class="course-icon">🐍</div>
                <div class="course-title">Python Module 6</div>
                <div class="course-desc">Advanced Python</div>
            </a>
        </div>
    </div>

    <!-- Firebase Scripts -->
    <script src="https://www.gstatic.com/firebasejs/10.7.1/firebase-app-compat.js"></script>
    <script src="https://www.gstatic.com/firebasejs/10.7.1/firebase-auth-compat.js"></script>
    
    <script>
        // Your Firebase config - REPLACE WITH YOUR ACTUAL CONFIG
        const firebaseConfig = {
            apiKey: "YOUR_API_KEY",
            authDomain: "YOUR_PROJECT_ID.firebaseapp.com",
            projectId: "YOUR_PROJECT_ID",
            storageBucket: "YOUR_PROJECT_ID.appspot.com",
            messagingSenderId: "YOUR_SENDER_ID",
            appId: "YOUR_APP_ID"
        };
        
        // Initialize Firebase
        firebase.initializeApp(firebaseConfig);
        
        // Auth state listener
        firebase.auth().onAuthStateChanged((user) => {
            if (user) {
                // User is signed in
                document.getElementById('login-section').style.display = 'none';
                document.getElementById('user-info').style.display = 'block';
                document.getElementById('user-name').textContent = user.displayName;
                document.getElementById('user-photo').src = user.photoURL || 'https://via.placeholder.com/50';
                document.getElementById('locked-msg').style.display = 'none';
                document.getElementById('course-grid').classList.add('unlocked');
                
                // Save user to localStorage for course pages
                localStorage.setItem('swal_user', JSON.stringify({
                    uid: user.uid,
                    name: user.displayName,
                    email: user.email,
                    photo: user.photoURL
                }));
            } else {
                // User is signed out
                document.getElementById('login-section').style.display = 'block';
                document.getElementById('user-info').style.display = 'none';
                document.getElementById('locked-msg').style.display = 'block';
                document.getElementById('course-grid').classList.remove('unlocked');
                localStorage.removeItem('swal_user');
            }
        });
        
        // Sign in with Google
        function signInWithGoogle() {
            const provider = new firebase.auth.GoogleAuthProvider();
            firebase.auth().signInWithPopup(provider)
                .catch((error) => {
                    alert('Sign in error: ' + error.message);
                });
        }
        
        // Sign out
        function signOut() {
            firebase.auth().signOut();
        }
    </script>
</body>
</html>

