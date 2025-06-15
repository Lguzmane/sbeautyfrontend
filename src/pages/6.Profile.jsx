import React, { useContext, useEffect, useState } from 'react';
import { AuthContext } from '../context/AuthContext.jsx';
import { useNavigate, Link, useParams } from 'react-router-dom';
import agendaImg from '../assets/images/agenda.png';
import ProfileHeader from '../components/profile/ProfileHeader.jsx';
import Portfolio from '../components/profile/Portfolio.jsx';
import ProfessionalInfo from '../components/profile/ProfessionalInfo.jsx';
import Favorites from '../components/profile/Favorites.jsx';
import History from '../components/profile/History.jsx';
import ServiceCard from '../components/ServiceCard.jsx';

const Profile = () => {
  const { user } = useContext(AuthContext);
  const navigate = useNavigate();
  const { profileId } = useParams();
  const isOwnProfile = !profileId || profileId === String(user?.id);
  const isProvider = user?.rol === 'Profesional';
  const isClient = user?.rol === 'Cliente';

  const [isEditing, setIsEditing] = useState(false);
  const [editableData, setEditableData] = useState({});
  const [accordionOpen, setAccordionOpen] = useState({
    certificaciones: false,
    experiencia: false,
    condiciones: false,
    contacto: false
  });
  const [activeTab, setActiveTab] = useState('servicios');
  const [activeHistoryTab, setActiveHistoryTab] = useState('recibidos');

  useEffect(() => {
    if (!user) {
      navigate('/login');
    } else {
      setEditableData({
        ...user,
        servicios: user.servicios || [],
        favoritos: user.favoritos || [],
        historialRecibidos: user.historialRecibidos || [],
        historialRealizados: user.historialRealizados || []
      });
    }
  }, [user, navigate]);

  if (!user) return null;

  const handleEditProfile = () => setIsEditing(!isEditing);
  const handleChange = (e) => {
    setEditableData({ ...editableData, [e.target.name]: e.target.value });
  };
  const handleSaveProfile = () => {
    console.log('Perfil guardado (simulado):', editableData);
    setIsEditing(false);
  };
  const toggleAccordion = (key) => {
    setAccordionOpen({ ...accordionOpen, [key]: !accordionOpen[key] });
  };

  return (
    <section className="profile">
      <div className="profile-body-grid">
        {/* 🔹 COLUMNA IZQUIERDA */}
        <div className="profile-left-column">
          <ProfileHeader
            editableData={editableData}
            isEditing={isEditing}
            handleChange={handleChange}
            handleEditProfile={handleEditProfile}
            handleSaveProfile={handleSaveProfile}
          />

          {isProvider && isOwnProfile && (
            <>
              <Portfolio editableData={editableData} isEditing={isEditing} />
              <ProfessionalInfo
                editableData={editableData}
                isEditing={isEditing}
                handleChange={handleChange}
                accordionOpen={accordionOpen}
                toggleAccordion={toggleAccordion}
              />
            </>
          )}
        </div>

        {/* 🔹 COLUMNA DERECHA */}
        <div className="profile-right-column">
          <div className="profile-section services-section">
            {(isProvider && isOwnProfile) || (isClient && isOwnProfile) ? (
              <div className="tabs">
                {isProvider && (
                  <button className={activeTab === 'servicios' ? 'active' : ''} onClick={() => setActiveTab('servicios')}>
                    Mis Servicios
                  </button>
                )}
                <button className={activeTab === 'favoritos' ? 'active' : ''} onClick={() => setActiveTab('favoritos')}>
                  Favoritos
                </button>
                <button className={activeTab === 'historial' ? 'active' : ''} onClick={() => setActiveTab('historial')}>
                  Historial
                </button>
              </div>
            ) : null}

            <h2>
              {activeTab === 'servicios'
                ? 'Mis Servicios'
                : activeTab === 'favoritos'
                ? 'Mis Favoritos'
                : 'Historial'}
            </h2>

            {activeTab === 'servicios' && isProvider && isOwnProfile && (
              <>
                <div className="services-actions">
                  <Link to="/create-service">
                    <button className="btn-primary">+ Agregar Servicio</button>
                  </Link>
                </div>
                <div className="service-cards-container">
                  {Array.isArray(editableData.servicios) && editableData.servicios.length > 0 ? (
                    editableData.servicios.map((servicio, index) => (
                      <ServiceCard key={index} service={servicio} compact={true} />
                    ))
                  ) : (
                    Array(4).fill(null).map((_, index) => (
                      <div key={`empty-${index}`} className="service-card empty">
                        <p>Servicio no registrado</p>
                      </div>
                    ))
                  )}
                </div>
              </>
            )}

            {activeTab === 'favoritos' && (
              <Favorites favoritos={editableData.favoritos} />
            )}

            {activeTab === 'historial' && (
              <History
                historialRecibidos={editableData.historialRecibidos}
                historialRealizados={editableData.historialRealizados}
                activeHistoryTab={activeHistoryTab}
                setActiveHistoryTab={setActiveHistoryTab}
              />
            )}

            {isProvider && isOwnProfile && (
              <div className="agenda-highlight">
                <img src={agendaImg} alt="Agenda" className="agenda-image" />
                <div className="agenda-text">
                  <h3>¿Lista para tu próximo cambio de look?</h3>
                  <Link to="/schedule">
                    <button className="btn-agenda-destacada">Ver Agenda Completa</button>
                  </Link>
                </div>
              </div>
            )}

          </div>
        </div>
      </div>
    </section>
  );
};

export default Profile;
