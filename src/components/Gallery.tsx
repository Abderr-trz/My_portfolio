'use client';
import {useEffect,useRef,useState} from 'react';
import dynamic from 'next/dynamic';
import Link from 'next/link';
import {gsap} from 'gsap';
import {ScrollTrigger} from 'gsap/ScrollTrigger';
import {projects} from '@/data/projects';

const SpatialGallery=dynamic(()=>import('./SpatialGallery'),{ssr:false});
export default function Gallery(){
 const [immersive,setImmersive]=useState(false);
 const [active,setActive]=useState(2);
 const [webgl,setWebgl]=useState(false);
 const stage=useRef<HTMLDivElement>(null);
 const pinTrigger=useRef<ScrollTrigger|null>(null);
 const progress=useRef({value:0});
 useEffect(()=>{
  const media=window.matchMedia('(min-width: 701px) and (prefers-reduced-motion: no-preference)');
  let lost=false;
  const handleLoss=()=>{lost=true;pinTrigger.current?.kill();pinTrigger.current=null;setWebgl(false);setImmersive(false)};
  window.addEventListener('portfolio-webgl-lost',handleLoss);
  const update=()=>{try{const canvas=document.createElement('canvas');const available=!lost&&media.matches&&!!(canvas.getContext('webgl2')||canvas.getContext('webgl'));if(!available){pinTrigger.current?.kill();pinTrigger.current=null;setImmersive(false)}setWebgl(available)}catch{pinTrigger.current?.kill();pinTrigger.current=null;setWebgl(false)}};
  update(); media.addEventListener('change',update);
  return()=>{media.removeEventListener('change',update);window.removeEventListener('portfolio-webgl-lost',handleLoss)};
 },[]);
 useEffect(()=>{
  if(!webgl||!stage.current)return;
  gsap.registerPlugin(ScrollTrigger);
  const trigger=ScrollTrigger.create({trigger:stage.current,start:'top 12%',end:'+=900',pin:true,pinSpacing:true,scrub:true,onUpdate:self=>{progress.current.value=self.progress;setImmersive(self.progress>.5)}});
  pinTrigger.current=trigger;
  return()=>{trigger.kill();pinTrigger.current=null};
 },[webgl]);
 const setView=(spatial:boolean)=>{gsap.killTweensOf(progress.current);gsap.to(progress.current,{value:spatial?1:0,duration:.9,ease:'power2.inOut'});setImmersive(spatial)};
 return <section id="work" className={'work '+(immersive?'is-immersive':'')}>
  <div className="work-head"><div><span className="eyebrow">A selection of work</span><h2>Selected work<span> (05)</span></h2></div>{webgl&&<div className="gallery-control"><span>View as</span><button onClick={()=>setView(false)} aria-pressed={!immersive}>Grid</button><button onClick={()=>setView(true)} aria-pressed={immersive}>Spatial</button></div>}</div>
  {webgl?<><div ref={stage} className="webgl-stage"><SpatialGallery immersive={immersive} active={active} onActive={setActive} progress={progress}/><span className="gallery-hint">Scroll to explore the collection ↓</span></div><div className="project-index">{projects.map((p,i)=><Link key={p.slug} href={'/work/'+p.slug} onFocus={()=>setActive(i)}><span>0{i+1}</span><strong>{p.name}</strong><span>{p.category} ↗</span></Link>)}</div></>:<div className="project-grid">{projects.map((p,i)=><article className="project" key={p.slug}><Link href={'/work/'+p.slug} className="project-image"><img src={p.image} alt={p.alt}/><span className="view-project">View project ↗</span></Link><div className="project-meta"><div><h3>{p.name}</h3><span>{p.category}</span></div><span>0{i+1} / 05</span></div></article>)}</div>}
  {immersive&&webgl&&<div className="gallery-bottom"><p>Explore the collection <span>— select a project to learn more</span></p><div><button aria-label="Previous project" onClick={()=>setActive((active+4)%5)}>←</button><span>0{active+1} / 05</span><button aria-label="Next project" onClick={()=>setActive((active+1)%5)}>→</button></div></div>}
  <div className="work-end"><span>Thoughtful ideas, made tangible.</span><a href="#about">More about me ↓</a></div>
 </section>;
}
