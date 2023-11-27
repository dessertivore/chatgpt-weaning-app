import { useState } from "react"

const ChatbotApp = () => {
  const [data, setData] = useState({
    age: "",
    dietary_req: "",
  });
  const [response, setResponse] = useState(""); // Use setResponse to update the response state

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
    } catch (error) {
      console.error("There was a problem with the fetch operation:", error);
    }
  };


  return (
    <>
      <div
        style={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          height: '100vh',
        }}
      >
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
        </form>
        <div>Meal plan:
      {response}</div>
        
      </div>
      
    </>
  );
};


export default ChatbotApp;