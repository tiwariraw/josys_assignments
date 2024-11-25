enum BookGenre {
  FICTION = "FICTION",
  NON_FICTION = "NON_FICTION",
  MYSTERY = "MYSTERY",
  SCIENCE_FICTION = "SCIENCE_FICTION",
  BIOGRAPHY = "BIOGRAPHY",
  FANTASY = "FANTASY",
}

enum MemberRole {
  ORGANIZER = "ORGANIZER",
  MODERATOR = "MODERATOR",
  MEMBER = "MEMBER",
  GUEST = "GUEST",
}

type Book = {
  title: string;
  author: string;
  genre: BookGenre;
};

type Member = {
  name: string;
  role: MemberRole;
};

function getBooksByGenre(books: Book[], genre: BookGenre): Book[] {
  return books.filter((book) => book.genre === genre);
}

function getMembersByRole(members: Member[], role: MemberRole): Member[] {
  return members.filter((member) => member.role === role);
}

function countBooksByGenre(books: Book[]): Record<BookGenre, number> {
  return books.reduce(
    (acc, book) => {
      acc[book.genre] = (acc[book.genre] || 0) + 1;
      return acc;
    },
    {
      [BookGenre.FICTION]: 0,
      [BookGenre.NON_FICTION]: 0,
      [BookGenre.MYSTERY]: 0,
      [BookGenre.SCIENCE_FICTION]: 0,
      [BookGenre.BIOGRAPHY]: 0,
      [BookGenre.FANTASY]: 0,
    }
  );
}

const books: Book[] = [
  { title: "1984", author: "George Orwell", genre: BookGenre.FICTION },
  {
    title: "Sapiens",
    author: "Yuval Noah Harari",
    genre: BookGenre.NON_FICTION,
  },
  { title: "The Hobbit", author: "J.R.R. Tolkien", genre: BookGenre.FANTASY },
  { title: "The Da Vinci Code", author: "Dan Brown", genre: BookGenre.MYSTERY },
];

const members: Member[] = [
  { name: "Alice", role: MemberRole.MEMBER },
  { name: "Bob", role: MemberRole.ORGANIZER },
  { name: "Charlie", role: MemberRole.MODERATOR },
  { name: "Dave", role: MemberRole.GUEST },
];

console.log(getBooksByGenre(books, BookGenre.FICTION));

console.log(getMembersByRole(members, MemberRole.MEMBER));

console.log(countBooksByGenre(books));
