import { useState, useEffect } from 'react';
import type { Profile  } from '../types/Profile';
import { defaultProfile } from '../types/Profile';
import * as api from '../services/api';

export function useProfile() {
  const [profile, setProfile] = useState<Profile>(defaultProfile);
  const [loading, setLoading] = useState(true);

  // Fetch profile on mount
  useEffect(() => {
    const fetchProfile = async () => {
      try {
        const data = await api.getProfile();
        setProfile({
          name: data.name,
          bio: data.bio || '',
          age: data.age,
          location: data.location || '',
          photo: data.photoUrl
        });
      } catch (error) {
        console.error('Failed to fetch profile:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchProfile();
  }, []);

  const updatePhoto = async (photo: string | null) => {
    setProfile(prev => ({ ...prev, photo }));
    try {
      await api.updateProfile({ photoUrl: photo || undefined });
    } catch (error) {
      console.error('Failed to update photo:', error);
    }
  };

  const updateName = async (name: string) => {
    setProfile(prev => ({ ...prev, name }));
    try {
      await api.updateProfile({ name });
    } catch (error) {
      console.error('Failed to update name:', error);
    }
  };

  const updateBio = async (bio: string) => {
    setProfile(prev => ({ ...prev, bio }));
    try {
      await api.updateProfile({ bio });
    } catch (error) {
      console.error('Failed to update bio:', error);
    }
  };

  const updateAge = async (age: number | null) => {
    setProfile(prev => ({ ...prev, age }));
    try {
      await api.updateProfile({ age: age || undefined });
    } catch (error) {
      console.error('Failed to update age:', error);
    }
  };

  const updateLocation = async (location: string) => {
    setProfile(prev => ({ ...prev, location }));
    try {
      await api.updateProfile({ location });
    } catch (error) {
      console.error('Failed to update location:', error);
    }
  };

  const handlePhotoUpload = async (file: File): Promise<void> => {
    // Validate file type
    if (!file.type.startsWith('image/')) {
      throw new Error('File must be an image');
    }

    // Validate file size (max 5MB)
    const maxSize = 5 * 1024 * 1024;
    if (file.size > maxSize) {
      throw new Error('Image must be smaller than 5MB');
    }

    try {
      // Upload to server
      const { url } = await api.uploadImage(file);

      // Update profile with server URL
      const fullUrl = `http://localhost:3000${url}`;
      await updatePhoto(fullUrl);
    } catch (error) {
      console.error('Failed to upload photo:', error);
      throw error;
    }
  };

  const updateBackgroundImage = async (backgroundImage: string | null) => {
    setProfile(prev => ({ ...prev, backgroundImage }));
    try {
      await api.updateProfile({ backgroundImage: backgroundImage || undefined });
    } catch (error) {
      console.error('Failed to update background image:', error);
    }
  };

  const handleBackgroundUpload = async (file: File): Promise<void> => {
    // Validate file type
    if (!file.type.startsWith('image/')) {
      throw new Error('File must be an image');
    }

    // Validate file size (max 5MB)
    const maxSize = 5 * 1024 * 1024;
    if (file.size > maxSize) {
      throw new Error('Image must be smaller than 5MB');
    }

    try {
      // Upload to server
      const { url } = await api.uploadImage(file);

      // Update profile with server URL
      const fullUrl = `http://localhost:3000${url}`;
      await updateBackgroundImage(fullUrl);
    } catch (error) {
      console.error('Failed to upload background image:', error);
      throw error;
    }
  };

  return {
    profile,
    updatePhoto,
    updateName,
    updateBio,
    updateAge,
    updateLocation,
    updateBackgroundImage,
    handlePhotoUpload,
    handleBackgroundUpload,
    loading,
  };
}
