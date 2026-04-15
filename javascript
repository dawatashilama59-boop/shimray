document.addEventListener('DOMContentLoaded', () => {
    
    // 1. Get references to elements
    const filterButtons = document.querySelectorAll('.filter-btn');
    const patternsGrid = document.getElementById('patterns-grid');
    const patternCards = document.querySelectorAll('.pattern-card');

    // 2. Add event listeners to filter buttons
    filterButtons.forEach(button => {
        button.addEventListener('click', () => {
            const category = button.getAttribute('data-category');
            
            // 3. Update the active button style
            updateActiveButton(button);

            // 4. Update the active pattern cards
            filterPatterns(category);
        });
    });

    // Function to update the active button's appearance
    function updateActiveButton(activeButton) {
        filterButtons.forEach(btn => btn.classList.remove('active'));
        activeButton.classList.add('active');
    }

    // Function to show/hide pattern cards based on their category
    function filterPatterns(category) {
        if (category === 'all') {
            // Show all cards
            patternCards.forEach(card => {
                card.style.display = 'block'; 
                card.style.opacity = '1'; 
            });
        } else {
            // Filter cards
            patternCards.forEach(card => {
                const cardCategory = card.getAttribute('data-category');
                
                if (cardCategory === category) {
                    card.style.display = 'block'; 
                    card.style.opacity = '1'; 
                } else {
                    card.style.display = 'none'; 
                    card.style.opacity = '0'; 
                }
            });
        }
    }
});
