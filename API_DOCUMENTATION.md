# LootYard API Documentation

This document describes the external web services, APIs, and libraries integrated into the LootYard project (`index.html` and `home.html`) and how they are used.

---

## 1. Firebase Authentication API
- **Type**: Backend-as-a-Service (BaaS) Auth API
- **Description**: Firebase Auth provides secure, ready-to-use authentication services. It supports federated sign-in methods (Google, GitHub, Facebook, etc.) as well as classic email/password sign-in.
- **Usage in LootYard**:
  - Authenticates users to access, download, and review assets.
  - Implements popup-based authentication for Google (`signInWithPopup(GoogleAuthProvider)`) and GitHub (`signInWithPopup(GithubAuthProvider)`).
  - Handles traditional email & password account registration (`createUserWithEmailAndPassword`) and login (`signInWithEmailAndPassword`).
  - Listeners dynamically update the topbar UI states (`guestButtons` vs. logged-in `userArea`) on auth state change (`onAuthStateChanged`).

---

## 2. Firebase Firestore Database API
- **Type**: Cloud NoSQL Database API
- **Description**: Firestore is a flexible, scalable database for mobile, web, and server development. It keeps data in sync across client apps through realtime listeners.
- **Usage in LootYard**:
  - **User Profiles**: Stores and retrieves authenticated user profiles (name, email, avatar photoURL, last seen).
  - **Asset Cataloging**: Dynamically loads 3D and other game assets from the `products` collection to populate grids.
  - **User Downloads**: Logs downloads in the `downloads` collection whenever a user grabs a free asset.
  - **Reviews & Comments**: Saves user reviews in the `reviews` collection, queried in real time to show feedback for specific assets in the side panel.

---

## 3. DiceBear Avatar API
- **Type**: Open-source Avatar Generation API
- **Endpoint**: `https://api.dicebear.com/8.x/thumbs/svg`
- **Description**: A free web service that generates unique, responsive avatar SVG designs from a seed string (e.g. username).
- **Usage in LootYard**:
  - Automatically generates profile avatars for guests and registered users who don't have custom upload images, using their display name as the seed string.
  - Renders user avatars in review lists, the profile dropdown, and comment forms.

---

## 4. Gravatar API
- **Type**: Globally Recognized Avatar API
- **Endpoint**: `https://www.gravatar.com/avatar/{email_hash}`
- **Description**: A web service providing globally unique profile pictures tied to email addresses. Users who have signed up on Gravatar can have their profile pictures retrieved on any supported site.
- **Usage in LootYard**:
  - Generates a SHA-256 hash of the logged-in user's email address to query Gravatar.
  - If a valid avatar exists (returning a successful HTTP response), it dynamically updates the user's avatar image, falling back to the DiceBear API if no Gravatar image is found.

---

## 5. Unsplash Source API
- **Type**: Dynamic Image Generation API
- **Endpoint**: `https://source.unsplash.com/400x300/?{keywords}&sig={seed}`
- **Description**: A legacy free image-fetching endpoint from Unsplash that serves high-quality stock imagery based on search tags.
- **Usage in LootYard**:
  - Generates deterministic preview images for the assets card grids (Popular, Recents, and Category filters) using category keywords (such as `environments`, `weapons`, `props`) and a unique seed string (`product.id`) to ensure images remain consistent on page reloads.

---

## 6. Google Model Viewer Component API
- **Type**: Web Component API
- **Endpoint**: `@google/model-viewer` via unpkg CDN
- **Description**: A web component developed by Google to easily display interactive 3D models (GLTF/GLB files) in standard web browsers, supporting auto-rotation, animations, lighting controls, and AR.
- **Usage in LootYard**:
  - Displays high-fidelity, interactive 3D models on the landing page (such as the Mushroom Potion, Toy Trueno Panda, and Cartoon Plane) to provide visual showcases.
  - Configures lighting exposure, auto-rotation speed, and custom float animations to match LootYard's premium cream theme.
