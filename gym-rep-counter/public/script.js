class GymRepCounter {
    constructor() {
        this.currentCount = 0;
        this.currentExercise = 'push-ups';
        this.sets = [];
        
        this.initializeElements();
        this.loadFromStorage();
        this.attachEventListeners();
        this.updateDisplay();
    }

    initializeElements() {
        this.countDisplay = document.getElementById('count');
        this.increaseBtn = document.getElementById('increaseBtn');
        this.decreaseBtn = document.getElementById('decreaseBtn');
        this.resetBtn = document.getElementById('resetBtn');
        this.addSetBtn = document.getElementById('addSetBtn');
        this.exerciseSelect = document.getElementById('exercise');
        this.customExerciseInput = document.getElementById('customExercise');
        this.setsList = document.getElementById('setsList');
    }

    attachEventListeners() {
        // Counter buttons
        this.increaseBtn.addEventListener('click', () => this.increaseCount());
        this.decreaseBtn.addEventListener('click', () => this.decreaseCount());
        this.resetBtn.addEventListener('click', () => this.resetCount());
        this.addSetBtn.addEventListener('click', () => this.addSet());

        // Exercise selection
        this.exerciseSelect.addEventListener('change', () => this.handleExerciseChange());
        this.customExerciseInput.addEventListener('input', () => this.handleCustomExerciseInput());

        // Keyboard shortcuts
        document.addEventListener('keydown', (e) => this.handleKeyPress(e));

        // Touch events for better mobile experience
        this.increaseBtn.addEventListener('touchstart', (e) => e.preventDefault());
        this.decreaseBtn.addEventListener('touchstart', (e) => e.preventDefault());
    }

    increaseCount() {
        this.currentCount++;
        this.updateDisplay();
        this.saveToStorage();
        this.animateButton(this.increaseBtn);
    }

    decreaseCount() {
        if (this.currentCount > 0) {
            this.currentCount--;
            this.updateDisplay();
            this.saveToStorage();
            this.animateButton(this.decreaseBtn);
        }
    }

    resetCount() {
        if (this.currentCount > 0 && confirm('Are you sure you want to reset the counter?')) {
            this.currentCount = 0;
            this.updateDisplay();
            this.saveToStorage();
            this.animateButton(this.resetBtn);
        }
    }

    addSet() {
        if (this.currentCount > 0) {
            const set = {
                exercise: this.getCurrentExerciseName(),
                reps: this.currentCount,
                timestamp: new Date().toLocaleTimeString(),
                date: new Date().toLocaleDateString()
            };
            
            this.sets.unshift(set); // Add to beginning of array
            this.currentCount = 0;
            this.updateDisplay();
            this.updateSetsDisplay();
            this.saveToStorage();
            this.animateButton(this.addSetBtn);
        }
    }

    handleExerciseChange() {
        const selectedValue = this.exerciseSelect.value;
        
        if (selectedValue === 'custom') {
            this.customExerciseInput.style.display = 'block';
            this.customExerciseInput.focus();
        } else {
            this.customExerciseInput.style.display = 'none';
            this.currentExercise = selectedValue;
            this.saveToStorage();
        }
    }

    handleCustomExerciseInput() {
        if (this.exerciseSelect.value === 'custom') {
            this.currentExercise = this.customExerciseInput.value || 'custom';
            this.saveToStorage();
        }
    }

    handleKeyPress(e) {
        // Prevent shortcuts when typing in input field
        if (e.target.tagName === 'INPUT' || e.target.tagName === 'SELECT') {
            return;
        }

        switch(e.key) {
            case '+':
            case '=':
            case 'ArrowUp':
                e.preventDefault();
                this.increaseCount();
                break;
            case '-':
            case '_':
            case 'ArrowDown':
                e.preventDefault();
                this.decreaseCount();
                break;
            case 'r':
            case 'R':
                e.preventDefault();
                this.resetCount();
                break;
            case 's':
            case 'S':
            case 'Enter':
                e.preventDefault();
                this.addSet();
                break;
        }
    }

    getCurrentExerciseName() {
        if (this.exerciseSelect.value === 'custom') {
            return this.customExerciseInput.value || 'Custom Exercise';
        }
        return this.exerciseSelect.options[this.exerciseSelect.selectedIndex].text;
    }

    updateDisplay() {
        this.countDisplay.textContent = this.currentCount;
        
        // Add visual feedback for count changes
        this.countDisplay.style.transform = 'scale(1.1)';
        setTimeout(() => {
            this.countDisplay.style.transform = 'scale(1)';
        }, 150);
    }

    updateSetsDisplay() {
        this.setsList.innerHTML = '';
        
        if (this.sets.length === 0) {
            this.setsList.innerHTML = '<p style="text-align: center; color: #888; font-style: italic;">No sets completed yet</p>';
            return;
        }

        this.sets.slice(0, 10).forEach((set, index) => { // Show only last 10 sets
            const setElement = document.createElement('div');
            setElement.className = 'set-item';
            setElement.innerHTML = `
                <div>
                    <div class="set-exercise">${set.exercise}</div>
                    <div class="set-time">${set.date} at ${set.timestamp}</div>
                </div>
                <div class="set-reps">${set.reps} reps</div>
            `;
            this.setsList.appendChild(setElement);
        });
    }

    animateButton(button) {
        button.style.transform = 'scale(0.95)';
        setTimeout(() => {
            button.style.transform = 'scale(1)';
        }, 100);
    }

    saveToStorage() {
        const data = {
            currentCount: this.currentCount,
            currentExercise: this.currentExercise,
            sets: this.sets,
            exerciseSelectValue: this.exerciseSelect.value,
            customExerciseValue: this.customExerciseInput.value
        };
        localStorage.setItem('gymRepCounter', JSON.stringify(data));
    }

    loadFromStorage() {
        try {
            const savedData = localStorage.getItem('gymRepCounter');
            if (savedData) {
                const data = JSON.parse(savedData);
                
                this.currentCount = data.currentCount || 0;
                this.currentExercise = data.currentExercise || 'push-ups';
                this.sets = data.sets || [];
                
                // Restore exercise selection
                if (data.exerciseSelectValue) {
                    this.exerciseSelect.value = data.exerciseSelectValue;
                    if (data.exerciseSelectValue === 'custom') {
                        this.customExerciseInput.style.display = 'block';
                        this.customExerciseInput.value = data.customExerciseValue || '';
                    }
                }
                
                this.updateSetsDisplay();
            }
        } catch (error) {
            console.error('Error loading from storage:', error);
            // Reset to defaults if there's an error
            this.currentCount = 0;
            this.currentExercise = 'push-ups';
            this.sets = [];
        }
    }

    // Method to clear all data (for testing or user request)
    clearAllData() {
        if (confirm('Are you sure you want to clear all data including sets history?')) {
            localStorage.removeItem('gymRepCounter');
            this.currentCount = 0;
            this.currentExercise = 'push-ups';
            this.sets = [];
            this.exerciseSelect.value = 'push-ups';
            this.customExerciseInput.style.display = 'none';
            this.customExerciseInput.value = '';
            this.updateDisplay();
            this.updateSetsDisplay();
        }
    }
}

// Initialize the app when DOM is loaded
document.addEventListener('DOMContentLoaded', () => {
    const counter = new GymRepCounter();
    
    // Make counter available globally for debugging
    window.gymCounter = counter;
    
    // Add clear data functionality (can be called from console)
    window.clearGymData = () => counter.clearAllData();
    
    console.log('Gym Rep Counter initialized!');
    console.log('Keyboard shortcuts:');
    console.log('+ or ↑ : Increase count');
    console.log('- or ↓ : Decrease count');
    console.log('R : Reset count');
    console.log('S or Enter : Complete set');
    console.log('Type clearGymData() in console to clear all data');
});
