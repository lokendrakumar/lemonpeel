# Authentication Routing Setup

## Overview

The authentication system now has proper URL routing with separate pages for login and signup.

## Changes Made

### 1. Created Signup Page
- **File**: `app/signup/page.tsx`
- **Route**: `/signup`
- **Description**: Dedicated signup page that displays the signup form

### 2. Updated LoginForm Component
- **File**: `features/auth/LoginForm.jsx`
- **Changes**:
  - Added `defaultView` prop to support both login and signup views
  - Replaced state toggling with proper URL navigation
  - Click "Sign up" → navigates to `/signup` URL
  - Click "Log in" → navigates to `/login` URL
  - After successful signup → redirects to `/login`

### 3. Updated API Endpoints
- **File**: `lib/constants.js`
- **Changes**:
  - Login: `/users/login` (was `/auth/login`)
  - Signup: `/users/create` (was `/api/users/create`)
  - Logout: `/users/logout` (was `/auth/logout`)

## URL Structure

```
/login          → Login page
/signup         → Signup page
```

## User Flow

### Signup Flow
1. User visits `/signup` or clicks "Sign up" from login page
2. User fills in the form:
   - First Name
   - Last Name
   - Email
   - Password
   - Confirm Password
   - Purpose of Login (dropdown)
3. User clicks "Sign up" button
4. API call to `https://api.lemonpeel.ai/api/users/create`
5. On success: Redirects to `/login` with success message
6. On error: Shows error message on the same page

### Login Flow
1. User visits `/login` or clicks "Log in" from signup page
2. User fills in credentials:
   - Email
   - Password
   - Remember me (optional)
3. User clicks "Log in" button
4. API call to `https://api.lemonpeel.ai/api/users/login`
5. On success: Redirects to `/projects`
6. On error: Shows error message on the same page

## Navigation Links

### From Login Page (`/login`)
- "Sign up" link → Routes to `/signup`

### From Signup Page (`/signup`)
- "Log in" link → Routes to `/login`

## API Integration

All API calls now use the centralized API client with the base URL:
```
https://api.lemonpeel.ai/api
```

### API Endpoints
- **Signup**: `POST https://api.lemonpeel.ai/api/users/create`
- **Login**: `POST https://api.lemonpeel.ai/api/users/login`

## Files Modified

1. `app/signup/page.tsx` - New signup page
2. `app/signup/loading.tsx` - Loading state for signup page
3. `features/auth/LoginForm.jsx` - Updated with routing logic
4. `lib/constants.js` - Updated API endpoints
5. `API_SETUP.md` - Updated documentation

## Testing

### Test Signup
1. Navigate to `http://localhost:3000/signup`
2. Fill in all fields
3. Submit form
4. Check URL changes to `/login` after success

### Test Login
1. Navigate to `http://localhost:3000/login`
2. Fill in credentials
3. Submit form
4. Check URL changes to `/projects` after success

### Test Navigation
1. From `/login`, click "Sign up" → URL should change to `/signup`
2. From `/signup`, click "Log in" → URL should change to `/login`
3. Browser back/forward buttons should work correctly

## Benefits

✅ Clean URL structure with proper routes
✅ Better user experience with addressable URLs
✅ Proper browser history navigation
✅ Easy to share direct links to signup or login
✅ Better SEO (if pages are made public)
✅ Follows Next.js best practices

