import React from 'react';
import './About.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faUserNinja, faComments, faTerminal } from '@fortawesome/free-solid-svg-icons';
const About = () => {
  return (
    <div className="about-page-container">
      
      <section className="about-section">
        <h1 className="about-title">About <span className="highlight">AlgoFight</span></h1>
        <p className="about-description">
          Welcome to the ultimate competitive coding arena where developers fight for
          code glory, sharpen their skills, and build lasting connections in the programming
          community.
        </p>
      </section>

      
      <section className="mission-section">
        <h2 className="mission-title">Our <span className="highlight-purple">Mission</span></h2>
        <p className="mission-description">
          AlgoFight was born from the belief that competitive programming should be accessible, engaging, and
          rewarding for developers at all skill levels. We combine the thrill of real-time competition with
          comprehensive learning tools to create the ultimate coding battleground.
        </p>

        <div className="features-grid">
          
          <div className="feature-card">
            <div className="feature-icon">
              {/* idhar */}
              <i className="fas fa-trophy">
                <FontAwesomeIcon icon={faUserNinja} className="toggle-icon feature-icon"/>
                </i> 
            </div>
            <h3 className="feature-heading">Competitive Excellence</h3>
            <p className="feature-text">
              Providing a platform where coders can test their skills against
              challenging problems and compete with peers worldwide.
            </p>
          </div>

          
          <div className="feature-card">
            <div className="feature-icon">
              
              <i className="fas fa-bolt">
                <FontAwesomeIcon icon={faTerminal} className="toggle-icon feature-icon"/>
                </i> 
            </div>
            <h3 className="feature-heading">Real-time Battles</h3>
            <p className="feature-text">
              Creating an immersive coding
              experience with live competitions,
              instant feedback, and dynamic
              leaderboards.
            </p>
          </div>

          
          <div className="feature-card">
            <div className="feature-icon">
              
              <i className="fas fa-code">
                <FontAwesomeIcon icon={faUserNinja} className="toggle-icon feature-icon"/>
                </i> 
            </div>
            <h3 className="feature-heading">Skill Development</h3>
            <p className="feature-text">
              Helping developers improve their
              problem-solving abilities through
              practice, challenges, and detailed
              performance analytics.
            </p>
          </div>

          
          <div className="feature-card">
            <div className="feature-icon">
              
              <i className="fas fa-users">
                <FontAwesomeIcon icon={faComments} className="toggle-icon feature-icon"/>
                </i> 
            </div>
            <h3 className="feature-heading">Community Building</h3>
            <p className="feature-text">
              Fostering a vibrant community of
              developers who learn from each
              other and grow together in their
              coding journey.
            </p>
          </div>
        </div>
      </section>
      

      
      <section className="arena-stats-section">
        <h2 className="arena-stats-title">Arena Statistics</h2>
        <div className="stats-grid">
          <div className="stat-item">
            <span className="stat-number">50K+</span>
            <span className="stat-label">Active Coders</span>
          </div>
          <div className="stat-item">
            <span className="stat-number">2M+</span>
            <span className="stat-label">Problems Solved</span>
          </div>
          <div className="stat-item">
            <span className="stat-number">500K+</span>
            <span className="stat-label">Battles Fought</span>
          </div>
          <div className="stat-item">
            <span className="stat-number">120+</span>
            <span className="stat-label">Countries</span>
          </div>
        </div>
      </section>
      


      <section className="team-section">
        <h2 className="team-title">Meet the <span className="highlight">Team</span></h2>
        <p className="team-description">
          The passionate developers behind AlgoFight's success
        </p>

        <div className="team-members-grid">
          
          <div className="team-member-card">
            <div className="member-avatar-placeholder">
              <div className="circular-light-effect"></div>
            </div>
            <h3 className="member-name">Krish Dargar</h3>
            <p className="member-role">Design & Logic Specialist</p>
            <p className="member-bio">
              Passionate about creating intuitive user
              experiences and optimizing algorithmic
              solutions. Expert in system design and
              competitive programming.
            </p>
            <div className="member-skills">
              <span className="skill-tag">UI/UX Design</span>
              <span className="skill-tag">Algorithm Design</span>
              <span className="skill-tag">System Architecture</span>
              <span className="skill-tag">Problem Solving</span>
            </div>
            <div className="member-socials">
              <a href="#" className="social-link"><i className="fab fa-github"></i> GitHub</a>
              <a href="#" className="social-link"><i className="fab fa-linkedin"></i> LinkedIn</a>
              <a href="#" className="social-link"><i className="fas fa-envelope"></i> Email</a>
            </div>
          </div>

          
          <div className="team-member-card">
            <div className="member-avatar-placeholder">
              <div className="circular-light-effect"></div>
            </div>
            <h3 className="member-name">Arin Gupta</h3>
            <p className="member-role">Design & Logic Specialist</p>
            <p className="member-bio">
              Passionate about creating intuitive user
              experiences and optimizing algorithmic
              solutions. Expert in system design and
              competitive programming.
            </p>
            <div className="member-skills">
              <span className="skill-tag">UI/UX Design</span>
              <span className="skill-tag">Algorithm Design</span>
              <span className="skill-tag">System Architecture</span>
              <span className="skill-tag">Problem Solving</span>
            </div>
            <div className="member-socials">
              <a href="#" className="social-link"><i className="fab fa-github"></i> GitHub</a>
              <a href="#" className="social-link"><i className="fab fa-linkedin"></i> LinkedIn</a>
              <a href="#" className="social-link"><i className="fas fa-envelope"></i> Email</a>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default About;