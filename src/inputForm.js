import { useState } from "react";

export function InputForm(props) {
    const [value, setValue] = useState('');
    const [status, setStatus] = useState('default');

    function handleChange(e) {
        setValue(e.target.value);
    }
  
    function handleSubmit(e) {
        alert('A Sentence was submitted: ' + value);
        e.preventDefault();
    
        fetch("/analysis", {
            method: "POST",
            headers: {
              'Content-type': 'application/json'
          },
            body: JSON.stringify({
              text: value,
            })
          }
          ).then(
            res => res.json(),
            setStatus("Waiting")
          ).then(
            data => {
              console.log(data)
              setStatus(data.top.val)
            }
          )
    }

    return (
      <div>
        <form onSubmit={handleSubmit}>
          <label>
          <h1>Today's Feeling</h1>
          <textarea value={value} onChange={handleChange} />
          </label>
          <input type="submit" value="Submit"/>
        </form>
        <h2>{status}</h2>
      </div>
    )
}

