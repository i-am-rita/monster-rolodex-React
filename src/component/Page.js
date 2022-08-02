import React, { useState, useEffect } from "react";
import MyModal from "./Modal";

export default function Page() {
  const [data, setData] = useState([], "Page");
  const [loading, setLoading] = useState(false);
  const [search, setSearch] = useState("");
  const [filtered, setFiltered] = useState([]);
  const [openModal, setOpenModal] = useState(false);
  const [singleMonster, setSingleMonster] = useState(false);

  // set the search state
  // const [filter, setFilter] = useState([])
  useEffect(() => {
    getData();
  }, []);

  function getData() {
    fetch("https://jsonplaceholder.typicode.com/users")
      .then((res) => res.json())
      .then((data) => setData(data))
      .catch((err) => console.log("error"))
      .finally(() => setLoading(false));
  }

  // Get the event
  function handleChange(event) {
    setSearch(event.target.value);
  }

  // // map through the array and check for any item.name that includes search
  // const filteredArray = useCallback(() => {
  //   let filtered = data.filter((item) => {
  //     return item.name.toLowerCase().includes(search.toLowerCase())
  //   })
  //   // let filtered = data.filter(item => item.name.toLowerCase().includes(search.toLowerCase()) )
  //   setFiltered(filtered)
  // },[data, search])

  // useCallback(
  //   () => {
  //     callback
  //   },
  //   [input],
  // )
  useEffect(() => {
    // map through the array and check for any item.name that includes search
    const filteredArray = () => {
      let filtered = data.filter((item) => {
        return item.name.toLowerCase().includes(search.toLowerCase());
      });
      // let filtered = data.filter(item => item.name.toLowerCase().includes(search.toLowerCase()) )
      setFiltered(filtered);
    };
    filteredArray();
  }, [search, data]);

  if (loading) {
    return "loading";
  }

  console.log(data);
  return (
    <>
      <div>
        <h1>Monster Rolodex</h1>
        <input
          className="search"
          type="search"
          onChange={handleChange}
          value={search}
          placeholder="Search....."
        />
        <div className="container">
          {filtered.map((item) => {
            return (
              <div
                className="cards"
                key={item.id}
                onClick={() => {
                  setOpenModal(true);
                  setSingleMonster(item);
                }}
              >
                <img
                  src={`https://robohash.org/${item.id}?set=set2&size=180x180`}
                  alt=""
                />
                <h2>{item.name}</h2>
                <p>{item.email}</p>
              </div>
            );
          })}
        </div>
        {filtered.length === 0 && (
          <div className="errorMes">Does not match any Monster</div>
        )}
      </div>
      <div className="modal">
        {data.length > 0 && (
          <MyModal open={openModal} close={setOpenModal} rita={singleMonster} />
        )}
      </div>
    </>
  );
}
