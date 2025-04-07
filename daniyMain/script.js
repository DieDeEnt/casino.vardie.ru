document.addEventListener('DOMContentLoaded', () => {
    // Elements
    const wheel = document.getElementById('wheel');
    const arrow = document.getElementById('arrow');
    const spinBtn = document.getElementById('spin-btn');
    const winChanceInput = document.getElementById('win-chance');
    const winValueDisplay = document.getElementById('win-value');
    const winZoneDisplay = document.getElementById('win-zone');
    const resultContainer = document.getElementById('result');
    const resultText = document.getElementById('result-text');
    const resultAngle = document.getElementById('result-angle');

    // State
    let winChance = 30;
    let isSpinning = false;

    // Update win chance display
    function updateWinChance() {
        winChance = parseInt(winChanceInput.value);
        winValueDisplay.textContent = `${winChance}%`;
        winZoneDisplay.textContent = `0°-${Math.round(winChance * 3.6)}°`;
        
        // Update wheel gradient
        wheel.style.background = `conic-gradient(
            var(--neon-blue) 0% ${winChance}%,
            var(--dark-3) ${winChance}% 100%
        )`;
    }

    // Initialize
    updateWinChance();
    winChanceInput.addEventListener('input', updateWinChance);

    // Spin function
    spinBtn.addEventListener('click', () => {
        if (isSpinning) return;
        isSpinning = true;
        
        // Reset result display
        resultContainer.classList.remove('result-show');
        resultContainer.classList.add('result-hidden');
        
        // Random stop angle (0-360 degrees)
        const stopAngle = Math.floor(Math.random() * 360);
        // Spin rotations (5-10 full rotations)
        const spinRotations = 10 + Math.random() * 5;
        // Total rotation
        const totalRotation = spinRotations * 360 + stopAngle;
        
        // Apply spin animation
        arrow.style.transform = `translateX(-50%) rotate(${totalRotation}deg)`;
        
        // Check result after spin completes
        setTimeout(() => {
            isSpinning = false;
            
            // Normalize angle (0-360)
            const normalizedAngle = stopAngle % 360;
            const isWin = normalizedAngle <= winChance * 3.6;
            
            // Display result
            resultContainer.classList.remove('result-hidden');
            resultContainer.classList.add('result-show');
            
            if (isWin) {
                resultText.textContent = "YOU WIN!";
                resultText.classList.remove('lose-message');
                resultText.classList.add('win-message');
            } else {
                resultText.textContent = "YOU LOSE";
                resultText.classList.remove('win-message');
                resultText.classList.add('lose-message');
            }
            
            resultAngle.textContent = `Stopped at: ${Math.round(normalizedAngle)}°`;
        }, 4000);
    });
});