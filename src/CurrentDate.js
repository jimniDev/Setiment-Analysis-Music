import { useState, useEffect, useRef, React } from 'react';

export function CurrentDate() {
    // const [date, setDate] = useState(0);

    const monthNames = ["JAN", "FEB", "MAR", "APR", "MAY", "JUN",
  "JUL", "AUG", "SEP", "OCT", "NOV", "DEC"
];
    let newDate = new Date()
    let date = newDate.getDate();
    let month = newDate.getMonth();
    let year = newDate.getFullYear();
    
    return (
        <div style={{   
                        textAlign: `center`,
                        verticalAlign: `middle`,
                        position:  `relative`,
                        width: `110px`,
                        height: `120px`,
                        background: `#FFFFFF`,
                        opacity: `0.8`,
                        borderRadius: `30px`,
                        padding: `20px`,
                        display: `inline-block`,
                        filter: `drop-shadow(0px 4px 4px rgba(0, 0, 0, 0.1))`,
                        fontFamily: `Poppins`,
            }}>
            <div className="month"
                style={{ fontWeight: `800`, fontSize: `30px`, lineHeight: `100%`, textTransform: `capitalize`}}
                >{monthNames[month]}</div>
            <div className="date"
                style={{ fontWeight: `700`, fontSize: `65px`, lineHeight: `100%`, textTransform: `capitalize`}}
                >{date}</div>
            <div className="year"
                style={{ fontWeight: `800`, fontSize: `30px`, lineHeight: `100%`, textTransform: `capitalize`}}
                >{year}</div>
        </div>
    )
}