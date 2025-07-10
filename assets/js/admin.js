class AdminPanel {
    constructor() {
        this.recipes = [];
        this.editingRecipe = null;
        this.adminPassword = 'krishna123';
        this.init();
    }

    async init() {
        await this.loadRecipes();
        this.setupEventListeners();
    }

    async loadRecipes() {
        try {
            const localRecipes = localStorage.getItem('recipes');
            if (localRecipes) {
                this.recipes = JSON.parse(localRecipes);
                return;
            }
            
            const response = await fetch('data/recipes.json');
            this.recipes = await response.json();
        } catch (error) {
            console.error('Error loading recipes:', error);
            this.recipes = [];
        }
    }

    setupEventListeners() {
        const primaryImageInput = document.querySelector('input[name="primaryImage"]');
        if (primaryImageInput) {
            primaryImageInput.addEventListener('input', (e) => {
                const preview = document.getElementById('primary-preview');
                if (e.target.value) {
                    preview.src = e.target.value;
                    preview.style.display = 'block';
                } else {
                    preview.style.display = 'none';
                }
            });
        }

        const recipeForm = document.getElementById('recipe-form');
        if (recipeForm) {
            recipeForm.addEventListener('submit', (e) => this.handleRecipeSubmit(e));
        }
    }

    handleRecipeSubmit(e) {
        e.preventDefault();
        const formData = new FormData(e.target);
        const recipe = this.formDataToRecipe(formData);
        
        if (this.editingRecipe) {
            this.updateRecipe(recipe);
        } else {
            this.addRecipe(recipe);
        }
    }

    formDataToRecipe(formData) {
        return {
            id: formData.get('id'),
            title: formData.get('title'),
            description: formData.get('description'),
            primaryImage: formData.get('primaryImage') || '',
            secondaryImages: [],
            ingredients: formData.get('ingredients').split('\n').filter(i => i.trim()),
            instructions: formData.get('instructions').split('\n').filter(i => i.trim()).map((text, index) => ({
                step: index + 1,
                text: text.trim()
            })),
            prepTime: formData.get('prepTime'),
            cookTime: formData.get('cookTime'),
            totalTime: formData.get('totalTime'),
            servings: formData.get('servings'),
            tags: formData.get('tags').split(',').map(t => t.trim()).filter(t => t),
            category: formData.get('category'),
            status: formData.get('status')
        };
    }

    addRecipe(recipe) {
        if (this.recipes.find(r => r.id === recipe.id)) {
            alert('Recipe ID already exists. Please use a different ID.');
            return;
        }

        this.recipes.push(recipe);
        this.saveRecipes();
        this.showRecipesList();
        resetForm();
        alert('Recipe added successfully!');
    }

    updateRecipe(recipe) {
        const index = this.recipes.findIndex(r => r.id === this.editingRecipe.id);
        if (index !== -1) {
            this.recipes[index] = recipe;
            this.saveRecipes();
            this.showRecipesList();
            resetForm();
            this.editingRecipe = null;
            alert('Recipe updated successfully!');
        }
    }

    deleteRecipe(recipeId) {
        if (confirm('Are you sure you want to delete this recipe?')) {
            this.recipes = this.recipes.filter(r => r.id !== recipeId);
            this.saveRecipes();
            this.showRecipesList();
            alert('Recipe deleted successfully!');
        }
    }

    editRecipe(recipeId) {
        const recipe = this.recipes.find(r => r.id === recipeId);
        if (!recipe) return;

        this.editingRecipe = recipe;
        this.populateForm(recipe);
        showSection('add-recipe');
        document.querySelector('#add-recipe-section h3').textContent = 'Edit Recipe';
    }

    populateForm(recipe) {
        const form = document.getElementById('recipe-form');
        form.querySelector('input[name="id"]').value = recipe.id;
        form.querySelector('input[name="title"]').value = recipe.title;
        form.querySelector('textarea[name="description"]').value = recipe.description;
        form.querySelector('input[name="primaryImage"]').value = recipe.primaryImage || '';
        form.querySelector('select[name="category"]').value = recipe.category;
        form.querySelector('textarea[name="ingredients"]').value = recipe.ingredients.join('\n');
        form.querySelector('textarea[name="instructions"]').value = recipe.instructions.map(i => i.text).join('\n');
        form.querySelector('input[name="prepTime"]').value = recipe.prepTime;
        form.querySelector('input[name="cookTime"]').value = recipe.cookTime;
        form.querySelector('input[name="totalTime"]').value = recipe.totalTime;
        form.querySelector('input[name="servings"]').value = recipe.servings;
        form.querySelector('input[name="tags"]').value = recipe.tags.join(', ');
        form.querySelector('select[name="status"]').value = recipe.status;

        if (recipe.primaryImage) {
            const preview = document.getElementById('primary-preview');
            preview.src = recipe.primaryImage;
            preview.style.display = 'block';
        }
    }

    saveRecipes() {
        localStorage.setItem('recipes', JSON.stringify(this.recipes));
        
        const dataStr = JSON.stringify(this.recipes, null, 2);
        const dataBlob = new Blob([dataStr], {type: 'application/json'});
        const url = URL.createObjectURL(dataBlob);
        
        const downloadDiv = document.getElementById('download-recipes') || this.createDownloadDiv();
        downloadDiv.innerHTML = `
            <div class="alert alert-info mt-3">
                <strong>Recipe updated!</strong> 
                <a href="${url}" download="recipes.json" class="btn btn-sm btn-primary ms-2">
                    Download Updated recipes.json
                </a>
                <small class="d-block mt-2">Replace the file in data/recipes.json and commit to GitHub to publish changes.</small>
            </div>
        `;
    }
    
    createDownloadDiv() {
        const div = document.createElement('div');
        div.id = 'download-recipes';
        document.getElementById('recipes-section').appendChild(div);
        return div;
    }

    showRecipesList() {
        const recipesList = document.getElementById('recipes-list');
        if (!recipesList) return;

        if (this.recipes.length === 0) {
            recipesList.innerHTML = '<p class="text-muted">No recipes found.</p>';
            return;
        }

        recipesList.innerHTML = `
            <div class="table-responsive">
                <table class="table table-striped">
                    <thead>
                        <tr>
                            <th>Image</th>
                            <th>Title</th>
                            <th>Category</th>
                            <th>Status</th>
                            <th>Actions</th>
                        </tr>
                    </thead>
                    <tbody>
                        ${this.recipes.map(recipe => `
                            <tr>
                                <td>
                                    <img src="${recipe.primaryImage || 'https://via.placeholder.com/60x40'}" 
                                         alt="${recipe.title}" 
                                         style="width: 60px; height: 40px; object-fit: cover; border-radius: 5px;">
                                </td>
                                <td>
                                    <strong>${recipe.title}</strong><br>
                                    <small class="text-muted">${recipe.description.substring(0, 50)}...</small>
                                </td>
                                <td><span class="badge bg-secondary">${recipe.category}</span></td>
                                <td>
                                    <span class="badge ${recipe.status === 'published' ? 'bg-success' : 'bg-warning'}">
                                        ${recipe.status}
                                    </span>
                                </td>
                                <td>
                                    <button onclick="adminPanel.editRecipe('${recipe.id}')" class="btn btn-sm btn-outline-primary me-1">
                                        Edit
                                    </button>
                                    <button onclick="adminPanel.deleteRecipe('${recipe.id}')" class="btn btn-sm btn-outline-danger">
                                        Delete
                                    </button>
                                </td>
                            </tr>
                        `).join('')}
                    </tbody>
                </table>
            </div>
        `;
    }
}

async function login() {
    const password = document.getElementById('admin-password').value;
    
    if (password === 'krishna123') {
        document.getElementById('login-screen').style.display = 'none';
        document.getElementById('admin-panel').style.display = 'block';
        
        const adminPanel = new AdminPanel();
        window.adminPanel = adminPanel;
    } else {
        document.getElementById('login-error').style.display = 'block';
    }
}

function showSection(sectionId) {
    document.querySelectorAll('.admin-section').forEach(section => {
        section.style.display = 'none';
    });
    document.getElementById(sectionId + '-section').style.display = 'block';
}

function resetForm() {
    document.getElementById('recipe-form').reset();
    document.getElementById('primary-preview').style.display = 'none';
    document.querySelector('#add-recipe-section h3').textContent = 'Add New Recipe';
    if (window.adminPanel) {
        window.adminPanel.editingRecipe = null;
    }
}

function logout() {
    document.getElementById('login-screen').style.display = 'flex';
    document.getElementById('admin-panel').style.display = 'none';
    document.getElementById('admin-password').value = '';
    document.getElementById('login-error').style.display = 'none';
}

document.addEventListener('DOMContentLoaded', function() {
    const passwordInput = document.getElementById('admin-password');
    if (passwordInput) {
        passwordInput.focus();
        passwordInput.addEventListener('keypress', function(e) {
            if (e.key === 'Enter') {
                login();
            }
        });
    }
});