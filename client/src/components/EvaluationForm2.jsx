import React, {useState} from 'react'
import './css/EvaluationForm2.css'
import { apiService } from "../services/apiService";


const EvaluationForm2 = ({newPlayerId}) => {

    const evaluationCriteria = [
      {id: 'In_Posession', label: "In Posession",},
      {id: 'Out_of_Posession', label: "Out of Posession",},
      {id: 'Physical_Atttributes', label: "Physical atttributes",},
      {id: 'Mental_Attributes', label: "Mental Attributes and Personality",},
      {id: 'Areas_to_Improve', label: "Areas to Imporove",},
      {id: 'Impressions', label: "Impressions and Side Notes",},
    ];
    
      const [ratings, setRatings] = useState({});
      const [dialog, setDialog] = useState("");

      const averageCalc = () =>{
        if(ratings.OOP_Score == undefined || ratings.ATI_Score == undefined || ratings.MAP_Score == undefined || ratings.Impressions_Score == undefined
          || ratings.IP_Score == undefined || ratings.PA_Score == undefined){
          return "";
        }else{
          var total_score = Number(ratings.OOP_Score) + Number(ratings.ATI_Score) + Number(ratings.MAP_Score) + Number(ratings.Impressions_Score) + Number(ratings.IP_Score) + Number(ratings.PA_Score);
            var average = total_score / 5;
            return String(average);
        }
      }
    
      const handleChange = (e, criterionId) => {
        setRatings({
          ...ratings,
          [criterionId]: e.target.value,
          Player_id: newPlayerId,
          Average: averageCalc(),
        });
      };

      const [showDialog, setShowDialog] = useState(false);

      const handleDialog = () => {
        setShowDialog(true);

        // Automatically close the dialog after 2 seconds
        setTimeout(() => {
          setShowDialog(false);
        }, 2000);
      }
    
      const handleSubmit = async (e) => {
        e.preventDefault();
        if(ratings.OOP_Score == undefined || ratings.ATI_Score == undefined || ratings.MAP_Score == undefined || ratings.Impressions_Score == undefined
          || ratings.IP_Score == undefined || ratings.PA_Score == undefined){
          setDialog("Please ensure you have selected a score for all the key markers");
          handleDialog();
        }
        else{
          try {
            var total_score = Number(ratings.OOP_Score) + Number(ratings.ATI_Score) + Number(ratings.MAP_Score) + Number(ratings.Impressions_Score) + Number(ratings.IP_Score) + Number(ratings.PA_Score);
            var average = total_score / 5;
  
            // setRatings({
            //   ...ratings,
            //   Average: String(average)
            // });
  
            const response = await apiService.post('/evaluation/', ratings, {
              headers: {
                'Content-Type': 'application/json',
              },
            });

            const addScore = await apiService.put(`/players/addScore/${newPlayerId}`, {Average: String(average)},
              {
                headers: {
                  'Content-Type': 'application/json',
                },
              }
            );

            setDialog("Player Details Successfully Updated");
            handleDialog();
            } catch (error) {
              console.error('Error saving player:', error);
            }
        }
        
        
      };

  return (
    <div className="survey-form">
      {showDialog && (
        <div className="dialogStyles">
          <div className="dialogContent">
            <p>{dialog}</p>
            <button onClick={() => setShowDialog(false)}>Close</button>
          </div>
        </div>
      )}

      <form onSubmit={handleSubmit}>
        <div className="evaluation-q">
          <div className="question">
                <div className="question_header">
                  <span>In Posession</span>
                  <select name="IP_Score" id="IP_Score" onChange={(e) => handleChange(e, "IP_Score")}>
                    <option value=" ">-- Select ratings --</option>
                    <option value="1">1</option>
                    <option value="2">2</option>
                    <option value="3">3</option>
                    <option value="4">4</option>
                    <option value="5">5</option>
                  </select>
                </div>
                <textarea name="In_Posession"
                  id="In_Posession"
                  rows={10}  
                  cols={5}
                  onChange={(e) => handleChange(e, "In_Posession")} 
                  required
                />
          </div>

          <div className="question">
            {/* #2 */}
                <div className="question_header">
                  <span>Out of Posession</span>
                  <select name="OOP_Score" id="" onChange={(e) => handleChange(e, "OOP_Score")}>
                    <option value=" ">-- Select ratings --</option>
                    <option value="1">1</option>
                    <option value="2">2</option>
                    <option value="3">3</option>
                    <option value="4">4</option>
                    <option value="5">5</option>
                  </select>
                </div>
                <textarea name="Out_of_Posession"
                  id="Out_of_Posession"
                  rows={10}  
                  cols={5}
                  onChange={(e) => handleChange(e, "Out_of_Posession")} 
                  required
                />
          </div>

          <div className="question">
            {/* #3 */}
                <div className="question_header">
                  <span>Physical Atttributes</span>
                  <select name="PA_Score" id="PA_Score" onChange={(e) => handleChange(e, "PA_Score")}>
                    <option value=" ">-- Select ratings --</option>
                    <option value="1">1</option>
                    <option value="2">2</option>
                    <option value="3">3</option>
                    <option value="4">4</option>
                    <option value="5">5</option>
                  </select>
                </div>
                <textarea name="Physical_Atttributes"
                  id="Physical_Atttributes"
                  rows={10}  
                  cols={5}
                  onChange={(e) => handleChange(e, "Physical_Atttributes")} 
                  required
                />
          </div>

          <div className="question">
            {/* #4 */}
                <div className="question_header">
                  <span>Mental Attributes and Personality</span>
                  <select name="MAP_Score" id="MAP_Score" onChange={(e) => handleChange(e, "MAP_Score")}>
                    <option value=" ">-- Select ratings --</option>
                    <option value="1">1</option>
                    <option value="2">2</option>
                    <option value="3">3</option>
                    <option value="4">4</option>
                    <option value="5">5</option>
                  </select>
                </div>
                <textarea name="Mental_Attributes"
                  id="Mental_Attributes"
                  rows={10}  
                  cols={5}
                  onChange={(e) => handleChange(e, "Mental_Attributes")} 
                  required
                />
          </div>

          <div className="question">
            {/* #4 */}
                <div className="question_header">
                  <span>Areas to Imporove</span>
                  <select name="ATI_Score" id="ATI_Score" onChange={(e) => handleChange(e, "ATI_Score")}>
                    <option value=" ">-- Select ratings --</option>
                    <option value="1">1</option>
                    <option value="2">2</option>
                    <option value="3">3</option>
                    <option value="4">4</option>
                    <option value="5">5</option>
                  </select>
                </div>
                <textarea name="Areas_to_Improve"
                  id="Areas_to_Improve"
                  rows={10}  
                  cols={5}
                  onChange={(e) => handleChange(e, "Areas_to_Improve")} 
                  required
                />
          </div>

          <div className="question">
            {/* #5 */}
                <div className="question_header">
                  <span>Impressions and Side Notes</span>
                  <select name="Impressions_Score" id="Impressions_Score" onChange={(e) => handleChange(e, "Impressions_Score")}  >
                    <option value=" ">-- Select ratings --</option>
                    <option value="1">1</option>
                    <option value="2">2</option>
                    <option value="3">3</option>
                    <option value="4">4</option>
                    <option value="5">5</option>
                  </select>
                </div>
                <textarea name="Impressions"
                  id="Impressions"
                  rows={10}  
                  cols={5}
                  onChange={(e) => handleChange(e, "Impressions")} 
                  required
                />
          </div>
          
        </div>

        <button type="submit" className="submit-button">
          Submit Evaluation
        </button>
      </form> 
    </div>

  )
}

export default EvaluationForm2