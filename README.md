# Backend Setup Notes 🚀

While setting up my Node.js backend project, I faced several issues, especially with **dotenv** and **MongoDB connection** when using **ES Modules (`type: "module"`)**.
Here are some important lessons and fixes that helped me. 👇

---

## 1️⃣ Dotenv Issues ⚠️

* When using **ES Modules**, dotenv sometimes doesn't load automatically.
* If you are running the file from a different folder, you may need to **provide the correct path**.

Example:

```js
import dotenv from "dotenv";

dotenv.config({ path: "../.env" });
```

Also make sure:

* ❌ `PORT = 4000`
* ✅ `PORT=4000`

**There should be NO spaces around `=` in `.env` variables.**

Example `.env`:

```
PORT=4000
MONGODB_URL=mongodb+srv://username:password@cluster.mongodb.net
```

---

## 2️⃣ Password Mismatch 🔐

Sometimes the **MongoDB Atlas password** does not match the one in `.env`.

Fix:

* Double-check your **database user password** in MongoDB Atlas.
* If needed, **reset the password** and update it in `.env`.

---

## 3️⃣ Running the Project ▶️

If your project structure is:

```
root
│
├─ .env
├─ package.json
└─ src
   └─ index.js
```

Run the project from the **root folder**:

```
node src/index.js
```

---

## 4️⃣ Never Push `node_modules` to Git ❌

`node_modules` is extremely large and should **never be pushed to GitHub**.

Always add this in `.gitignore`:

```
node_modules
.env
```

---

## 5️⃣ Use IIFE for Database Connection ⚡

Using an **Immediately Invoked Function Expression (IIFE)** for database connection ensures the code runs immediately when the server starts.

Example:

```js
(async () => {
  try {
    await mongoose.connect(process.env.MONGODB_URL);
    console.log("Database connected ✅");
  } catch (error) {
    console.error("Database connection failed ❌", error);
  }
})();
```

---

## 💡 Final Thought

Debugging these small issues can feel like a **nightmare 😵‍💫**, but once solved, they teach a lot about **Node.js environment setup, MongoDB connections, and project structure**.

Happy Coding! 💻✨


