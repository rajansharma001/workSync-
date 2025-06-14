# WorkSync 🧑‍💼✅

**WorkSync** is a full-stack Task Management System built with modern web technologies. It supports **role-based access** where Admins can create, assign, and manage tasks, and Users can update task progress.

## 🚀 Features

- 🧑‍💼 Admin & User roles
- 🔐 Google & GitHub OAuth via Auth.js
- 🔐 Protected routes (middleware + session check)
- 📋 Admin: Create, Update, Delete tasks
- 🧑‍🔧 User: View assigned tasks and update status
- 🌐 Fully responsive UI with Tailwind CSS
- 🛡️ Role-based sidebar navigation
- 🧾 Prisma ORM with MongoDB

## 🛠 Tech Stack

- [Next.js 14 (App Router)](https://nextjs.org/)
- [TypeScript](https://www.typescriptlang.org/)
- [Tailwind CSS](https://tailwindcss.com/)
- [Prisma ORM](https://www.prisma.io/)
- [MongoDB](https://www.mongodb.com/)
- [Auth.js (next-auth)](https://authjs.dev/)
- [shadcn/ui](https://ui.shadcn.com/)

## 📂 Folder Structure

```
.
├── app
│   ├── dashboard
│   ├── login
│   └── layout.tsx
├── components
├── lib
├── prisma
├── public
├── styles
└── utils
```

## 🔧 How to Run Locally

```bash
git clone https://github.com/rajansharma001/workSync-.git
cd workSync-
npm install
# Add .env file with your database and Auth secrets
npx prisma generate
npx prisma db push
npm run dev
```

## 📄 .env Example

```
DATABASE_URL=mongodb+srv://<your-connection-string>
AUTH_SECRET=your-secret
GITHUB_ID=your-client-id
GITHUB_SECRET=your-secret
GOOGLE_ID=your-client-id
GOOGLE_SECRET=your-secret
```

## ✨ Future Improvements

- Add comments or activity logs for each task
- Add filters and sorting for tasks
- Add notifications or email system
- Deploy to production (Vercel, Railway, etc.)

---

## 💼 Author

**Rajan Sharma**  
[GitHub](https://github.com/rajansharma001)
