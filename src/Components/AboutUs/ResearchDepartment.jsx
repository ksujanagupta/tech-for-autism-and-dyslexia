import React from 'react';
import '/src/assets/research/ResearchDepartment.css';
import whoweare from '/src/assets/WhoAreWe/who_we_are.jpg';

import gayathriImg from '/src/assets/research/gayathri.jpg';
import blank from '/src/assets/research/blank-profile.webp';

const team = [
    {
        name: 'Mrs. GVN Gayathri',
        title: 'Research Head',
        image: gayathriImg,
    },
    {
        name: 'Ms. Khersingh Komal',
        title: 'Research Assistant',
        image: blank,
    },
    {
        name: 'Mrs. Ashwathy R',
        title: 'Research Assistant',
        image: blank,
    },
];

const ResearchDepartment = () => {
    return (
        <>
            <div className="font-sans">
                            <div className="relative w-full h-96 overflow-hidden">
                                <img
                                    src={whoweare}
                                    alt="Header ADHD Mindmap"
                                    className="object-cover w-full h-full"
                                />
                            </div>
                        </div>
            <section className="research-department">
                <h2 className="research-title">
                    Research Department
                    <div className="underline" />
                </h2>

                <div className="research-description">
                    <p>
                        Total solution is committed to practice scientific research-based practices. In order to scientifically test our own developed strategies and to statistically validate our own findings, we have a research wing. At present, the following research projects are in progress:
                    </p>
                    <ol>
                        <li>1. Cognitive profile of children with Specific Learning Disorder</li>
                        <li>2. Impact of Math Module on curriculum-based math performance</li>
                        <li>3. Impact of parental involvement in behaviour therapy on overall development of children with ASD.</li>
                    </ol>
                </div>

                <div className="research-team">
                    {team.map((member, index) => (
                        <div className="team-member" key={index}>
                            <img src={member.image} alt={member.name} />
                            <h3>{member.name}</h3>
                            <p>({member.title})</p>
                        </div>
                    ))}
                </div>
            </section>
        </>
    );
};

export default ResearchDepartment;
