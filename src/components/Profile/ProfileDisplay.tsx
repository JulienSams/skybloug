import type { Profile } from '../../types/Profile';

interface ProfileDisplayProps {
  profile: Profile;
  onEdit: () => void;
  showEditButton?: boolean;
}

export function ProfileDisplay({ profile, onEdit, showEditButton = true }: ProfileDisplayProps) {
  return (
    <div className="profile-section">
      <div className="profile-photo" style={{
        width: '120px',
        height: '120px',
        backgroundColor: '#FF1493',
        margin: '0 auto 15px',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        border: '2px solid #FFFFFF',
        overflow: 'hidden'
      }}>
        {profile.photo ? (
          <img
            src={profile.photo}
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
      </div>

      <h2 style={{ textAlign: 'center', color: '#FFFFFF' }}>
        {profile.name}
      </h2>

      {showEditButton && (
        <div style={{ textAlign: 'center', marginBottom: '10px' }}>
          <button
            onClick={onEdit}
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
            Modifier
          </button>
        </div>
      )}

      <div className="section-divider" style={{ borderColor: '#444' }}></div>

      <div style={{ color: '#CCCCCC', fontSize: '11px' }}>
        <p><strong>Nom:</strong> {profile.name}</p>
        {profile.age && <p><strong>Âge:</strong> {profile.age} ans</p>}
        {profile.location && <p><strong>Localisation:</strong> {profile.location}</p>}

        {profile.bio && (
          <>
            <div className="section-divider" style={{ borderColor: '#444' }}></div>
            <p><strong>Description:</strong></p>
            <p>{profile.bio}</p>
          </>
        )}
      </div>
    </div>
  );
}
