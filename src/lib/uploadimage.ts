import axios from "axios";

interface ImageUploadResponse {
    success: boolean;
    data: {
        display_url: string;
    };
}

interface UploadResult {
    success: boolean;
    url?: string;
    error?: string;
}

const image_hosting_key = import.meta.env.VITE_IMAGE_HOSTING_KEY;
const image_hosting_api = `https://api.imgbb.com/1/upload?key=${image_hosting_key}`;

export const uploadImage = async (file: File): Promise<UploadResult> => {
    try {
        if (!file) {
            return { success: false, error: 'No file provided' };
        }

        const formData = new FormData();
        formData.append('image', file);

        const res = await axios.post<ImageUploadResponse>(
            image_hosting_api,
            formData,
            {
                headers: {
                    'Content-Type': 'multipart/form-data',
                },
            }
        );

        if (res.data.success) {
            return {
                success: true,
                url: res.data.data.display_url
            };
        }

        return {
            success: false,
            error: 'Upload failed'
        };

    } catch (error) {
        console.error('Image upload error:', error);
        return {
            success: false,
            error: error instanceof Error ? error.message : 'Unknown error occurred'
        };
    }
};