# Firebase Authentication Setup Guide

This guide will help you set up Firebase Authentication for the St. Paul's AI Learning Platform.

## Prerequisites

- Google Account (preferably with Google Developer Premium Program access)
- Firebase Console access
- Node.js 22+ installed

## Step 1: Create a Firebase Project

1. Go to [Firebase Console](https://console.firebase.google.com/)
2. Click "Add project" or select an existing project
3. Enter project name: `stpauls-ai-learning` (or your preferred name)
4. Enable/disable Google Analytics (optional)
5. Click "Create project"

## Step 2: Enable Authentication

1. In your Firebase project, click on "Authentication" in the left sidebar
2. Click "Get started"
3. Go to the "Sign-in method" tab
4. Enable the following providers:

### Google Sign-In
- Click on "Google"
- Toggle "Enable"
- Enter project support email
- Click "Save"

### Email/Password
- Click on "Email/Password"
- Toggle "Enable"
- Click "Save"

## Step 3: Register Your Web App

1. In Firebase Console, go to Project Settings (gear icon)
2. Scroll down to "Your apps" section
3. Click on the Web icon (`</>`)
4. Enter app nickname: "St Paul's AI Learning"
5. **Optional:** Enable Firebase Hosting (not required if using Netlify)
6. Click "Register app"
7. Copy the Firebase configuration object

## Step 4: Configure Environment Variables

1. Create a `.env` file in the project root (copy from `.env.example`):

```bash
cp .env.example .env
```

2. Fill in your Firebase configuration values:

```env
# Firebase Configuration
VITE_FIREBASE_API_KEY=AIzaSy...
VITE_FIREBASE_AUTH_DOMAIN=your-project-id.firebaseapp.com
VITE_FIREBASE_PROJECT_ID=your-project-id
VITE_FIREBASE_STORAGE_BUCKET=your-project-id.appspot.com
VITE_FIREBASE_MESSAGING_SENDER_ID=123456789
VITE_FIREBASE_APP_ID=1:123456789:web:abc123
VITE_FIREBASE_MEASUREMENT_ID=G-XXXXXXXXXX

# Your existing Supabase config
VITE_SUPABASE_URL=https://your-project-ref.supabase.co
VITE_SUPABASE_ANON_KEY=your_supabase_anon_key
```

3. **Important:** Never commit `.env` to version control. It's already in `.gitignore`.

## Step 5: Configure Authorized Domains

For production deployment:

1. Go to Firebase Console → Authentication → Settings
2. Scroll to "Authorized domains"
3. Add your domains:
   - `localhost` (for development - already included)
   - Your Netlify domain: `your-app.netlify.app`
   - Your custom domain: `ai.stpauls.br` (if applicable)

## Step 6: Apply Supabase Migrations

The authentication system uses Supabase for user profiles and bookmarks. Apply the migrations:

1. Make sure you have Supabase CLI installed:
```bash
npm install -g supabase
```

2. Link your project:
```bash
supabase link --project-ref your-project-ref
```

3. Push the migrations:
```bash
supabase db push
```

This will create the following tables:
- `user_profiles` - Firebase user data synced to Supabase
- `bookmarks` - User bookmarked resources
- `learning_progress` - Course completion tracking
- `user_activity` - Analytics and activity logs
- `collections` - User-created resource collections
- `collection_items` - Items in collections

## Step 7: Configure Supabase Row-Level Security

The migrations automatically set up RLS policies, but you need to configure JWT verification:

1. Go to Supabase Dashboard → Settings → API
2. Add Firebase as a JWT issuer:
   - Go to "Auth Providers"
   - Add custom JWT provider
   - Set issuer URL: `https://securetoken.google.com/YOUR_FIREBASE_PROJECT_ID`
   - Add Firebase public keys URL: `https://www.googleapis.com/robot/v1/metadata/x509/securetoken@system.gserviceaccount.com`

## Step 8: Test the Integration

1. Start the development server:
```bash
npm run dev
```

2. Open http://localhost:5173

3. Test authentication:
   - Click "Sign In" button in header
   - Try Google Sign-In
   - Try Email/Password sign-up
   - Verify user profile is created in Supabase

4. Test bookmarks:
   - Sign in
   - Navigate to an AI tool
   - Click the bookmark button
   - Check that bookmark appears in Supabase database

## Features Enabled

With Firebase Authentication configured, users can:

✅ **Sign in with Google** - One-click authentication
✅ **Email/Password authentication** - Traditional login
✅ **Bookmark AI tools** - Save favorite tools
✅ **Track learning progress** - Monitor course completion
✅ **Create collections** - Organize bookmarked resources
✅ **Personalized dashboard** - Custom user experience

## Security Best Practices

1. **Never expose service role keys** - Only use in backend/edge functions
2. **Enable App Check** (optional) - Protect against abuse
3. **Set up rate limiting** - Firebase Auth has built-in limits
4. **Monitor authentication events** - Check Firebase Console logs
5. **Regular security reviews** - Audit RLS policies

## Troubleshooting

### "Missing environment variables" error
- Check that all required `VITE_FIREBASE_*` variables are set in `.env`
- Restart the dev server after adding env vars

### Google Sign-In popup blocked
- Check browser popup blocker settings
- Ensure domain is in Firebase authorized domains

### Supabase RLS policies blocking access
- Verify JWT token is being sent correctly
- Check Firebase UID matches what's stored in `user_profiles.firebase_uid`
- Review Supabase logs in Dashboard

### User profile not created
- Check Supabase connection
- Verify `createUserProfile` function is being called
- Check browser console for errors

## Additional Resources

- [Firebase Authentication Docs](https://firebase.google.com/docs/auth)
- [Supabase Auth Docs](https://supabase.com/docs/guides/auth)
- [Firebase + Supabase Integration](https://supabase.com/docs/guides/auth/third-party/firebase)

## Support

For issues specific to St. Paul's setup:
1. Check the troubleshooting section above
2. Review browser console logs
3. Check Supabase and Firebase logs
4. Contact the IT department
