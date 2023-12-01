import { useState } from "react";
interface ClickProps {
    onClickAction: (message: string, enumOption : number) => void;
  }

const Sidefilter : React.FC<ClickProps> = ({ onClickAction,}) => {
    const [isAgric, setIsAgric] = useState(true);
    const [isCraft, setIsCraft] = useState(false);
    const [isFashion, setIsFashion] = useState(false);
    const [isArtifacts, setIsArtifacts] = useState(false);
    const [isTextile, setIsTextile] = useState(false);
    const [isDigital, setIsDigital] = useState(false);
    const [isPhysical, setIsPhysical] = useState(false);
  
    const handleClick = (event: React.MouseEvent<HTMLDivElement>) => {
    const clickedElementId = (event.target as HTMLDivElement).id;
    if(clickedElementId == "Agric"){
        onClickAction('AGRICULTURE', 0)
        setIsAgric(true)
        setIsCraft(false)
        setIsFashion(false)
        setIsArtifacts(false)
        setIsTextile(false)
        setIsDigital(false)
        setIsPhysical(false)
    }
    if(clickedElementId == "craft"){
        onClickAction('TOOLS AND EQUIPMENT', 3)
        setIsCraft(true)
        setIsAgric(false)
        setIsFashion(false)
        setIsArtifacts(false)
        setIsTextile(false)
        setIsDigital(false)
        setIsPhysical(false)
    }
    if(clickedElementId == "fashion"){
        onClickAction('ACCESSORIES', 2)
        setIsCraft(false)
        setIsAgric(false)
        setIsFashion(true)
        setIsArtifacts(false)
        setIsTextile(false)
        setIsDigital(false)
        setIsPhysical(false)
    }
    if(clickedElementId == "textiles"){
        onClickAction('TEXTILES AND FABRICS', 1)
        setIsCraft(false)
        setIsAgric(false)
        setIsFashion(false)
        setIsArtifacts(false)
        setIsTextile(true)
        setIsDigital(false)
        setIsPhysical(false)
    }
    if(clickedElementId == "digital"){
        onClickAction('DIGITAL ARTS', 4)
        setIsCraft(false)
        setIsAgric(false)
        setIsFashion(false)
        setIsArtifacts(false)
        setIsTextile(false)
        setIsDigital(true)
        setIsPhysical(false)
    }
    if(clickedElementId == "physical"){
        onClickAction('PHYSICAL ARTS', 5)
        setIsCraft(false)
        setIsAgric(false)
        setIsFashion(false)
        setIsArtifacts(false)
        setIsTextile(false)
        setIsDigital(false)
        setIsPhysical(true)
    }
  }
    return (
    <div className="smx:hidden mt-10 flex shadow-lg rounded-lg cursor-pointer ring-1 ring-red-100 md:border-r-8 border-[var(--sienna)] w-[400px] smx:w-[100%] smx:mx-auto p-4 gap-4">
       <div className="flex flex-col gap-4 w-[100%]">
       <div  id="Agric" onClick={handleClick} style={{color: isAgric ? 'white' : 'black', backgroundColor: isAgric ? 'rgb(170, 76, 51)' : '', height: '2rem', paddingLeft: isAgric ? '1.5rem': ''}}>Agriculture</div>
        <div id="craft" onClick={handleClick} style={{color: isCraft ? 'white' : 'black', backgroundColor: isCraft ? 'rgb(170, 76, 51)' : '', height: '2rem', paddingLeft: isCraft ? '1.5rem': ''}}>Tools And Equipments</div>
        <div id="fashion" onClick={handleClick} style={{color: isFashion ? 'white' : 'black', backgroundColor: isFashion ? 'rgb(170, 76, 51)' : '', height: '2rem', paddingLeft: isFashion ? '1.5rem': ''}}>Accessories</div>
        <div id="textiles" onClick={handleClick} style={{color: isTextile ? 'white' : 'black', backgroundColor: isTextile ? 'rgb(170, 76, 51)' : '', height: '2rem', paddingLeft: isTextile ? '1.5rem': ''}}>Textiles & Clothing</div>
        <div id="digital" onClick={handleClick} style={{color: isDigital ? 'white' : 'black', backgroundColor: isDigital ? 'rgb(170, 76, 51)' : '', height: '2rem', paddingLeft: isDigital ? '1.5rem': ''}}>Digital Arts</div>
        <div id="physical" onClick={handleClick} style={{color: isPhysical ? 'white' : 'black', backgroundColor: isPhysical ? 'rgb(170, 76, 51)' : '', height: '2rem', paddingLeft: isPhysical ? '1.5rem': ''}}>Physical Arts</div>
       </div>
    </div>
  )
}

export default Sidefilter
