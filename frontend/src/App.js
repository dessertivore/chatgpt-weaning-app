import { useState } from "react"
import './App.css'
import Typewriter from 'typewriter-effect';



const ChatbotApp = () => {
  const [data, setData] = useState({
    age: "",
    dietary_req: "",
  });
  const [response, setResponse] = useState("Loading"); // Use setResponse to update the response state
  const [typewriterkey, setTypewriterKey] = useState(0); // Add a key for remounting the Typewriter

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch("http://127.0.0.1:8000/weaningbot", {
        method: "POST",
        mode: "cors",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
      });

      if (!response.ok) {
        throw new Error(`HTTP error! Status: ${response.status}`);
      }

      const dataFromServer = await response.json();
      // Update the state with the response data
      setResponse(dataFromServer);
      setTypewriterKey((prevKey) => prevKey + 1); // Increment the key to remount the Typewriter
    } catch (error) {
      console.error("There was a problem with the fetch operation:", error);
    }
  };


  return (
    <>
    <div className="App">

        <h2>Enter your child's age in months and any dietary requirements. Let ChatGPT give you a meal plan for 1 day of weaning!</h2>

        <form onSubmit={handleSubmit}>
          <textarea
            type="number"
            value={data.age}
            placeholder="Age in months"
            onChange={(e) => setData({ ...data, age: parseInt(e.target.value)})}
          ></textarea>
          <textarea
            type="text"
            value={data.dietary_req}
            placeholder="Dietary requirements"
            onChange={(e) => setData({ ...data, dietary_req: e.target.value})}
          ></textarea>
          <button
            
            type="submit"
          >Submit  
          </button>
          <br />
          <div id = "mealplan">Meal plan:
          
          <Typewriter key = {typewriterkey}
            onInit={(typewriter) => {
              typewriter.typeString(String(response))
              .callFunction(() => {
                console.log('String typed out!');
              })
              .pauseFor(2500)
              .callFunction(() => {
                console.log('All strings were deleted');
              })
              .start();
             }}
            />
          </div>
        </form>
      </div>
    </>
  );
};


export default ChatbotApp;