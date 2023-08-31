import React, { useState,useRef,useEffect } from 'react'
import { useDispatchcart, useCart } from './ConetextReducer'
export default function Card(props) {

    let dispatch = useDispatchcart();
    let data= useCart();
    const priceRef = useRef();
    let options = props.options;
    let priceoptions = Object.keys(options);
    const [qty, setQty] = useState(1)
    const [size, setSize] = useState("")
    const handleaddtocart = async () => {
        let food = []
    for (const item of data) {
      if (item.id === props.fooditem._id) {
        food = item;

        break;
      }
    }
    if (food !== []) {
        if (food.size === size) {
          await dispatch({ type: "UPDATE", id: props.fooditem._id, price:finalPrice, qty: qty })
          return
        }
        else if (food.size !== size) {
        await dispatch({ type: "ADD", id: props.fooditem._id, name: props.fooditem.name, price:finalPrice, qty: qty, size: size })
        return
         } //  console.log(data)
         return
        }
         await dispatch({ type: "ADD", id: props.fooditem._id, name: props.fooditem.name, price:finalPrice, qty: qty, size: size })
    }
    let finalPrice = qty * parseInt(options[size]);
    useEffect(()=>{
        setSize(priceRef.current.value)
    },[])
    return (
        <div>
            <div>
                <div className="card mt-3" style={{ "width": "20rem", "maxheight": "360px" }}>
                    <img src={props.fooditem.img} className="card-img-top" alt="..." style={{ height: "200px", objectFit: "fill" }} />
                    <h5 className="card-title">{props.fooditem.name}</h5>
                    <div className="container w-100">
                        <select className='m-1 h-100 bg-primary rounded' onChange={(e) => setQty(e.target.value)}>
                            {Array.from(Array(5), (e, i) => {
                                return (
                                    <option key={i + 1} value={i + 1}>{i + 1}</option>
                                )
                            })}
                        </select>
                        <select className='m-1 h-100 bg-primary rounded'ref={priceRef}onChange={(e) => setSize(e.target.value)}>
                            {priceoptions.map((data) => {
                                return <option key={data} value={data}>{data}</option>
                            })}
                        </select>
                        <div className='d-inline fs-5'>Rs.{finalPrice}/-</div>
                    </div>
                    <hr></hr>
                    <button className={'btn btn-success justify-center mx-2'} onClick={handleaddtocart}>Add to Cart</button>
                </div>
            </div>
        </div>

    )
}
