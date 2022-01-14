import React, { useEffect, useState } from 'react'
import Modaal from './Modaal'

export default function Practice() {
    const [data, setData] =  useState([])
    const [search, setSearch] = useState('')
    const [filtered, setFiltered] = useState([])
    const [openModal, setOpenModal] = useState(false)
    const [monster, setMonster] = useState(false)

    function getData(){
        fetch('https://jsonplaceholder.typicode.com/users')
        .then((res) => res.json())
        .then(data => setData(data))
        .catch((err) => console.log('error'))
    }

    useEffect(() => {
       getData()
    }, [])

    function handleChange(event){
        setSearch(event.target.value)
    }

 function arrayFiltering(){
     const filtered = data.filter((item) => {
         return (
             item.name.toLowerCase().includes(search.toLowerCase())
         )
     })
     setFiltered(filtered)
 }

 useEffect(() => {
    arrayFiltering()
    // We're rerendering data that's why its a dependency here.
 }, [search, data])

 console.log(filtered)
    return (
        <>
        <div>
            <h1>Monster Rolodex</h1>
            <input type='search' placeholder='Search.....' onChange={handleChange} value={search} />
        
        <div className='container'>
            {filtered.map(item => {
                return(
                    <div className='cards' key={item.id}
                   onClick={() => {
                    //    console.log('clicking');
                       setOpenModal(true)
                       setMonster(item)
                   }}>
                    <img src={`https://robohash.org/${item.id}?set=set2&size=180x180`} alt='monster'/>
                    <h2>{item.name}</h2>
                    <p>{item.email}</p>
                </div>
                )
            })}
           
        </div>
        {/* {filtered.length === 0 ? '0' : 'item'} */}
        {filtered.length === 0 && <div className='errorMes'>Does not match any Monster</div>}

        </div>
        <Modaal open={openModal} close={setOpenModal} mons={monster}/>
        </>
    )
}


