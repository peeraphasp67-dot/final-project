Final Project – Fullstack CRUD Application
(Next.js 15 + Prisma ORM + MySQL + Authentication)

โปรเจกต์นี้เป็นเว็บแอปพลิเคชันสำหรับ จัดการสินค้าแฟชั่น (Product Fashion Management System)
ประกอบด้วยระบบ Login, Register, Authentication ผ่าน Cookie และระบบ CRUD ของสินค้า
เป็นงานสำหรับรายวิชา DIT205 – การพัฒนาโปรแกรมประยุกต์

พัฒนาโดย
Peeraphas Panopas (u6705010)
มหาวิทยาลัยรังสิต

🚀 เทคโนโลยีที่ใช้
🖥️ Frontend & Backend

Next.js 15 (App Router + Server Components)

React

TypeScript

Tailwind CSS

Next.js Middleware (Auth Protect)

🗄️ Database & ORM

MySQL (ผ่าน XAMPP + phpMyAdmin)

Prisma ORM

🔧 Tools

Node.js

npm

VSCode

Git & GitHub

🔐 ฟีเจอร์ Authentication

สมัครสมาชิก (Register)

ล็อกอิน (Login)

ล็อกเอาต์ (Logout)

จัดการ session ด้วย cookie (session-token)

ป้องกันหน้า /products ไม่ให้คนที่ไม่ได้ login เข้าใช้งาน

เมื่อ login แล้วจะแสดงชื่อผู้ใช้บน Navbar

📦 ฟีเจอร์ของระบบสินค้า (Product Management)
ฟีเจอร์	รายละเอียด
Create	เพิ่มสินค้าใหม่ผ่านฟอร์ม
Read	แสดงรายการสินค้าจากฐานข้อมูลแบบ real-time
Update	แก้ไขข้อมูลสินค้าแต่ละชิ้น
Delete	ลบสินค้าได้ทันทีผ่าน API
Protect Page	เข้าหน้านี้ได้เฉพาะผู้ที่ login แล้วเท่านั้น

🗄️ Prisma Schema (ใช้ใน DB จริง)
model User {
  id       Int      @id @default(autoincrement())
  email    String   @unique
  password String
}

model Product {
  id        Int      @id @default(autoincrement())
  name      String
  price     Int
  image     String?
  category  String?
  createdAt DateTime @default(now())
}

▶️ วิธีติดตั้งและรันโปรเจกต์
1️⃣ Clone Repository
git clone https://github.com/peeraphasp67-dot/final-project.git
cd final-project

2️⃣ ติดตั้ง Dependencies
npm install

3️⃣ ตั้งค่า Database (.env)
DATABASE_URL="mysql://root@localhost:3306/fullstack_products"

4️⃣ Prisma Migrate
npx prisma migrate dev

5️⃣ รันโปรเจกต์
npm run dev


จากนั้นเปิดเว็บที่
👉 http://localhost:3000
