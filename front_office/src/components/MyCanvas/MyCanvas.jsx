import React, {useEffect, useRef} from "react";

/*component showing the content of image in canvas tag*/
function MyCanvas(props) {
    const {b64Value, width, height} = props;
    const myCanvas = useRef();
    useEffect(() => {
        const context = myCanvas.current.getContext("2d");
        context.webkitImageSmoothingEnabled = false;
        context.mozImageSmoothingEnabled = false;
        context.imageSmoothingEnabled = false;
        const image = new Image();
        image.onload = () => {
            context.drawImage(image, 0, 0, width, height);
        };
        image.crossOrigin = 'Anonymous';
        image.src = b64Value ? "data:image/png;base64, " + b64Value : "";

    }, [b64Value, width, height]);

    return <canvas data-testid='myCanvas' ref={myCanvas} width={Number(width)} height={Number(height)}/>;
}

export default MyCanvas