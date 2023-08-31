import React, { useEffect, useState } from 'react'
import Navbar from '../components/Navbar'
import Footer from '../components/Footer'
import Card from '../components/Card'


export default function Home() {
     const[search,setsearch]= useState('');
    const [foodcat, setFoodcat] = useState([]);
    const [fooditem, setFooditem] = useState([]);

    const loadData = async () => {
        let response = await fetch("http://localhost:5000/api/foodData", {

            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            }
        });
        response = await response.json();

        setFooditem(response[0]);
        setFoodcat(response[1]);
        // console.log(response[0],response[1]);
    }
    useEffect(() => {
        loadData()
    }, [])

    return (
        <div>
            <div> <Navbar /> </div>
            <div><div id="carouselExampleFade" className="carousel slide carousel-fade" data-bs-ride="carousel" style={{objectFit :"contain !important"}}>
                <div className="carousel-inner" id='carousel'>
                    <div className="carousel-caption"style={{zIndex:"10"}}>
                        <div className="d-flex justify-content-center">
                            <input className="form-control me-2" type="search" placeholder="Search" aria-label="Search" value={search} onChange={(e)=>{setsearch(e.target.value)}}/>
                            <button className="btn btn-warning" type="submit">Search</button>
                        </div>
                    </div>
                    <div className="carousel-item active">
                        <img src="https://source.unsplash.com/random/1920x1080/?pizza" className="d-block w-100" style={{ filter: "brightness(100%)" }} alt="..." />
                    </div>
                    <div className="carousel-item">
                        <img src="https://source.unsplash.com/random/1920x1080/?sandwich" className="d-block w-100" style={{ filter: "brightness(100%)" }} alt="..." />
                    </div>
                    <div className="carousel-item">
                        <img src="https://source.unsplash.com/random/1920x1080/?cake" className="d-block w-100" style={{ filter: "brightness(100%)" }} alt="..." />
                    </div>
                </div>
                <button className="carousel-control-prev" type="button" data-bs-target="#carouselExampleFade" data-bs-slide="prev">
                    <span className="carousel-control-prev-icon" aria-hidden="true"></span>
                    <span className="visually-hidden">Previous</span>
                </button>
                <button className="carousel-control-next" type="button" data-bs-target="#carouselExampleFade" data-bs-slide="next">
                    <span className="carousel-control-next-icon" aria-hidden="true"></span>
                    <span className="visually-hidden">Next</span>
                </button>
            </div></div>
            <div className='container'>
                {
                    foodcat !== []
                        ? foodcat.map((data) => {
                            return (<div className='row mb-3'>
                                <div key={data._id} className="fs-3 m-3">
                                    {data.CategoryName}
                                </div>
                                <hr />
                                {fooditem !== []
                                    ?
                                    fooditem.filter((item) => (item.CategoryName === data.CategoryName) && (item.name.toLowerCase().includes(search.toLocaleLowerCase()))) 
                                        .map(filteritems => {
                                            return (
                                                <div key={filteritems._id} className='col-12 col-md-6 col-lg-3'>
                                                    <Card fooditem={filteritems}
                                                    options = {filteritems.options[0]}
                                                    
                                                    
                                                    >

                                                    </Card>



                                                </div>
                                            )
                                        })

                                    : <div> no such data</div>}
                            </div>

                            )
                        }) : ""
                }
                
            </div>
            <div><Footer /></div>
        </div>
    )
}
