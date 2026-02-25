import React, { useState, useEffect } from 'react';
import './Profile.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faUser , faTrophy, faBullseye, faBolt, faCode, faChartBar, faStar } from '@fortawesome/free-solid-svg-icons'; // Added faChartBar, faStar
import Rapid from './Rapid.png';
import Nutcracker from './Nutcracker.png';
import { useAuth } from '../../contexts/AuthContext';
import { fetchUserProfile } from '../../services/api';


function Profile() {
    const { user } = useAuth();
    const displayName = user?.displayName || user?.email || "Player";
    const photoURL = user?.photoURL;

    const [profile, setProfile] = useState(null);

    useEffect(() => {
        if (user?.uid) {
            fetchUserProfile(user.uid)
                .then(data => { if (data) setProfile(data); })
                .catch(err => console.error("Failed to fetch profile:", err));
        }
    }, [user]);

    const rating = profile?.rating ?? 1200;
    const matchesPlayed = profile?.matchesPlayed ?? 0;
    const matchesWon = profile?.matchesWon ?? 0;
    const winRate = matchesPlayed > 0 ? Math.round((matchesWon / matchesPlayed) * 100) : 0;

    return (
        <div className="profile-container">
            <main className="main-content">
                <div className="left-column"> 
                    <section className="profile-hero card">
                        <div className="profile-header">
                            <div className="profile-info">
                                <div className="profile-name-wrapper">
                                    {photoURL ? (
                                        <img src={photoURL} alt="avatar" style={{ width: 40, height: 40, borderRadius: "50%", marginRight: 10 }} />
                                    ) : (
                                        <FontAwesomeIcon icon={faUser } className="profile-icon" />
                                    )}
                                    <h1 className="profile-name">{displayName}</h1>
                                </div>
                                <p className="profile-email" style={{ color: "#aaa", fontSize: "0.9rem" }}>
                                    {user?.email || ""}
                                </p>
                                <p className="profile-quote">
                                    Ready to take on the next coding challenge!
                                </p>
                                <ul className="skills-list">
                                    <li className="skill-item">JavaScript</li>
                                    <li className="skill-item">React</li>
                                    <li className="skill-item">Node.js</li>
                                    <li className="skill-item">C++</li>
                                    <li className="skill-item">Python</li>
                                </ul>
                            </div>
                        </div>
                    </section>

                    
                    <section className="battle-history-section card">
                        <div className="section-header">
                            <h2 className="section-title">
                                <FontAwesomeIcon icon={faCode} className="title-icon" />
                                Battle History
                            </h2>
                            <p className="section-subtitle">Track your coding conquests</p>
                        </div>

                        <div className="stats-grid">
                            
                            <div className="stat-card cr">
                                <div className="stat-icon-wrapper">
                                    <FontAwesomeIcon icon={faTrophy} className="stat-icon" />
                                </div>
                                <div className="stat-content">
                                    <h3 className="stat-value">{rating}</h3>
                                    <p className="stat-label">Rating</p>
                                    <div className="stat-progress">
                                        <div className="progress-bar">
                                            <div className="progress-fill rank-fill" style={{ width: `${Math.min(100, (rating / 2400) * 100)}%` }}></div>
                                        </div>
                                    </div>
                                </div>
                            </div>

                            
                            <div className="stat-card bw">
                                <div className="stat-icon-wrapper">
                                    <FontAwesomeIcon icon={faBullseye} className="stat-icon" />
                                </div>
                                <div className="stat-content">
                                    <h3 className="stat-value">{matchesWon}</h3>
                                    <p className="stat-label">Battles Won</p>
                                    <div className="stat-progress">
                                        <div className="progress-bar">
                                            <div className="progress-fill wins-fill" style={{ width: `${matchesPlayed > 0 ? (matchesWon / matchesPlayed) * 100 : 0}%` }}></div>
                                        </div>
                                    </div>
                                </div>
                            </div>

                            
                            <div className="stat-card wr">
                                <div className="stat-icon-wrapper">
                                    <FontAwesomeIcon icon={faBolt} className="stat-icon" />
                                </div>
                                <div className="stat-content">
                                    <h3 className="stat-value">{winRate}%</h3>
                                    <p className="stat-label">Win Rate</p>
                                    <div className="stat-progress">
                                        <div className="progress-bar">
                                            <div className="progress-fill rate-fill" style={{ width: `${winRate}%` }}></div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </section>
                </div> 

                
                <div className="right-column">
                    <section className="progress-section card">
                        <div className="section-header">
                            <h2 className="section-title">
                                <FontAwesomeIcon icon={faChartBar} className="title-icon" />
                                Your Progress
                            </h2>
                            <p className="section-subtitle">Keep pushing your limits!</p>
                        </div>

                        <div className="progress-items">
                            <div className="progress-item">
                                <div className="progress-item-header">
                                    <h4 className="progress-item-title">Total Battles</h4>
                                    <span className="progress-item-value">{matchesPlayed}</span>
                                </div>
                                <div className="progress-bar-lg">
                                    <div className="progress-fill total-challenges-fill" style={{ width: `${Math.min(100, matchesPlayed * 2)}%` }}></div>
                                </div>
                            </div>

                            <div className="progress-item">
                                <div className="progress-item-header">
                                    <h4 className="progress-item-title">Battles Won</h4>
                                    <span className="progress-item-value">{matchesWon}</span>
                                </div>
                                <div className="progress-bar-lg">
                                    <div className="progress-fill skill-mastery-fill" style={{ width: `${matchesPlayed > 0 ? (matchesWon / matchesPlayed) * 100 : 0}%` }}></div>
                                </div>
                            </div>

                            <div className="progress-item">
                                <div className="progress-item-header">
                                    <h4 className="progress-item-title">Win Rate</h4>
                                    <span className="progress-item-value">{winRate}%</span>
                                </div>
                                <div className="progress-bar-lg">
                                    <div className="progress-fill next-rank-fill" style={{ width: `${winRate}%` }}></div>
                                </div>
                            </div>

                            <div className="progress-item">
                                <div className="progress-item-header">
                                    <h4 className="progress-item-title">Rating Progress</h4>
                                    <span className="progress-item-value">{rating} / 2400</span>
                                </div>
                                <div className="progress-bar-lg">
                                    <div className="progress-fill weekly-streak-fill" style={{ width: `${Math.min(100, (rating / 2400) * 100)}%` }}></div>
                                </div>
                            </div>
                            
                        </div>
                    </section>
                </div> 

                
                <section className="achievement-section">
                    <h2 className="achievement-heading">Achievements</h2>

                    <div className="achievement-container">
                        <div className="achievement-card">
                        <img src={Rapid} alt="Rapid Coder" className="achievement-icon" />
                        <h3 className="achievement-title">Rapid Coder</h3>
                        <p className="achievement-description">
                            Completed 10 coding challenges in 1 day.
                        </p>
                        <span className="achievement-rarity rare">Rare</span>
                        </div>

                        <div className="achievement-card">
                        <img src={Nutcracker} alt="Nut Cracker" className="achievement-icon" />
                        <h3 className="achievement-title">Good Coding Skills</h3>
                        <p className="achievement-description">
                            Most hard coding problems solved in a day.
                        </p>
                        <span className="achievement-rarity epic">Epic</span>
                        </div>
                    </div>
                </section>

            </main>
        </div>
    );
}

export default Profile;