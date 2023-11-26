import { useState } from "react";
interface ClickProps {
    onClickAction: (message: string) => void;
  }

const Sidefilter : React.FC<ClickProps> = ({ onClickAction }) => {
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
        onClickAction('AGRICULTURE')
        setIsAgric(true)
        setIsCraft(false)
        setIsFashion(false)
        setIsArtifacts(false)
        setIsTextile(false)
        setIsDigital(false)
        setIsPhysical(false)
    }
    if(clickedElementId == "craft"){
        onClickAction('CRAFT AND ART')
        setIsCraft(true)
        setIsAgric(false)
        setIsFashion(false)
        setIsArtifacts(false)
        setIsTextile(false)
        setIsDigital(false)
        setIsPhysical(false)
    }
    if(clickedElementId == "fashion"){
        onClickAction('FASHION')
        setIsCraft(false)
        setIsAgric(false)
        setIsFashion(true)
        setIsArtifacts(false)
        setIsTextile(false)
        setIsDigital(false)
        setIsPhysical(false)
    }
    if(clickedElementId == "artifacts"){
        onClickAction('ARTIFACTS')
        setIsCraft(false)
        setIsAgric(false)
        setIsFashion(false)
        setIsArtifacts(true)
        setIsTextile(false)
        setIsDigital(false)
        setIsPhysical(false)
    }
    if(clickedElementId == "textiles"){
        onClickAction('TEXTILES AND FABRICS')
        setIsCraft(false)
        setIsAgric(false)
        setIsFashion(false)
        setIsArtifacts(false)
        setIsTextile(true)
        setIsDigital(false)
        setIsPhysical(false)
    }
    if(clickedElementId == "digital"){
        onClickAction('DIGITAL ARTS')
        setIsCraft(false)
        setIsAgric(false)
        setIsFashion(false)
        setIsArtifacts(false)
        setIsTextile(false)
        setIsDigital(true)
        setIsPhysical(false)
    }
    if(clickedElementId == "physical"){
        onClickAction('PHYSICAL ARTS')
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
    <div className="border-2 border-black w-[300px] mmx:w-[200px] mt-20 smx:hidden lmx:hidden">
       <div className="">
        <div className="my-[41px] mx-auto w-[150px] hover:cursor-pointer" id="Agric" onClick={handleClick} style={{color: isAgric ? 'grey' : 'black'}}>AGRICULTURE</div>
        <div className="my-[41px] mx-auto w-[150px] hover:cursor-pointer" id="craft" onClick={handleClick} style={{color: isCraft ? 'grey' : 'black'}}>CRAFT AND ART</div>
        <div className="my-[41px] mx-auto w-[150px] hover:cursor-pointer" id="fashion" onClick={handleClick} style={{color: isFashion ? 'grey' : 'black'}}>FASHION</div>
        <div className="my-[41px] mx-auto w-[150px] hover:cursor-pointer" id="artifacts" onClick={handleClick} style={{color: isArtifacts ? 'grey' : 'black'}}>ARTIFACTS</div>
        <div className="my-[41px] mx-auto w-[150px] hover:cursor-pointer" id="textiles" onClick={handleClick} style={{color: isTextile ? 'grey' : 'black'}}>TEXTILES AND FABRICS</div>
        <div className="my-[41px] mx-auto w-[150px] hover:cursor-pointer" id="digital" onClick={handleClick} style={{color: isDigital ? 'grey' : 'black'}}>DIGITAL ARTS</div>
        <div className="my-[41px] mx-auto w-[150px] hover:cursor-pointer" id="physical" onClick={handleClick} style={{color: isPhysical ? 'grey' : 'black'}}>PHYSICAL ARTS</div>
       </div>
    </div>
  )
}

export default Sidefilter
