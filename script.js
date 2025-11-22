// Configuration - Update with your GitHub username
const GITHUB_USERNAME = 'jerem-marti'; // Change this to your GitHub username

// Language colors (matching GitHub's color scheme)
const languageColors = {
    JavaScript: '#f1e05a',
    Python: '#3572A5',
    Java: '#b07219',
    TypeScript: '#2b7489',
    HTML: '#e34c26',
    CSS: '#563d7c',
    PHP: '#4F5D95',
    Ruby: '#701516',
    Go: '#00ADD8',
    Rust: '#dea584',
    'C++': '#f34b7d',
    C: '#555555',
    'C#': '#178600',
    Shell: '#89e051',
    Swift: '#ffac45',
    Kotlin: '#F18E33',
    R: '#198CE7',
    Dart: '#00B4AB',
    Scala: '#c22d40',
    Vue: '#41b883',
};

let allRepositories = [];

// Fetch repositories from GitHub API
async function fetchRepositories() {
    const loadingEl = document.getElementById('loading');
    const errorEl = document.getElementById('error');
    const statsEl = document.getElementById('stats');
    const reposContainer = document.getElementById('reposContainer');

    try {
        // Show loading state
        loadingEl.style.display = 'block';
        errorEl.style.display = 'none';
        statsEl.style.display = 'none';

        // Fetch user's repositories
        const response = await fetch(`https://api.github.com/users/${GITHUB_USERNAME}/repos?per_page=100&sort=updated`);
        
        if (!response.ok) {
            throw new Error('Failed to fetch repositories');
        }

        allRepositories = await response.json();

        // Hide loading, show content
        loadingEl.style.display = 'none';
        statsEl.style.display = 'flex';

        // Update stats
        updateStats(allRepositories);

        // Display repositories
        displayRepositories(allRepositories);

    } catch (error) {
        console.error('Error fetching repositories:', error);
        loadingEl.style.display = 'none';
        errorEl.style.display = 'block';
    }
}

// Update statistics
function updateStats(repos) {
    const totalStars = repos.reduce((sum, repo) => sum + repo.stargazers_count, 0);
    const totalForks = repos.reduce((sum, repo) => sum + repo.forks_count, 0);

    document.getElementById('repoCount').textContent = repos.length;
    document.getElementById('starCount').textContent = totalStars;
    document.getElementById('forkCount').textContent = totalForks;
}

// Display repositories
function displayRepositories(repos) {
    const reposContainer = document.getElementById('reposContainer');
    
    if (repos.length === 0) {
        reposContainer.innerHTML = '<div class="no-results"><p>No repositories found.</p></div>';
        return;
    }

    reposContainer.innerHTML = repos.map(repo => createRepoCard(repo)).join('');
}

// Create repository card HTML
function createRepoCard(repo) {
    const description = repo.description ? 
        `<p class="repo-description">${escapeHtml(repo.description)}</p>` : 
        '<p class="repo-description" style="font-style: italic;">No description provided</p>';

    const language = repo.language ? 
        `<div class="repo-language">
            <span class="language-color" style="background-color: ${languageColors[repo.language] || '#ccc'}"></span>
            <span>${repo.language}</span>
        </div>` : '';

    const updatedDate = new Date(repo.updated_at).toLocaleDateString('en-US', {
        year: 'numeric',
        month: 'short',
        day: 'numeric'
    });

    // Determine the link: if repo has GitHub Pages, link to it; otherwise link to GitHub repo
    const repoLink = repo.has_pages ? 
        `https://${GITHUB_USERNAME}.github.io/${repo.name}/` : 
        repo.html_url;
    
    const linkTarget = repo.has_pages ? '_self' : '_blank';

    return `
        <div class="repo-card" onclick="window.open('${repoLink}', '${linkTarget}')">
            <div class="repo-header">
                <span class="repo-icon">${repo.has_pages ? '🌐' : '📁'}</span>
                <a href="${repoLink}" class="repo-name" target="${linkTarget}" onclick="event.stopPropagation()">
                    ${escapeHtml(repo.name)}
                </a>
            </div>
            ${description}
            ${language}
            <div class="repo-stats">
                <span class="repo-stat">⭐ ${repo.stargazers_count}</span>
                <span class="repo-stat">🍴 ${repo.forks_count}</span>
                ${repo.open_issues_count > 0 ? `<span class="repo-stat">📋 ${repo.open_issues_count}</span>` : ''}
                ${repo.has_pages ? '<span class="repo-stat">🌐 Pages</span>' : ''}
            </div>
            <div class="repo-updated">Updated on ${updatedDate}</div>
        </div>
    `;
}

// Search/filter repositories
function searchRepositories(query) {
    const filteredRepos = allRepositories.filter(repo => {
        const searchStr = query.toLowerCase();
        return repo.name.toLowerCase().includes(searchStr) ||
               (repo.description && repo.description.toLowerCase().includes(searchStr)) ||
               (repo.language && repo.language.toLowerCase().includes(searchStr));
    });

    displayRepositories(filteredRepos);
}

// Escape HTML to prevent XSS
function escapeHtml(text) {
    const div = document.createElement('div');
    div.textContent = text;
    return div.innerHTML;
}

// Event listeners
document.addEventListener('DOMContentLoaded', () => {
    // Fetch repositories on page load
    fetchRepositories();

    // Search functionality
    const searchInput = document.getElementById('searchInput');
    searchInput.addEventListener('input', (e) => {
        searchRepositories(e.target.value);
    });
});
