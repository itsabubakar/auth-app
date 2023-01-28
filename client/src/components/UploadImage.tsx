import { useState } from "react";
import axios from "axios";
import api from "./AxiosBase";

export default function UploadImage() {
    const [loading, setLoading] = useState(false);
    const [url, setUrl] = useState("");

    const convertBase64 = (file: Blob) => {
        return new Promise((resolve, reject) => {
            const fileReader = new FileReader();
            fileReader.readAsDataURL(file);

            fileReader.onload = () => {
                resolve(fileReader.result);
            };

            fileReader.onerror = (error) => {
                reject(error);
            };
        });
    };

    function uploadSingleImage(base64: unknown) {
        setLoading(true);
        api
            .post("/api/uploadImage", { image: base64 })
            .then((res) => {
                setUrl(res.data);
                alert("Image uploaded Succesfully");
            })
            .then(() => setLoading(false))
            .catch(console.log);
    }

    const uploadImage = async (event: { target: { files: any; }; }) => {
        const files = event.target.files;
        console.log(files.length);

        if (files.length === 1) {
            const base64 = await convertBase64(files[0]);
            uploadSingleImage(base64);
            return;
        }
    };

    function UploadInput() {
        return (
            <div className="flex items-center justify-center w-full">
                <label
                    htmlFor="dropzone-file"
                    className="flex flex-col items-center justify-center w-full h-64 border-2 border-gray-300 border-dashed rounded-lg cursor-pointer bg-gray-50 dark:hover:bg-bray-800 dark:bg-gray-700 hover:bg-gray-100 dark:border-gray-600 dark:hover:border-gray-500 dark:hover:bg-gray-600"
                >
                    <input
                        onChange={uploadImage}
                        id="dropzone-file"
                        type="file"
                        className="hidden"

                    />
                </label>
            </div>
        );
    }

    return (
        <div className="flex justify-center flex-col m-8 ">
            <div>
                {url && (
                    <div>
                        Access you file at{" "}
                        <a href={url} target="_blank" rel="noopener noreferrer">
                            {url}
                        </a>
                    </div>
                )}
            </div>
            <UploadInput />
        </div>
    );
}