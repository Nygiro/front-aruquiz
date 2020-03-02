import React, { useEffect, useRef } from 'react';
import { AR } from "js-aruco";

const ANSWER = ['A', 'B', 'C', 'D'];

const CameraDetector = () => {
    const video = useRef('');
    const canvas = useRef('');
    let markers = [];
    let context, imageData;
    useEffect(() => {
        navigator.mediaDevices.getUserMedia = (navigator.mediaDevices.getUserMedia ||
            navigator.webkitGetUserMedia ||
            navigator.mozGetUserMedia ||
            navigator.msGetUserMedia);
        navigator.mediaDevices
            .getUserMedia({ video: {facingMode: 'environment'} })
            .then(stream => {
                if ("srcObject" in video.current) {
                    video.current.srcObject = stream;
                } else {
                    video.current.src = window.URL.createObjectURL(stream);
                }
            })
            .catch(function (err) {
                console.log(err.name + ": " + err.message);
            }
            );
        requestAnimationFrame(() => {
            tick(video.current, canvas.current);
        });
    });

    const tick = (video, canvas) => {
        context = canvas.getContext("2d");
        requestAnimationFrame(() => {
            tick(video, canvas);
        });
        if (video.readyState === video.HAVE_ENOUGH_DATA) {
            snapshot(video, context, canvas);
            let detector = new AR.Detector();
            markers = detector.detect(imageData);
            drawCorners();
            drawId();
            determinateResponse();
        }
    };

    const snapshot = (video, context, canvas) => {
        context.drawImage(video, 0, 0, canvas.width, canvas.height);
        imageData = context.getImageData(0, 0, canvas.width, canvas.height);
    };


    const drawCorners = () => {
        markers.forEach(marker => {
            context.beginPath();
            marker.corners.forEach((corner, index) => {
                context.moveTo(corner.x, corner.y);
                let cornerToGo = marker.corners[(index + 1) % marker.corners.length];
                context.lineTo(cornerToGo.x, cornerToGo.y);
            });
            context.stroke();
            context.closePath();
            context.strokeStyle = "green";
            context.strokeRect(marker.corners[0].x - 2, marker.corners[0].y - 2, 4, 4);
        });
    };

    const drawId = () => {
        markers.forEach((marker) => {
            let x = Infinity;
            let y = Infinity;
            marker.corners.forEach((corner, index) => {
                context.fillText(ANSWER[index], corner.x, corner.y);
                x = Math.min(x, corner.x);
                y = Math.min(y, corner.y);
            });
            context.strokeText(marker.id, x, y);
        })
    };

    const determinateResponse = (corners) => {
        markers.forEach(marker => {
            let reponse;
            let dx = marker.corners[0].x - marker.corners[2].x;
            let dy = marker.corners[0].y - marker.corners[2].y;
            if (dx > 0) {
                if (dy > 0) {
                    reponse = "C";
                } else if (dy < 0) {
                    reponse = "D";
                }
            } else if (dx < 0) {
                if (dy > 0) {
                    reponse = "B";
                } else if (dy < 0) {
                    reponse = "A";
                }
            }
        });
    };

    return (
        <div className="CameraDetector">
            <video ref={video} autoPlay={true} style={{ display: 'none' }}></video>
            <canvas ref={canvas} style={{ width: 500, height: 400 }}></canvas>
        </div>
    );
};

export default CameraDetector;
