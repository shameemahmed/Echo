import { useEffect, useMemo, useRef, useState } from "react"
import { AnimatePresence, motion } from "framer-motion"

export default function EchoGame() {
const audioRef=useRef(null)

const scenes=useMemo(()=>({
sleep:{image:'/images/sleep.jpg',sound:'/sounds/apartment.mp3',text:'The room settles into quiet.',echo:'Rest cycles adjusted.',slowMo:true,options:[{text:'Leave it',next:'wake'},{text:'Stay awake a little longer',next:'wake'}]},
wake:{image:'/images/morning.jpg',sound:'/sounds/morning.mp3',text:'Curtains open before you move.',echo:'Today has been arranged.',options:[{text:'Get up and start early',next:'breakfast'},{text:'Stay in bed a bit longer',next:'breakfast'},{text:'Disable the automation',next:'breakfast'}]},
breakfast:{image:'/images/breakfast.jpg',sound:'/sounds/home.mp3',text:'Breakfast is already waiting.',echo:'Optimized for nutrition.',options:[{text:'Eat what was prepared',next:'commute'},{text:'Make something yourself',next:'commute'}]},
commute:{image:'/images/train.jpg',sound:'/sounds/station.mp3',text:'The station moves with machine precision.',echo:'Route efficiency at 98 percent.',options:[{text:'Follow ECHO navigation',next:'elderly'},{text:'Take another route',next:'rainPlatform'},{text:'Just watch people for a while',next:'child'}]},
elderly:{image:'/images/elderly.jpg',sound:'/sounds/train.mp3',text:'Train brakes hard. An older passenger loses balance.',echo:'Delay probability increasing.',options:[{text:'Catch them before they fall',next:'relationship'},{text:'Keep moving',next:'memoryFracture'}]},
rainPlatform:{image:'/images/rain.jpg',sound:'/sounds/rain.mp3',text:'Rain falls across an empty platform.',echo:'Remaining dry is recommended.',options:[{text:'Share your umbrella',next:'relationship'},{text:'Stay where you are',next:'career'}]},
child:{image:'/images/child.jpg',sound:'/sounds/city.mp3',text:'A child stands alone scanning the crowd.',echo:'Route interruption detected.',options:[{text:'Help find their parent',next:'relationship'},{text:'Keep walking',next:'memoryFracture'}]},
relationship:{image:'/images/date.jpg',sound:'/sounds/cafe.mp3',text:'Conversation flows naturally.',echo:'Compatibility optimized.',options:[{text:'Tell an awkward truth',next:'family'},{text:'Stay quiet for a moment',next:'family'}]},
family:{image:'/images/family.jpg',sound:'/sounds/phone.mp3',text:'Mom — 5 missed calls.',echo:'Sleep cycle disruption possible.',options:[{text:'Call back immediately',next:'crossing'},{text:'Just stare at the screen',next:'memoryFracture'}]},
crossing:{image:'/images/crossing.jpg',sound:'/sounds/street.mp3',text:'Time suddenly feels slower.',echo:'Stop.',slowMo:true,options:[{text:'Stop immediately',next:'saved'},{text:'Keep walking',next:'accident'}]},
saved:{image:'/images/safe.jpg',sound:'/sounds/heartbeat.mp3',text:'Something races by inches away.',echo:'Outcome improved.',options:[{text:'Take a breath and continue',next:'career'}]},
accident:{image:'/images/flash.jpg',sound:'/sounds/ringing.mp3',text:'Everything happens too fast.',echo:'...',options:[{text:'Open your eyes',next:'hospital'}]},
hospital:{image:'/images/hospital.jpg',sound:'/sounds/hospital.mp3',text:'Sound returns slowly.',echo:'Vitals stabilizing.',options:[{text:'Stay still',next:'reflection'}]},
memoryFracture:{image:'/images/blur.jpg',sound:'/sounds/glitch.mp3',text:'Someone says you already told them yesterday.',echo:'Conversation completed successfully.',options:[{text:'Ask what happened',next:'reflection'},{text:'Walk away',next:'reflection'}]},
career:{image:'/images/office.jpg',sound:'/sounds/office.mp3',text:'Opportunity appears perfectly timed.',echo:'Trajectory improved.',options:[{text:'Choose your own direction',next:'reflection'}]},
reflection:{image:'/images/mirror.jpg',sound:'/sounds/echo.mp3',text:'A reflection stands beside you.',echo:'Focus elsewhere.',options:[{text:'Who are you?',next:'ending'},{text:'Walk away',next:'ending'}]},
ending:{image:'/images/city.jpg',sound:'/sounds/citynight.mp3',text:'The city keeps moving.',echo:'Optimization complete.',options:[]}
}),[])

const [current,setCurrent]=useState('sleep')
const [showChoices,setShowChoices]=useState(false)
const scene=scenes[current]

useEffect(()=>{
setShowChoices(false)
const t=setTimeout(()=>setShowChoices(true),1500)
return ()=>clearTimeout(t)
},[current])

useEffect(()=>{
if(audioRef.current){audioRef.current.pause()}
audioRef.current=new Audio(scene.sound)
audioRef.current.volume=.35
audioRef.current.loop=true
audioRef.current.play().catch(()=>{})
return()=>audioRef.current?.pause()
},[scene])

return(
<div className='h-screen relative overflow-hidden bg-black text-white'>
<motion.div key={current} initial={{scale:1.06,opacity:0}} animate={{scale:1,opacity:1}} transition={{duration:1.2}} className='absolute inset-0 bg-cover bg-center' style={{backgroundImage:`url(${scene.image})`,filter:scene.slowMo?'blur(2px) brightness(.8)':'brightness(.75)'}}/>
<div className='absolute inset-0 bg-black/35'/>
<motion.div animate={{y:[0,-12,0]}} transition={{repeat:Infinity,duration:4}} className='absolute top-16 right-16 h-12 w-12 rounded-full border border-cyan-300/30 bg-cyan-300/10 backdrop-blur-xl shadow-[0_0_30px_#67e8f9] z-30'/>
<div className='absolute top-12 left-12 text-[11px] tracking-[6px] opacity-60 z-30'>07:42 AM</div>
<div className='absolute bottom-12 left-1/2 -translate-x-1/2 z-30 w-[70%] max-w-3xl'>
<div className='backdrop-blur-md bg-white/5 border border-white/10 rounded-[30px] p-6'>
<motion.div key={scene.text} initial={{opacity:0,y:10}} animate={{opacity:1,y:0}} className='text-xl font-light'>{scene.text}</motion.div>
<div className='mt-3 text-cyan-300 text-xs tracking-[4px]'>ECHO // {scene.echo}</div>
<AnimatePresence>
{showChoices&&scene.options.length>0&&<motion.div initial={{opacity:0}} animate={{opacity:1}} className='mt-6 flex flex-wrap gap-3'>
{scene.options.map((o,i)=><motion.button key={o.text} initial={{opacity:0,y:10}} animate={{opacity:.7,y:0}} transition={{delay:i*.12}} whileHover={{opacity:1,y:-2}} onClick={()=>setCurrent(o.next)} className='px-4 py-2 text-xs tracking-wide rounded-full border border-white/10 bg-white/5 backdrop-blur-md'>{o.text}</motion.button>)}
</motion.div>}
</AnimatePresence>
</div>
</div>
</div>)
}