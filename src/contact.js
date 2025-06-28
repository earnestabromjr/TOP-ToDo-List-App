export function load_contact() {
    const content = document.getElementById('content');
    const contact = document.createElement('div');
    contact.id = 'contact';
    try {
        // Create main section
        const section = document.createElement('section');
        section.className = 'contact-section';

        // Header
        const header = document.createElement('h2');
        header.textContent = 'Contact Abrom\'s Steakhouse';
        section.appendChild(header);

        // Intro paragraph
        const intro = document.createElement('p');
        intro.className = 'contact-intro';
        intro.textContent = 'We\'d love to hear from you! Whether you have a question, want to make a reservation, or simply want to share your dining experience, feel free to reach out.';
        section.appendChild(intro);

        // Contact Info Container
        const contactInfo = document.createElement('div');
        contactInfo.className = 'contact-info';

        // Contact Method
        const contactMethod = document.createElement('div');
        contactMethod.className = 'contact-method';
        contactMethod.innerHTML = `
            <h3>Get in Touch</h3>
            <ul class="contact-details">
                <li><i class="fas fa-phone"></i> <a href="tel:5551234567">(555) 123-4567</a></li>
                <li><i class="fas fa-envelope"></i> <a href="mailto:info@abromssteakhouse.com">info@abromssteakhouse.com</a></li>
            </ul>
        `;
        contactInfo.appendChild(contactMethod);

        // Location
        const locationDiv = document.createElement('div');
        locationDiv.className = 'location';
        locationDiv.innerHTML = `
            <h3>Our Location</h3>
            <address>
                <p>Abrom\'s Steakhouse</p>
                <p>123 Prime Cut Boulevard</p>
                <p>Steakville, USA 90210</p>
            </address>
        `;
        contactInfo.appendChild(locationDiv);

        // Hours
        const hoursDiv = document.createElement('div');
        hoursDiv.className = 'hours';
        hoursDiv.innerHTML = `
            <h3>Hours of Operation</h3>
            <div class="hours-section">
                <h4>Dinner:</h4>
                <ul class="hours-list">
                    <li>Monday - Thursday: 5:00 PM - 10:00 PM</li>
                    <li>Friday - Saturday: 5:00 PM - 11:00 PM</li>
                    <li>Sunday: 4:00 PM - 9:00 PM</li>
                </ul>
            </div>
            <div class="hours-section">
                <h4>Lunch:</h4>
                <p>Currently, we do not offer lunch service.</p>
            </div>
        `;
        contactInfo.appendChild(hoursDiv);

        section.appendChild(contactInfo);

        // Reservation Note
        const reservationNote = document.createElement('div');
        reservationNote.className = 'reservation-note';
        reservationNote.innerHTML = `
            <p>For reservations, please call us during operating hours or use our online reservation system (if applicable). We look forward to welcoming you!</p>
        `;
        section.appendChild(reservationNote);

        // Clear existing content and append new content
        contact.innerHTML = '';
        contact.appendChild(section);

        // Add event listeners for phone and email links
        const phoneLink = contact.querySelector('a[href^="tel:"]');
        const emailLink = contact.querySelector('a[href^="mailto:"]');

        if (phoneLink) {
            phoneLink.addEventListener('click', () => {
                console.log('Phone link clicked');
            });
        }

        if (emailLink) {
            emailLink.addEventListener('click', () => {
                console.log('Email link clicked');
            });
        }
    } catch (error) {
        console.error('Error loading contact section:', error);
        contact.innerHTML = '<p>Sorry, there was an error loading the contact information.</p>';
    }
    content.appendChild(contact);
}