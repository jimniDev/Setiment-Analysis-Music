import styles from "./Footer.module.css";
import classNames from 'classnames/bind';

export function Footer() {
    const cx = classNames.bind(styles);

    return (
        <div className={styles.footer}>
            <div className={styles.Info}>
                <p className={styles.contents}>ⓒ 2023 Jimin Kim</p>
            </div>
        </div>
    );
}