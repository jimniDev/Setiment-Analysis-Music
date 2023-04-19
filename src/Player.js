import { useState, useEffect, useRef, React } from 'react';
import WebPlayback from './Webplayback';

export function Player() {
    const [token, setToken] = useState('BQD7VQqAzs7KQVo_XJ9QMbErnB8qzk4j7oOoL1P2cwx90r1j3Qsw6MLlCY4ujA0zJJmMdQ69_RpV__sGVBf9ys9Hl1mS3iMDDAVOyWylCIsk3As3pSuzUE7fd8wHtesdFDaooh_jd2SX4SeHi8Bk9fRD-wNPrd0Ys9BtYESe_lGgm6VhsFCrHL_xVmCQGmyEm3aGypG1WqSXSSGESEX6aLZQsOgYvV8');

    return (
        <div>
            <WebPlayback token={token} />
        </div>
    )
}