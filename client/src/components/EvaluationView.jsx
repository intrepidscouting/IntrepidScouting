import React, {useState, useEffect} from 'react'
import './css/EvaluationView.css'
import viteLogo from '/vite.svg';
import { apiService } from "../services/apiService.js";
import ExportStyledPDF from './ExportStyledPDF.jsx';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faAdd, faStar } from '@fortawesome/free-solid-svg-icons';


const EvaluationView = ({player}) => {

    const [ratings, setRatings] = useState([{}]);
    const [linkList, setLinkList] = useState([]);
    const [isRate, setIsRate] = useState(false);
    const [err, setErr] = useState();
    const [link, setLink] = useState({url: '', title: ''});

    const fetchPlayerLinks = async () =>{
        try{
            const search = `/players/getlinks/${player._id}/`;
            var linkSearch = await apiService.get(search);
            setLinkList(linkSearch.Link);
            console.log(linkList);   
        }catch (e){
            console.log("Error loading links: " + e);
        }
    }  

    useEffect(() => {
        //Fetch all players from the database
          const fetchEvaluation = async () => {
            try {
              const query = `/evaluation/${player._id}/`;
              const data = await apiService.get(query);
              setRatings(data);
              setIsRate(true);
            } catch (e) {
              setErr("Failed to load evaluation: " + e);
              console.log(err);
            }
          };
          fetchEvaluation();
          fetchPlayerLinks();
        }, []);

              
    
        const formatDate = (isoDate) => {
            const date = new Date(isoDate);
            return date.toLocaleDateString();  // This will format the date according to the user's locale
        };

        const renderEvaluation = () => {
            return Object.entries(ratings).map(([key, value]) => {
                const header = key.replace(/_/g, " ");
                if(!(key.toUpperCase() === "PLAYER_ID" || key.toUpperCase() === "_ID" || key.toUpperCase() === "NOTE" )){
                    return (
                        <div key={key} className="noteView">
                            <span>{header}</span>
                            <div className="noteValue">
                                {value}
                            </div>
                        </div>
                    ); 
                }
                
            });
        }

         // Handle changes for input fields
        const handleInputChange = (e) => {
            const { name, value } = e.target;
            setLink((prevData) => ({
            ...prevData,
            [name]: value,
            }));
        };

        const emptyLinkFields = () =>{
            setLink({url: "", title: ""});
        }

        const addLink = async (e) =>{
            e.preventDefault();
            
            try {
                const jsonData = {
                    url: link.url,
                    title: link.title 
                }
                const response = await apiService.put(`/players/addlink/${player._id}`, jsonData, {
                  headers: {
                    'Content-Type': "application/json",
                  },
                });
                fetchPlayerLinks();
                emptyLinkFields();
              } catch (error) {
                console.error('Error adding link:', error);
              }
            }

        const averageLevel = (average) => {
            if(Number(average) < 2){
                return "low";
            }
            if(Number(average) > 2 && Number(average) < 3.6){
                return "mid";
            }
            if(Number(average) > 3.5){
                return "high";
            }
        }

  return (
    <div className="view_wrapper">
        <div className="view_personal">
            <div className="personal_top">
                <div className={`t_average ${averageLevel(ratings.Average)}`}>
                    <FontAwesomeIcon icon={faStar} className={`average_star`}/>
                    <h2>{ratings.Average}</h2>
                </div>
                <div className="img">
                    <img src={player.Image} alt="" />
                </div>
                <h2>{player.First_name + " " + player.Last_name}</h2>
            </div>
            <div className="personal_btm">
                <div className="personal_detail">
                    <span>Date of Birth: </span>
                    <p>{formatDate(player.Date_of_Birth)}</p>
                </div>
                <div className="personal_detail">
                    <span>Prefered Foot: </span>
                    <p>{player.Preferred_Foot}</p>
                </div>
                <div className="personal_detail">
                    <span>Height: </span>
                    <p>{player.Height== "" ? "N/A" : `${player.Height} cm`}</p>
                </div>
                <div className="personal_detail">
                    <span>Position: </span>
                    <p>{player.Position}</p>
                </div>
                <div className="personal_detail">
                    <span>Nationality: </span>
                    <p>{player.Nationality}</p>
                </div>
                <div className="personal_detail">
                    <span>Club: </span>
                    <p>{player.Club}</p>
                </div>
                <div className="personal_detail">
                    <span>Scouted by: </span>
                    <p>{player.Scouted_By}</p>
                </div>
                <div className="personal_detail">
                    <span>Region Scouted: </span>
                    <p>{player.Region_scouted_in}</p>
                </div>
                <div className="personal_detail">
                    <span>Agent: </span>
                    <p>{player.Agent}</p>
                </div>
                <div className="personal_detail">
                    <span>Contract Length: </span>
                    <p>{player.Contract == null ? "N/A" : `Until ${player.Contract}`}</p>
                </div>
                <div className="personal_detail">
                    <span>Date Added: </span>
                    <p>{formatDate(player.Date_Added)}</p>
                </div>
            <ExportStyledPDF player={player} evaluation={ratings}/>    
            </div>
        </div>

        <div className="view_evaluation">
            <div className="player-evaluation">
            <h3>Evaluation Metrics</h3>
            <div  className="evaluation-metrics">
                {/* {isRate && renderEvaluation()}  */}

                <div key="In_Posession" className="noteView">
                    <div className="noteView_Title">
                            <span>In Posession</span>
                            <div className="average">
                                <FontAwesomeIcon icon={faStar} className='star'/>
                                <span>{ratings.IP_Score}</span>
                            </div>
                    </div>
                    <div className="noteValue">
                        {ratings.In_Posession}
                    </div>
                </div>
                <div key="Out_of_Posession" className="noteView">
                    <div className="noteView_Title">
                        <span>Out of Posession</span>
                        <div className="average">
                            <FontAwesomeIcon icon={faStar} className='star'/>
                            <span>{ratings.OOP_Score}</span>
                        </div>
                    </div>
                    <div className="noteValue">
                        {ratings.Out_of_Posession}
                    </div>
                </div>
                <div key="Physical_Atttributes" className="noteView">
                    <div className="noteView_Title">
                        <span>Physical Atttributes</span>
                        <div className="average">
                            <FontAwesomeIcon icon={faStar} className='star'/>
                            <span>{ratings.ATI_Score}</span>
                        </div>
                    </div>
                    <div className="noteValue">
                        {ratings.Physical_Atttributes}
                    </div>
                </div>

                <div key="Mental_Attributes" className="noteView">
                    <div className="noteView_Title">
                        <span>Mental Attributes and Personality</span>
                        <div className="average">
                        <FontAwesomeIcon icon={faStar} className='star'/>
                        <span>{ratings.MAP_Score}</span>
                        </div>
                    </div>
                    <div className="noteValue">
                        {ratings.Mental_Attributes}
                    </div>
                </div>
                <div key="Areas_to_Improve" className="noteView">
                    <div className="noteView_Title">
                        <span>Areas to Imporove</span>
                        <div className="average">
                        <FontAwesomeIcon icon={faStar} className='star'/>
                        <span>{ratings.ATI_Score}</span>
                        </div>
                    </div>
                    <div className="noteValue">
                        {ratings.Areas_to_Improve}
                    </div>
                </div>
                <div key="Impressions" className="noteView">
                    <div className="noteView_Title">
                        <span>Impressions</span>
                        <div className="average">
                        <FontAwesomeIcon icon={faStar} className='star'/>
                        <span>{ratings.Impressions_Score}</span>
                        </div>
                    </div>
                    <div className="noteValue">
                        {ratings.Impressions}
                    </div>
                </div>



            </div>
            </div>

            <div className="player-evaluation">
                {/* <div className="border" style={{borderTop: "solid 1px var(--text)"}}></div> */}
                <h4 className="links-header">Player Videos</h4>
                {/* <div className="border" style={{borderTop: "solid 1px var(--text)"}}></div> */}
                <form onSubmit={addLink} className="video-link">
                    <div className="link-input">
                        <input type="text" placeholder="Paste link here" value={link.url} name='url' onChange={handleInputChange} required className='xca'/>
                        <input type="text" placeholder="Title" value={link.title} name='title' onChange={handleInputChange} required/>
                    </div>
                    <button type="submit" className='addLink'>
                        <FontAwesomeIcon icon={faAdd}/>
                    </button>
                </form>
                <ul className="linkList">
                    {
                        Object.entries(linkList).map(([index,i])=>{
                            const formattedUrl = i.url.startsWith("http") ? i.url : `https://${i.url}`;
                            return (
                                <li key={(linkList.length + 5)} className="link">
                                    <a href={formattedUrl} className="link" target="_blank" rel="noopener noreferrer">{i.title}</a>
                                </li>
                            )
                        })
                    }                    
                </ul>
            </div>
        </div>
    </div>
  )
}

export default EvaluationView