import React from 'react';  
import RatingStars from "../RatingStars.jsx";
import profileDefault from "../../assets/images/profiledefaultphoto.png";

const ProfileHeader = ({ editableData, isEditing, handleChange, handleEditProfile, handleSaveProfile, isOwnProfile }) => {
  return (
    <div className="profile-header">
      <div className="profile-photo-container">
        <img
          src={editableData.fotoPerfil || profileDefault}
          alt="Foto de perfil"
          className="portfolio-photo"
        />
        {isEditing && isOwnProfile && (
          <button className="btn-edit-photo">Cambiar foto</button>
        )}
      </div>
      <div className="profile-info-header">
        {isEditing ? (
          <>
            <input type="text" name="nombre" value={editableData.nombre} onChange={handleChange} className="input-edit" />
            <input type="text" name="categoria" value={editableData.categoria || 'Profesional'} onChange={handleChange} className="input-edit" />
          </>
        ) : (
          <>
            <h1 className="profile-name">
              {`${editableData.nombre} ${editableData.apellido_paterno || ''} ${editableData.apellido_materno || ''}`.trim()}
            </h1>
            <p className="profile-role">{editableData.categoria || 'Profesional'}</p>
          </>
        )}

        <RatingStars rating={editableData.rating || 0} />

        <div className="profile-location-info">
          <p className="modalidad">Atiende en: {editableData.locacion || 'No disponible'}</p>
          <p className="profile-address">
            <strong>Dirección:</strong>{' '}
            {isEditing ? (
              <input
                type="text"
                name="direccion"
                value={editableData.direccion || ''}
                onChange={handleChange}
                className="input-edit"
              />
            ) : (
              editableData.direccion || 'No disponible'
            )}
          </p>
          <p className="profile-commune">
            <strong>Comuna:</strong>{' '}
            {isEditing ? (
              <input
                type="text"
                name="comuna"
                value={editableData.comuna || ''}
                onChange={handleChange}
                className="input-edit"
              />
            ) : (
              editableData.comuna || 'No disponible'
            )}
          </p>
          <p className="proxima-fecha">
            <strong>Próxima fecha disponible:</strong>{' '}
            {editableData.proxima_fecha
              ? new Date(editableData.proxima_fecha).toLocaleDateString('es-CL', {
                  weekday: 'long',
                  year: 'numeric',
                  month: 'long',
                  day: 'numeric'
                })
              : 'No disponible'}
          </p>
        </div>

        <div className="chip-container">
          <p className="chip">Horarios: Lu, Ma, Mi, Ju, Vi, Sá, Do</p>
          <br />
          <p className="chip">
            Sitio web:{' '}
            {editableData.sitio_web ? (
              <a href={editableData.sitio_web} target="_blank" rel="noopener noreferrer">
                {editableData.sitio_web}
              </a>
            ) : (
              'No disponible'
            )}
          </p>
        </div>

        {isOwnProfile && (
          <button className="btn-primary edit-btn" onClick={isEditing ? handleSaveProfile : handleEditProfile}>
            {isEditing ? 'Guardar Perfil' : 'Editar Perfil'}
          </button>
        )}
      </div>
    </div>
  );
};

export default ProfileHeader;
