import React from 'react';
import '/src/assets/FounderMessages/FounderImage.css';
import founderImg from '/src/assets/FounderMessages/Raghesh_Pooja.jpg';
import message from '/src/assets/FounderMessages/founder_message.jpg';

const FounderMessage = () => {
    return (
        <>
            <div className="relative w-full h-96 overflow-hidden">
                <img
                    src={message}
                    alt="Founder Message"
                    className="object-cover w-full h-full"
                />
            </div>

            <section className="founder-section">
                <div className="founder-title-box">
                    <h2>Founder Messages</h2>
                    <div className="underline" />
                </div>

                <div className="founder-content">
                    <div className="founder-image">
                        <img src={founderImg} alt="Founders" />
                        <p className="founder-names">Dr. Raghesh G Nair & Dr. Pooja Jha Nair</p>
                    </div>

                    <div className="founder-text">
                        <p>
                            Welcome to the world of passionate and professional approach to manage learning issues of children
                            with developmental disorders. Total Solution is group of committed people who are chasing the dream
                            of providing learning opportunity to all children of our society. Come and join our journey, as we
                            all together can contribute to build our nation by making each child a productive citizen of our
                            country.
                        </p>
                        <p>
                        We are providing holistic services at nine different locations in Hyderabad – Bowenpally, Barkatpura, 
                        Kukatpally, Suchitra, Banjara Hills, Manikonda, Nacharam, Neredmet and Champapet, with a total of 9 branches 
                        and 1 special education center. A model of intervention programs has been implemented at each premise to maintain 
                        the quality of services.
                        </p>
                        <div className="founder-signature">
                            <p>Dr. Pooja Jha Nair & Dr. Raghesh G Nair</p>
                            <p>Founder partners</p>
                            <p>Total Solution</p>
                        </div>
                    </div>
                </div>
            </section>
        </>
    );
};

export default FounderMessage;
