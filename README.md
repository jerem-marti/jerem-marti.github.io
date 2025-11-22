# My GitHub Repositories

A clean, responsive GitHub Pages site that automatically lists all your repositories using the GitHub API.

## Features

- 📦 Automatically fetches and displays all your public repositories
- 🔍 Real-time search functionality to filter repositories
- 📊 Statistics dashboard showing total repos, stars, and forks
- 🎨 Modern, responsive design that works on all devices
- 🌈 Language badges with GitHub's official color scheme
- ⚡ Fast loading with API caching

## Setup

1. **Update the GitHub username**: Open `script.js` and change the `GITHUB_USERNAME` constant to your GitHub username:
   ```javascript
   const GITHUB_USERNAME = 'your-username-here';
   ```

2. **Deploy to GitHub Pages**:
   - Go to your repository settings
   - Navigate to "Pages" section
   - Select the branch (usually `main` or `master`) and root directory
   - Click "Save"
   - Your site will be available at `https://your-username.github.io/your-repo-name/`

3. **Access your site**: Visit `https://jerem-marti.github.io/` (or your custom domain)

## Customization

### Change Colors
Edit the CSS variables in `styles.css`:
```css
:root {
    --primary-color: #2563eb;
    --secondary-color: #1e40af;
    /* ... other colors */
}
```

### Modify Layout
- Edit `index.html` to change the structure
- Update `styles.css` for styling changes
- Modify `script.js` for functionality changes

## Technologies Used

- HTML5
- CSS3 (with CSS Grid and Flexbox)
- Vanilla JavaScript
- GitHub REST API

## Browser Support

Works in all modern browsers:
- Chrome/Edge (latest)
- Firefox (latest)
- Safari (latest)
- Mobile browsers

## License

Free to use and modify for your own GitHub Pages site.
