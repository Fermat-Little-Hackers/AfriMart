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
        onClickAction('AGRICULTURE', 1)
        setIsAgric(true)
        setIsCraft(false)
        setIsFashion(false)
        setIsArtifacts(false)
        setIsTextile(false)
        setIsDigital(false)
        setIsPhysical(false)
    }
    if(clickedElementId == "craft"){
        onClickAction('CRAFT AND ART', 4)
        setIsCraft(true)
        setIsAgric(false)
        setIsFashion(false)
        setIsArtifacts(false)
        setIsTextile(false)
        setIsDigital(false)
        setIsPhysical(false)
    }
    if(clickedElementId == "fashion"){
        onClickAction('FASHION', 3)
        setIsCraft(false)
        setIsAgric(false)
        setIsFashion(true)
        setIsArtifacts(false)
        setIsTextile(false)
        setIsDigital(false)
        setIsPhysical(false)
    }
    if(clickedElementId == "textiles"){
        onClickAction('TEXTILES AND FABRICS', 2)
        setIsCraft(false)
        setIsAgric(false)
        setIsFashion(false)
        setIsArtifacts(false)
        setIsTextile(true)
        setIsDigital(false)
        setIsPhysical(false)
    }
    if(clickedElementId == "digital"){
        onClickAction('DIGITAL ARTS', 5)
        setIsCraft(false)
        setIsAgric(false)
        setIsFashion(false)
        setIsArtifacts(false)
        setIsTextile(false)
        setIsDigital(true)
        setIsPhysical(false)
    }
    if(clickedElementId == "physical"){
        onClickAction('PHYSICAL ARTS', 6)
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
    <div className="smx:hidden mt-10 flex shadow-lg rounded-lg cursor-pointer ring-1 ring-red-100  w-[400px] smx:w-[100%] smx:mx-auto p-4 gap-4">
       <div className="flex flex-col gap-4">
        <div  id="Agric" onClick={handleClick} style={{color: isAgric ? 'grey' : 'black'}}>Agriculture</div>
        <div id="craft" onClick={handleClick} style={{color: isCraft ? 'grey' : 'black'}}>Craft And Arts</div>
        <div id="fashion" onClick={handleClick} style={{color: isFashion ? 'grey' : 'black'}}>Fashion</div>
        <div id="textiles" onClick={handleClick} style={{color: isTextile ? 'grey' : 'black'}}>Textiles & Fabrica</div>
        <div id="digital" onClick={handleClick} style={{color: isDigital ? 'grey' : 'black'}}>Digital Arts</div>
        <div id="physical" onClick={handleClick} style={{color: isPhysical ? 'grey' : 'black'}}>Physical Arts</div>
       </div>
    </div>
  )
}

export default Sidefilter
