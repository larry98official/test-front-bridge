import React, {useState} from 'react'
import SearchBox from "./views/searchBox/searchbox";
import Maps from "./views/maps/maps";

function Home() {
    const [selectPosition, setSelectPosition] = useState(null);

  return (
      <div
          style={{
              display: "flex",
              flexDirection: "row",
              height: "100vh"
          }}>
          <div>
              <SearchBox selectPosition={selectPosition} setSelectPosition={setSelectPosition}/>
          </div>
          <div style={{ width: "60vw", height: "80%", margin: "auto" }}>
              <Maps selectPosition={selectPosition}/>
          </div>
      </div>
  )
}

export default Home
