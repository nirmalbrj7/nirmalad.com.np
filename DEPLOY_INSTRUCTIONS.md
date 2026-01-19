# Deploying to Cloudflare Pages

You have two main ways to deploy this portfolio to Cloudflare Pages:

## Option 1: Automatic Deployment via GitHub (Recommended)

1.  **Push to GitHub**:
    *   Initialize a git repository if you haven't already:
        ```bash
        git init
        git add .
        git commit -m "Initial commit"
        ```
    *   Create a new repository on GitHub and push your code there.

2.  **Connect to Cloudflare**:
    *   Log in to the [Cloudflare Dashboard](https://dash.cloudflare.com/).
    *   Go to **Workers & Pages** > **Create Application** > **Pages** > **Connect to Git**.
    *   Select your GitHub repository.
    *   **Build Settings**:
        *   **Framework Preset**: `Vite`
        *   **Build Command**: `npm run build`
        *   **Build Output Directory**: `dist`
    *   Click **Save and Deploy**.

## Option 2: Direct Upload (Manual Push)

If you just want to push the built site directly from your computer without GitHub:

1.  Run the deploy script I added to your `package.json`:
    ```bash
    npm run deploy
    ```
    *   This will automatically build your project (`npm run build`) and then try to upload the `dist` folder using Wrangler.
    *   You may be asked to log in to Cloudflare in your browser the first time.
    *   It will ask you to create a new project name (e.g., `nirmal-portfolio`).

## Configuration

*   **`.gitignore`**: I've added this file to ensure you don't upload unnecessary files (like `node_modules`) to GitHub.
*   **`wrangler.toml`**: I've added this file to help Cloudflare understand your project settings if you use the CLI.
