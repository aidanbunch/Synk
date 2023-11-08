/*** USERS ***/

create table public.users (
  -- UUID from auth.users
  "id" uuid references auth.users not null primary key,
  -- User data
  "email" text,
  "name" text,
  -- Validate data
  constraint "email" check (char_length("email") >= 3 OR char_length("email") <= 500),
  constraint "name" check (char_length("name") >= 1 OR char_length("name") <= 144)
);

-- Create security policies
alter table public.users enable row level security;
create policy "Can view their user data" on public.users for select using ( auth.uid() = "id" );
create policy "Can update their user data" on public.users for update using ( auth.uid() = "id" );

-- Create a trigger that automatically inserts a new user after signup with Supabase Auth
create or replace function public.handle_new_user() 
returns trigger as $$
begin
  insert into public.users ("id", "email", "name")
  values (new."id", new."email", new."raw_user_meta_data"->>'full_name');
  return new;
end;
$$ language plpgsql security definer;
create trigger on_auth_user_created
  after insert on auth.users
  for each row execute procedure public.handle_new_user();


-- Create a trigger that automatically updates a user when their email is changed in Supabase Auth
create or replace function public.handle_update_user() 
returns trigger as $$
begin
  update public.users
  set "email" = new."email"
  where "id" = new."id";
  return new;
end;
$$ language plpgsql security definer;
create trigger on_auth_user_updated
  after update of "email" on auth.users
  for each row execute procedure public.handle_update_user();