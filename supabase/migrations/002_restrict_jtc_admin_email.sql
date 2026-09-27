-- Restrict JTC Reminder App data access to the authorized church admin email.

drop policy if exists "JTC admins can read reminders" on public.reminders;
create policy "JTC admins can read reminders"
on public.reminders for select
to authenticated
using ((select auth.jwt() ->> 'email') = 'jubileetamilchurchsanpada@gmail.com');

drop policy if exists "JTC admins can add reminders" on public.reminders;
create policy "JTC admins can add reminders"
on public.reminders for insert
to authenticated
with check (
  (select auth.jwt() ->> 'email') = 'jubileetamilchurchsanpada@gmail.com'
  and created_by = (select auth.uid())
);

drop policy if exists "JTC admins can update reminders" on public.reminders;
create policy "JTC admins can update reminders"
on public.reminders for update
to authenticated
using ((select auth.jwt() ->> 'email') = 'jubileetamilchurchsanpada@gmail.com')
with check ((select auth.jwt() ->> 'email') = 'jubileetamilchurchsanpada@gmail.com');

drop policy if exists "JTC admins can delete reminders" on public.reminders;
create policy "JTC admins can delete reminders"
on public.reminders for delete
to authenticated
using ((select auth.jwt() ->> 'email') = 'jubileetamilchurchsanpada@gmail.com');
