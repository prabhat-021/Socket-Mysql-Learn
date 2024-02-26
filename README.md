This is a [Next.js](https://nextjs.org/) project bootstrapped with [`create-next-app`](https://github.com/vercel/next.js/tree/canary/packages/create-next-app).

## Getting Started

First, run the development server:

```bash
npm run dev
# or
yarn dev
# or
pnpm dev
# or
bun dev
```

## Docker Command

To run the project using Docker, use the following command:

```bash
docker pull prabhatsehrawat/wechat:01

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

You can start editing the page by modifying `app/page.tsx`. The page auto-updates as you edit the file.

# Environment Variables

Before running the project, ensure you have the following environment variables set up:

- `NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY`: Your Clerk Publishable Key.
- `CLERK_SECRET_KEY`: Your Clerk Secret Key.
- `NEXT_PUBLIC_CLERK_SIGN_IN_URL`: Sign-in URL for Clerk.
- `NEXT_PUBLIC_CLERK_SIGN_UP_URL`: Sign-up URL for Clerk.
- `NEXT_PUBLIC_CLERK_AFTER_SIGN_IN_URL`: URL to redirect after signing in with Clerk.
- `NEXT_PUBLIC_CLERK_AFTER_SIGN_UP_URL`: URL to redirect after signing up with Clerk.
- `DATABASE_URL`: MongoDB database URL.
- `UPLOADTHING_SECRET`: Secret key for Uploadthing.
- `UPLOADTHING_APP_ID`: App ID for Uploadthing.
- `LIVEKIT_API_KEY`: API Key for Livekit.
- `LIVEKIT_API_SECRET`: API Secret for Livekit.
- `NEXT_PUBLIC_LIVEKIT_URL`: URL for Livekit.

Ensure these variables are properly configured before running the project.

## Note for Project Cloner

When cloning this project, ensure to set up the necessary environment variables as mentioned above to successfully run the code.


This project uses [`next/font`](https://nextjs.org/docs/basic-features/font-optimization) to automatically optimize and load Inter, a custom Google Font.

## Learn More

To learn more about Next.js, take a look at the following resources:

- [Next.js Documentation](https://nextjs.org/docs) - learn about Next.js features and API.
- [Learn Next.js](https://nextjs.org/learn) - an interactive Next.js tutorial.

You can check out [the Next.js GitHub repository](https://github.com/vercel/next.js/) - your feedback and contributions are welcome!

## Deploy on Vercel

The easiest way to deploy your Next.js app is to use the [Vercel Platform](https://vercel.com/new?utm_medium=default-template&filter=next.js&utm_source=create-next-app&utm_campaign=create-next-app-readme) from the creators of Next.js.

Check out our [Next.js deployment documentation](https://nextjs.org/docs/deployment) for more details.

# State Management in React: Zustand vs Redux

## Zustand

- **Simplicity:** Zustand is designed to be simple and lightweight. It provides a minimalistic API for creating and managing state in React components.
  
- **Use of Hooks:** Zustand leverages React hooks to manage state. You use the `create` function from Zustand to define a store, and then use the resulting hook in your components.

- **No Global Store:** While you can create a global store with Zustand, it's common to use multiple stores for different parts of the application. Each store can be scoped to a specific component or feature.

- **Immutability:** Zustand encourages immutability, but it allows you to directly modify the state if needed.

- **Synchronous Updates:** State updates are synchronous by default, which can simplify the mental model when dealing with state changes.

## Redux

- **Predictable State Container:** Redux is often referred to as a "predictable state container." It centralizes the application state in a single store, and state changes are managed through dispatched actions.

- **Global Store:** Redux typically uses a single global store that contains the entire state of the application. Components can connect to the store to access and update state.

- **Middleware:** Redux allows the use of middleware to handle asynchronous actions. Middleware can intercept and process actions before they reach the reducer.

- **Action-Reducer Pattern:** Actions are dispatched to trigger state changes, and reducers specify how the state should change in response to actions. This separation of concerns is known as the action-reducer pattern.

- **Immutable Updates:** Redux encourages immutability, and state updates are expected to be performed in an immutable way. This helps with tracking changes and maintaining a predictable state.

## Choosing Between Zustand and Redux

- Use Zustand if you prefer a lightweight, hooks-based approach and don't need the full feature set of Redux.

- Use Redux if you have a complex state management scenario, need middleware for asynchronous actions, or if you're working on a large-scale application where a global state is beneficial.

Both libraries have their strengths and are widely used in the React ecosystem. The choice between them depends on the specific requirements and preferences of your project.

## Client-Side Data Fetching

The `useClient` directive indicates that the following code is meant for the client side. This is important for data fetching operations that should be performed on the client, especially in the context of client-side rendering (CSR) or static site generation (SSG).

# Refs in React

Refs in React are primarily used for accessing and interacting with DOM elements and for persisting mutable values across component renders. Here's a breakdown of their main purposes:

- **Accessing DOM Elements**: Refs allow you to reference DOM elements directly within your React components. This is useful when you need to access properties or methods of DOM elements that are not easily accessible via React's props or state.

- **Managing Focus, Text Selection, and Form Control**: Refs enable you to manage focus within your components, control text selection, and interact with form controls directly. For example, you can programmatically focus or select text in an input field using refs.

- **Triggering Imperative Actions**: Refs can be used to trigger imperative actions, such as scrolling to a specific position, measuring the size or position of a DOM element, or triggering animations.

- **Integration with Third-Party Libraries**: Refs provide a way to integrate with third-party libraries or non-React code that relies on direct access to DOM elements.

- **Optimizing Performance**: Refs can help optimize performance by avoiding unnecessary re-renders when dealing with mutable values that don't need to be part of the component's state.

Overall, refs serve as a bridge between React components and the DOM, allowing you to leverage the full power of the browser's capabilities within your React applications.
