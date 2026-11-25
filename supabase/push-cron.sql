-- The daily phone notifications of the maintenance reminders (25 Nov 2026). Run it ONCE in SQL Editor, AFTER schema.sql and after
-- deploying the Edge Function maint-push. pg_cron calls maint-push every day at 09:00 Dubai (05:00 UTC) with the secret kept in
-- ms_push_conf; maint-push sends the reminders due that day (or before, every 3 days while still open) to the phones of the admins,
-- managers and deputies. If your project is not kvdrdtuqfmtwihebmnih, change the address below. Safe to run again.
create extension if not exists pg_cron;
create extension if not exists pg_net;

select cron.unschedule(jobid) from cron.job where jobname = 'ms-maint-push';
select cron.schedule('ms-maint-push', '0 5 * * *', $job$
  select net.http_post(
    url := 'https://kvdrdtuqfmtwihebmnih.supabase.co/functions/v1/maint-push',
    headers := jsonb_build_object('Content-Type', 'application/json', 'x-ms-cron', (select cron_secret from public.ms_push_conf where id = 1)),
    body := '{"action":"daily"}'::jsonb,
    timeout_milliseconds := 30000);
$job$);

-- what is scheduled now
select jobid, jobname, schedule, active from cron.job where jobname = 'ms-maint-push';
