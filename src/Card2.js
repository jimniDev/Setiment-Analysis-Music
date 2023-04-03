import { useState, useRef, useEffect } from 'react';
import styles from "./Card.module.css";
import { motion, useMotionValue, useTransform, useAnimation } from "framer-motion";

export function Card ({img}) {
    // To move the card as the user drags the cursor
    const motionValue = useMotionValue(0);
    
    // To rotate the card as the card moves on drag
    const rotateValue = useTransform(motionValue, [-200, 200], [-50, 50]);

    // To decrease opacity of the card when swiped
    // on dragging card to left(-200) or right(200)
    // opacity gradually changes to 0
    // and when the card is in center opacity = 1
    const opacityValue = useTransform(
        motionValue,
        [-200, -150, 0, 150, 200],
        [0, 1, 1, 1, 0]
    );

    // Framer animation hook
    const animControls = useAnimation();

    // const style = {
    //     backgroundImage: `url(${img})`,
    //     backgroundRepeat: 'no-repeat',
    //     backgroundSize: 'contain',
    //     backgroundColor: color,
    //     boxShadow: '5px 10px 18px #888888',
    //     borderRadius: 10,
    //     height: 300
    // };
      

    return (
        // <div style={{backgroundImage: `url(${imgs[imgCount++]})`}}>
        <motion.div
            className={styles.card} style={{backgroundImage: `url(${img})`}}
            // Card can be drag only on x-axis
            drag='x'
            x={motionValue}
            rotate={rotateValue}
            opacity={opacityValue}
            dragConstraints={{ left: -1000, right: 1000 }}
            onDragEnd={(event, info) => {
                
                // If the card is dragged only upto 150 on x-axis
                // bring it back to initial position
                if (Math.abs(info.point.x) <= 300) {
                    animControls.start({ x: 0 });
                } else {
                    
                    // If card is dragged beyond 150
                    // make it disappear
        
                    // Making use of ternary operator
                    animControls.start({ x: info.point.x < 0 ? -200 : 200 });
                }
            }}
        />
    )
}