// progress.js - Track user progress and quiz scores

const ProgressTracker = {
    // Get current user ID
    getUserId() {
        const user = JSON.parse(localStorage.getItem('swal_user') || '{}');
        return user.uid || null;
    },
    
    // Save module completion
    saveModule(courseId, moduleIndex) {
        const userId = this.getUserId();
        if (!userId) return false;
        
        const key = `swal_progress_${userId}`;
        const progress = JSON.parse(localStorage.getItem(key) || '{}');
        
        if (!progress[courseId]) progress[courseId] = {};
        progress[courseId][`module_${moduleIndex}`] = true;
        
        localStorage.setItem(key, JSON.stringify(progress));
        return true;
    },
    
    // Check if module is unlocked
    isUnlocked(courseId, moduleIndex) {
        // First module always unlocked
        if (moduleIndex === 0) return true;
        
        const progress = this.getProgress(courseId);
        const prevModule = `module_${moduleIndex - 1}`;
        
        return progress[prevModule] === true;
    },
    
    // Get all progress for a course
    getProgress(courseId) {
        const userId = this.getUserId();
        if (!userId) return {};
        
        const key = `swal_progress_${userId}`;
        const progress = JSON.parse(localStorage.getItem(key) || '{}');
        return progress[courseId] || {};
    },
    
    // Save quiz score
    saveQuiz(courseId, moduleIndex, score, total) {
        const userId = this.getUserId();
        if (!userId) return null;
        
        const passMark = Math.ceil(total * 0.7); // 70% to pass
        const passed = score >= passMark;
        
        const key = `swal_quiz_${userId}`;
        const quizzes = JSON.parse(localStorage.getItem(key) || '{}');
        
        if (!quizzes[courseId]) quizzes[courseId] = {};
        quizzes[courseId][`module_${moduleIndex}`] = {
            score: score,
            total: total,
            passed: passed,
            date: new Date().toISOString()
        };
        
        localStorage.setItem(key, JSON.stringify(quizzes));
        
        // Auto-unlock next module if passed
        if (passed) {
            this.saveModule(courseId, moduleIndex);
        }
        
        return { passed, score, total, passMark };
    },
    
    // Get quiz result
    getQuiz(courseId, moduleIndex) {
        const userId = this.getUserId();
        if (!userId) return null;
        
        const key = `swal_quiz_${userId}`;
        const quizzes = JSON.parse(localStorage.getItem(key) || '{}');
        
        if (!quizzes[courseId]) return null;
        return quizzes[courseId][`module_${moduleIndex}`] || null;
    },
    
    // Check if all modules completed
    isCourseComplete(courseId, totalModules) {
        const progress = this.getProgress(courseId);
        let completed = 0;
        
        for (let i = 0; i < totalModules; i++) {
            if (progress[`module_${i}`]) completed++;
        }
        
        return completed === totalModules;
    },
    
    // Get completion percentage
    getPercentage(courseId, totalModules) {
        const progress = this.getProgress(courseId);
        let completed = 0;
        
        for (let i = 0; i < totalModules; i++) {
            if (progress[`module_${i}`]) completed++;
        }
        
        return Math.round((completed / totalModules) * 100);
    }
};

