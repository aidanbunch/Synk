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

/*** EVENT FLOWS ***/

create table public.event_flows (
  "id" uuid primary key default uuid_generate_v4(),
  "owner" uuid references public.users not null,
  "event_name" text,
  "num_attendees" integer,
  "budget" numeric,
  "description" text,
  "hq_location" text,
  "start_date" date,
  "end_date" date,
  constraint "event_name" check (char_length("event_name") >= 1 OR char_length("event_name") <= 144)
);

alter table public.event_flows enable row level security;
create policy "Can view their event flows" on public.event_flows for select using ( auth.uid() = "owner" );
create policy "Can insert their event flows" on public.event_flows for insert with check ( auth.uid() = "owner" );
create policy "Can update their event flows" on public.event_flows for update using ( auth.uid() = "owner" );
create policy "Can delete their event flows" on public.event_flows for delete using ( auth.uid() = "owner" );

/*** HOTELS ***/

create table public.hotels (
  "id" uuid primary key default uuid_generate_v4(),
  "hotel_info" jsonb
);

/*** FLIGHTS ***/

create table public.flights (
  "id" uuid primary key default uuid_generate_v4(),
  "flight_info" jsonb
);

/*** ACTIVITIES ***/

create table public.activities (
  "id" uuid primary key default uuid_generate_v4(),
  "activity_info" jsonb
);

/*** EVENT_FLOW_HOTELS ***/

create table public.event_flow_hotels (
  "event_flow" uuid references public.event_flows not null,
  "hotel" uuid references public.hotels not null,
  primary key ("event_flow", "hotel")
);

alter table public.event_flow_hotels enable row level security;
create policy "Can view their event_flow_hotels" on public.event_flow_hotels for select using ( auth.uid() = (select "owner" from public.event_flows where "id" = "event_flow") );
create policy "Can insert their event_flow_hotels" on public.event_flow_hotels for insert with check ( auth.uid() = (select "owner" from public.event_flows where "id" = "event_flow") );
create policy "Can delete their event_flow_hotels" on public.event_flow_hotels for delete using ( auth.uid() = (select "owner" from public.event_flows where "id" = "event_flow") );

/*** EVENT_FLOW_FLIGHTS ***/

create table public.event_flow_flights (
  "event_flow" uuid references public.event_flows not null,
  "flight" uuid references public.flights not null,
  primary key ("event_flow", "flight")
);

alter table public.event_flow_flights enable row level security;
create policy "Can view their event_flow_flights" on public.event_flow_flights for select using ( auth.uid() = (select "owner" from public.event_flows where "id" = "event_flow") );
create policy "Can insert their event_flow_flights" on public.event_flow_flights for insert with check ( auth.uid() = (select "owner" from public.event_flows where "id" = "event_flow") );
create policy "Can delete their event_flow_flights" on public.event_flow_flights for delete using ( auth.uid() = (select "owner" from public.event_flows where "id" = "event_flow") );

/*** EVENT_FLOW_ACTIVITIES ***/

create table public.event_flow_activities (
  "event_flow" uuid references public.event_flows not null,
  "activity" uuid references public.activities not null,
  primary key ("event_flow", "activity")
);

alter table public.event_flow_activities enable row level security;
create policy "Can view their event_flow_activities" on public.event_flow_activities for select using ( auth.uid() = (select "owner" from public.event_flows where "id" = "event_flow") );
create policy "Can insert their event_flow_activities" on public.event_flow_activities for insert with check ( auth.uid() = (select "owner" from public.event_flows where "id" = "event_flow") );
create policy "Can delete their event_flow_activities" on public.event_flow_activities for delete using ( auth.uid() = (select "owner" from public.event_flows where "id" = "event_flow") );
