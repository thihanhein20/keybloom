export function ExperienceControls({musicPlaying,trackName,onMusic}:{musicPlaying:boolean;trackName:string;onMusic:()=>void}){
  return <div className="experience-controls"><button type="button" onClick={onMusic}><i>{musicPlaying?"Ⅱ":"▶"}</i><span>{trackName}</span></button></div>
}
