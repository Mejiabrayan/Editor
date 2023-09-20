'use client';

import { EditorContent, useEditor } from '@tiptap/react';
import StarterKit from '@tiptap/starter-kit';
import {
  Underline,
  Strikethrough,
  Bold,
  Italic,
  Heading1,
  Dot,
  Code,
} from 'lucide-react';

import Placeholder from '@tiptap/extension-placeholder';
import { Button } from '@/components/ui/button';
import ListItem from '@tiptap/extension-list-item';
import TextStyle from '@tiptap/extension-text-style';

function BoldButton({ editor }: any): JSX.Element {
  return (
    <Button
      variant={'outline'}
      onClick={() => editor.chain().focus().toggleBold().run()}
      disabled={!editor.can().chain().focus().toggleBold().run()}
      className={editor.isActive('bold') ? 'is-active' : ''}
    >
      <Bold className='h-5 w-5' />
    </Button>
  );
}

function StrikeButton({ editor }: any): JSX.Element {
  return (
    <Button
      variant={'outline'}
      onClick={() => editor.chain().focus().toggleStrike().run()}
      disabled={!editor.can().chain().focus().toggleStrike().run()}
      className={editor.isActive('strike') ? 'is-active' : ''}
    >
      <Strikethrough className='h-5 w-5' />
    </Button>
  );
}

function BulletListButton({ editor }: any): JSX.Element {
  return (
    <Button
      variant={'outline'}
      onClick={() => editor.chain().focus().toggleBulletList().run()}
      className={editor.isActive('bulletList') ? 'is-active' : ''}
    >
      <Dot className='h-5 w-5' />
    </Button>
  );
}

function ItalicButton({ editor }: any): JSX.Element {
  return (
    <Button
      variant={'outline'}
      onClick={() => editor.chain().focus().toggleItalic().run()}
      disabled={!editor.can().chain().focus().toggleItalic().run()}
      className={editor.isActive('italic') ? 'is-active' : ''}
    >
      <Italic className='h-5 w-5' />
    </Button>
  );
}

function HeadingButton({ editor }: any): JSX.Element {
  return (
    <Button
      variant={'outline'}
      onClick={() => editor.chain().focus().toggleHeading({ level: 1 }).run()}
      className={editor.isActive('heading', { level: 1 }) ? 'is-active' : ''}
    >
      <Heading1 className='h-5 w-5' />
    </Button>
  );
}

function UnderlineButton({ editor }: any): JSX.Element {
  return (
    <Button
      variant={'outline'}
      onClick={() => editor.chain().focus().toggleUnderline().run()}
      className={editor.isActive('underline') ? 'is-active' : ''}
    >
      <Underline className='h-5 w-5' />
    </Button>
  );
}

function CodeBlockButton({ editor }: any): JSX.Element {
  return (
    <Button
      variant={'outline'}
      onClick={() => editor.chain().focus().toggleCode().run()}
      disabled={!editor.can().chain().focus().toggleCode().run()}
      className={editor.isActive('code') ? 'is-active' : ''}
    >
      <Code className='h-5 w-5' />
    </Button>
  );
}
const MenuBar = ({ editor }: any): JSX.Element | null => {
  if (!editor) {
    return null;
  }
  return (
    <>
      <div className='flex justify-start items-center gap-2'>
        <BoldButton editor={editor} />
        <ItalicButton editor={editor} />
        <StrikeButton editor={editor} />
        <HeadingButton editor={editor} />
        <BulletListButton editor={editor} />
        <UnderlineButton editor={editor} />
        <CodeBlockButton editor={editor} />
      </div>
    </>
  );
};

export default function Editor() {
  const editor = useEditor({
    editorProps: {
      attributes: {
        class:
          'prose prose-sm sm:prose lg:prose-lg xl:prose-2xl mx-auto focus:outline-none',
      },
    },
    extensions: [
      // @ts-ignore
      TextStyle.configure({ types: [ListItem.name] }),
      StarterKit.configure({
        bulletList: {
          keepMarks: true,
          keepAttributes: false, // TODO : Making this as `false` becase marks are not preserved when I try to preserve attrs, awaiting a bit of help
        },
        orderedList: {
          keepMarks: true,
          keepAttributes: false, // TODO : Making this as `false` becase marks are not preserved when I try to preserve attrs, awaiting a bit of help
        },
      }),
      Placeholder.configure({
        placeholder: 'Let your creativity flow...',
      }),
    ],
  });

  return (
    <section className='flex flex-col items-center justify-center min-h-screen py-5 gap-5 '>
      <div className='p-3 w-full min-h-[300px] max-w-[600px] rounded shadow  border border-slate-200 text-white  border-input bg-background px-3 py-2 text-sm ring-offset-background placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50'>
        <MenuBar editor={editor} />

        <EditorContent className='mt-3 p-2  rounded' editor={editor} />
      </div>
    </section>
  );
}
