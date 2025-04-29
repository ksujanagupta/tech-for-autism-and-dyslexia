import React from 'react';
import '/src/assets/Services/services/Services.css';
import servicesmain from '/src/assets/Services/services/servicesmain.jpg';
import assessmentImg from '/src/assets/Services/services/assessment.jpg';
import occupationalImg from '/src/assets/Services/services/occupational.jpg';
import behaviourImg from '/src/assets/Services/services/behaviour.jpg';
import remedialImg from '/src/assets/Services/services/remedial.jpg';
import modificationImg from '/src/assets/Services/services/modification.jpg';
import speechImg from '/src/assets/Services/services/speech.jpg';

const services = [
    { name: "Assessment & Evaluation", image: assessmentImg, color: "#00b2e1" },
    { name: "Occupational Therapy", image: occupationalImg, color: "#ed1c24" },
    { name: "Behaviour Therapy", image: behaviourImg, color: "#8bc53f" },
    { name: "Remedial Therapy", image: remedialImg, color: "#fcee21" },
    { name: "Behaviour Modification", image: modificationImg, color: "#92278f" },
    { name: "Speech Therapy", image: speechImg, color: "#f7931e" },
];

const Services = () => {
    return (
        <>
            <div className="font-sans">
                <div className="relative w-full h-96 overflow-hidden">
                    <img
                        src={servicesmain}
                        alt="Header ADHD Mindmap"
                        className="object-cover w-full h-full"
                    />
                </div>
            </div>
            <section className="services-section">
                <h2 className="services-title">
                    Services
                    <div className="underline" />
                </h2>

                <p className="services-intro">
                    The organization was providing service to children and schools and certain NGOs in an informal way.
                    By the end of 2008, we started promoting the organization as a brand with integrated services, training,
                    therapeutics and advocacy as the main theme. Total Solution currently provides solutions through its
                    associate centers across Hyderabad, as given below.
                </p>

                <div className="services-grid">
                    {services.map((service, index) => (
                        <div className="service-card" key={index} style={{ backgroundColor: service.color }}>
                            <img src={service.image} alt={service.name} />
                            <h3>{service.name}</h3>
                        </div>
                    ))}
                </div>

                <p className="services-conclusion">
                    Apart from these divisions, Total Solution provides consultations, assessments and evaluations and
                    home based therapy programs. In order to keep up with the changing times, we conduct 'Continuing
                    Learning Education' programs to update already trained personnel.
                    <br /><br />
                    As the saying goes, 'A journey of thousand miles starts with a single step'. We have started the first
                    step and we realize that there are miles to go. We are a learning organization and believe in catering
                    to the emerging needs of the field from time to time.
                </p>
            </section>
        </>
    );
};

export default Services;
