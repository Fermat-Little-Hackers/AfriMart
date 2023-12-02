import img1 from "../../../public/image/anims/asambe.jpeg";
import img2 from "../../../public/image/anims/burundi.jpeg";
import img3 from "../../../public/image/anims/honey.jpg";
import img4 from "../../../public/image/anims/jameela.jpg";
import img5 from "../../../public/image/anims/1964.png";
import img6 from "../../../public/image/anims/ganda.png";
import img7 from "../../../public/image/anims/toys.jpg";
import img8 from "../../../public/image/anims/threads.png";
import img9 from "../../../public/image/anims/protea.png";
import img10 from "../../../public/image/anims/nuerta.jpg";
import img11 from "../../../public/image/anims/benin.jpeg";
import img12 from "../../../public/image/anims/twin.jpeg";
import img13 from "../../../public/image/anims/gurl.jpeg";
import img14 from "../../../public/image/anims/gurrl.jpeg";
import img15 from "../../../public/image/anims/joy.jpeg";
import img16 from "../../../public/image/anims/bg.png";
import img17 from "../../../public/image/anims/bgp.png";
import img18 from "../../../public/image/anims/bask.jpeg";
import img19 from "../../../public/image/anims/bask2.jpeg";

import { motion } from "framer-motion";
import Image from "next/image";


export const BackgroundImageAnim = () => {
    return (
        <div className="flex absolute h-[90vh] overflow-clip opacity-40 top-0 w-full z-0">
            <motion.div
                className="flex flex-col w-64  space-y-20 top-20 absolute bg-red"
                animate={{
                    y: [400, 800],
                    transition: {
                        duration: 50,
                        repeat: Infinity,
                        repeatType: 'reverse'
                    }
                }}
            >
                <Image src={img10} alt={"AsambeZ"} />
                <Image src={img19} alt={"AsambeZ"} />
                <Image src={img17} alt={"AsambeZ"} />
                <Image src={img15} alt={"AsambeZ"} />
                <Image src={img13} alt={"AsambeZ"} />
                <Image src={img11} alt={"AsambeZ"} />
                <Image src={img1} alt={"AsambeZ"} />
                <Image src={img2} alt={"AsambeZ"} />
                <Image src={img3} alt={"AsambeZ"} />
                <Image src={img4} alt={"AsambeZ"} />
            </motion.div>
            <motion.div
                className="flex flex-col w-64 right-0 space-y-40 absolute top-0"
                animate={{
                    y: [400, 800],
                    transition: {
                        duration: 50,
                        repeat: Infinity,
                        repeatType: 'reverse'
                    }
                }}
            >
                <Image src={img2} alt={"AsambeZ"} />
                <Image src={img5} alt={"AsambeZ"} />
                <Image src={img7} alt={"AsambeZ"} />
                <Image src={img3} alt={"AsambeZ"} />
                <Image src={img11} alt={"AsambeZ"} />
                <Image src={img16} alt={"AsambeZ"} />
                <Image src={img14} alt={"AsambeZ"} />
                <Image src={img12} alt={"AsambeZ"} />
                <Image src={img6} alt={"AsambeZ"} />
                <Image src={img10} alt={"AsambeZ"} />
            </motion.div>
            <motion.div
                className="w-64 right-96 bottom-0 space-y-40 absolute"
                animate={{
                    y: [400, -800],
                    transition: {
                        duration: 50,
                        repeat: Infinity,
                        repeatType: 'reverse'
                    }
                }}>
                <Image src={img3} alt={"AsambeZ"} />
                <Image src={img1} alt={"AsambeZ"} />
                <Image src={img8} alt={"AsambeZ"} />
                <Image src={img11} alt={"AsambeZ"} />
                <Image src={img16} alt={"AsambeZ"} />
                <Image src={img14} alt={"AsambeZ"} />
                <Image src={img12} alt={"AsambeZ"} />
                <Image src={img6} alt={"AsambeZ"} />
                <Image src={img10} alt={"AsambeZ"} />
            </motion.div>
            <motion.div className="w-80 left-20 space-y-40 absolute bottom-0"
                animate={{
                    y: [400, -800],
                    transition: {
                        duration: 50,
                        repeat: Infinity,
                        repeatType: 'reverse'
                    }
                }}>
                <Image src={img7} alt={"AsambeZ"} />
                <Image src={img8} alt={"AsambeZ"} />
                <Image src={img9} alt={"AsambeZ"} />
                <Image src={img10} alt={"AsambeZ"} />
                <Image src={img19} alt={"AsambeZ"} />
                <Image src={img17} alt={"AsambeZ"} />
                <Image src={img15} alt={"AsambeZ"} />
                <Image src={img13} alt={"AsambeZ"} />
                <Image src={img11} alt={"AsambeZ"} />
            </motion.div>
        </div>
    );
};