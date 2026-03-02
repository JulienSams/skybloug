import { useState } from 'react';
import { Profile, defaultProfile } from '../types/Profile';

export function useProfile() {
  const [profile, setProfile] = useState<Profile>(defaultProfile);

  const updatePhoto = (photo: string | null) => {
    setProfile(prev => ({ ...prev, photo }));
  };

  const updateName = (name: string) => {
    setProfile(prev => ({ ...prev, name }));
  };

  const updateBio = (bio: string) => {
    setProfile(prev => ({ ...prev, bio }));
  };

  const updateAge = (age: number | null) => {
    setProfile(prev => ({ ...prev, age }));
  };

  const updateLocation = (location: string) => {
    setProfile(prev => ({ ...prev, location }));
  };

  const handlePhotoUpload = (file: File): Promise<void> => {
    return new Promise((resolve, reject) => {
      // Validate file type
      if (!file.type.startsWith('image/')) {
        reject(new Error('File must be an image'));
        return;
      }

      // Validate file size (max 5MB)
      const maxSize = 5 * 1024 * 1024;
      if (file.size > maxSize) {
        reject(new Error('Image must be smaller than 5MB'));
        return;
      }

      // Convert to base64 data URL
      const reader = new FileReader();

      reader.onload = (e) => {
        const dataUrl = e.target?.result as string;
        updatePhoto(dataUrl);
        resolve();
      };

      reader.onerror = () => {
        reject(new Error('Failed to read file'));
      };

      reader.readAsDataURL(file);
    });
  };

  return {
    profile,
    updatePhoto,
    updateName,
    updateBio,
    updateAge,
    updateLocation,
    handlePhotoUpload,
  };
}
