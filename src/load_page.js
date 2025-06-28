import logo from './logo.jpg'
export function load_page() {
    try {
        const content = document.getElementById('content');
        content.textContent = ''; // Clear content safely

        // Create and append h1
        const h1 = document.createElement('h1');
        h1.textContent = "Abrom's Steakhouse";
        content.appendChild(h1);

        // Create and append logo
        const img = document.createElement('img');
        img.src = logo;
        img.alt = "Abrom's Steakhouse Logo";
        img.height = 200;
        img.width = 200;
        content.appendChild(img);

        // Create home section
        const home = document.createElement('section');
        home.id = "home";
        
        // Add heading
        const heading = document.createElement('h2');
        heading.textContent = 'About Us';
        home.appendChild(heading);
        
        // Add paragraph with line breaks
        const paragraph = document.createElement('p');
        const lines = [
            "Welcome to Abrom's Steakhouse, where every meal is a celebration of flavor and tradition.",
            "Indulge in our succulent steaks, cooked to perfection and seasoned with passion.",
            "Experience a culinary journey that tantalizes your taste buds and leaves you craving more.",
            "At Abrom's, we believe in crafting memorable moments around exceptional food."
        ];
        
        lines.forEach((line, index) => {
            paragraph.appendChild(document.createTextNode(line));
            if (index < lines.length - 1) {
                paragraph.appendChild(document.createElement('br'));
            }
        });
        
        home.appendChild(paragraph);
        content.appendChild(home);
        content.id = "content";
    } catch (error) {
        console.error('Error loading page:', error);
        const content = document.getElementById('content');
        content.textContent = 'Error loading content. Please try again later.';
    }
}