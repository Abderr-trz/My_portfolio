import type { Metadata } from 'next';
import './globals.css';
import './gallery.css';
import './project-preview.css';
import './spatial.css';
import Motion from '@/components/Motion';
export const metadata: Metadata = {title:{default:'Abderrahim — Creative Developer & AI Engineer',template:'%s — Abderrahim'},description:'Creative development, visual design and artificial intelligence. Selected digital experiences by Abderrahim.'};
export default function RootLayout({children}:{children:React.ReactNode}) {return <html lang="en"><body><Motion/>{children}</body></html>}
