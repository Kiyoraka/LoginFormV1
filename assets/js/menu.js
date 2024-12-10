let currentMenuItems = [];
let currentItemIndex = 0;

document.getElementById('feedbackForm').addEventListener('submit', function(e) {
    e.preventDefault();
    
    const formData = new FormData(this);
    
    fetch('insert.php', {
        method: 'POST',
        body: formData
    })
    .then(response => {
        if (!response.ok) {
            throw new Error('Network response was not ok');
        }
        return response.json();
    })
    .then(data => {
        if (data.status === 'success') {
            alert('Feedback submitted successfully!');
            const food = formData.get('customerFood');
            return fetch(`get_menu_info.php?food=${encodeURIComponent(food)}`);
        }
    })
    .then(response => response.json())
    .then(menuData => {
        if (menuData.status === 'success') {
            currentMenuItems = menuData.data;
            currentItemIndex = 0;
            displayMenuInfo();
            this.reset();
        } else {
            displayNoMenuInfo();
        }
    })
    .catch(error => {
        console.error('Error:', error);
        alert('Error submitting feedback. Please try again.');
    });
});

function displayMenuInfo() {
    const menuDetails = document.getElementById('menuDetails');
    if (!menuDetails) {
        console.error('Menu details element not found');
        return;
    }
    
    const menuItem = currentMenuItems[currentItemIndex];
    const totalItems = currentMenuItems.length;
    
    menuDetails.innerHTML = `
        <div class="menu-content">
            <p><strong>Dish:</strong> ${menuItem.name}</p>
            <p><strong>Category:</strong> ${menuItem.category}</p>
            <p><strong>Description:</strong> ${menuItem.description}</p>
            <p><strong>Price:</strong> $${menuItem.price}</p>
            <p><strong>Preparation Time:</strong> ${menuItem.preparation_time}</p>
        </div>
        ${totalItems > 1 ? `
        <p class="item-counter">Item ${currentItemIndex + 1} of ${totalItems}</p>
        <div class="navigation-buttons">
            <button onclick="previousItem()" ${currentItemIndex === 0 ? 'disabled' : ''}>Previous</button>
            <button onclick="nextItem()" ${currentItemIndex === totalItems - 1 ? 'disabled' : ''}>Next</button>
        </div>
        ` : ''}
    `;
}

function previousItem() {
    if (currentItemIndex > 0) {
        currentItemIndex--;
        displayMenuInfo();
    }
}

function nextItem() {
    if (currentItemIndex < currentMenuItems.length - 1) {
        currentItemIndex++;
        displayMenuInfo();
    }
}

function displayNoMenuInfo() {
    const menuDetails = document.getElementById('menuDetails');
    if (menuDetails) {
        menuDetails.innerHTML = '<p>Menu information not available for this dish.</p>';
    }
}

let additionalCSS = `
.menu-info {
    margin-top: 20px;
    background-color: #fff;
    border-radius: 4px;
    border: 1px solid #e1e1e1;
}

.menu-content {
    padding: 15px;
    background-color: transparent;
    border-radius: 0;
    margin-bottom: 0;
}

.menu-content p {
    margin: 8px 0;
    font-size: 14px;
    color: #333;
    line-height: 1.5;
}

.menu-content strong {
    color: #555;
    font-weight: 500;
}

.item-counter {
    padding: 0 15px;
    margin: 5px 0;
    font-size: 13px;
    color: #666;
}

.navigation-buttons {
    display: flex;
    justify-content: flex-start;
    gap: 5px;
    margin: 10px 15px 15px;
    padding: 0;
}

.navigation-buttons button {
    padding: 4px 8px;
    border: 1px solid #ccc;
    border-radius: 2px;
    cursor: pointer;
    font-size: 13px;
    background-color: #f8f9fa;
    color: #333;
    transition: background-color 0.2s ease;
}

.navigation-buttons button:hover:not(:disabled) {
    background-color: #e9ecef;
}

.navigation-buttons button:disabled {
    background-color: #f1f1f1;
    color: #999;
    border-color: #ddd;
    cursor: not-allowed;
}
`;