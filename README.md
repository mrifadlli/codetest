This is a [Next.js](https://nextjs.org/) project bootstrapped with [`create-next-app`](https://github.com/vercel/next.js/tree/canary/packages/create-next-app).

## Getting Started

# Next.js Blog Post Application

This is a [Next.js](https://nextjs.org/) project bootstrapped with [`create-next-app`](https://github.com/vercel/next.js/tree/canary/packages/create-next-app).

## Getting Started

To set up and run this application locally, follow these steps:

### Step 1: Create a `.env` File
Add the following environment variables to your `.env` file in the root directory:

```env
NEXT_PUBLIC_TOKEN_ACCESS="18df519d4580c1d4e25f3f20ed6b91dd8a5bb8dc61845950ad56748782930d69"
NEXT_PUBLIC_BASE_URL="https://gorest.co.in"
NEXT_PUBLIC_ROOT_ID=7565315
```

### Step 2: Run the app
Then, run this:

- npm i
- npm run dev

### Step 3: Enter the app
Do this step to enter the app

- click copy button Use this token
- click enter button
- input username as you want
- paste token into input Token GoRest

you can search root user on search box '/dashboard/users'

| ID       | Name | Gender | Status |
|----------|------|--------|--------|
| 7565315  | ROOT | Female | Active |


that user cannot be delete, because in this public api, when user has been delete, that user can't create post.

this app provide :

- Credential Access to Blog Post
Display a welcome dialog upon first access to the app.
The dialog should include input name and input Go Rest Token.
Show appropriate error or success messages based on input validity.

- Post List
Fetch and display a list of blog posts from the GoRest API.
Ensure posts are optimized with pagination for performance.
Provide a search and filter feature to refine the post list.

- Detail Post
The detail post feature should be implemented as a dedicated page rather than a modal or dialog
Allow users to view detailed information about a specific post.
Include fields like post title, body, and author information.

- Create Post
Implement a form to allow users to create a new post.
Validate input fields (e.g., title and body are required).
Show success or error messages based on API response.

- Update Post
Enable users to edit an existing post.
Display current values pre-filled in the form for easy modification.
Handle success and error states for the update operation.


- Delete Post
Allow users to delete a post.
Confirm the action through a modal dialog before proceeding.
Show feedback (success/error) after the operation.

This app will be deploy on vercel:
https://codetest-ueed.vercel.app/

## thank you