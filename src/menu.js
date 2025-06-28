function createMenuItem(name, description, price) {
    const li = document.createElement('li');
    
    if (description) {
        const nameSpan = document.createElement('span');
        nameSpan.textContent = `${name} - ${description} `;
        li.appendChild(nameSpan);
    } else {
        li.textContent = name;
    }
    
    if (price) {
        const priceSpan = document.createElement('span');
        priceSpan.className = 'price';
        priceSpan.textContent = price;
        li.appendChild(priceSpan);
    }
    
    return li;
}

function createMenuSection(title, items, note) {
    const section = document.createElement('div');
    section.className = 'menu-section';
    
    const heading = document.createElement('h2');
    heading.textContent = title;
    section.appendChild(heading);
    
    if (note) {
        const noteP = document.createElement('p');
        noteP.className = 'note';
        noteP.textContent = note;
        section.appendChild(noteP);
    }
    
    const ul = document.createElement('ul');
    items.forEach(item => {
        ul.appendChild(createMenuItem(item.name, item.description, item.price));
    });
    
    section.appendChild(ul);
    return section;
}

export function load_menu() {
    try {
        const content = document.getElementById('content');
        content.textContent = ''; // Clear content safely
        
        const menu = document.createElement('div');
        menu.id = 'menu';
        
        const menuSection = document.createElement('div');
        menuSection.className = 'menu-section';
        
        // Menu Title
        const menuTitle = document.createElement('h1');
        menuTitle.textContent = 'Menu';
        menuSection.appendChild(menuTitle);
        
        // Appetizers
        const appetizers = {
            title: 'Appetizers',
            items: [
                { name: 'Seared Scallops (5 pcs)', description: 'Pan-seared to a golden crisp, served with a lemon-butter reduction and asparagus tips', price: '$18.00' },
                { name: 'Wagyu Beef Carpaccio', description: 'Thinly sliced, prime Wagyu beef drizzled with truffle oil, capers, arugula, and Parmesan shavings', price: '$22.00' },
                { name: 'Crispy Calamari', description: 'Lightly breaded calamari, fried to perfection, served with a zesty marinara sauce and aioli', price: '$15.00' },
                { name: 'Lobster Bisque', description: 'Rich and creamy bisque, infused with sweet lobster meat and a hint of brandy', price: '$12.00' }
            ]
        };
        menuSection.appendChild(createMenuSection(appetizers.title, appetizers.items));
        
        // Signature Steaks
        const steaks = {
            title: 'From the Grill - Our Signature Steaks',
            note: '(All steaks are served with your choice of two sides and a sauce.)',
            items: [
                { name: 'The Abrom\'s Prime Ribeye (300g)', description: 'Our most popular cut, perfectly marbled and bursting with flavor', price: '$45.00' },
                { name: 'New York Strip (350g)', description: 'A lean and flavorful classic, expertly grilled to your preference', price: '$42.00' },
                { name: 'Filet Mignon', description: 'Exceptionally tender, melt-in-your-mouth cut (200g / 280g)', price: '$48.00 / $60.00' },
                { name: 'Porterhouse Steak (700g - serves 2)', description: 'The best of both worlds: a generous cut combining the rich flavor of a New York Strip with the tenderness of a Filet Mignon', price: '$85.00' },
                { name: 'Tomahawk Steak (1.2kg - serves 2-3)', description: 'A show-stopping, long-bone ribeye, dry-aged for intense flavor and cooked to perfection', price: '$120.00' }
            ]
        };
        menuSection.appendChild(createMenuSection(steaks.title, steaks.items, steaks.note));
        
        // Sauces
        const sauces = {
            title: 'Sauces',
            items: [
                { name: 'Classic Béarnaise' },
                { name: 'Peppercorn' },
                { name: 'Red Wine Reduction' },
                { name: 'Creamy Horseradish' }
            ]
        };
        menuSection.appendChild(createMenuSection(sauces.title, sauces.items));
        
        // Sides
        const sides = {
            title: 'Sides',
            items: [
                { name: 'Creamed Spinach', price: '$8.00' },
                { name: 'Asparagus with Hollandaise', price: '$9.00' },
                { name: 'Garlic Mashed Potatoes', price: '$7.00' },
                { name: 'Truffle Parmesan Fries', price: '$9.00' },
                { name: 'Roasted Seasonal Vegetables', price: '$8.00' },
                { name: 'Macaroni & Cheese', price: '$10.00' }
            ]
        };
        menuSection.appendChild(createMenuSection(sides.title, sides.items));
        
        // Desserts
        const desserts = {
            title: 'Desserts',
            items: [
                { name: 'New York Style Cheesecake', description: 'Creamy cheesecake with a berry compote', price: '$10.00' },
                { name: 'Molten Chocolate Lava Cake', description: 'Warm chocolate cake with a gooey molten center, served with vanilla bean ice cream', price: '$11.00' },
                { name: 'Crème Brûlée', description: 'Classic vanilla custard with a crisp caramelized sugar top', price: '$9.00' },
                { name: 'Seasonal Fruit Platter', description: 'A refreshing selection of fresh, seasonal fruits', price: '$8.00' }
            ]
        };
        menuSection.appendChild(createMenuSection(desserts.title, desserts.items));
        
        menu.appendChild(menuSection);
        content.appendChild(menu);
        
    } catch (error) {
        console.error('Error loading menu:', error);
        const content = document.getElementById('content');
        content.textContent = 'Error loading menu. Please try again later.';
    }
}