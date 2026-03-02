import { useState, useRef } from 'react';
import type { Profile } from '../../types/Profile';

interface ProfileEditProps {
  profile: Profile;
  onSave: (updatedProfile: Partial<Profile>) => void;
  onCancel: () => void;
  onPhotoUpload: (file: File) => Promise<void>;
}

export function ProfileEdit({ profile, onSave, onCancel, onPhotoUpload }: ProfileEditProps) {
  const [formData, setFormData] = useState({
    name: profile.name,
    bio: profile.bio,
    age: profile.age?.toString() || '',
    location: profile.location,
  });
  const [photoPreview, setPhotoPreview] = useState(profile.photo);
  const [uploadError, setUploadError] = useState<string | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handlePhotoClick = () => {
    fileInputRef.current?.click();
  };

  const handlePhotoChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    setUploadError(null);

    try {
      await onPhotoUpload(file);
      // Create preview
      const reader = new FileReader();
      reader.onload = (event) => {
        setPhotoPreview(event.target?.result as string);
      };
      reader.readAsDataURL(file);
    } catch (error) {
      setUploadError(error instanceof Error ? error.message : 'Upload failed');
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    onSave({
      name: formData.name,
      bio: formData.bio,
      age: formData.age ? parseInt(formData.age) : null,
      location: formData.location,
    });
  };

  return (
    <div className="profile-section" style={{ padding: '15px' }}>
      <form onSubmit={handleSubmit}>
        {/* Photo Upload */}
        <div
          onClick={handlePhotoClick}
          style={{
            width: '120px',
            height: '120px',
            backgroundColor: '#FF1493',
            margin: '0 auto 15px',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            border: '2px solid #FFFFFF',
            cursor: 'pointer',
            overflow: 'hidden',
            position: 'relative'
          }}
        >
          {photoPreview ? (
            <img
              src={photoPreview}
              alt="Profile"
              style={{
                width: '100%',
                height: '100%',
                objectFit: 'cover'
              }}
            />
          ) : (
            <span style={{ fontSize: '48px' }}>👤</span>
          )}
          <div style={{
            position: 'absolute',
            bottom: 0,
            left: 0,
            right: 0,
            backgroundColor: 'rgba(0,0,0,0.7)',
            color: '#FFFFFF',
            fontSize: '9px',
            textAlign: 'center',
            padding: '2px'
          }}>
            Changer
          </div>
        </div>

        <input
          ref={fileInputRef}
          type="file"
          accept="image/*"
          onChange={handlePhotoChange}
          style={{ display: 'none' }}
        />

        {uploadError && (
          <p style={{ color: '#FF1493', fontSize: '10px', textAlign: 'center', marginBottom: '10px' }}>
            {uploadError}
          </p>
        )}

        <div className="section-divider" style={{ borderColor: '#444' }}></div>

        {/* Form Fields */}
        <div style={{ color: '#CCCCCC', fontSize: '11px' }}>
          <div style={{ marginBottom: '10px' }}>
            <label style={{ display: 'block', marginBottom: '3px' }}>
              <strong>Nom:</strong>
            </label>
            <input
              type="text"
              value={formData.name}
              onChange={(e) => setFormData({ ...formData, name: e.target.value })}
              required
              style={{
                width: '100%',
                backgroundColor: '#1a1a1a',
                border: '1px solid #444',
                color: '#FFFFFF',
                padding: '5px',
                fontSize: '11px',
                fontFamily: 'Verdana, Arial, sans-serif'
              }}
            />
          </div>

          <div style={{ marginBottom: '10px' }}>
            <label style={{ display: 'block', marginBottom: '3px' }}>
              <strong>Âge:</strong>
            </label>
            <input
              type="number"
              value={formData.age}
              onChange={(e) => setFormData({ ...formData, age: e.target.value })}
              style={{
                width: '100%',
                backgroundColor: '#1a1a1a',
                border: '1px solid #444',
                color: '#FFFFFF',
                padding: '5px',
                fontSize: '11px',
                fontFamily: 'Verdana, Arial, sans-serif'
              }}
            />
          </div>

          <div style={{ marginBottom: '10px' }}>
            <label style={{ display: 'block', marginBottom: '3px' }}>
              <strong>Localisation:</strong>
            </label>
            <input
              type="text"
              value={formData.location}
              onChange={(e) => setFormData({ ...formData, location: e.target.value })}
              style={{
                width: '100%',
                backgroundColor: '#1a1a1a',
                border: '1px solid #444',
                color: '#FFFFFF',
                padding: '5px',
                fontSize: '11px',
                fontFamily: 'Verdana, Arial, sans-serif'
              }}
            />
          </div>

          <div style={{ marginBottom: '15px' }}>
            <label style={{ display: 'block', marginBottom: '3px' }}>
              <strong>Description:</strong>
            </label>
            <textarea
              value={formData.bio}
              onChange={(e) => setFormData({ ...formData, bio: e.target.value })}
              rows={4}
              style={{
                width: '100%',
                backgroundColor: '#1a1a1a',
                border: '1px solid #444',
                color: '#FFFFFF',
                padding: '5px',
                fontSize: '11px',
                fontFamily: 'Verdana, Arial, sans-serif',
                resize: 'vertical'
              }}
            />
          </div>

          {/* Buttons */}
          <div style={{ display: 'flex', gap: '10px', justifyContent: 'center' }}>
            <button
              type="submit"
              style={{
                backgroundColor: '#FF1493',
                color: '#FFFFFF',
                border: 'none',
                padding: '5px 15px',
                cursor: 'pointer',
                fontSize: '11px',
                fontFamily: 'Verdana, Arial, sans-serif'
              }}
            >
              Enregistrer
            </button>
            <button
              type="button"
              onClick={onCancel}
              style={{
                backgroundColor: '#444',
                color: '#FFFFFF',
                border: 'none',
                padding: '5px 15px',
                cursor: 'pointer',
                fontSize: '11px',
                fontFamily: 'Verdana, Arial, sans-serif'
              }}
            >
              Annuler
            </button>
          </div>
        </div>
      </form>
    </div>
  );
}
