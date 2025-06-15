import React from 'react';
import RatingStars from "../RatingStars.jsx";
import profileDefault from "../../assets/images/profiledefaultphoto.png";

const ProfileHeader = ({ editableData, isEditing, handleChange, handleEditProfile, handleSaveProfile }) => {
  return (
    <div className="profile-header">
      <div className="profile-photo-container">
        <img
          src={editableData.fotoPerfil || profileDefault}
          alt="Foto de perfil"
          className="portfolio-photo"
        />
        {isEditing && (
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
            <h1 className="profile-name">{editableData.nombre}</h1>
            <p className="profile-role">{editableData.categoria || 'Profesional'}</p>
          </>
        )}

        <RatingStars rating={editableData.rating || 0} />

        <div className="profile-location-info">
          <p className="modalidad">Atiende en: {editableData.locacion || 'No disponible'}</p>
          <p className="profile-address"><strong>Dirección:</strong> {isEditing ? <input type="text" name="direccion" value={editableData.direccion || ''} onChange={handleChange} className="input-edit" /> : editableData.direccion || 'No disponible'}</p>
          <p className="profile-commune"><strong>Comuna:</strong> {isEditing ? <input type="text" name="comuna" value={editableData.comuna || ''} onChange={handleChange} className="input-edit" /> : editableData.comuna || 'No disponible'}</p>
          <p className="proxima-fecha"><strong>Próxima fecha disponible:</strong> {isEditing ? <input type="text" name="proximaFecha" value={editableData.proximaFecha || ''} onChange={handleChange} className="input-edit" /> : editableData.proximaFecha || 'No disponible'}</p>
        </div>

        <div className="chip-container">
          <p className="chip">Horarios: Lu, Ma, Mi, Ju, Vi, Sá, Do</p>
          <br />
          <p className="chip">Sitio web: {editableData.sitioWeb || 'No disponible'}</p>
        </div>

        <button className="btn-primary edit-btn" onClick={isEditing ? handleSaveProfile : handleEditProfile}>
          {isEditing ? 'Guardar Perfil' : 'Editar Perfil'}
        </button>
      </div>
    </div>
  );
};

export default ProfileHeader;
