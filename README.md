# Krishna's Cookbook

A beautiful, responsive recipe website built for GitHub Pages. Browse, search, and discover delicious recipes with step-by-step instructions and beautiful food photography.

## Features

### Public Features
- **Homepage**: Featured recipe and recent recipes grid
- **Recipe Listing**: Browse all recipes with search and category filtering
- **Recipe Details**: Full recipe with ingredients, instructions, and step images
- **Categories**: Browse recipes by type (main course, desserts, beverages, etc.)
- **Search**: Real-time search by recipe name, ingredients, or tags
- **Responsive Design**: Works perfectly on desktop, tablet, and mobile
- **Print Support**: Print-friendly recipe pages
- **Social Sharing**: Share recipes on Twitter and Facebook

### Admin Features
- **Secure Login**: Password-protected admin interface
- **Recipe Management**: Create, edit, and delete recipes
- **Draft System**: Save recipes as drafts before publishing
- **Image Support**: Primary images for listings and secondary images for steps
- **Category Management**: Organize recipes by categories
- **Status Control**: Publish or unpublish recipes

## Setup Instructions

### 1. Clone the Repository
```bash
git clone <repository-url>
cd KrishnasCookBook
```

### 2. Deploy to GitHub Pages
1. Push the code to your GitHub repository
2. Go to repository Settings > Pages
3. Select source as "Deploy from a branch"
4. Choose "main" branch and "/ (root)" folder
5. Save and wait for deployment

### 3. Access the Website
- **Public Site**: `https://yourusername.github.io/repository-name`
- **Admin Panel**: `https://yourusername.github.io/repository-name/admin.html`

## Admin Usage

### Login Credentials
- **URL**: `/admin.html`
- **Password**: `krishna123` (change in `assets/js/admin.js`)

### Adding Recipes
1. Login to admin panel
2. Click "Add New Recipe"
3. Fill in all recipe details:
   - **Recipe ID**: Unique identifier (e.g., "butter-chicken")
   - **Title**: Recipe name
   - **Description**: Brief description
   - **Primary Image**: Main recipe image URL
   - **Category**: Select from dropdown
   - **Ingredients**: One ingredient per line
   - **Instructions**: One instruction per line
   - **Times**: Prep, cook, and total time
   - **Servings**: Number of servings
   - **Tags**: Comma-separated tags
   - **Status**: Draft or Published

### Managing Images
- Store images in `assets/images/` folder
- Use relative paths like `assets/images/recipe-name.jpg`
- Primary images appear on homepage and recipe listings
- Secondary images can be linked to specific recipe steps

### Recipe Data Structure
Recipes are stored in `data/recipes.json` with this structure:
```json
{
  "id": "recipe-id",
  "title": "Recipe Title",
  "description": "Recipe description",
  "primaryImage": "assets/images/recipe-primary.jpg",
  "secondaryImages": [
    {
      "step": 2,
      "url": "assets/images/recipe-step2.jpg",
      "description": "Step description"
    }
  ],
  "ingredients": ["ingredient 1", "ingredient 2"],
  "instructions": [
    {"step": 1, "text": "Instruction text"}
  ],
  "prepTime": "15 mins",
  "cookTime": "30 mins",
  "totalTime": "45 mins",
  "servings": "4",
  "tags": ["tag1", "tag2"],
  "category": "main-course",
  "status": "published"
}
```

## File Structure
```
KrishnasCookBook/
├── index.html              # Homepage
├── recipes.html            # All recipes listing
├── recipe.html             # Recipe detail page
├── categories.html         # Categories page
├── admin.html              # Admin interface
├── assets/
│   ├── css/
│   │   └── style.css       # Main stylesheet
│   ├── js/
│   │   ├── app.js          # Main application logic
│   │   └── admin.js        # Admin functionality
│   └── images/             # Recipe images
├── data/
│   └── recipes.json        # Recipe data
└── README.md               # This file
```

## Customization

### Colors and Styling
Edit `assets/css/style.css` to change:
- Primary color: `--primary-color`
- Secondary color: `--secondary-color`
- Accent color: `--accent-color`

### Site Name and Branding
Update the site name in:
- Navigation bars in all HTML files
- Page titles and meta descriptions
- Footer text

### Admin Password
Change the admin password in `assets/js/admin.js`:
```javascript
this.adminPassword = 'your-new-password';
```

## Browser Support
- Chrome (recommended)
- Firefox
- Safari
- Edge

## Performance Features
- Lazy loading for images
- Optimized CSS and JavaScript
- Responsive images
- Fast search with client-side filtering

## SEO Features
- Meta descriptions on all pages
- Semantic HTML structure
- Alt text for images
- Schema.org markup ready
- Social media sharing

## Limitations
- Client-side only (no server-side database)
- Admin changes require manual file updates for production
- Image uploads require manual file management
- No user authentication beyond simple password

## Future Enhancements
- GitHub API integration for automatic recipe updates
- Image upload functionality
- User comments system
- Recipe ratings
- Nutritional information
- Recipe collections/favorites

## Support
For issues or questions, please check the repository issues or create a new issue.

---

Made with ❤️ for food lovers everywhere!