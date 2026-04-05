import { useState, useRef } from 'react';
import { Upload, X, Loader2, Image as ImageIcon } from 'lucide-react';
import styles from './FileUpload.module.css';
import { adminApi } from '@/services/adminApi';

interface FileUploadProps {
  onUploadSuccess: (url: string) => void;
  currentImage?: string;
  label?: string;
  disabled?: boolean;
}

export default function FileUpload({ onUploadSuccess, currentImage, label, disabled }: FileUploadProps) {
  const [isUploading, setIsUploading] = useState(false);
  const [preview, setPreview] = useState(currentImage);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleFileChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    // Local Preview
    const reader = new FileReader();
    reader.onloadend = () => {
      setPreview(reader.result as string);
    };
    reader.readAsDataURL(file);

    // Upload to Backend
    setIsUploading(true);
    try {
      const result = await adminApi.uploadImage(file);
      if (!result.url) throw new Error('Backend failed to return asset URL');
      
      const fullUrl = `http://localhost:4000${result.url}`;
      onUploadSuccess(fullUrl);
    } catch (error: any) {
      console.error('Upload failed:', error);
      alert('Upload failed. Please try again.');
    } finally {
      setIsUploading(false);
    }
  };

  const removeImage = () => {
    setPreview(undefined);
    onUploadSuccess('');
    if (fileInputRef.current) fileInputRef.current.value = '';
  };

  return (
    <div className={styles.container}>
      {label && <label className={styles.label}>{label}</label>}
      
      <div className={styles.uploadBox}>
        {preview ? (
          <div className={styles.previewWrapper}>
            {preview.startsWith('data:video') || preview.endsWith('.mp4') || preview.endsWith('.webm') ? (
              <video src={preview} className={styles.preview} autoPlay muted loop />
            ) : (
              <img src={preview} alt="Preview" className={styles.preview} />
            )}
            <button 
              type="button" 
              className={styles.removeBtn}
              onClick={removeImage}
              disabled={isUploading || disabled}
            >
              <X size={16} />
            </button>
          </div>
        ) : (
          <div 
            className={`${styles.placeholder} ${disabled ? styles.disabled : ''}`}
            onClick={() => !disabled && fileInputRef.current?.click()}
          >
            {isUploading ? (
              <Loader2 className={styles.spin} size={32} />
            ) : (
              <>
                <Upload size={32} />
                <span>Click to upload image</span>
              </>
            )}
          </div>
        )}
        
        <input 
          type="file"
          ref={fileInputRef}
          className={styles.hiddenInput}
          accept="image/*,video/*"
          onChange={handleFileChange}
          disabled={isUploading}
        />
      </div>
      
      {isUploading && <div className={styles.progress}>Uploading...</div>}
    </div>
  );
}
