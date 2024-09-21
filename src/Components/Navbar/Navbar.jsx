import React, { useState } from 'react'
import './Navbar.css'
import displayIcon from './../../assets/icons_FEtask/Display.svg'
import downIcon from './../../assets/icons_FEtask/down.svg'
const Navbar = ({ onSelectChange })=>{
const [down , setDown] = useState(false)
const [grouping, setGrouping] = useState('');
const [ordering, setOrdering] = useState('');

const downHandler = ()=>{
if(down){
    setDown(false);

}else{
    setDown(true)
}
};


const handleGroupingChange = (event) => {
    const value = event.target.value;
    setGrouping(value); // Update local state for grouping
    sendValues(value, ordering);
};

const handleOrderingChange = (event) => {
    const value = event.target.value;
    setOrdering(value); // Update local state for ordering
    sendValues(grouping, value);
};

const sendValues = (groupingValue, orderingValue) => {
    if (onSelectChange) {
        onSelectChange({ grouping: groupingValue, ordering: orderingValue }); // Send both values as an object
    }
};
    return(
        <div>
             <div className='navBox'>
           <button onClick={downHandler} className='displayButton'>
               <img className='displayIcon' src={displayIcon} alt="displayIcon" />
               <h5>Display</h5>
               <img className='downIcon' src={downIcon} alt="downIcon" />
           </button>
       </div>
       <div className={`downBox ${down ? '' : 'hidden'}`}>
                <div className='group'>
                    <h6>Grouping</h6>
                    <div>
                    <select className="groupSelect" onChange={handleGroupingChange}>
  <option value="status">Status</option>
  <option value="user">User</option>
  <option value="priority">Priority</option>
</select>
                    </div>
                </div>
                <div className='order'>
                    <h6>Ordering</h6>
                    <div>
            <select className="orderSelect" onChange={handleOrderingChange}>
  <option value="priority">Priority</option>
  <option value="title">Title</option>

</select>
                    </div>
                </div>


                </div>
       
       
        </div>
    )
}

export default Navbar;