You are tasked with developing a GitHub Pages-compatible static recipe website inspired by https://www.yummytummyaarthi.com/. The website will allow users to browse and view personal recipes and include a secure admin interface for creating, updating, deleting, and drafting recipes. The site must be lightweight, responsive, and optimized for static hosting on GitHub Pages, using only client-side technologies (HTML, CSS, JavaScript, and optionally a static site generator like Jekyll). A key requirement is to support recipe photos, including a primary image for display on the homepage and other sections, and secondary images to be included on the recipe detail page to illustrate different steps of the recipe. Below are the detailed requirements and specifications:

### 1. Project Overview
- **Purpose**: Create a personal recipe-sharing website where visitors can browse recipes, view recipe details, and search for recipes. An admin interface will allow the site owner to manage recipes (create, update, delete, and draft).
- **Hosting**: The website must be compatible with GitHub Pages, using only static files (no server-side backend like Node.js or databases). Data storage should leverage JSON, YAML, or Markdown files for recipes.
- **Design Inspiration**: The website should have a clean, user-friendly, and visually appealing design similar to https://www.yummytummyaarthi.com/, with a focus on food imagery, clear typography, and intuitive navigation.
- **Technologies**: Use HTML, CSS (with a framework like Bootstrap or Tailwind for responsiveness), JavaScript (vanilla or a framework like React for interactivity), and optionally Jekyll for static site generation. Avoid server-side technologies or databases.

### 2. Website Features
#### Public-Facing Features
- **Homepage**:
  - Display a hero section with a featured recipe, showcasing its **primary image**, title, and a short description.
  - Show a grid or list of recent/popular recipes with their **primary images**, titles, and short descriptions.
  - Include a search bar to filter recipes by name, category, or ingredients.
- **Recipe Listing Page**:
  - Display all published recipes in a paginated or infinite-scroll grid/list.
  - Each recipe card should include:
    - **Primary image** (thumbnail-sized, optimized for fast loading).
    - Title
    - Short description or excerpt
    - Tags (e.g., vegetarian, quick, dessert)
    - Prep time and serving size
  - Allow filtering by category (e.g., breakfast, lunch, dessert) and sorting (e.g., newest, alphabetical).
- **Recipe Detail Page**:
  - Display full recipe details, including:
    - Title and **primary image** (high-quality, full-size).
    - Description or story behind the recipe.
    - Ingredients list (with quantities).
    - Step-by-step instructions, with **secondary images** associated with specific steps to visually guide the reader (e.g., an image for "mix the batter" or "bake at 180°C"). Secondary images should be optional and displayed alongside or below the relevant step.
    - Prep time, cook time, total time, and servings.
    - Tags or categories.
    - Optional: Nutritional information (if provided).
  - Include a print-friendly button or link for recipes, ensuring **secondary images** are included in the printable version if relevant.
  - Add social sharing buttons for platforms like Pinterest, Twitter, and Facebook.
- **Search Functionality**:
  - Allow users to search recipes by title, ingredients, or tags using client-side JavaScript.
  - Display search results dynamically with instant feedback (e.g., as the user types).
- **Responsive Design**:
  - Ensure the website is fully responsive, working seamlessly on desktop, tablet, and mobile devices.
  - Use a mobile-first approach with a clean, modern layout inspired by https://www.yummytummyaarthi.com/.
  - Ensure **primary and secondary images** are responsively sized and optimized for different screen sizes.

#### Admin Interface
- **Access**:
  - Create a secure admin interface accessible via a specific URL (e.g., `/admin`) protected by a client-side password or authentication mechanism (e.g., JavaScript-based password check or integration with a lightweight auth solution like Firebase Authentication, if compatible with GitHub Pages).
- **Features**:
  - **Create Recipe**: A form to add a new recipe with fields for:
    - Title
    - Description
    - Ingredients (support for list format)
    - Instructions (support for step-by-step input, with the ability to associate a **secondary image** with each step).
    - **Primary image** (upload or URL input, stored as a static asset, used for homepage and recipe listings).
    - **Secondary images** (upload or URL input for multiple images, each linked to a specific instruction step, stored as static assets).
    - Tags/categories
    - Prep time, cook time, servings
    - Status (Published or Draft)
  - **Update Recipe**: Allow editing of existing recipes with the same form fields pre-filled, including the ability to add, remove, or replace **primary and secondary images**.
  - **Delete Recipe**: Option to delete a recipe (including associated images) with a confirmation prompt.
  - **Draft Management**: Allow saving recipes as drafts (not visible to the public) and publishing them later.
  - **Recipe List**: Display a table or list of all recipes (published and drafts) with options to edit or delete, showing the **primary image** thumbnail for each recipe.
- **Data Management**:
  - Store recipes in a JSON, YAML, or Markdown file within the repository (e.g., `_data/recipes.json` or `_recipes/recipe-name.md` if using Jekyll).
  - Include fields for **primary image** and **secondary images** in the data structure, linking to static asset paths.
  - Use client-side JavaScript to read/write to these files (via GitHub API for updates, if feasible, or manual file updates for simplicity).
  - Ensure the admin interface updates the static files and associated images in a way that triggers a rebuild on GitHub Pages.

### 3. Technical Requirements
- **Static Site Compatibility**:
  - The website must work on GitHub Pages, using only static files (HTML, CSS, JavaScript, images).
  - Optionally use Jekyll for templating and data management, leveraging `_data` folders or Markdown files for recipes.
- **Data Storage**:
  - Store recipe data in a structured format (JSON, YAML, or Markdown) within the GitHub repository.
  - Example JSON structure for a recipe:
    ```json
    {
      "id": "recipe-001",
      "title": "Chocolate Cake",
      "description": "A rich and moist chocolate cake.",
      "primaryImage": "/assets/images/chocolate-cake-primary.jpg",
      "secondaryImages": [
        { "step": 1, "url": "/assets/images/chocolate-cake-step1.jpg", "description": "Mixing the batter" },
        { "step": 2, "url": "/assets/images/chocolate-cake-step2.jpg", "description": "Baking the cake" }
      ],
      "ingredients": ["200g flour", "100g sugar", "50g cocoa powder"],
      "instructions": [
        { "step": 1, "text": "Preheat oven to 180°C." },
        { "step": 2, "text": "Mix dry ingredients." }
      ],
      "prepTime": "15 mins",
      "cookTime": "30 mins",
      "servings": "8",
      "tags": ["dessert", "chocolate"],
      "status": "published"
    }
    ```
  - Store **primary and secondary images** in a dedicated folder (e.g., `/assets/images/`).
- **Image Handling**:
  - Support image uploads in the admin interface, storing images as static files in the repository.
  - Optimize **primary and secondary images** for web use (e.g., use WebP format, compress to reduce file size).
  - Ensure **primary images** are sized appropriately for homepage and listing displays (e.g., 400x300px thumbnails).
  - Ensure **secondary images** are sized for recipe detail pages (e.g., 600x400px) and linked to specific steps for clarity.
- **Performance**:
  - Optimize images for fast loading (e.g., use WebP format, compress images).
  - Minimize JavaScript and CSS to ensure quick page loads.
  - Use lazy loading for **primary and secondary images** on recipe listing and detail pages.
- **SEO and Accessibility**:
  - Include meta tags, schema.org markup (e.g., Recipe schema), and alt text for **primary and secondary images** to improve SEO.
  - Ensure the site is accessible (e.g., ARIA labels, keyboard navigation, sufficient color contrast for images and text).
- **Version Control**:
  - Structure the repository for easy deployment to GitHub Pages (e.g., use the `docs/` folder or main branch).
  - Include a `README.md` with setup instructions for cloning, deploying, and managing images.

### 4. Design Guidelines
- **Visual Style**:
  - Use a warm, inviting color palette inspired by food themes (e.g., soft yellows, reds, or greens).
  - Incorporate high-quality food imagery similar to https://www.yummytummyaarthi.com/, with **primary images** prominently displayed on the homepage and listings, and **secondary images** enhancing the recipe steps.
  - Use clean typography (e.g., Google Fonts like Lato or Open Sans) for readability.
- **Layout**:
  - Header with navigation (Home, Recipes, Categories, Search).
  - Footer with links to About, Contact, and social media.
  - Recipe cards in a responsive grid (e.g., 3 columns on desktop, 1 on mobile) featuring **primary images**.
  - Recipe detail page with a clear layout for **primary image** at the top and **secondary images** integrated into the step-by-step instructions (e.g., displayed inline or as a gallery below each step).
- **Admin Interface**:
  - Simple, functional design with a focus on usability.
  - Include a form for uploading **primary image** and multiple **secondary images**, with fields to associate each secondary image with a specific instruction step.
  - Provide a preview of uploaded，**primary and secondary images** and recipe in the admin interface before submission.

- **Image Upload Form**:
  - Include fields for uploading or linking a **primary image** (used for homepage and listings).
  - Allow multiple **secondary images** to be uploaded or linked, with an option to assign each to a specific recipe step (e.g., dropdown or text field to indicate step number).
  - Display a preview of uploaded images in the admin form to confirm selections.
- **Image Management**:
  - Store **primary and secondary images** in a designated folder (e.g., `/assets/images/`) within the GitHub repository.
  - Ensure the admin interface supports adding, replacing, or deleting images during recipe creation or editing.
  - Update the JSON/YAML/Markdown data structure to include references to **primary and secondary images** when saving a recipe.

### 5. Optional Enhancements
- Add a category page to browse recipes by type (e.g., breakfast, vegan).
- Include a “related recipes” section on the recipe detail page, using **primary images** for visual appeal.
- Add a comments section using a static-compatible solution (e.g., Disqus or Utterances).
- Implement a basic analytics tracker (e.g., Google Analytics) for visitor insights.

### 6. Deliverables
- A fully functional GitHub repository with all source code, assets, and documentation.
- A deployed version of the site on GitHub Pages (provide the URL).
- A `README.md` with:
  - Instructions for setting up and deploying the site.
  - Details on how to access and use the admin interface.
  - Guidance on adding new recipes and managing **primary and secondary images** manually (if GitHub API integration is not used).
- Ensure the site is tested for responsiveness, functionality, performance, and proper display of **primary and secondary images** across browsers (Chrome, Firefox, Safari).

### 7. Constraints
- Do not use server-side technologies (e.g., Node.js, PHP, or databases like MySQL).
- If authentication is implemented, use a client-side or static-compatible solution.
- Keep the site lightweight to ensure fast loading on GitHub Pages, especially with multiple images.
- Avoid dependencies that require complex build processes incompatible with GitHub Pages.

### 8. Example Workflow for Admin Updates
- Admin logs into the `/admin` page with a password.
- Admin creates a new recipe using a form, uploading a **primary image** and optional **secondary images** linked to specific steps.
- The form generates a JSON/Markdown file and stores images in the repository’s `/assets/images/` folder.
- Changes are committed to the GitHub repository (manually or via GitHub API).
- GitHub Pages rebuilds the site to reflect updates, including new images.

Please provide the complete source code, structured repository, and deployment instructions. Ensure the **primary image** is used consistently across the homepage, listings, and recipe pages, and **secondary images** are clearly associated with recipe steps for user guidance. If you need clarification on any aspect (e.g., specific design elements, image handling, or admin authentication), let me know!
