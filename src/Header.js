import { Link, useMatch } from 'react-router-dom';
import styles from "./Header.module.css";
import classNames from 'classnames/bind';

export function Header() {
    const cx = classNames.bind(styles);
    const todayMatched = useMatch("/");
    const archiveMatched = useMatch("/archive");

    return (
        <div className={styles.header}>
            <div className={styles.logo}>
                <img className={styles.logoImg} src='./img/Music.png'></img>
            </div>
            <div className={styles.nav}>
                <Link to={'/'} className={cx('today', {active : todayMatched ? true : false})}>Today</Link>
                <label> | </label>
                <Link to={'/archive'} className={cx('archive', {active : archiveMatched ? true : false})}>Archive</Link>
            </div>
            <div className={styles.userInfo}>
                <img className={styles.userImg} src='./img/Spotify_Logo_CMYK_Green.png'></img>
                <p className={styles.userName}>Jimin Kim</p>
            </div>
        </div>
    );
}