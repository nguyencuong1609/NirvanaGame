import React, { useEffect } from 'react';

const PreloadImage = () => {
    useEffect(() => {
        const preloadImage = new Image();
        preloadImage.src = '/images/monk-speed-up.gif';
    }, []);

    return (
        <>
        </>
    );
};

export default PreloadImage;