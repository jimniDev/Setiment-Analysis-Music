import { useEffect } from "react";
import styles from "./Logo.module.css";
import classNames from 'classnames/bind';

export function Logo() {
    const cx = classNames.bind(styles);

    return (
        <div>
            <div className={cx('line1', {line: true})}><p>Playing</p></div>
            <div className={cx('line2', {line: true})}><p>YOUR</p></div>
        
            <div className={cx('content')}>
                <h2>MOOD</h2>
                <h2>MOOD</h2>
            </div>

            <div className={cx('line3', {line: true})}><p>TODAY</p></div>
        </div>
    );
}
