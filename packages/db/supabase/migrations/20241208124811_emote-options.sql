create or replace view "public"."emote_option" as  SELECT emote.id,
    emote.created_at,
    emote.user_id,
    emote.emoji,
    emote.name,
    emote.is_pro,
    emote.visibility,
    COALESCE(array_agg(form_emote.form_id) FILTER (WHERE (form_emote.form_id IS NOT NULL)), ARRAY[]::uuid[]) AS form_id
   FROM (emote
     LEFT JOIN form_emote ON ((form_emote.emote_id = emote.id)))
  GROUP BY emote.id;
