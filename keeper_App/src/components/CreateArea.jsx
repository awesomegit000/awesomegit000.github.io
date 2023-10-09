import React, { useState } from "react";
import AddIcon from '@mui/icons-material/Add';
import Fab from '@mui/material/Fab';
import Zoom from '@mui/material/Zoom';

function CreateArea(props) {
  const [note, setNote] = useState({
    title: "",
    content: ""
  });

  function handleChange(event) {
    const { name, value } = event.target;

    setNote(prevNote => {
      return {
        ...prevNote,
        [name]: value
      };
    });
  }

  function submitNote(event) {
    props.onAdd(note);
    setNote({
      title: "",
      content: ""
    });
    event.preventDefault();
  }
  const [title,setTitle] = useState(false);
  function displayTitle() {
    setTitle(true);
  }
  return (
    <div>
      <form className="create-note">
      {title?(<input
          name="title"
          onChange={handleChange}
          value={note.title}
          placeholder="Title"
          autoFocus
        />):null}
      
        <textarea
          name="content"
          onChange={handleChange}
          value={note.content}
          placeholder="Take a note..."
          rows={title?"3":"1"}
          onClick={displayTitle}
        />
        {title?(<Zoom in={true}>
          <Fab onClick={submitNote}><AddIcon /></Fab>
        </Zoom>):null}
      </form>
    </div>
  );
}

export default CreateArea;
