'use client';
import dynamic from 'next/dynamic';
import {useEffect,useRef,useState} from 'react';
const ProjectOrbit=dynamic(()=>import('./ProjectOrbit'),{ssr:false});
export default function OrbitLoader(){const ref=useRef<HTMLDivElement>(null);const [visible,setVisible]=useState(false);useEffect(()=>{if(!ref.current)return;const observer=new IntersectionObserver(([entry])=>setVisible(entry.isIntersecting),{rootMargin:'200px'});observer.observe(ref.current);return()=>observer.disconnect()},[]);return <div ref={ref} className="orbit-loader">{visible&&<ProjectOrbit/>}</div>}
