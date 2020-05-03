import React, { useEffect, useRef, useState } from 'react';
import { AR } from "js-aruco";
import { useMutation } from '@apollo/react-hooks';
import { CREATE_REPORT } from '../../utils/MutationApi';

const ANSWERS = ['A', 'B', 'C', 'D'];
const CameraDetector = ({ quiz, setMediaStream, students, schoolClassId, setAnswersByQuestion, showResultsByQuestion, answersByQuestion }) => {
    const [createReport] = useMutation(CREATE_REPORT);
    const video = useRef('');
    const canvas = useRef('');
    let markers = [];
    let context, imageData;
    useEffect(() => {
        if (video.current !== null) {
            navigator.mediaDevices.getUserMedia = (navigator.mediaDevices.getUserMedia ||
                navigator.webkitGetUserMedia ||
                navigator.mozGetUserMedia ||
                navigator.msGetUserMedia);
            navigator.mediaDevices
                .getUserMedia({ video: { facingMode: 'environment' } })
                .then(stream => {
                    if ("srcObject" in video.current) {
                        video.current.srcObject = stream;
                        setMediaStream(video.current.srcObject)
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
        }
    }, [video.current]);

    const tick = (video, canvas) => {
        context = canvas.getContext("2d");
        requestAnimationFrame(() => {
            tick(video, canvas);
        })
        if (video.readyState === video.HAVE_ENOUGH_DATA) {
            snapshot(video, context, canvas);
            let detector = new AR.Detector();
            markers = detector.detect(imageData);
            drawCorners();
            drawId();
            determinateResponse(video)
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
                context.fillText(ANSWERS[index], corner.x, corner.y);
                x = Math.min(x, corner.x);
                y = Math.min(y, corner.y);
            });
            context.strokeText(marker.id, x, y);
        })
    };

    const determinateResponse = (video) => {
        console.log(localStorage.getItem('nbCurrentQuestion'))
        markers.forEach(marker => {
            let answersByQuestion = JSON.parse(localStorage.getItem('answersByQuestion'));
            if (localStorage.getItem('openCamera') === 'true') {
                if (students.find(({ markerId }) => markerId == marker.id) && !answersByQuestion.find(answer => answer.markerId === marker.id)) {
                    let answer;
                    let answerLabel;
                    let dx = marker.corners[0].x - marker.corners[2].x;
                    let dy = marker.corners[0].y - marker.corners[2].y;
                    let student = students.find(student => student.markerId == marker.id);
                    if (dx > 0) {
                        if (dy > 0) {
                            answer = quiz.questions[localStorage.getItem('nbCurrentQuestion')].answers[2]
                            answerLabel = ANSWERS[2]
                        } else if (dy < 0) {
                            answer = quiz.questions[localStorage.getItem('nbCurrentQuestion')].answers[3]
                            answerLabel = ANSWERS[3]
                        }
                    } else if (dx < 0) {
                        if (dy > 0) {
                            answer = quiz.questions[localStorage.getItem('nbCurrentQuestion')].answers[1]
                            answerLabel = ANSWERS[1]
                        } else if (dy < 0) {
                            answer = quiz.questions[localStorage.getItem('nbCurrentQuestion')].answers[0]
                            answerLabel = ANSWERS[0]
                        }
                    }
                    createReport({
                        variables: {
                            schoolClassId: schoolClassId,
                            studentId: student.id,
                            quizId: quiz.id,
                            questionId: quiz.questions[localStorage.getItem('nbCurrentQuestion')].id,
                            answerId: answer.id
                        }
                    })
                    setAnswersByQuestion([...answersByQuestion, {
                        studentName: student.name,
                        markerId: marker.id,
                        isRight: answer.isRight,
                        answerLabel: answerLabel
                    }])
                }

                if (students.find(({ markerId }) => markerId == marker.id) && answersByQuestion.find(answer => answer.markerId === marker.id)) {
                    video.load()
                }

            }
        });
    };

    return (
        <div className="CameraDetector">
            {!showResultsByQuestion && <div className={'nb-answer'}>{answersByQuestion.length} / {students.length}</div>}
            <video ref={video} autoPlay={true} style={{ display: 'none' }}></video>
            <canvas ref={canvas} className={'canvas'}></canvas>
        </div>
    );
};

export default CameraDetector;
