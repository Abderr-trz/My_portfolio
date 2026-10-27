'use client';
import {Canvas,useFrame,useLoader,useThree} from '@react-three/fiber';
import {Suspense,useRef,type RefObject} from 'react';
import {useRouter} from 'next/navigation';
import * as THREE from 'three';
import {projects} from '@/data/projects';
type Props={immersive:boolean;active:number;onActive:(n:number)=>void;progress:RefObject<{value:number}>};
function Card({index,immersive,active,onActive,progress}:Props&{index:number}){
 const mesh=useRef<THREE.Mesh>(null);const texture=useLoader(THREE.TextureLoader,projects[index].image);const {viewport,pointer}=useThree();const router=useRouter();
 useFrame((_,delta)=>{if(!mesh.current)return;const width=Math.min(viewport.width*.37,3.7);const height=width/1.44;const col=index%2,row=Math.floor(index/2),offset=index-active;const t=progress.current.value;const gx=(col-.5)*(width+.3),gy=(1-row)*(height+.38);const sx=offset*width*.74,sy=pointer.y*.08,z=-Math.abs(offset)*.55;mesh.current.position.x=THREE.MathUtils.damp(mesh.current.position.x,THREE.MathUtils.lerp(gx,sx,t),8,delta);mesh.current.position.y=THREE.MathUtils.damp(mesh.current.position.y,THREE.MathUtils.lerp(gy,sy,t),8,delta);mesh.current.position.z=THREE.MathUtils.damp(mesh.current.position.z,z*t,8,delta);mesh.current.rotation.y=THREE.MathUtils.damp(mesh.current.rotation.y,(-offset*.22+pointer.x*.05)*t,8,delta);mesh.current.scale.set(width,height,1)});
 return <mesh ref={mesh} onPointerOver={e=>{e.stopPropagation();if(immersive)onActive(index);document.body.style.cursor='pointer'}} onPointerOut={()=>{document.body.style.cursor=''}} onClick={()=>router.push('/work/'+projects[index].slug)}><planeGeometry args={[1,1]}/><meshBasicMaterial map={texture} toneMapped={false}/></mesh>;
}
export default function SpatialGallery(props:Props){return <Canvas onCreated={({gl})=>{gl.domElement.addEventListener('webglcontextlost',()=>window.dispatchEvent(new Event('portfolio-webgl-lost')),{once:true})}} camera={{position:[0,0,10],fov:45}} dpr={[1,1.5]} gl={{antialias:true,alpha:true}}><Suspense fallback={null}>{projects.map((p,i)=><Card key={p.slug} index={i} {...props}/>)}</Suspense></Canvas>}
