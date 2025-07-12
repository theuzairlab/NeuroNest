# Environment Variables Setup

## Create .env.local file

Create a file named `.env.local` in your project root directory with the following content:

```env
# MediMate Healthcare API Configuration
NEXT_PUBLIC_API_URL=https://medimate-backend-coral.vercel.app

# Optional: For development/testing
# NEXT_PUBLIC_API_URL=http://localhost:8000
```

## Important Notes:

1. **File Location**: The `.env.local` file should be in the root directory of your project (same level as `package.json`)

2. **File Name**: Make sure the file is named exactly `.env.local` (with the dot at the beginning)

3. **Environment Variables**: The `NEXT_PUBLIC_` prefix is required for variables that need to be accessible in the browser

4. **API URL**: The current URL `https://medimate-backend-coral.vercel.app` is your live MediMate API backend

## Manual Setup Steps:

1. **Create the file**:
   ```bash
   # In your project root directory
   touch .env.local
   ```

2. **Add the content**:
   ```env
   NEXT_PUBLIC_API_URL=https://medimate-backend-coral.vercel.app
   ```

3. **Restart your development server**:
   ```bash
   npm run dev
   ```

## Verification:

After creating the `.env.local` file and restarting your server, the application will automatically use your MediMate API backend. You can verify this by:

1. Opening the browser console (F12)
2. Typing a message in the chat
3. Checking the network tab to see requests going to your API URL

## Production Environment:

For production deployment (like Vercel), add the environment variable in your hosting platform's dashboard:

- **Variable Name**: `NEXT_PUBLIC_API_URL`
- **Variable Value**: `https://medimate-backend-coral.vercel.app` 