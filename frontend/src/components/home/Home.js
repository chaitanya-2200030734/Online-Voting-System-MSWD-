import React, { useEffect, useState } from 'react';
import styled from 'styled-components'

const Home = () => {
    const [userData , setUserData] = useState({});



    const loadData = async(e)=>{
        const res =await fetch('/home' , { 
            method: 'GET',
            headers:{
                Accept: 'application/json',
                'Content-Type': 'application/json',


            },
            credentials:"include"
        })
        .then((data)=>data.json()).then((d)=>setUserData(d))
    }

    useEffect(()=>{
        loadData();
    },[])
  return (
      <>
      
       <Welcome>
                <div className="main" > ONLINE VOTING SYSTEM</div>
                                               
        </Welcome>
           
            
      <Container>
           
            
            <LiveFeed>
                
                <Stats>
                    
                <Total>
                <h1>LIVE STATS</h1>
                <h1 style={{color:'blue'}}>{userData.total}</h1>
                </Total>
                <PartyWise>
                
                <Grid>
                  
                    <div className="party">
                        <h1>BJP</h1>
                        <img src="Bjp.jpeg" alt="" />
                        <h2>{userData.bjp}</h2>
                    </div>
                    <div className="party">
                    <h1>AAP</h1>
                        <img src="aap.png" alt="" className="aap"/>
                        <h2>{userData.aap}</h2>
                    </div>
                    <div className="party">
                    <h1>Congress</h1>
                        <img src="congress.png" alt="" />
                        <h2>{userData.congress}</h2>
                    </div>
                    <div className="party">
                    <h1>National Congress Party</h1>
                        <img src="inc.png" alt="" />
                        <h2>{userData.ncp}</h2>
                    </div>
                    <div className="party">
                    <h1>Indian National Lok Dal</h1>
                        <img src="inld.png" alt="" className="aap"/>
                        <h2>{userData.inld}</h2>
                    </div>
                    <div className="party">
                    <h1>JANA SENA PARTY</h1>
                        <img src="janasena.png" alt="" className="aap"/>
                        <h2>{userData.inld}</h2>
                    </div>
                </Grid>
                </PartyWise>
                </Stats>

            </LiveFeed>
      </Container>
     
      </>
  );
};

export default Home;
const Grid= styled.div`
display:grid;
grid-template-columns:repeat(6,15%);
div{
    box-shadow:1px 2px 5px black;
    height:50vh;
}

@media all and (max-width:1157px){
    grid-template-columns:repeat(2,50%);

}
@media all and (max-width:833px){
    grid-template-columns:1fr;

}

@media all and (max-width:395px){

    .aap{
        width:8rem;
    }
}

`
const PartyWise = styled.div`
width:110%;
height:50%;
display:flex;
flex-direction:column;
justify-content:right;
align-items:right;
padding:4rem;

.partyWise{
    height:10vh;
    @media all and (max-width:500px){
        font-size:1.4rem;
    }
}
div{
    margin:1rem;
    overflow:hidden;
    text-align:center;
   
    padding:2rem;
    h1{
        height:40%;
        
        font-size:1.3rem;
        
    }
    img{
        margin-top:2rem;
        height:20%;
       
        
    }
    h2{
        
        height:40%;
    }
}

@media all and (max-width:537px){
    padding:0rem;

}



`
const Total = styled.div`

display:flex;
flex-direction:column;
justify-content:center;
align-items:center;
text-align:center;
@media all and (max-width:)
`
  const Container = styled.div``
  const Welcome = styled.div`
  height:20vh;
background:rgba(0,0,0,0);
width:100%;


 text-align:center;
 grid-template-rows:80% 50%;


 .main {
    height: 10rem;
    font-size: 5rem;
    display: flex;
    justify-content: center;
    align-items: center;
    background-color: white;
     /* Add this line to remove the scroll bar */
    
    @media all and (max-width: 737px) {
        font-size: 5rem;
    }
    @media all and (max-width: 650px) {
        font-size: 3rem;
    }
    @media all and (max-width: 553px) {
        font-size: 2.6rem;
    }
}
 
    



`
const LiveFeed = styled.div``



const Stats = styled.div``
