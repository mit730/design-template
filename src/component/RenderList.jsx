import { useEffect, useState } from "react";


 function RenderList({ data, level = 0, show }) {

  const [expanded, setExpanded] = useState([]);

  const handleFolderFile = (id) => {
    if (expanded.includes(id)) {
      let x = expanded.filter((folderId) => folderId !== id)
      setExpanded(x);
    } else {
      setExpanded([...expanded, id]);
    }
  };
  
  console.log(expanded, "ddddddddd")

  return (
    <>
      <div>
        {data.map((item, index) => {
          let c = expanded.includes(item.id) 
          return (
            <>
              {item.type === "folder" ? (
                <>
                  <h3 onClick={() => handleFolderFile(item.id)}>📂 {item.name}</h3>
                  {c ? <RenderList data={item.children} /> : <></>}
                </>
              ) : (
                <h6 style={{ marginLeft: "20px" }}>📄 {item.name} </h6>
              )}
            </>
          );
        })}
      </div>
    </>
  );
}

export default function File() {
  const [file, setFile] = useState([
    {
      name: "Src",
      type: "folder",
      id: 1,
      children: [
        { name: "SRCApp.Js", type: "file" },
        { name: "SRCIndex.Js", type: "file" },
        {
          name: "New Folder",
          type: "folder",
          children: [
            { name: "Index.Js", type: "file" },
            {
              name: "New Folder 2",
              type: "folder",
              children: [{ name: "Index22.Js", type: "file" }],
            },
          ],
        },
      ],
    },
    {
      name: "Public",
      type: "folder",
      id: 2,

      children: [
        { name: "PubApp.Js", type: "file" },
        { name: "PubIndex.Js", type: "file" },
      ],
    },
    {
      id: 3,
      name: "Assets",
      type: "folder",
      children: [{ name: "AssApp.Js", type: "file" }],
    },
  ]);


  return (
    <>
      <RenderList data={file} show={false} />
    </>
  );
}

// =========================================================================================

// import React from 'react'
// import ReactDOM from 'react-dom'
// import data from './data.json'
// import Select from 'react-select'

// function App() {
//   const options = data.map((elem) => ({
//     label: elem.service.name,
//     value: elem.service.id,
//     data: elem,
//   }))

//   const handleSelect = (data) => {
//     const result = {}
//     data.forEach((elem) => {
//       const {categoryid, service} = elem.data
//       if (result[categoryid]) {
//         result[categoryid].service.push(service.id)
//       } else {
//         result[categoryid] = {
//           categoryid: categoryid,
//           service: [service.id],
//         }
//       }
//     })
//     console.log(Object.values(result))
//   }

//   return (
//     <>
//       <h3>Select a Service:</h3>
//       <Select
//         options={options}
//         isMulti
//         isClearable
//         name="colors"
//         className="basic-multi-select"
//         classNamePrefix="select"
//         onChange={(e) => handleSelect(e)}
//       />
//     </>
//   )
// }

// ReactDOM.render(<App />, document.getElementById('root'))
