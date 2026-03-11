export interface FeedPost {
  id: string;
  author: string;
  handle: string;
  content: string;
  timestamp: string;
  likes: number;
  comments: number;
  accent: string;
}

export const feedPosts: FeedPost[] = [
  {
    id: '1',
    author: 'George',
    handle: '@george',
    content:
      'Shipped a fresh portfolio concept today. I wanted it to feel less like a website and more like a system you can explore.',
    timestamp: '2h',
    likes: 48,
    comments: 6,
    accent: '#0ea5e9',
  },
  {
    id: '2',
    author: 'George',
    handle: '@george',
    content:
      'Currently obsessed with interfaces that feel tactile: layered glass, subtle motion, fast feedback, and clear hierarchy.',
    timestamp: '6h',
    likes: 63,
    comments: 11,
    accent: '#8b5cf6',
  },
  {
    id: '3',
    author: 'George',
    handle: '@george',
    content:
      'I like building product experiences where design and engineering feel like the same conversation, not separate phases.',
    timestamp: '1d',
    likes: 71,
    comments: 9,
    accent: '#f97316',
  },
];

// To make this admin-only in production:
// 1. Store posts in a database or CMS, not in this file.
// 2. Put create/update/delete actions behind a server endpoint.
// 3. Require auth on that endpoint using GitHub OAuth, Clerk, or Supabase Auth.
// 4. Only allow your user ID/email to write posts.
// The public app can stay read-only while only you see the private admin editor.
