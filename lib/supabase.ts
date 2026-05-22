import { createClient } from '@supabase/supabase-js';

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL!;
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!;
const supabaseServiceKey = process.env.SUPABASE_SERVICE_ROLE_KEY!;

// Client-side (anon) — safe to expose
export const supabase = createClient(supabaseUrl, supabaseAnonKey);

// Server-side (admin) — only use in API routes / Server Components
export const supabaseAdmin = createClient(supabaseUrl, supabaseServiceKey, {
  auth: { persistSession: false },
});

export async function uploadDocument(
  file: File,
  threadId: string
): Promise<{ url: string | null; error: string | null }> {
  const ext = file.name.split('.').pop();
  const path = `threads/${threadId}/${Date.now()}.${ext}`;

  const { data, error } = await supabaseAdmin.storage
    .from('documents')
    .upload(path, file, {
      cacheControl: '3600',
      upsert: false,
      contentType: file.type,
    });

  if (error) return { url: null, error: error.message };

  const { data: publicData } = supabaseAdmin.storage
    .from('documents')
    .getPublicUrl(data.path);

  return { url: publicData.publicUrl, error: null };
}
