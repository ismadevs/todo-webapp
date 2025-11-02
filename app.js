// ============================================
// DATA STORAGE
// ============================================

// Array to store all todo items with prepopulated demo data
let todos = [
    {
        id: 1,
        title: 'Completa powerpoint del progetto',
        description: 'Completare le diapositive per la riunione di revisione trimestrale ed esercitarsi sulla presentazione',
        category: 'work',
        completed: false
    },
    {
        id: 2,
        title: 'Fai la spesa',
        description: 'Servono latte, pane, uova, frutta e verdura',
        category: 'shopping',
        completed: false
    },
    {
        id: 3,
        title: 'Morning workout',
        description: '30 minuti cardio e 20 minuti pesi',
        category: 'fitness',
        completed: true
    },
    {
        id: 4,
        title: 'Prenota i biglietti per Barcellona 🇪🇸',
        description: 'Cerca e prenota i voli su Skyscanner.it',
        category: 'vacation',
        completed: false
    },
    {
        id: 5,
        title: 'Paga bolletta della luce',
        description: 'Da pagare entro la scadenza del 15/11',
        category: 'urgent',
        completed: false
    },
    {
        id: 6,
        title: 'Compra Ghost of Yotei',
        description: 'Nuova esclusiva PS5 🔥',
        category: 'shopping',
        completed: false
    }
];

// Object containing all available categories with emoji and names in both languages
const categories = {
    work: { emoji: '🧑‍💻', name: 'Work', nameIt: 'Lavoro' },
    personal: { emoji: '🏡', name: 'Personal', nameIt: 'Personale' },
    shopping: { emoji: '🛒', name: 'Shopping', nameIt: 'Shopping' },
    fitness: { emoji: '💪', name: 'Fitness', nameIt: 'Fitness' },
    vacation: { emoji: '🏖️', name: 'Vacation', nameIt: 'Vacanza' },
    urgent: { emoji: '🚨', name: 'Urgent', nameIt: 'Urgenti' }
};

// ============================================
// LANGUAGE SYSTEM
// ============================================

// Track current language (default: English)
let currentLanguage = 'en';

// Translation object containing all UI text in English and Italian
const translations = {
    en: {
        websiteTitle: 'Todo App by Isma',
        home: 'Home',
        create: 'Create',
        category: 'category',
        categories: 'Categories',
        homeDesc: 'View all your todos',
        createDesc: 'Add a new todo to your list',
        categoriesDesc: 'Browse todos by category',
        titleLabel: 'Title',
        descriptionLabel: 'Description',
        categoryLabel: 'Category',
        selectCategory: 'Select a category',
        createButton: 'Create Todo',
        complete: 'Complete',
        notComplete: 'Not Complete',
        delete: 'Delete',
        completed: 'Completed',
        noTodos: 'No todos yet. Create one to get started!',
        noTodosCategory: 'No todos in this category yet.',
        backToAll: 'Back to All Todos',
        viewing: 'Viewing ',
        from: 'from the',
        todos: 'todos',
        todo: 'todo'
    },
    it: {
        websiteTitle: 'Todo App by Isma',
        home: 'Home',
        create: 'Crea',
        category: '',
        categories: 'Categorie',
        homeDesc: 'Visualizza tutti i tuoi todo',
        createDesc: 'Aggiungi un nuovo todo alla tua lista',
        categoriesDesc: 'Sfoglia i todo per categoria',
        titleLabel: 'Titolo',
        descriptionLabel: 'Descrizione',
        categoryLabel: 'Categoria',
        selectCategory: 'Seleziona una categoria',
        createButton: 'Crea Todo',
        complete: 'Completa',
        notComplete: 'Non Completo',
        delete: 'Elimina',
        completed: 'Completato',
        noTodos: 'Nessun todo ancora. Creane uno per iniziare!',
        noTodosCategory: 'Nessun todo in questa categoria ancora.',
        backToAll: 'Torna a Tutti i Todo',
        viewing: 'Visualizzando i ',
        from: 'da',
        todos: 'todo',
        todo: 'todo'
    }
};

// Helper function to get translated text based on current language
// @param {string} key - The translation key to look up
// @returns {string} - The translated text
function t(key) {
    return translations[currentLanguage][key];
}

// Helper function to get category name in current language
// @param {string} categoryKey - The category key (e.g., 'work', 'shopping')
// @returns {string} - The localized category name
function getCategoryName(categoryKey) {
    return currentLanguage === 'en' ? categories[categoryKey].name : categories[categoryKey].nameIt;
}

// ============================================
// DOM ELEMENTS & VIEW CONFIGURATION
// ============================================

// Get all navigation links from sidebar
const navLinks = document.querySelectorAll('.nav-links a');
// Get all view containers (home, create, categories)
const views = document.querySelectorAll('.view');
// Get section title element in content header
const sectionTitle = document.getElementById('section-title');
// Get section description element in content header
const sectionDescription = document.getElementById('section-description');

// Configuration object for each view with dynamic title and description getters
const viewConfig = {
    home: {
        getTitle: () => t('home'),
        getDescription: () => t('homeDesc')
    },
    create: {
        getTitle: () => t('create'),
        getDescription: () => t('createDesc')
    },
    categories: {
        getTitle: () => t('categories'),
        getDescription: () => t('categoriesDesc')
    }
};

// ============================================
// LANGUAGE TOGGLE
// ============================================

// Get language toggle button
const languageBtn = document.getElementById('language-toggle');

// Add click event listener to language button
languageBtn.addEventListener('click', () => {
    // Toggle between 'en' and 'it'
    currentLanguage = currentLanguage === 'en' ? 'it' : 'en';
    // Update button text with appropriate flag and language code
    languageBtn.textContent = currentLanguage === 'en' ? '🇮🇹 ITA' : '🇺🇸 ENG';
    // Update all UI text to new language
    updateLanguage();
});

// Function to update all UI text when language changes
function updateLanguage() {
    // Update website title in sidebar
    document.querySelector('.website-title').textContent = t('websiteTitle');
    
    // Update navigation link texts
    const navTexts = document.querySelectorAll('.nav-text');
    navTexts[0].textContent = t('home');
    navTexts[1].textContent = t('create');
    navTexts[2].textContent = t('categories');
    
    // Update form labels
    document.querySelector('label[for="todo-title"]').textContent = t('titleLabel');
    document.querySelector('label[for="todo-description"]').textContent = t('descriptionLabel');
    document.querySelector('label[for="todo-category"]').textContent = t('categoryLabel');
    // Update default option in category dropdown
    document.querySelector('#todo-category option[value=""]').textContent = t('selectCategory');
    
    // Update only the form submit button (not the "Back to All Todos" button)
    const formSubmitButton = document.querySelector('#todo-form .btn-primary');
    if (formSubmitButton) {
        formSubmitButton.textContent = t('createButton');
    }
    
    // Update category options in the form dropdown
    const categoryOptions = document.querySelectorAll('#todo-category option:not([value=""])');
    Object.keys(categories).forEach((key, index) => {
        categoryOptions[index].textContent = `${categories[key].emoji} ${getCategoryName(key)}`;
    });
    
    // Get currently active view
    const activeView = document.querySelector('.nav-links a.active').getAttribute('data-view');
    
    // Update header based on whether we're filtering by category or not
    if (currentFilter) {
        // If filtering, show the filtered category name
        const categoryData = categories[currentFilter];
        sectionTitle.textContent = getCategoryName(currentFilter);
        sectionDescription.textContent = `${t('viewing')} ${t('todos')} ${t('from')} ${categoryData.emoji} ${getCategoryName(currentFilter)} ${t('category')}`;
    } else {
        // Otherwise show the standard view title and description
        sectionTitle.textContent = viewConfig[activeView].getTitle();
        sectionDescription.textContent = viewConfig[activeView].getDescription();
    }
    
    // Re-render current content to reflect language changes
    if (activeView === 'home') {
        renderTodos();
    } else if (activeView === 'categories') {
        renderCategories();
    }
}

// ============================================
// VIEW SWITCHING & NAVIGATION
// ============================================

// Track which category is currently being filtered (null = no filter)
let currentFilter = null;
// Flag to prevent clearing filter when clicking category card
let isFilteringByCategory = false;

// Add click event listeners to all navigation links
navLinks.forEach(link => {
    link.addEventListener('click', (e) => {
        // Prevent default anchor behavior
        e.preventDefault();
        // Get which view to show from data-view attribute
        const viewName = link.getAttribute('data-view');
        
        // Remove 'active' class from all nav links
        navLinks.forEach(l => l.classList.remove('active'));
        // Add 'active' class to clicked link
        link.classList.add('active');
        
        // Hide all views
        views.forEach(v => v.classList.remove('active'));
        // Show the selected view
        document.getElementById(`${viewName}-view`).classList.add('active');
        
        // Clear filter when going to home (but not when filtering by category from category cards)
        if (viewName === 'home' && !isFilteringByCategory) {
            clearFilter();
        } else if (viewName !== 'home') {
            // Update header for non-home views
            sectionTitle.textContent = viewConfig[viewName].getTitle();
            sectionDescription.textContent = viewConfig[viewName].getDescription();
            // Clear filter when leaving home view
            currentFilter = null;
        }
        
        // Reset the filtering flag
        isFilteringByCategory = false;
        
        // Render content based on which view is active
        if (viewName === 'home') {
            renderTodos();
        } else if (viewName === 'categories') {
            renderCategories();
        }
    });
});

// ============================================
// TODO CREATION
// ============================================

// Get the todo form element
const todoForm = document.getElementById('todo-form');

// Add submit event listener to the form
todoForm.addEventListener('submit', (e) => {
    // Prevent page reload on form submission
    e.preventDefault();
    
    // Get form values
    const title = document.getElementById('todo-title').value;
    const description = document.getElementById('todo-description').value;
    const category = document.getElementById('todo-category').value;
    
    // Create new todo object with unique timestamp ID
    const todo = {
        id: Date.now(), // Use current timestamp as unique ID
        title,
        description,
        category,
        completed: false // New todos are not completed by default
    };
    
    // Add new todo to the array
    todos.push(todo);
    // Clear form inputs
    todoForm.reset();
    
    // Programmatically click the home nav link to switch to home view
    document.querySelector('[data-view="home"]').click();
});

// ============================================
// CATEGORY FILTERING
// ============================================

// Function to filter todos by category
// @param {string} categoryKey - The category to filter by
function filterByCategory(categoryKey) {
    // Set the current filter
    currentFilter = categoryKey;
    // Set flag to prevent clearing filter when switching to home view
    isFilteringByCategory = true;
    const categoryData = categories[categoryKey];
    
    // Switch to home view to show filtered todos
    document.querySelector('[data-view="home"]').click();
    
    // Update header to show we're viewing a filtered category
    sectionTitle.textContent = getCategoryName(categoryKey);
    sectionDescription.textContent = `${t('viewing')} ${t('todos')} ${t('from')} ${categoryData.emoji} ${getCategoryName(categoryKey)} ${t('category')}`;
    
    // Render the filtered todos
    renderTodos();
}

// Function to clear category filter and show all todos
function clearFilter() {
    // Remove filter
    currentFilter = null;
    // Reset header to default home view text
    sectionTitle.textContent = t('home');
    sectionDescription.textContent = t('homeDesc');
    // Re-render todos without filter
    renderTodos();
}

// ============================================
// TODO RENDERING
// ============================================

// Function to render todos in the feed
function renderTodos() {
    // Get the todos feed container
    const todosFeed = document.querySelector('.todos-feed');
    // Clear existing content
    todosFeed.innerHTML = '';
    
    // Filter todos based on current filter (or show all if no filter)
    const filteredTodos = currentFilter 
        ? todos.filter(t => t.category === currentFilter)
        : todos;
    
    // Show "Back to All Todos" button if we're filtering
    if (currentFilter) {
        const clearBtn = document.createElement('button');
        clearBtn.className = 'btn btn-primary';
        clearBtn.textContent = t('backToAll');
        clearBtn.onclick = clearFilter;
        clearBtn.style.marginBottom = '20px';
        todosFeed.appendChild(clearBtn);
    }
    
    // Show message if no todos found
    if (filteredTodos.length === 0) {
        const messageEl = document.createElement('p');
        messageEl.style.color = '#999';
        // Different message depending on whether we're filtering or not
        messageEl.textContent = currentFilter ? t('noTodosCategory') : t('noTodos');
        todosFeed.appendChild(messageEl);
        return; // Exit function early
    }
    
    // Reverse the array to show newest todos first (without modifying original array)
    const sortedTodos = [...filteredTodos].reverse();
    
    // Loop through todos and create card for each
    sortedTodos.forEach(todo => {
        const categoryData = categories[todo.category];
        // Create todo card element
        const card = document.createElement('div');
        // Add 'completed' class if todo is completed
        card.className = `todo-card ${todo.completed ? 'completed' : ''}`;
        
        // Build card HTML with todo data
        card.innerHTML = `
            <h3 class="todo-title">${todo.title}</h3>
            <span class="todo-category">${categoryData.emoji} ${getCategoryName(todo.category)}</span>
            <p class="todo-description">${todo.description}</p>
            ${todo.completed ? `<span class="todo-status">${t('completed')}</span>` : '<span class="todo-status"></span>'}
            <div class="todo-actions">
                ${todo.completed ? 
                    `<button class="btn btn-complete" onclick="uncompleteTodo(${todo.id})">${t('notComplete')}</button>` : 
                    `<button class="btn btn-complete" onclick="completeTodo(${todo.id})">${t('complete')}</button>`
                }
                <button class="btn btn-delete" onclick="deleteTodo(${todo.id})">${t('delete')}</button>
            </div>
        `;
        
        // Add card to the feed
        todosFeed.appendChild(card);
    });
}

// ============================================
// TODO ACTIONS
// ============================================

// Function to mark a todo as completed
// @param {number} id - The ID of the todo to complete
function completeTodo(id) {
    // Find the todo by ID
    const todo = todos.find(t => t.id === id);
    if (todo) {
        // Set completed to true
        todo.completed = true;
        // Re-render to show changes
        renderTodos();
    }
}

// Function to mark a todo as not completed
// @param {number} id - The ID of the todo to uncomplete
function uncompleteTodo(id) {
    // Find the todo by ID
    const todo = todos.find(t => t.id === id);
    if (todo) {
        // Set completed to false
        todo.completed = false;
        // Re-render to show changes
        renderTodos();
    }
}

// Function to delete a todo
// @param {number} id - The ID of the todo to delete
function deleteTodo(id) {
    // Filter out the todo with matching ID (creates new array without that todo)
    todos = todos.filter(t => t.id !== id);
    // Re-render to show changes
    renderTodos();
}

// ============================================
// CATEGORY RENDERING
// ============================================

// Function to render category cards in the categories view
function renderCategories() {
    // Get the categories grid container
    const categoriesGrid = document.querySelector('.categories-grid');
    // Clear existing content
    categoriesGrid.innerHTML = '';
    
    // Loop through each category and create a card
    Object.keys(categories).forEach(key => {
        const category = categories[key];
        // Count how many todos belong to this category
        const count = todos.filter(t => t.category === key).length;
        
        // Create category card element
        const card = document.createElement('div');
        card.className = 'category-card';
        // Add click handler to filter by this category
        card.onclick = () => filterByCategory(key);
        
        // Build card HTML with category data
        card.innerHTML = `
            <div class="category-emoji">${category.emoji}</div>
            <div class="category-name">${getCategoryName(key)}</div>
            <div class="category-count">${count} ${count === 1 ? t('todo') : t('todos')}</div>
        `;
        
        // Add card to the grid
        categoriesGrid.appendChild(card);
    });
}

// ============================================
// INITIALIZATION
// ============================================

// Render todos on page load
renderTodos();
