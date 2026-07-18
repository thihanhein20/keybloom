export function ExperienceControls({darkMode,musicPlaying,trackName,onTheme,onMusic}:{darkMode:boolean;musicPlaying:boolean;trackName:string;onTheme:()=>void;onMusic:()=>void}){
  return <div className="experience-controls"><button type="button" onClick={onTheme}><i>{darkMode?"☾":"☀"}</i><span>{darkMode?"night mode":"day mode"}</span></button><button type="button" onClick={onMusic}><i>{musicPlaying?"Ⅱ":"▶"}</i><span>{trackName}</span></button></div>
}
