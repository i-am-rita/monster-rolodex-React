import React, { useState, useEffect } from 'react'
import MyModal from './Modal'

export default function Page() {
  // 1. import required hooks... useState and useEffect
  // Declare the useState for the data
  // 2. fetch the data in a function from an Api
  // 4. Declare the loading state using useState to false
  // Set the loading state in the fetch function to true
  // Use .catch for any error
  // 5. .finally after the loading should return false
  // if... for loading
  // map through the data using item to refer to each item in the data
  // Finally take in the items like props.
  const [data, setData] = useState([], 'Page')
  const [loading, setLoading] = useState(false)
  const [search, setSearch] = useState('')
  const [filtered, setFiltered] = useState([])
  const [openModal, setOpenModal] = useState(false)
  const [singleMonster, setSingleMonster] = useState(false)

  // set the search state
  // const [filter, setFilter] = useState([])
  useEffect(() => {
    getData()
  }, [])

  function getData() {
    fetch('https://jsonplaceholder.typicode.com/users')
      .then(res => res.json())
      .then(data => setData(data))
      .catch((err) => console.log('error'))
      .finally(() => setLoading(false))
  }

  // Get the event
  function handleChange(event) {
    setSearch(event.target.value)
  }

  // map through the array and check for any item.name that includes search
  function filteredArray() {
    let filtered = data.filter((item) => {
      return item.name.toLowerCase().includes(search.toLowerCase())
    })
    // let filtered = data.filter(item => item.name.toLowerCase().includes(search.toLowerCase()) )
    setFiltered(filtered)
  }

  // function filteredArray() {
  //   let filtered = data.filter(item => {
  //     return (
  //       item.name.toLowerCase().includes(search.toLowerCase())
  //     )
  //   })
  // }
  // useCallback(
  //   () => {
  //     callback
  //   },
  //   [input],
  // )
  useEffect(() => {
    filteredArray()
  }, [search, data])

  if (loading) {
    return 'loading'
  }

  console.log(data);
  return (
    <>
      <div>
        <h1>Monster Rolodex</h1>
        <input className='search' type='search' onChange={handleChange} value={search} placeholder='Search.....' />
        <div className='container'>
          {filtered.map(item => {
            return (
              <div className='cards' key={item.id}
                onClick={() => {
                  setOpenModal(true)
                  setSingleMonster(item)
                }}
              >
                <img src={`https://robohash.org/${item.id}?set=set2&size=180x180`} alt='' />
                <h2>{item.name}</h2>
                <p>{item.email}</p>
              </div>
            )
          })}
        </div>
      </div>
      <div className="modal">
        
       { data.length > 0 &&  <MyModal open={openModal} close={setOpenModal} rita={singleMonster} />}
      </div>

    </>
     
  )  
}