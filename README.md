# Library Management System – Frontend

This is the **Frontend** for the Library Management System built using **React**, **TypeScript**, **Redux Toolkit Query**, and **Tailwind CSS + DaisyUI**.

## Features

- View paginated book list
- Add, edit, delete books
- Borrow books with quantity and due date
- Aggregated borrow summary
- Optimistic UI for deletes
- Toast notifications for feedback
- Fully responsive layout
- Type-safe form handling

## Technologies Used

- React + Vite
- TypeScript
- Redux Toolkit + RTK Query
- React Router
- Tailwind CSS + DaisyUI
- React Hot Toast

## Folder Structure

```
client/
├── src/
│   ├── components/
│   │   └── Layout, Footer, etc.
│   ├── features/
│   │   ├── book/
│   │   │   └── book.api.ts
│   │   └── borrow/
│   │       └── borrow.api.ts
│   ├── pages/
│   │   ├── BookList.tsx
│   │   ├── AddBook.tsx
│   │   ├── EditBook.tsx
│   │   ├── BorrowForm.tsx
│   │   └── BorrowSummary.tsx
│   ├── App.tsx
│   └── main.tsx
├── index.html
└── package.json
```

## Installation & Running

```bash
npm install
npm run dev
```

Runs at `http://localhost:5173`

## Available Routes

| Route           | Description                           |
| --------------- | ------------------------------------- |
| /books          | View all books                        |
| /create-book    | Add a new book                        |
| /edit-book/:id  | Edit existing book                    |
| /borrow/:bookId | Borrow a specific book                |
| /borrow-summary | View total quantity borrowed per book |
| /books/:id      | View book details                     |

## API Connection

This app connects to the backend at:

```
http://localhost:5000/api/
```

Make sure the backend server is running before starting the frontend.

## Developer

- Built by Tanzeem Siddique
