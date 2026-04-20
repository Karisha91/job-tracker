Job Application Tracker
A full-stack job application tracking app built with Next.js 15, TypeScript, and Prisma. Track your applications, monitor progress through the hiring pipeline, add notes per application, and visualize your job search data with interactive charts.
🔗 Live Demo: [your-vercel-url-here]
Test credentials:

Email: test@gmail.com
Password: test


Tech Stack

Framework: Next.js 15 (App Router)
Language: TypeScript
Database: PostgreSQL (Neon)
ORM: Prisma 5
Auth: NextAuth v5 (JWT strategy, bcrypt)
Styling: Tailwind CSS
Charts: Recharts
Deployment: Vercel


Features

🔐 Authentication — register, login, logout with secure JWT sessions
📋 Full CRUD for job applications (company, role, status, date)
📝 Notes per application — add and delete notes
📊 Dashboard with real-time stats — total applied, interviews, offers, rejections
🥧 Pie chart — application breakdown by status
📈 Line chart — applications submitted over time
🔒 Protected routes — middleware guards all authenticated pages
🛡️ Ownership checks — users can only access their own data