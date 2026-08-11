
import React, {
    useEffect,
    useRef,
    useState
} from "react";

import { useNavigate } from "react-router-dom";
import './PhotoUploadIcon.css'

const PhotoUploadIcon = () => {

    const navigate = useNavigate();

    // ==========================================
    // STATES
    // ==========================================

    const [showCamera, setShowCamera] =
        useState(false);

    const [preview, setPreview] =
        useState(null);

    const [showPreview, setShowPreview] =
        useState(false);

    const [isLoading, setIsLoading] =
        useState(false);

    // ==========================================
    // REFS
    // ==========================================

    const videoRef = useRef(null);

    const streamRef = useRef(null);

    const fileInputRef = useRef(null);


    // ==========================================
    // OPEN CAMERA AUTOMATICALLY
    // ==========================================

    useEffect(() => {

        startCamera();

        return () => {
            stopCamera();
        };

    }, []);


    // ==========================================
    // START CAMERA
    // ==========================================

    const startCamera = async () => {

        console.log("Starting camera...");

        try {

            if (!navigator.mediaDevices) {

                alert(
                    "Camera is not supported by this browser."
                );

                return;
            }


            const stream =
                await navigator.mediaDevices.getUserMedia({
                    video: true,
                    audio: false
                });


            console.log(
                "Camera permission granted"
            );


            streamRef.current = stream;

            setShowCamera(true);


            // Wait until video element appears

            setTimeout(() => {

                if (videoRef.current) {

                    videoRef.current.srcObject =
                        stream;

                    videoRef.current
                        .play()
                        .catch((error) => {

                            console.log(
                                "Video play error:",
                                error
                            );

                        });

                }

            }, 100);


        } catch (error) {

            console.error(
                "Camera error:",
                error
            );


            if (
                error.name ===
                "NotAllowedError"
            ) {

                alert(
                    "Camera permission denied. Please allow camera access."
                );

            } else if (
                error.name ===
                "NotFoundError"
            ) {

                alert(
                    "No camera found on your laptop."
                );

            } else {

                alert(
                    "Unable to open camera."
                );

            }

        }

    };


    // ==========================================
    // STOP CAMERA
    // ==========================================

    const stopCamera = () => {

        if (streamRef.current) {

            streamRef.current
                .getTracks()
                .forEach((track) => {
                    track.stop();
                });

            streamRef.current = null;
        }


        if (videoRef.current) {

            videoRef.current.srcObject =
                null;

        }


        setShowCamera(false);
    };


    // ==========================================
    // CAPTURE PHOTO
    // ==========================================

    const capturePhoto = () => {

        const video =
            videoRef.current;


        if (!video) {

            console.log(
                "Video element not found"
            );

            return;
        }


        if (
            video.videoWidth === 0 ||
            video.videoHeight === 0
        ) {

            alert(
                "Camera is not ready. Please wait a moment."
            );

            return;
        }


        const canvas =
            document.createElement(
                "canvas"
            );


        canvas.width =
            video.videoWidth;

        canvas.height =
            video.videoHeight;


        const context =
            canvas.getContext("2d");


        context.drawImage(
            video,
            0,
            0,
            canvas.width,
            canvas.height
        );


        canvas.toBlob(
            (blob) => {

                if (!blob) {

                    alert(
                        "Unable to capture photo."
                    );

                    return;
                }


                const imageUrl =
                    URL.createObjectURL(
                        blob
                    );


                console.log(
                    "Photo captured:",
                    imageUrl
                );


                setPreview({
                    blob: blob,
                    url: imageUrl
                });


                // Stop camera

                stopCamera();


                // Show preview

                setShowPreview(true);

            },
            "image/jpeg",
            0.9
        );

    };


    // ==========================================
    // OPEN LAPTOP FILE PICKER
    // ==========================================

    const openFilePicker = () => {

        fileInputRef.current?.click();

    };


    // ==========================================
    // SELECT PHOTO FROM LAPTOP
    // ==========================================

    const handleFileChange = (
        event
    ) => {

        const file =
            event.target.files?.[0];


        if (!file) {
            return;
        }


        const imageUrl =
            URL.createObjectURL(
                file
            );


        setPreview({

            blob: file,

            url: imageUrl

        });


        setShowPreview(true);


        // Reset input

        event.target.value = "";

    };


    // ==========================================
    // CANCEL PREVIEW
    // ==========================================

    const cancelPreview = () => {

        if (preview?.url) {

            URL.revokeObjectURL(
                preview.url
            );

        }


        setPreview(null);

        setShowPreview(false);


        // Open camera again

        startCamera();

    };


    // ==========================================
    // ADD STORY
    // ==========================================

    const addStory = () => {

        if (!preview?.blob) {
            return;
        }


        setIsLoading(true);


        const reader =
            new FileReader();


        reader.onload = () => {

            const storedUser =
                JSON.parse(
                    localStorage.getItem(
                        "user"
                    )
                ) || {};


            const oldStories =
                JSON.parse(
                    localStorage.getItem(
                        "myStories"
                    )
                ) || [];


            const newStory = {

                id: Date.now(),

                userId:
                    storedUser?.id,

                image:
                    reader.result,

                timestamp:
                    new Date().toISOString(),

                seen: false,

                likes: 0,

                comments: 0

            };


            const updatedStories = [

                newStory,

                ...oldStories

            ];


            // Save stories

            localStorage.setItem(
                "myStories",
                JSON.stringify(
                    updatedStories
                )
            );


            console.log(
                "Story added:",
                newStory
            );


            // ==================================
            // 1 SECOND LOADING
            // ==================================

            setTimeout(() => {

                setIsLoading(false);


                alert(
                    "Story added successfully!"
                );


                // Go back

                navigate(-1);

            }, 1000);

        };


        reader.readAsDataURL(
            preview.blob
        );

    };


    // ==========================================
    // CANCEL CAMERA
    // ==========================================

    const handleCameraCancel = () => {

        stopCamera();

        navigate(-1);

    };


    // ==========================================
    // UI
    // ==========================================

    return (

        <>

            {/* ==================================
                HIDDEN FILE INPUT
            ================================== */}

            <input
                ref={fileInputRef}
                type="file"
                accept="image/*"
                onChange={
                    handleFileChange
                }
                style={{
                    display: "none"
                }}
            />


            {/* ==================================
                CAMERA
            ================================== */}

            {showCamera && (

                <div className="story-camera-page">

                    <div className="story-camera-box">

                        <h2>
                            Take Photo
                        </h2>


                        <video
                            ref={videoRef}
                            autoPlay
                            playsInline
                            muted
                            className="camera-video"
                        />


                        <div className="camera-buttons">

                            <button
                                type="button"
                                onClick={
                                    handleCameraCancel
                                }
                                className="cancel-button"
                            >
                                Cancel
                            </button>


                            <button
                                type="button"
                                onClick={
                                    capturePhoto
                                }
                                className="capture-button"
                            >
                                📷 Capture
                            </button>

                        </div>


                        <button
                            type="button"
                            onClick={
                                openFilePicker
                            }
                            className="gallery-button"
                        >
                            🖼️ Upload Photo
                        </button>

                    </div>

                </div>

            )}


            {/* ==================================
                PHOTO PREVIEW
            ================================== */}

            {showPreview &&
                preview && (

                    <div className="story-preview-page">

                        <div className="story-preview-box">

                            <h2>
                                Preview Your Story
                            </h2>


                            <img
                                src={preview.url}
                                alt="Story preview"
                                className="preview-image"
                            />


                            <div className="preview-buttons">

                                <button
                                    type="button"
                                    onClick={
                                        cancelPreview
                                    }
                                    disabled={
                                        isLoading
                                    }
                                    className="cancel-button"
                                >
                                    Cancel
                                </button>


                                <button
                                    type="button"
                                    onClick={
                                        addStory
                                    }
                                    disabled={
                                        isLoading
                                    }
                                    className="capture-button"
                                >
                                    {isLoading
                                        ? "Uploading..."
                                        : "Add Story"}
                                </button>

                            </div>

                        </div>

                    </div>

                )}

        </>

    );

};

export default PhotoUploadIcon;







