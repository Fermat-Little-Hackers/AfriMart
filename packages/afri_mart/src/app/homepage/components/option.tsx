import { useState } from "react";
interface ClickProps {
    onClickAction: (message: string) => void;
  }

const Option : React.FC<ClickProps> = ({ onClickAction }) => {
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
    <div className="hidden smx:block smx:w-[90%] mx-auto">

    <div className="smx:flex smx:mt-10">
    <div className="my-2 w-[70px] text-center rounded-xl py-1 border-black text-[15px]  smx:h-[30px] smx:border-2 hover:cursor-pointer" id="Agric" onClick={handleClick} style={{color: isAgric ? 'grey' : 'black'}}>AGRIC</div>
    <div className="mx-auto my-2 w-[120px] text-center rounded-xl py-1 border-black  smx:h-[30px] smx:border-2 hover:cursor-pointer" id="craft" onClick={handleClick} style={{color: isCraft ? 'grey' : 'black'}}>CRAFT&ART</div>
    <div className="mx-auto my-2 w-[100px] text-center rounded-xl py-1 border-black   smx:h-[30px] smx:border-2 hover:cursor-pointer" id="fashion" onClick={handleClick} style={{color: isFashion ? 'grey' : 'black'}}>FASHION</div>
    
    </div>
    <div className="smx:flex space-x-2">
    <div className="mx-auto my-2 w-[110px] text-center rounded-xl py-1 border-black smx:h-[30px] smx:border-2 hover:cursor-pointer" id="artifacts" onClick={handleClick} style={{color: isArtifacts ? 'grey' : 'black'}}>ARTIFACTS</div>
    <div className="mx-auto my-2 w-[150px] text-[13px] rounded-xl py-1 border-black   smx:h-[30px] smx:border-2 hover:cursor-pointer" id="textiles" onClick={handleClick} style={{color: isTextile ? 'grey' : 'black'}}>TEXTILES & FABRICS</div>
    <div className="mx-auto my-2 w-[100px] text-[13px] rounded-xl py-1 border-black   smx:h-[30px] smx:border-2 hover:cursor-pointer" id="digital" onClick={handleClick} style={{color: isDigital ? 'grey' : 'black'}}>DIGITAL ARTS</div>
    </div>
    
    <div className="smx:w-[100%]">
    <div className="my-2 w-[120px] text-[13px] rounded-xl p-1 border-black smx:h-[40px] smx:border-2 flex justify-start hover:cursor-pointer" id="physical" onClick={handleClick} style={{color: isPhysical ? 'grey' : 'black'}}>PHYSICAL ARTS</div>
    </div>
   </div>
  )
}

export default Option