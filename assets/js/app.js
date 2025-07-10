class RecipeApp {
    constructor() {
        this.recipes = [];
        this.filteredRecipes = [];
        this.init();
    }

    async init() {
        await this.loadRecipes();
        this.setupEventListeners();
        this.renderHomepage();
    }

    async loadRecipes() {
        try {
            const response = await fetch('data/recipes.json');
            this.recipes = await response.json();
            this.filteredRecipes = this.recipes.filter(recipe => recipe.status === 'published');
        } catch (error) {
            console.error('Error loading recipes:', error);
            this.recipes = [];
            this.filteredRecipes = [];
        }
    }

    setupEventListeners() {
        const searchInput = document.getElementById('search-input');
        if (searchInput) {
            searchInput.addEventListener('input', (e) => this.handleSearch(e.target.value));
        }
    }

    handleSearch(query) {
        if (!query.trim()) {
            this.filteredRecipes = this.recipes.filter(recipe => recipe.status === 'published');
        } else {
            this.filteredRecipes = this.recipes.filter(recipe => 
                recipe.status === 'published' && (
                    recipe.title.toLowerCase().includes(query.toLowerCase()) ||
                    recipe.description.toLowerCase().includes(query.toLowerCase()) ||
                    recipe.tags.some(tag => tag.toLowerCase().includes(query.toLowerCase())) ||
                    recipe.ingredients.some(ingredient => ingredient.toLowerCase().includes(query.toLowerCase()))
                )
            );
        }
        this.renderRecipeGrid();
    }

    renderHomepage() {
        this.renderFeaturedRecipe();
        this.renderRecipeGrid();
    }

    renderFeaturedRecipe() {
        const featuredContainer = document.getElementById('featured-recipe');
        if (!featuredContainer || this.filteredRecipes.length === 0) return;

        const featured = this.filteredRecipes[0];
        featuredContainer.innerHTML = `
            <div class="featured-recipe-card">
                <img src="${this.getImageUrl(featured.primaryImage)}" alt="${featured.title}" class="recipe-image">
                <div class="p-4">
                    <h3 class="fw-bold mb-2">${featured.title}</h3>
                    <p class="text-muted mb-3">${featured.description}</p>
                    <div class="recipe-meta mb-3">
                        <small><i class="bi bi-clock"></i> ${featured.totalTime} • <i class="bi bi-people"></i> Serves ${featured.servings}</small>
                    </div>
                    <a href="recipe.html?id=${featured.id}" class="btn btn-primary">View Recipe</a>
                </div>
            </div>
        `;
    }

    renderRecipeGrid() {
        const gridContainer = document.getElementById('recipes-grid');
        if (!gridContainer) return;

        if (this.filteredRecipes.length === 0) {
            gridContainer.innerHTML = '<div class="col-12 text-center"><p class="text-muted">No recipes found.</p></div>';
            return;
        }

        gridContainer.innerHTML = this.filteredRecipes.slice(0, 6).map(recipe => `
            <div class="col-md-6 col-lg-4">
                <div class="recipe-card">
                    <img src="${this.getImageUrl(recipe.primaryImage)}" alt="${recipe.title}" class="recipe-image" loading="lazy">
                    <div class="p-4">
                        <h5 class="fw-bold mb-2">${recipe.title}</h5>
                        <p class="text-muted mb-3">${recipe.description.substring(0, 100)}...</p>
                        <div class="recipe-meta mb-3">
                            <small><i class="bi bi-clock"></i> ${recipe.totalTime} • <i class="bi bi-people"></i> Serves ${recipe.servings}</small>
                        </div>
                        <div class="recipe-tags mb-3">
                            ${recipe.tags.slice(0, 3).map(tag => `<span class="tag">${tag}</span>`).join('')}
                        </div>
                        <a href="recipe.html?id=${recipe.id}" class="btn btn-primary btn-sm">View Recipe</a>
                    </div>
                </div>
            </div>
        `).join('');
    }

    renderAllRecipes() {
        const gridContainer = document.getElementById('recipes-grid');
        if (!gridContainer) return;

        if (this.filteredRecipes.length === 0) {
            gridContainer.innerHTML = '<div class="col-12 text-center"><p class="text-muted">No recipes found.</p></div>';
            return;
        }

        gridContainer.innerHTML = this.filteredRecipes.map(recipe => `
            <div class="col-md-6 col-lg-4 mb-4">
                <div class="recipe-card">
                    <img src="${this.getImageUrl(recipe.primaryImage)}" alt="${recipe.title}" class="recipe-image" loading="lazy">
                    <div class="p-4">
                        <h5 class="fw-bold mb-2">${recipe.title}</h5>
                        <p class="text-muted mb-3">${recipe.description.substring(0, 100)}...</p>
                        <div class="recipe-meta mb-3">
                            <small><i class="bi bi-clock"></i> ${recipe.totalTime} • <i class="bi bi-people"></i> Serves ${recipe.servings}</small>
                        </div>
                        <div class="recipe-tags mb-3">
                            ${recipe.tags.slice(0, 3).map(tag => `<span class="tag">${tag}</span>`).join('')}
                        </div>
                        <a href="recipe.html?id=${recipe.id}" class="btn btn-primary btn-sm">View Recipe</a>
                    </div>
                </div>
            </div>
        `).join('');
    }

    async renderRecipeDetail(recipeId) {
        const recipe = this.recipes.find(r => r.id === recipeId);
        if (!recipe) {
            document.body.innerHTML = '<div class="container mt-5"><h1>Recipe not found</h1></div>';
            return;
        }

        const container = document.getElementById('recipe-detail');
        if (!container) return;

        container.innerHTML = `
            <div class="row">
                <div class="col-lg-8">
                    <img src="${this.getImageUrl(recipe.primaryImage)}" alt="${recipe.title}" class="recipe-detail-image mb-4">
                    <h1 class="fw-bold mb-3">${recipe.title}</h1>
                    <p class="lead mb-4">${recipe.description}</p>
                    
                    <div class="row mb-4">
                        <div class="col-md-3">
                            <strong>Prep Time:</strong><br>${recipe.prepTime}
                        </div>
                        <div class="col-md-3">
                            <strong>Cook Time:</strong><br>${recipe.cookTime}
                        </div>
                        <div class="col-md-3">
                            <strong>Total Time:</strong><br>${recipe.totalTime}
                        </div>
                        <div class="col-md-3">
                            <strong>Servings:</strong><br>${recipe.servings}
                        </div>
                    </div>

                    <div class="recipe-tags mb-4">
                        ${recipe.tags.map(tag => `<span class="tag">${tag}</span>`).join('')}
                    </div>
                </div>
                <div class="col-lg-4">
                    <div class="bg-light p-4 rounded">
                        <h3 class="fw-bold mb-3">Ingredients</h3>
                        <ul class="list-unstyled">
                            ${recipe.ingredients.map(ingredient => `<li class="mb-2">• ${ingredient}</li>`).join('')}
                        </ul>
                    </div>
                </div>
            </div>

            <div class="mt-5">
                <h3 class="fw-bold mb-4">Instructions</h3>
                ${recipe.instructions.map(instruction => {
                    const secondaryImage = recipe.secondaryImages?.find(img => img.step === instruction.step);
                    return `
                        <div class="instruction-step">
                            <h5 class="fw-bold text-primary">Step ${instruction.step}</h5>
                            <p>${instruction.text}</p>
                            ${secondaryImage ? `
                                <img src="${this.getImageUrl(secondaryImage.url)}" 
                                     alt="${secondaryImage.description}" 
                                     class="step-image"
                                     title="${secondaryImage.description}">
                            ` : ''}
                        </div>
                    `;
                }).join('')}
            </div>

            <div class="mt-5 text-center">
                <button onclick="window.print()" class="btn btn-outline-primary me-3">Print Recipe</button>
                <div class="mt-3">
                    <small class="text-muted">Share this recipe:</small>
                    <a href="https://twitter.com/intent/tweet?text=${encodeURIComponent(recipe.title + ' - ' + window.location.href)}" 
                       target="_blank" class="btn btn-sm btn-outline-primary ms-2">Twitter</a>
                    <a href="https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(window.location.href)}" 
                       target="_blank" class="btn btn-sm btn-outline-primary ms-2">Facebook</a>
                </div>
            </div>
        `;
    }

    getImageUrl(imagePath) {
        // Return placeholder if image doesn't exist
        return imagePath || 'https://via.placeholder.com/400x300/d4691a/ffffff?text=Recipe+Image';
    }

    filterByCategory(category) {
        if (category === 'all') {
            this.filteredRecipes = this.recipes.filter(recipe => recipe.status === 'published');
        } else {
            this.filteredRecipes = this.recipes.filter(recipe => 
                recipe.status === 'published' && recipe.category === category
            );
        }
        this.renderAllRecipes();
    }

    getCategories() {
        const categories = [...new Set(this.recipes
            .filter(recipe => recipe.status === 'published')
            .map(recipe => recipe.category))];
        return categories;
    }
}

// Initialize the app
const app = new RecipeApp();

// Make app globally available for other pages
window.recipeApp = app;