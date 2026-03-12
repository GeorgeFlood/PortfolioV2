export interface FeedPost {
  id: string;
  title: string;
  content: string;
  timestamp: string;
  category: 'design' | 'process' | 'shipped';
}

export const feedPosts: FeedPost[] = [
  {
    id: '1',
    title: 'Building a portfolio that behaves like a product',
    content:
      'Shipped a fresh portfolio concept that feels less like a brochure site and more like an interface you can move through. The goal is simple: make the work feel interactive before you even open a tab.',
    timestamp: '2h',
    category: 'shipped',
  },
  {
    id: '2',
    title: 'Designing for rhythm, not decoration',
    content:
      'I keep coming back to interfaces that feel tactile: layered glass, subtle motion, and enough spacing that everything has room to breathe.',
    timestamp: '6h',
    category: 'design',
  },
  {
    id: '3',
    title: 'Using AI like a collaborator, not a shortcut',
    content:
      'Using AI is most useful when it speeds up exploration but still leaves room for judgment, review, and cleanup. I want the final output to feel considered, not generated.',
    timestamp: '1d',
    category: 'process',
  },
];

// To make this admin-only in production:
// 1. Store posts in a database or CMS, not in this file.
// 2. Put create/update/delete actions behind a server endpoint.
// 3. Require auth on that endpoint using GitHub OAuth, Clerk, or Supabase Auth.
// 4. Only allow your user ID/email to write posts.
// The public app can stay read-only while only you see the private admin editor.
