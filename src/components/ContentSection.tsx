

export default function ContentSection() {
  return (
    <div className="font-sans relative z-50 overflow-x-hidden" style={{ background: '#000', color: '#fff' }}>
      
      {/* Section 1: Intro (alt) */}
      <section className="content-sec alt" id="platform">
        <div className="wrap">
          <div className="head rv">
            <span className="tag">Bridging the Gap Between Learning and Employability</span>
            <h2>Students need more than course completion.</h2>
            <p>Traditional learning platforms often focus on delivering course content. Vabsgen is designed to help colleges go beyond that by connecting learning, skill development, assessments, and placement preparation in one platform.</p>
          </div>
          <div className="g g4">
            <div className="card rv">
              <div className="ic">📚</div>
              <h3>Generic Learning</h3>
              <p>Students often follow the same learning path regardless of their individual skills, interests, and goals.</p>
            </div>
            <div className="card rv" style={{ transitionDelay: '0.08s' }}>
              <div className="ic">🧭</div>
              <h3>Limited Career Guidance</h3>
              <p>Students may struggle to understand what skills they need to develop for their desired career path.</p>
            </div>
            <div className="card rv" style={{ transitionDelay: '0.16s' }}>
              <div className="ic">📉</div>
              <h3>Difficult Progress Tracking</h3>
              <p>Colleges need better visibility into student learning, assessment performance, and skill development.</p>
            </div>
            <div className="card rv" style={{ transitionDelay: '0.24s' }}>
              <div className="ic">💼</div>
              <h3>Placement Preparation</h3>
              <p>Students need continuous preparation and measurable skill development before entering placement processes.</p>
            </div>
          </div>
        </div>
      </section>

      {/* Section 2: The Vabsgen Platform */}
      <section className="content-sec">
        <div className="wrap">
          <div className="head c rv">
            <span className="tag">The Vabsgen Platform</span>
            <h2>One platform for learning, skills, and placement readiness.</h2>
            <p>Vabsgen brings together learning management, personalized learning experiences, AI-assisted guidance, assessments, and progress tracking to help colleges support students throughout their skill-development journey.</p>
          </div>
          <div className="g g3">
            <div className="card rv">
              <div className="ic">🎯</div>
              <h3>Personalized Learning</h3>
              <p>Learning experiences can be tailored around a student's progress, skills, and development needs.</p>
            </div>
            <div className="card rv" style={{ transitionDelay: '0.1s' }}>
              <div className="ic">🤖</div>
              <h3>AI-Assisted Guidance</h3>
              <p>AI helps students understand learning requirements, explore development areas, and receive contextual guidance.</p>
            </div>
            <div className="card rv" style={{ transitionDelay: '0.2s' }}>
              <div className="ic">📈</div>
              <h3>Measurable Progress</h3>
              <p>Assessments and progress tracking help students and institutions understand learning outcomes and areas for improvement.</p>
            </div>
          </div>
        </div>
      </section>

      {/* Section 3: Platform Features (alt) */}
      <section className="content-sec alt" id="features">
        <div className="wrap">
          <div className="head c rv">
            <span className="tag">Platform Features</span>
            <h2>Everything students need to keep learning and improving.</h2>
          </div>
          <div className="g g3">
            <div className="card rv">
              <div className="ic">🎯</div>
              <h3>Personalized Learning</h3>
              <p>Help students follow learning paths that align with their current abilities, goals, and skill-development needs.</p>
            </div>
            <div className="card rv" style={{ transitionDelay: '0.08s' }}>
              <div className="ic">🤖</div>
              <h3>AI-Assisted Guidance</h3>
              <p>Provide students with AI-assisted support to navigate learning, understand concepts, identify development areas, and make better learning decisions.</p>
            </div>
            <div className="card rv" style={{ transitionDelay: '0.16s' }}>
              <div className="ic">📝</div>
              <h3>Assessments</h3>
              <p>Evaluate student understanding and skills through structured assessments and performance tracking.</p>
            </div>
            <div className="card rv">
              <div className="ic">📊</div>
              <h3>Progress Tracking</h3>
              <p>Give students visibility into their learning progress while helping colleges understand student development.</p>
            </div>
            <div className="card rv" style={{ transitionDelay: '0.08s' }}>
              <div className="ic">🛠️</div>
              <h3>Skill Development</h3>
              <p>Help students identify and develop the skills needed for their academic and career goals.</p>
            </div>
            <div className="card rv" style={{ transitionDelay: '0.16s' }}>
              <div className="ic">🚀</div>
              <h3>Placement Readiness</h3>
              <p>Support continuous preparation for placements by connecting learning and skill development with career readiness.</p>
            </div>
          </div>
        </div>
      </section>

      {/* Section 4: AI Section */}
      <section className="content-sec ai-sec">
        <div className="wrap">
          <div className="head rv">
            <span className="tag">Intelligence Built Into Learning</span>
            <h2>AI that helps students learn with more direction.</h2>
            <p>Vabsgen uses AI to make the learning experience more personalized and supportive. Instead of treating every student the same, the platform is designed to provide AI-assisted guidance based on learning progress, assessments, skills, and development goals.</p>
          </div>
          <div className="g g4">
            <div className="card rv">
              <div className="num">1</div>
              <h3>AI-Assisted Learning Guidance</h3>
              <p>Help students navigate what they should learn and where they can improve.</p>
            </div>
            <div className="card rv" style={{ transitionDelay: '0.08s' }}>
              <div className="num">2</div>
              <h3>Personalized Recommendations</h3>
              <p>Provide learning recommendations based on individual progress and development needs.</p>
            </div>
            <div className="card rv" style={{ transitionDelay: '0.16s' }}>
              <div className="num">3</div>
              <h3>Learning Support</h3>
              <p>Give students AI-assisted support throughout their learning journey.</p>
            </div>
            <div className="card rv" style={{ transitionDelay: '0.24s' }}>
              <div className="num">4</div>
              <h3>Progress-Aware Guidance</h3>
              <p>Use learning and assessment progress to provide more relevant guidance.</p>
            </div>
          </div>
        </div>
      </section>

      {/* Section 5: For Colleges */}
      <section className="content-sec" id="colleges">
        <div className="wrap two">
          <div className="rv in">
            <span className="tag">For Colleges</span>
            <h2>Give your students a structured path from learning to placement readiness.</h2>
            <p style={{ color: "var(--mute)", marginTop: "16px" }}>Vabsgen helps colleges create a centralized environment for student learning, skill development, assessments, and placement preparation.</p>
          </div>
          <div className="list">
            <div className="item rv"><i>✓</i><div><h3>Centralized Learning</h3><p>Organize learning resources and development activities in one platform.</p></div></div>
            <div className="item rv"><i>✓</i><div><h3>Student Development</h3><p>Support students throughout their skill-development journey.</p></div></div>
            <div className="item rv"><i>✓</i><div><h3>Assessment & Performance</h3><p>Track assessment outcomes and identify areas where students need additional support.</p></div></div>
            <div className="item rv"><i>✓</i><div><h3>Placement Readiness</h3><p>Help students continuously prepare for career opportunities instead of waiting until placement season.</p></div></div>
            <div className="item rv"><i>✓</i><div><h3>Student Progress Visibility</h3><p>Provide a clearer view of student learning and development progress.</p></div></div>
          </div>
        </div>
      </section>

      {/* Section 6: For Students */}
      <section className="content-sec alt" id="students">
        <div className="wrap two">
          <div className="rv in">
            <span className="tag">For Students</span>
            <h2>Learn what matters. Build the skills that move your career forward.</h2>
            <p style={{ color: "var(--mute)", marginTop: "16px" }}>Vabsgen gives students a structured learning experience focused on skill development and placement readiness, supported by personalized learning and AI-assisted guidance.</p>
          </div>
          <div className="list">
            <div className="item rv"><i>✓</i><div><h3>Learn at Your Pace</h3><p>Follow learning experiences based on your individual progress.</p></div></div>
            <div className="item rv"><i>✓</i><div><h3>Understand Your Skills</h3><p>Identify areas where you are strong and where you need improvement.</p></div></div>
            <div className="item rv"><i>✓</i><div><h3>Get AI-Assisted Guidance</h3><p>Receive intelligent support throughout your learning journey.</p></div></div>
            <div className="item rv"><i>✓</i><div><h3>Track Your Progress</h3><p>See how your learning and assessment performance develops over time.</p></div></div>
            <div className="item rv"><i>✓</i><div><h3>Prepare for Your Career</h3><p>Build relevant skills and improve your placement readiness.</p></div></div>
          </div>
        </div>
      </section>

      {/* Section 7: How Vabsgen Works */}
      <section className="content-sec" id="how">
        <div className="wrap">
          <div className="head c rv">
            <span className="tag">How Vabsgen Works</span>
            <h2>A continuous journey from learning to career readiness.</h2>
          </div>
          <div className="steps">
            <div className="step rv"><div className="dot">01</div><h3>Assess</h3><p>Understand the student's current knowledge, skills, and development areas.</p><small>Phase 1 of 6</small></div>
            <div className="step rv" style={{ transitionDelay: '0.08s' }}><div className="dot">02</div><h3>Personalize</h3><p>Create a more relevant learning experience based on individual needs and progress.</p><small>Phase 2 of 6</small></div>
            <div className="step rv" style={{ transitionDelay: '0.16s' }}><div className="dot">03</div><h3>Learn</h3><p>Students access structured learning content and develop relevant skills.</p><small>Phase 3 of 6</small></div>
            <div className="step rv" style={{ transitionDelay: '0.24s' }}><div className="dot">04</div><h3>Improve</h3><p>AI-assisted guidance and assessments help students identify areas for improvement.</p><small>Phase 4 of 6</small></div>
            <div className="step rv" style={{ transitionDelay: '0.32s' }}><div className="dot">05</div><h3>Track</h3><p>Monitor learning and assessment progress over time.</p><small>Phase 5 of 6</small></div>
            <div className="step rv" style={{ transitionDelay: '0.4s' }}><div className="dot">06</div><h3>Prepare</h3><p>Build the skills and confidence needed for placement and career opportunities.</p><small>Phase 6 of 6</small></div>
          </div>
        </div>
      </section>

      {/* Section 8: Roadmap */}
      <section className="content-sec alt" id="roadmap">
        <div className="wrap">
          <div className="head c rv">
            <span className="tag">Roadmap</span>
            <h2>Building the Future of College Learning</h2>
            <p>Our platform is evolving with the needs of students and institutions.</p>
          </div>
          <div className="g g3 rm">
            <div className="card rv">
              <span className="badge">In Development</span>
              <h3 style={{ marginTop: 0 }}>Phase 1: Core LMS</h3>
              <ul><li>Learning management</li><li>Course delivery</li><li>Student learning</li><li>Assessments</li><li>Progress tracking</li></ul>
            </div>
            <div className="card rv" style={{ transitionDelay: '0.1s' }}>
              <h3 style={{ marginTop: 0 }}>Phase 2: AI-Powered Learning</h3>
              <ul><li>Personalized learning</li><li>AI-assisted guidance</li><li>Intelligent recommendations</li><li>Student development insights</li></ul>
            </div>
            <div className="card rv" style={{ transitionDelay: '0.2s' }}>
              <h3 style={{ marginTop: 0 }}>Phase 3: Career & Placement Readiness</h3>
              <ul><li>Skill development</li><li>Career-focused learning</li><li>Placement preparation</li><li>Student readiness insights</li></ul>
            </div>
          </div>
        </div>
      </section>



      {/* Section 10: FAQ */}
      <section className="content-sec alt">
        <div className="wrap">
          <div className="head c rv">
            <span className="tag">FAQ</span>
            <h2>Frequently Asked Questions</h2>
          </div>
          <div className="faq rv">
            <details><summary>What is Vabsgen?</summary><p>Vabsgen is an AI-powered LMS being built for colleges and students, focused on placement readiness and skill development.</p></details>
            <details><summary>Who is Vabsgen for?</summary><p>Vabsgen is built for colleges that want to support student development, and for students who want a structured path to build skills and prepare for careers.</p></details>
            <details><summary>How does AI help students?</summary><p>AI provides guidance based on learning progress, assessments, skills, and development goals, helping students understand what to learn and where to improve.</p></details>
            <details><summary>Does Vabsgen provide assessments?</summary><p>Yes. Structured assessments and performance tracking help evaluate student understanding and skills.</p></details>
            <details><summary>Can students track their progress?</summary><p>Yes. Students can see how their learning and assessment performance develops over time, while colleges get a clearer view of student development.</p></details>
            <details><summary>Is Vabsgen available now?</summary><p>Not yet. We are currently building Vabsgen and working toward our initial product launch.</p></details>
            <details><summary>Can colleges participate in the early stage?</summary><p>Yes. Colleges interested in exploring the platform can contact us for early access and collaboration opportunities.</p></details>
          </div>
        </div>
      </section>

      {/* Section 11: Contact */}
      <section className="content-sec" id="contact">
        <div className="wrap">
          <div className="band rv">
            <h2>Be part of the next generation of college learning.</h2>
            <p>We are currently building Vabsgen and working toward our initial product launch. Colleges interested in exploring the platform can get in touch with us for early access and collaboration opportunities.</p>
            <a className="btn p" href="https://ailms.vabsgen.com/login">Get Early Access</a>
            <a className="mail" href="mailto:official@vabsgen.com">official@vabsgen.com</a>
          </div>
        </div>
      </section>

      {/* Section 12: About */}
      <section className="content-sec" id="about" style={{ paddingTop: 0 }}>
        <div className="wrap about">
          <div className="rv in">
            <span className="tag">About Vabsgen</span>
            <h2>Technology that helps institutions build better career outcomes.</h2>
            <p style={{ color: "var(--mute)", marginTop: "16px" }}>Vabsgen is building technology to help colleges and students improve learning, skill development, and placement readiness. Our AI-powered LMS brings learning, assessments, personalized guidance, and progress tracking together in one platform.</p>
            <p style={{ color: "var(--mute)", marginTop: "14px" }}>We believe technology should not only help students complete courses — it should help them understand what to learn, improve their skills, and become better prepared for their careers.</p>
          </div>
          <div className="biz rv" style={{ transitionDelay: '0.1s' }}>
            <h3>AI Automation & Business Solutions</h3>
            <p>In addition to our EdTech platform, Vabsgen develops AI-powered automation solutions for businesses, including workflow automation, API integrations, and custom AI systems.</p>
            <a className="btn" href="https://ailms.vabsgen.com/login">Explore Business Solutions</a>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="ft">
        <div className="wrap">
          <div className="fg">
            <div>
              <a className="logo" href="#home" style={{ display: "inline-flex", textDecoration: "none" }}>
                <img src="/logo.png" alt="Vabsgen Logo" style={{ height: "60px", width: "auto" }} />
              </a>
              <p style={{ marginTop: "16px", maxWidth: "360px", color: "var(--mute)" }}>Vabsgen is an AI-powered LMS built for colleges and students to improve placement readiness and skill development.</p>
            </div>
            <div>
              <h4>Navigation</h4>
              <ul>
                <li><a href="#platform">Platform</a></li>
                <li><a href="#features">Features</a></li>
                <li><a href="#how">How It Works</a></li>
                <li><a href="#roadmap">Roadmap</a></li>
                <li><a href="#contact">FAQs & Contact</a></li>
              </ul>
            </div>
            <div>
              <h4>Direct Contact</h4>
              <ul>
                <li><p style={{ color: "var(--mute)", margin: "0 0 4px" }}>Email:</p><a href="mailto:official@vabsgen.com" style={{ color: "#fff" }}>official@vabsgen.com</a></li>
              </ul>
            </div>
          </div>
          <div className="fb">
            <span>© 2026 Vabsgen. All rights reserved.</span>
            <div>
              <a href="#">Privacy Policy</a>
              <a href="#">Terms & Conditions</a>
              <a href="#">Refund Policy</a>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}
