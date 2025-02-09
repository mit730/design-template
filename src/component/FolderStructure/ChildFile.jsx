import React from "react";
import { useState } from "react";

const ChildFile = ({ data, setDummyData }) => {
  const [isShow, setShow] = useState(false);
  const [showInput, setShowInput] = useState(false);
  const [showInput1, setShowInput1]= useState(false);
  const [name, setName] = useState("");
  const [fileName, setFileName] = useState("")

  function editname(data, id, word) {
    return data.map((elem) => {
      if (elem.id === id) {
        
        return { ...elem, items: [word, ...elem.items] }
      } else if (elem.isFolder) {
        
        return { ...elem, items: editname(elem.items, id, word) }
      } else {
        
        return elem
      }
    });
  }

  const handleCreateNewFolder = (item) => {
    // setShowInput(true)
    const obj = {
      id: `${Date.now()}`,
      name: name,
      isFolder: true,
      items: [],
    };

    setDummyData((prev) => {
      return {
        ...prev,
        items: editname(prev.items, data.id, obj)
      }
    });
    setName("")
    setShowInput(!showInput)
  };

  const handleCreateNewFile = () => {
    const obj = {
      id: `${Date.now()}`,
      name: fileName,
      isFolder: false,
      items: [],
    };

    setDummyData((prev) => {
      return {
        ...prev,
        items: editname(prev.items, data.id, obj)
      }
    });
    setFileName("")
    setShowInput1(!showInput1)

  };

  const handleFolderPath = () => {
    setShowInput(!showInput)
  }

  const handleFilePath = () => {
    setShowInput1(!showInput1)
  }



  if (data.isFolder) {
    return (
      <div className="overall">
        <div className="folder">
          <div onClick={() => setShow(!isShow)}>📁 {data.name} </div>
          <div className="inputStyle">
            {showInput && (
              <input
                type="text"
                placeholder="enter folder name"
                value={name}
                onChange={(e) => setName(e.target.value)}
                onKeyPress={(e) => {
                  if (e.key === "Enter") handleCreateNewFolder(data);
                }}
              />
            )}

{showInput1 && (
              <input
                type="text"
                placeholder="enter file name"
                value={fileName}
                onChange={(e) => setFileName(e.target.value)}
                onKeyPress={(e) => {
                  if (e.key === "Enter") handleCreateNewFile(data);
                }}
              />
            )}
          </div>
          <div className="cover">
            <div
              className="createfolder"
              onClick={() => handleFolderPath()}
            >
              folder+
            </div>
            <div className="createfile"   onClick={() => handleFilePath()}>
              {" "}
              file+
            </div>
          </div>
        </div>

        {isShow && (
          <div className="nested">
            {data.items.map((elem, index) => {
              return (
                <ChildFile key={index} data={elem} setDummyData={setDummyData} />
              )
            })}
          </div>
        )}
      </div>
    );
  } else {
    return <div className="file">🗃️ {data.name}</div>;
  }
};

export default ChildFile;
