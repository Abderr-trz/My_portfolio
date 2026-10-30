'use client';
import {useEffect,useRef,useState} from 'react';
import {gsap} from 'gsap';
import {ScrollTrigger} from 'gsap/ScrollTrigger';
import Link from 'next/link';
import {projects} from '@/data/projects';

export default function Experience(){
 const root=useRef<HTMLElement>(null);const [reduced,setReduced]=useState(true);
 useEffect(()=>{gsap.registerPlugin(ScrollTrigger);const media=window.matchMedia('(prefers-reduced-motion: reduce), (max-width: 700px)');const update=()=>setReduced(media.matches);update();media.addEventListener('change',update);return()=>media.removeEventListener('change',update)},[]);
 useEffect(()=>{if(reduced||!root.current)return;const ctx=gsap.context(()=>{
  const cards=gsap.utils.toArray<HTMLElement>('.sequence-card');const back=gsap.utils.toArray<HTMLElement>('.sequence-card-back');const title=gsap.utils.toArray<HTMLElement>('.sequence-title-line');const intro=root.current!.querySelector<HTMLElement>('.sequence-heading p')!;const cardWidth=()=>Math.min(window.innerWidth*.24,390);const gridWidth=()=>Math.min(window.innerWidth*.68,1050,3*Math.max(100,(window.innerHeight-300)/1.39)+24);const gridCard=()=>(gridWidth()-24)/3;const step=Math.PI/5;const angle=(i:number)=>(i-2)*step;const backAngle=(i:number)=>(i+3)*step;const radius=()=>cardWidth()/(2*Math.sin(step/2));const depth=(a:number)=>(Math.cos(a)-1)*radius()*.65;const ringX=(a:number)=>Math.sin(a)*radius()*(1-depth(a)/1200);const ringY=(a:number)=>Math.cos(a)*130-70;
  gsap.set(cards,{width:()=>cardWidth(),height:()=>cardWidth()*.695,xPercent:-50,yPercent:-50,left:'50%',top:'50%',zIndex:(i)=>5-Math.abs(i-2),transformPerspective:1200,force3D:true});
  gsap.set(cards,{x:(i)=>Math.sin(i*1.25)*35,y:(i)=>Math.cos(i*1.1)*28,rotationY:(i)=>i*28-55,rotationZ:(i)=>i*8-16,scale:.13,opacity:0});
  gsap.set(back,{width:()=>cardWidth(),height:()=>cardWidth()*.695,xPercent:-50,yPercent:-50,left:'50%',top:'50%',zIndex:0,transformPerspective:1200,force3D:true,x:0,y:0,rotationY:0,scale:.13,opacity:0});
  const timeline=gsap.timeline({scrollTrigger:{id:'portfolio-sequence',trigger:root.current,start:'top top',end:()=>`+=${Math.max(1500,window.innerHeight*2.4)}`,pin:true,scrub:true,invalidateOnRefresh:true}});
  timeline.to(cards,{opacity:1,duration:.15,stagger:.015},0)
   .to(cards,{x:(i)=>ringX(angle(i)),y:(i)=>ringY(angle(i)),z:(i)=>depth(angle(i)),rotationY:(i)=>-angle(i)*180/Math.PI,rotationZ:(i)=>(i-2)*-2,scale:1,duration:.9,stagger:.025,ease:'none'},.12)
   .to(back,{x:(i)=>ringX(backAngle(i))*.72,y:(i)=>ringY(backAngle(i))+35,z:(i)=>depth(backAngle(i)),rotationY:(i)=>180-backAngle(i)*180/Math.PI,rotationZ:(i)=>(i-2)*2,scale:.72,opacity:1,duration:.9,stagger:.025,ease:'none'},.12)
   .to('.sequence-cards',{rotation:-7,duration:.9,ease:'none'},.12)
   .to(title,{opacity:.15,x:(i)=>i===0?-65:65,duration:.65,ease:'none'},.18)
   .to(intro,{y:()=>Math.max(0,window.innerHeight-100-intro.getBoundingClientRect().bottom+Number(gsap.getProperty(intro,'y'))),duration:.25,ease:'none'},0)
   .to(back,{opacity:0,duration:.35,ease:'none'},1.25)
   .to('.sequence-cards',{rotation:0,duration:1,ease:'none'},1.5)
   .to(cards,{x:(i)=>-gridWidth()/2+(i%3)*(gridCard()+12)+gridCard()/2,y:(i)=>-gridCard()*.695-12+Math.floor(i/3)*(gridCard()*.695+12)+gridCard()*.695/2,z:0,width:()=>gridCard(),height:()=>gridCard()*.695,rotationY:0,rotationZ:0,scale:1,duration:1,ease:'none'},1.5)
   .to(title,{opacity:0,y:-35,duration:.45},1.45)
   .to(intro,{opacity:0,duration:.25},1.45)
   .to('.sequence-caption',{opacity:1,duration:.4},2.1)
   .to('.sequence-overlay',{scaleY:1,duration:.55,ease:'power2.inOut'},2.8);
 },root);return()=>ctx.revert()},[reduced]);
 const jumpToWork=()=>{const trigger=ScrollTrigger.getById('portfolio-sequence');if(trigger)window.scrollTo({top:trigger.start+(trigger.end-trigger.start)*.78,behavior:'smooth'});else document.getElementById('selected-projects')?.scrollIntoView({behavior:'smooth'})};
 return <section ref={root} id="work" className={'sequence '+(reduced?'sequence-static':'')} aria-label="Selected projects">
  <div className="sequence-stage">
   <div className="sequence-heading"><h1><span className="sequence-title-line">Creative <em>developer</em></span><span className="sequence-title-line">building <em>digital</em> worlds.</span></h1><p>Code, design and artificial intelligence.<br/>Thoughtful ideas, made tangible.</p></div>
   <div id="selected-projects" className="sequence-cards"><div aria-hidden="true">{projects.map(p=><div className="sequence-card-back" key={p.slug}><img src={p.image} alt=""/></div>)}</div>{projects.map(p=><Link className="sequence-card" key={p.slug} href={'/work/'+p.slug} aria-label={'Explore '+p.name} onFocus={()=>{const trigger=ScrollTrigger.getById('portfolio-sequence');if(!reduced&&trigger&&trigger.progress<.58)jumpToWork()}}><img src={p.image} alt={p.alt}/><span className="sequence-card-label">{p.name} <span>↗</span></span><span className="sr-only">{p.category}</span></Link>)}</div>
   <div className="sequence-caption"><span>Selected work<br/>Five digital experiences</span><button onClick={jumpToWork}>Explore the projects ↗</button></div>
   <div className="sequence-bottom"><p>Independent creative developer<br/>based in Morocco.<br/>Available for collaborations.</p><button onClick={jumpToWork}>Scroll to explore <span>↓</span></button><span>Design / Development / AI</span></div>
   <div className="sequence-overlay" aria-hidden="true"/>
  </div>
 </section>;
}
