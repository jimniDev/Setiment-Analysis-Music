import { Link } from 'react-router-dom';
import styles from "./Header.module.css";

export function Header() {
    return (
        <div className={styles.header}>
            <div className={styles.logo}></div>
            <div className={styles.nav}>
                <Link to={'/'}>Today</Link>
                <Link to={'/archive'}>Archive</Link>
            </div>
            <div className={styles.userInfo}>
                <p>Jimin Kim</p>
            </div>
        </div>
    );
}