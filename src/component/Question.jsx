import React from "react";
import { useState } from "react";

const Question = () => {
  // Isme agar first object m, project plain.docx ko edit karna h tho kaise karegnge? Ye ek state h poori…
  // And jab click kar raha tho vo vala object ki details aari h bas

  const [data, setData] = useState([
    {
      id: 1,
      name: "Documents",
      type: "folder",
      children: [
        {
          id: 2,
          name: "Work",
          type: "folder",
          children: [
            {
              id: 3,
              name: "Project Plan.docx",
              type: "file",
              children: [],
            },
            {
              id: 4,
              name: "Meeting Notes.txt",
              type: "file",
              children: [],
            },
          ],
        },
        {
          id: 5,
          name: "Personal",
          type: "folder",
          children: [
            {
              id: 6,
              name: "Resume.pdf",
              type: "file",
              children: [],
            },
            {
              id: 7,
              name: "Budget.xlsx",
              type: "file",
              children: [],
            },
          ],
        },
      ],
    },
    {
      id: 3,
      name: "Photos",
      type: "folder",
      children: [
        {
          id: 9,
          name: "Vacations",
          type: "folder",
          children: [
            {
              id: 10,
              name: "Beach.jpg",
              type: "file",
              children: [],
            },
            {
              id: 11,
              name: "Mountain.jpg",
              type: "file",
              children: [],
            },
          ],
        },
        {
          id: 12,
          name: "Family",
          type: "folder",
          children: [
            {
              id: 13,
              name: "Family Reunion.png",
              type: "file",
              children: [],
            },
          ],
        },
      ],
    },
  ]);

  const [word, setWord] = useState("");
  const [editId, setEditId] = useState(null); 

  function editname(data1, id, word) {
    return data1.map((elem) => {
      if (elem.id === id) {
        return { ...elem, name: word };
      } else {
        return { ...elem, children :editname(elem.children, id, word) };
      }

    });
  }
  const handleEdit = () => {
    let x = editname(data, editId, word);
    setData(x);
    setWord("")
  };

  const handleNameId = (id, currentName) => {
    setEditId(id)
    setWord(currentName)
  }


  const showName = (name) => {
    return name.map((elem) => {
      if (elem) {
        return (
          <div key={elem.id}>
            <div onClick={() => handleNameId(elem.id, elem.name)}>
              <p>{elem.name}</p>
            </div>
            {showName(elem.children)}
          </div>
        );
      }
    });
  };


  return (
    <>
      <div>question1</div>
      <h3 >{showName(data)}</h3>

      {editId && (
        <>
          <input
            type="text"
            value={word}
            placeholder="update new word"
            onChange={(e) => setWord(e.target.value)}
          />
          <button onClick={handleEdit}>Save </button>
        </>
      )}
    </>
  );
};

export default Question;
