document.addEventListener('DOMContentLoaded', function() {
    // Blinking text effect
    setInterval(function() {
        const blinkingText = document.querySelector('.blinking-text');
        blinkingText.style.visibility = blinkingText.style.visibility === 'hidden' ? 'visible' : 'hidden';
    }, 500);

    // Fetch and display guestbook entries
    fetchGuestbookEntries();

    // Handle guestbook form submission
    const guestbookForm = document.getElementById('guestbook-form');
    guestbookForm.addEventListener('submit', function(e) {
        e.preventDefault();
        submitGuestbookEntry();
    });
});

function fetchGuestbookEntries() {
    fetch('/guestbook')
        .then(response => response.json())
        .then(entries => {
            const guestbookEntries = document.getElementById('guestbook-entries');
            guestbookEntries.innerHTML = '';
            entries.forEach(entry => {
                const entryElement = document.createElement('div');
                entryElement.classList.add('guestbook-entry');
                entryElement.innerHTML = `
                    <strong>${entry.name}</strong> (${entry.timestamp})<br>
                    ${entry.message}
                    <button onclick="deleteGuestbookEntry('${entry.id}')">Delete</button>
                `;
                guestbookEntries.appendChild(entryElement);
            });
        })
        .catch(error => console.error('Error fetching guestbook entries:', error));
}

function submitGuestbookEntry() {
    const name = document.getElementById('guestbook-name').value;
    const message = document.getElementById('guestbook-message').value;

    fetch('/guestbook', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/x-www-form-urlencoded',
        },
        body: `name=${encodeURIComponent(name)}&message=${encodeURIComponent(message)}`
    })
    .then(response => response.json())
    .then(data => {
        if (data.status === 'success') {
            document.getElementById('guestbook-name').value = '';
            document.getElementById('guestbook-message').value = '';
            fetchGuestbookEntries();
        } else {
            alert('Error submitting guestbook entry. Please try again.');
        }
    })
    .catch(error => console.error('Error submitting guestbook entry:', error));
}

function deleteGuestbookEntry(entryId) {
    fetch('/delete_guestbook_entry', {
        method: 'DELETE',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({id: entryId})
    })
    .then(response => response.json())
    .then(data => {
        if (data.status === 'success') {
            fetchGuestbookEntries();
        } else {
            alert('Error deleting guestbook entry. Please try again.');
        }
    })
    .catch(error => console.error('Error deleting guestbook entry:', error));
}
