import React from 'react';
import './Rewards.css'; 

function Rewards() {
    return (
        <div className="container">
            <header>
                <div className="header-left">
                    <h1>Rewards & Recognition</h1>
                    <p>Earn points through battles and redeem exclusive rewards</p>
                </div>
                <div className="header-right">
                    
                </div>
            </header>

            <main>
                <div className="main-content">
                    <section className="your-arena-points card">
                        <h2>Your Arena Points</h2>
                        <p className="points">1,847 <span>points</span></p>
                        
                    </section>

                    <section className="available-rewards">
                        <h2>Available Rewards</h2>
                        <div className="rewards-grid">
                            <div className="reward-card card">
                                <div className="reward-icon">🎁</div>
                                <h3>Amazon Gift Cards</h3>
                                <p>Redeem your points for Amazon gift cards ranging from $10 to $500</p>
                                <p className="cost">1,000 points</p>
                                <button className="redeem-btn">Redeem</button>
                            </div>

                            <div className="reward-card card">
                                <div className="reward-icon">🛠️</div>
                                <h3>Premium Coding Tools</h3>
                                <p>Access to premium IDEs, GitHub Copilot, and other development tools</p>
                                <p className="cost">2,500 points</p>
                                <button className="more-info-btn">Need More Points</button>
                            </div>

                            <div className="reward-card card">
                                <div className="reward-icon">💼</div>
                                <h3>Tech Internships</h3>
                                <p>Exclusive internship opportunities at top tech companies</p>
                                <p className="cost">5,000 points</p>
                                <button className="more-info-btn">Need More Points</button>
                            </div>

                            <div className="reward-card card">
                                <div className="reward-icon">🏆</div>
                                <h3>Hackathon Entries</h3>
                                <p>Free entries to premium hackathons and coding competitions</p>
                                <p className="cost">1,500 points</p>
                                <button className="redeem-btn">Redeem</button>
                            </div>

                            <div className="reward-card card coming-soon">
                                <div className="reward-icon">📚</div>
                                <h3>Course Subscriptions</h3>
                                <p>Premium access to coding courses and learning platforms</p>
                                <p className="cost">3,000 points</p>
                                <button className="coming-soon-btn">Coming Soon</button>
                            </div>

                            <div className="reward-card card coming-soon">
                                <div className="reward-icon">⚡</div>
                                <h3>Hardware Prizes</h3>
                                <p>Gaming keyboards, monitors, and other tech hardware</p>
                                <p className="cost">7,500 points</p>
                                <button className="coming-soon-btn">Coming Soon</button>
                            </div>
                        </div>
                    </section>
                </div>

                <aside className="sidebar">
                    <section className="progress-path card">
                        <h2>Progress Path</h2>
                        <div className="master-rank">
                            <p>Master Rank <span>23%</span></p>
                            <div className="progress-bar">
                                <div className="progress-fill" style={{ width: '23%' }}></div> 
                            </div>
                            <p>1153 points to Master</p>
                        </div>
                        <ul>
                            <li>Novice ✅<span>0 points</span></li>
                            <li>Warrior ✅<span>500 points</span></li>
                            <li>Expert ✅ <span>1,000 points</span></li>
                            <li>Master <span>3,000 points</span></li>
                            <li>Grandmaster <span>5,000 points</span></li>
                        </ul>
                    </section>

                    <section className="earn-points card">
                        <h2>Earn Points</h2>
                        <ul>
                            Not Yet Decided
                        </ul>
                    </section>

                    <section className="recent-redeems card">
                        <h2>Recent Redeems</h2>
                        <ul>
                            None
                        </ul>
                    </section>
                </aside>
            </main>
        </div>
    );
}

export default Rewards;