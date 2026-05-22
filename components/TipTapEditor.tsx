'use client';
import { useEditor, EditorContent } from '@tiptap/react';
import StarterKit from '@tiptap/starter-kit';
import Image from '@tiptap/extension-image';
import Link from '@tiptap/extension-link';
import Placeholder from '@tiptap/extension-placeholder';
import Typography from '@tiptap/extension-typography';
import { Bold, Italic, Code, List, ListOrdered, Quote, Heading2, Heading3, Link as LinkIcon, Image as ImageIcon } from 'lucide-react';

type Props = {
  content?: object;
  onChange: (json: object) => void;
  placeholder?: string;
};

export default function TipTapEditor({ content, onChange, placeholder }: Props) {
  const editor = useEditor({
    extensions: [
      StarterKit,
      Image,
      Link.configure({ openOnClick: false }),
      Placeholder.configure({ placeholder: placeholder ?? 'Start writing...' }),
      Typography,
    ],
    content: content ?? '',
    onUpdate: ({ editor }) => onChange(editor.getJSON()),
    editorProps: {
      attributes: {
        class: 'tiptap-content min-h-[300px] outline-none p-4',
      },
    },
  });

  if (!editor) return null;

  const ToolbarBtn = ({
    onClick, active, children, title,
  }: {
    onClick: () => void; active?: boolean; children: React.ReactNode; title: string;
  }) => (
    <button
      type="button"
      onClick={onClick}
      title={title}
      className={`p-1.5 rounded transition-colors ${
        active ? 'bg-electric-500/30 text-electric-400' : 'text-slate-400 hover:text-white hover:bg-white/10'
      }`}
    >
      {children}
    </button>
  );

  const addImage = () => {
    const url = window.prompt('Image URL');
    if (url) editor.chain().focus().setImage({ src: url }).run();
  };

  const setLink = () => {
    const href = window.prompt('URL');
    if (href) editor.chain().focus().setLink({ href }).run();
  };

  return (
    <div className="border border-white/10 rounded-xl overflow-hidden bg-navy-800/50">
      {/* Toolbar */}
      <div className="flex flex-wrap items-center gap-0.5 p-2 border-b border-white/10 bg-navy-900/50">
        <ToolbarBtn title="Bold" onClick={() => editor.chain().focus().toggleBold().run()} active={editor.isActive('bold')}>
          <Bold className="w-4 h-4" />
        </ToolbarBtn>
        <ToolbarBtn title="Italic" onClick={() => editor.chain().focus().toggleItalic().run()} active={editor.isActive('italic')}>
          <Italic className="w-4 h-4" />
        </ToolbarBtn>
        <ToolbarBtn title="Code" onClick={() => editor.chain().focus().toggleCode().run()} active={editor.isActive('code')}>
          <Code className="w-4 h-4" />
        </ToolbarBtn>
        <div className="w-px h-5 bg-white/10 mx-1" />
        <ToolbarBtn title="H2" onClick={() => editor.chain().focus().toggleHeading({ level: 2 }).run()} active={editor.isActive('heading', { level: 2 })}>
          <Heading2 className="w-4 h-4" />
        </ToolbarBtn>
        <ToolbarBtn title="H3" onClick={() => editor.chain().focus().toggleHeading({ level: 3 }).run()} active={editor.isActive('heading', { level: 3 })}>
          <Heading3 className="w-4 h-4" />
        </ToolbarBtn>
        <div className="w-px h-5 bg-white/10 mx-1" />
        <ToolbarBtn title="Bullet list" onClick={() => editor.chain().focus().toggleBulletList().run()} active={editor.isActive('bulletList')}>
          <List className="w-4 h-4" />
        </ToolbarBtn>
        <ToolbarBtn title="Ordered list" onClick={() => editor.chain().focus().toggleOrderedList().run()} active={editor.isActive('orderedList')}>
          <ListOrdered className="w-4 h-4" />
        </ToolbarBtn>
        <ToolbarBtn title="Blockquote" onClick={() => editor.chain().focus().toggleBlockquote().run()} active={editor.isActive('blockquote')}>
          <Quote className="w-4 h-4" />
        </ToolbarBtn>
        <div className="w-px h-5 bg-white/10 mx-1" />
        <ToolbarBtn title="Link" onClick={setLink} active={editor.isActive('link')}>
          <LinkIcon className="w-4 h-4" />
        </ToolbarBtn>
        <ToolbarBtn title="Image" onClick={addImage}>
          <ImageIcon className="w-4 h-4" />
        </ToolbarBtn>
      </div>
      <EditorContent editor={editor} />
    </div>
  );
}
