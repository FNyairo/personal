import { redirect } from 'next/navigation';

// /discuss now lives inside /blog — redirect seamlessly
export default function DiscussRedirect() {
  redirect('/blog?tab=discuss');
}
