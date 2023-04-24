import styled from 'styled-components';

export function Popup({ className, onClose, src }) {
  return (
    <Wrap onAnimationEnd={onClose}>
        <div className={className}>
            <img src={src}/>
        </div>
    </Wrap>
  );
}

const Wrap = styled.div`
    .like {
        z-index: 30;
        position: absolute;
        top: 150px;
        left: 520px;
        animation: heart 1.5s;
        opacity: 0;
    }

    .dislike {
        z-index: 30;
        position: absolute;
        top: 150px;
        right: 550px;
        animation: heart 1.5s;
        opacity: 0;
    }

    .like > img {
        width: 150px;
        height: 150px;
    }

    .dislike > img {
        width: 150px;
        height: 150px;
    }

    @keyframes heart { 
        0% {
            transform: scale(1);
            opacity: 0;
        }
        17.5% {
            transform: scale(0.3);
            opacity: 0.7
        }
        60% {
            opacity: 0.8;
        } 
        100% { opacity: 0 } 
    }
`;