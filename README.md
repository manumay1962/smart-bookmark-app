# 🚀 Smart Bookmark App

A full-stack real-time bookmark manager built using **Next.js (App Router)** and **Supabase**.

Users can securely log in with Google, add personal bookmarks, and see updates in real-time across multiple tabs.

---

## 🌐 Live Demo

🔗 [https://your-vercel-url.vercel.app  ](https://smart-bookmark-app-ecru-seven.vercel.app/)

---
## 🖼 Photos

<img width="1906" height="901" alt="Screenshot 2026-02-13 084803" src="https://github.com/user-attachments/assets/75d446de-2d46-4819-950a-25695dbb54c8" />

<img width="1904" height="833" alt="Screenshot 2026-02-13 084823" src="https://github.com/user-attachments/assets/a29b5df0-5e19-4dc3-bd74-0fb08250ffb8" />



---

## ✨ Features

- 🔐 Google OAuth Authentication (No email/password)
- ➕ Add bookmarks (Title + URL)
- 🗑 Delete bookmarks
- 🔒 Private bookmarks per user (Row Level Security)
- ⚡ Real-time updates across multiple tabs
- 🎨 Modern UI with Tailwind CSS
- 🚀 Deployed on Vercel

---

## 🏗 Tech Stack

### Frontend
- Next.js (App Router)
- Tailwind CSS

### Backend
- Supabase (PostgreSQL)
- Supabase Auth (Google OAuth)
- Supabase Realtime
- Row Level Security (RLS)

### Deployment
- Vercel

---

## 🔐 Security

- Row Level Security enabled on bookmarks table
- Users can only access rows where:
  ```sql
  auth.uid() = user_id
  ```
- Supabase environment variables securely configured in Vercel

---

## ⚡ Real-Time Functionality

Implemented using Supabase Realtime:

```ts
supabase
  .channel("realtime bookmarks")
  .on("postgres_changes", ...)
```

This ensures:
- No page refresh needed
- Instant sync across multiple tabs

---

## 📂 Project Structure

```
app/
 ├── layout.tsx
 ├── page.tsx
lib/
 ├── supabase.ts
```

---

## 🧪 Local Setup

### 1️⃣ Clone the repository

```bash
git clone https://github.com/your-username/your-repo.git
cd your-repo
```

### 2️⃣ Install dependencies

```bash
npm install
```

### 3️⃣ Create `.env.local`

```
NEXT_PUBLIC_SUPABASE_URL=your_supabase_url
NEXT_PUBLIC_SUPABASE_ANON_KEY=your_anon_key
```

### 4️⃣ Run the app

```bash
npm run dev
```

---


## 🎯 Key Learnings

- Implementing secure authentication using OAuth
- Applying Row Level Security in PostgreSQL
- Managing real-time data subscriptions
- Handling production environment configuration
- Debugging OAuth redirect issues

---

## 👨‍💻 Author

Built with ❤️ using Next.js & Supabase.

---

