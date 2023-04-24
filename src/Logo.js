import { useState } from "react";
import styles from "./Logo.module.css";
import classNames from 'classnames/bind';

export function Logo(props) {
    const cx = classNames.bind(styles);

    return (
        <div className={cx('container')}>
            <div className={cx('line1', {line: true})}><p>Playing</p></div>
            <div className={cx('line2', {line: true})}><p>YOUR</p></div>
        
            <div className={cx('content')} style={{color: `${props.color}`}}>
                <h2 >{props.title}</h2>
                <h2 style={{color: `${props.color}`, WebkitTextStroke: `2px black`}} >{props.title}</h2>
            </div>

            <div className={cx('line3', {line: true})}><p>MOOD</p></div>
        </div>
    );
}
