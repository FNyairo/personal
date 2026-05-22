'use client';
import { useEditor, EditorContent } from '@tiptap/react';
import StarterKit from '@tiptap/starter-kit';
import Image from '@tiptap/extension-image';
import Link from '@tiptap/extension-link';
import Typography from '@tiptap/extension-typography';

export default function BlogContent({ content }: { content: unknown }) {
  const editor = useEditor({
    extensions: [StarterKit, Image, Link, Typography],
    content: content as object,
    editable: false,
    editorProps: { attributes: { class: 'tiptap-content' } },
  });

  return <EditorContent editor={editor} />;
}
