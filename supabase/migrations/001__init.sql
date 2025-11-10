create table public.tasks (
  id uuid primary key default uuid_generate_v4(),
  user_id uuid references auth.users(id) on delete cascade,
  description text not null,
  completed boolean default false,
  created_at timestamp with time zone default now()
);
