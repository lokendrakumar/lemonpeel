# API Configuration Setup

This document describes the API configuration for the Lemonpeel project.

## Base URL

The API base URL is configured as:
```
https://api.lemonpeel.ai/api
```

## Configuration Files

### 1. Environment Variables (`.env.local`)

Create a `.env.local` file in the root directory:

```env
NEXT_PUBLIC_API_BASE_URL=https://api.lemonpeel.ai/api
NEXT_PUBLIC_ENV=development
```

### 2. Constants (`lib/constants.js`)

The API configuration is centralized in `lib/constants.js`:

```javascript
export const API_BASE_URL = process.env.NEXT_PUBLIC_API_BASE_URL || 'https://api.lemonpeel.ai/api';

export const API_ENDPOINTS = {
  AUTH: {
    LOGIN: '/users/login',
    SIGNUP: '/users/create',
    LOGOUT: '/users/logout',
  },
  USERS: {
    PROFILE: '/users/profile',
    UPDATE: '/users/update',
  },
  PROJECTS: {
    LIST: '/projects',
    CREATE: '/projects/create',
  },
};
```

### 3. API Client (`lib/api.js`)

The API client handles all HTTP requests:

```javascript
import { authApi, projectsApi, usersApi } from '@/lib/api';

// Example: Sign up
const data = await authApi.signup({
  firstName: 'John',
  lastName: 'Doe',
  email: 'john@example.com',
  password: 'password123',
  confirmPassword: 'password123',
  purpose: 'personal'
});

// Example: Login
const loginData = await authApi.login({
  email: 'john@example.com',
  password: 'password123',
  rememberMe: true
});
```

## API Endpoints

### Authentication

#### Sign Up
- **Endpoint**: `POST /users/create`
- **Full URL**: `https://api.lemonpeel.ai/api/users/create`
- **Frontend Route**: `/signup`
- **Body**:
  ```json
  {
    "firstname": "John",
    "lastname": "Doe",
    "email": "john.doe@example.com",
    "password": "password123",
    "confirmPassword": "password123",
    "organisationName": "Acme Corporation"
  }
  ```

#### Login
- **Endpoint**: `POST /users/login`
- **Full URL**: `https://api.lemonpeel.ai/api/users/login`
- **Frontend Route**: `/login`
- **Body**:
  ```json
  {
    "email": "string",
    "password": "string",
    "rememberMe": boolean
  }
  ```

## Features

### API Client Features

1. **Automatic Base URL Handling**: All API calls automatically use the configured base URL
2. **Authentication Headers**: Automatically includes auth token from localStorage
3. **Error Handling**: Centralized error handling with detailed error messages
4. **Type Safety**: Supports TypeScript with proper types
5. **Convenience Methods**: Pre-configured methods for common API calls

### Usage in Components

```javascript
import { authApi } from '@/lib/api';

// In your component
const handleSignup = async (userData) => {
  try {
    const data = await authApi.signup(userData);
    console.log('Success:', data);
  } catch (error) {
    console.error('Error:', error.message);
  }
};
```

## Page Routes

The authentication system includes two separate routes:

- **Login Page**: `/login` - User login form
- **Signup Page**: `/signup` - User registration form

### Navigation Behavior

- Clicking "Sign up" on the login page → Navigates to `/signup`
- Clicking "Log in" on the signup page → Navigates to `/login`
- Successful signup → Redirects to `/login` with success message
- Successful login → Redirects to `/projects`

## Testing

To test the API integration:

1. Start the development server: `npm run dev`
2. Navigate to `/login` or `/signup`
3. Test signup flow:
   - Go to `/signup`
   - Fill in all fields and submit
   - Check the browser console for API request details
   - Verify redirect to `/login` after success
4. Test login flow:
   - Go to `/login`
   - Enter credentials and submit
   - Verify redirect to `/projects` after success
5. Check the Network tab to verify the correct URL is being used:
   - Signup: `https://api.lemonpeel.ai/api/users/create`
   - Login: `https://api.lemonpeel.ai/api/users/login`

## Troubleshooting

### Issue: API calls returning CORS errors

**Solution**: Ensure the backend server has CORS configured to allow requests from your Next.js domain.

### Issue: API base URL not updating

**Solution**: 
1. Restart the development server after changing `.env.local`
2. Clear browser cache
3. Check that `NEXT_PUBLIC_` prefix is present in env variable names

### Issue: 404 errors on API calls

**Solution**: Verify that:
1. The base URL is correct: `https://api.lemonpeel.ai/api`
2. The endpoint paths are correct
3. The backend server is running and accessible

## Security Notes

1. Never commit `.env.local` to version control
2. Use environment variables for sensitive data
3. Auth tokens are stored in localStorage
4. All API requests include authentication headers automatically
5. Passwords are never stored in localStorage

## Related Files

- `lib/api.js` - API client and helper functions
- `lib/constants.js` - API configuration and endpoints
- `features/auth/LoginForm.jsx` - Login and signup implementation
- `app/api/auth/signup/route.ts` - Local API route (for development)

