import { useState } from 'react';
import HomePage from './HomePage';
import ServicesPage from './ServicesPage';
import MembershipsPage from './MembershipsPage';
import PackagesPage from './PackagesPage';
import BookingPage from './BookingPage';
import PortalPage from './PortalPage';
import RegistrationPage from './RegistrationPage';

function PatientApp() {
  const [page, setPage] = useState('home');

  const nav = [
    { key: 'home', label: 'Home' },
    { key: 'services', label: 'Our Services' },
    { key: 'memberships', label: 'Memberships' },
    { key: 'packages', label: 'Packages' },
    { key: 'book', label: 'Book Now' },
    { key: 'register', label: 'New Patient' },
    { key: 'portal', label: 'My Portal' },
  ];

  return (
    <div className="patient-app">
      <header className="patient-header">
        <h1 onClick={() => setPage('home')} style={{cursor:'pointer'}}>Shape The Wave Longevity&#8482;</h1>
        <nav className="patient-nav">
          {nav.map(n => (
            <button key={n.key} className={`patient-nav-btn${page === n.key ? ' active' : ''}`}
              onClick={() => setPage(n.key)}>{n.label}</button>
          ))}
        </nav>
      </header>
      <main className="patient-main">
        {page === 'home' && <HomePage onNavigate={setPage} />}
        {page === 'services' && <ServicesPage onNavigate={setPage} />}
        {page === 'memberships' && <MembershipsPage onNavigate={setPage} />}
        {page === 'packages' && <PackagesPage onNavigate={setPage} />}
        {page === 'book' && <BookingPage />}
        {page === 'register' && <RegistrationPage />}
        {page === 'portal' && <PortalPage />}
      </main>
      <footer className="patient-footer">
        <p>Shape The Wave Longevity&#8482; &mdash; Windsor Court Office Park, Gurnee, IL 60031</p>
        <p>847-625-8300 | shapethewave.com</p>
        <p>Optimize health. Align habits. Live longer, better.</p>
      </footer>
    </div>
  );
}
export default PatientApp;
