import React, { useEffect, useState } from 'react';
import styled from 'styled-components';

const Home = () => {
  const [userData, setUserData] = useState({});
  const [timer, setTimer] = useState(5 * 3600); // 5 hours in seconds
  const [isTimerCompleted, setIsTimerCompleted] = useState(false); // Track if the countdown has ended

  const loadData = async () => {
    try {
      const response = await fetch('/home', {
        method: 'GET',
        headers: {
          Accept: 'application/json',
          'Content-Type': 'application/json',
        },
        credentials: 'include',
      });

      if (response.ok) {
        const data = await response.json();
        setUserData(data);
      } else {
        console.error('Failed to fetch data');
      }
    } catch (error) {
      console.error('Error fetching data:', error);
    }
  };

  useEffect(() => {
    // Timer logic
    const countdownInterval = setInterval(() => {
      setTimer((prevTimer) => (prevTimer > 0 ? prevTimer - 1 : 0));
    }, 1000);

    return () => clearInterval(countdownInterval);
  }, []);

  const formatTime = (totalSeconds) => {
    const hours = Math.floor(totalSeconds / 3600);
    const minutes = Math.floor((totalSeconds % 3600) / 60);
    const seconds = totalSeconds % 60;

    return `${hours.toString().padStart(2, '0')}:${minutes.toString().padStart(2, '0')}:${seconds.toString().padStart(2, '0')}`;
  };

  return (
    <>
      <Welcome>
        <div className="main">ONLINE VOTING SYSTEM</div>
      </Welcome>

      <Container>
        
          <Total>
            <h1>LIVE STATS</h1>
            <center>
              <div className="timer">Time Remaining: {formatTime(timer)}</div> {/* Display the timer */}
            </center>
          </Total>
        

        {isTimerCompleted && (
          <PartyWise>
            <Grid>
              <div className="party">
                <h1>BJP</h1>
                <img src="Bjp.jpeg" alt="" />
                <h2>{userData.bjp || 'N/A'}</h2>
              </div>
              <div className="party">
                <h1>NOTA</h1>
                <img src="nota.png" alt="" />
                <h2>{userData.nota || 'N/A'}</h2>
              </div>
              <div className="party">
                <h1>Congress</h1>
                <img src="congress.png" alt="" />
                <h2>{userData.congress || 'N/A'}</h2>
              </div>
              <div class="party">
                <h1>National Congress Party</h1>
                <img src="inc.png" alt="" />
                <h2>{userData.ncp || 'N/A'}</h2>
              </div>
              <div class="party">
                <h1>Indian National Lok Dal</h1>
                <img src="inld.png" alt="" />
                <h2>{userData.inld || 'N/A'}</h2>
              </div>
              <div class="party">
                <h1>JANA SENA PARTY</h1>
                <img src="janasena.png" alt="" />
                <h2>{userData.janasena || 'N/A'}</h2>
              </div>
            </Grid>
          </PartyWise>
        )}
      </Container>
    </>
  );
};

export default Home;

// Styled components
const Welcome = styled.div`
  height: 20vh;
  display: flex;
  justify-content: center;
  align-items: center; // Center vertically and horizontally
  text-align: center;
  .main {
    font-size: 5rem;
    background-color: white;
    @media (max-width: 737px) {
      font-size: 3.5rem;
    }
    @media (max-width: 650px) {
      font-size: 3rem;
    }
    @media (max-width: 553px) {
      font-size: 2.6rem;
    }
  }
`;

const Total = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
`;

const Container = styled.div`
  height: 79vh;
  display: flex;
  justify-content: center;
  align-items: center;
`;

const PartyWise = styled.div`
  width: 110%;
  height: 50%;
  display: flex;
  flex-direction: column;
  justify-content: flex-end;
  align-items: flex-end;
  padding: 4rem;

  div {
    margin: 1rem;
    overflow: hidden;
    text-align: center;
    padding: 2rem;
    h1 {
      font-size: 1.3rem;
    }
    img {
      height: 20%;
    }
    h2 {
      height: 40%;
    }
  }
`;

const Grid = styled.div`
  display: grid;
  grid-template-columns: repeat(6, 15%);
  div {
    box-shadow: 1px 2px 5px black;
    height: 50vh;
  }
  @media (max-width: 1157px) {
    grid-template-columns: repeat(2, 50%);
  }
  @media (max-width: 833px) {
    grid-template-columns: 1fr;
  }
  @media (max-width: 395px) {
    .aap {
      width: 8rem;
    }
  }
`;
