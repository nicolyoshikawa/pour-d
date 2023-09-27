import './AboutUs.css';
import ericLinkedin from "../../assets/eric-linkedin.jpeg";
import hueyLinkedIn from "../../assets/huey-linkedin.jpeg";
import nicol from "../../assets/nicol-linkedin.jpg";

function AboutUs() {
  return (
    <div className="drinkDetailPage container">
        <div className="about-container">
            <h2>Meet the Team</h2>
            <div className="about">
                <div className="">
                    <div>
                        <div className="about-us-names">Eric Kinder</div>
                        <div className="linkedin-img">
                            <img src={ericLinkedin} alt={ericLinkedin} title={"ericlinkedin"} />
                        </div>
                        <div className="links">
                            <a href={"https://www.linkedin.com/in/eric-kinder-799097288/"} target="_blank" className="linkedin-git-links">
                                <i className="fa-brands fa-linkedin"></i>{" "}LinkedIn
                            </a>
                            <a href={"https://github.com/etkndr"} target="_blank" className="linkedin-git-links">
                                <i className="fa-brands fa-github"></i>{" "}GitHub
                            </a>
                        </div>
                    </div>
                </div>
                <div className="">
                    <div>
                        <div className="about-us-names">Nicol Yoshikawa</div>
                        <div className="linkedin-img">
                            <img src={nicol} alt={nicol} title={"nicol"} />
                        </div>
                        <div className="links">
                            <a href={"https://www.linkedin.com/in/nicol-yoshikawa/"} target="_blank" className="linkedin-git-links">
                                <i className="fa-brands fa-linkedin"></i>{" "}LinkedIn
                            </a>
                            <a href={"https://github.com/nicolyoshikawa"} target="_blank" className="linkedin-git-links">
                                <i className="fa-brands fa-github"></i>{" "}GitHub
                            </a>
                        </div>
                    </div>
                </div>
                <div className="">
                    <div>
                        <div className="about-us-names">Huey Nguyen</div>
                        <div className="linkedin-img">
                            <img src={hueyLinkedIn} alt={hueyLinkedIn} title={"hueyLinkedIn"} />
                        </div>
                        <div className="links">
                            <a href={"https://www.linkedin.com/in/huey-nguyen/"} target="_blank" className="linkedin-git-links">
                                <i className="fa-brands fa-linkedin"></i>{" "}LinkedIn
                            </a>
                            <a href={"https://github.com/Syndux"} target="_blank" className="linkedin-git-links">
                                <i className="fa-brands fa-github"></i>{" "}GitHub
                            </a>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
  );
}

export default AboutUs;
