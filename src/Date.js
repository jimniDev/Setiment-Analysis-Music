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
        <div style={{ textAlign: `center`,
                        position:  `relative`,
                        width: `10vh`,
                        background: `#FFFFFF`,
                        opacity: `0.9`,
                        borderRadius: `20px`,
                        padding: `20px`,
            }}>
            <div class="month"
                style={{ fontWeight: `700`, fontSize: `30px`, lineHeight: `100.6%`, textTransform: `capitalize`}}
                >{monthNames[month]}</div>
            <div class="date"
                style={{ fontWeight: `700`, fontSize: `60px`, lineHeight: `100.6%`, textTransform: `capitalize`}}
                >{date}</div>
            <div class="year"
                style={{ fontWeight: `700`, fontSize: `30px`, lineHeight: `100.6%`, textTransform: `capitalize`}}
                >{year}</div>
        </div>
    )
}