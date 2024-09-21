import React from 'react';
import threeDotIcon from './../../assets/icons_FEtask/3 dot menu.svg';
import plusIcon from './../../assets/icons_FEtask/add.svg';
import noPriorIcon from './../../assets/icons_FEtask/No-priority.svg';
import urgentPriorityIcon from './../../assets/icons_FEtask/SVG - Urgent Priority colour.svg';
import highPriorityIcon from './../../assets/icons_FEtask/Img - High Priority.svg'; 
import mediumPriorityIcon from './../../assets/icons_FEtask/Img - Medium Priority.svg'; 
import lowPriorityIcon from './../../assets/icons_FEtask/Img - Low Priority.svg'; 

import Backlog from './../../assets/icons_FEtask/Backlog.svg';
import Cancelled from './../../assets/icons_FEtask/Cancelled.svg';
import Done from './../../assets/icons_FEtask/Done.svg';
import Progress from './../../assets/icons_FEtask/in-progress.svg';
import Todo from './../../assets/icons_FEtask/To-do.svg';


import userPic from './../../assets/icons_FEtask/userPic.png';
import './ListHead.css';

const priorityIcons = {
  4: urgentPriorityIcon,
  3: highPriorityIcon,
  2: mediumPriorityIcon,
  1: lowPriorityIcon,
  0: noPriorIcon,
};

const statusIcon = {
    'In progress':Progress,
    'Backlog': Backlog,
    'Todo': Todo,
    'Done': Done,
    'Cancelled': Cancelled,
  };
const priorityValue = {
  4: "Urgent",
  3: "High",
  2: "Medium",
  1: "Low",
  0: "No-Priority",
};

const ListHead = ({ info }) => {
  const ticketCount = info.tickets.length;
 

  // Get the priority of the first ticket in the group
  const priority = info.tickets[0]?.priority || 0; // Default to 0 if no tickets
  const PriorityIcon = priorityIcons[priority] || priorityIcons[0]; // Default to noPriority if not found
  const StatusIcon = statusIcon[info.tickets[0]?.status] // Default to noPriority if not found

  const renderHeading = () => {
    if (info.groupBy === 'statusWise') {
      return (<div className='slotIh'>
 <img className='slotIcon' src={StatusIcon} alt={`${statusIcon} icon`} />
    <h5 className='slotHeading'>{info.tickets[0]?.status || "No Status"}</h5>
      </div>
      )
    } else if (info.groupBy === 'priorityWise') {
        return (<div className='slotIh'>
<img className='slotIcon' src={PriorityIcon} alt={`${priorityValue[priority]} icon`} />
<h5 className='slotHeading'>{priorityValue[priority]}</h5>
        </div>)
        
    } else {
   
      return(
<div className='slotIh'>
         <img className='slotIcon userPic' src={userPic} alt="userIcon"/>
       <h5 className='slotHeading'>{info.tickets[0]?.userId || "No User ID"}</h5>
      </div>
      )
      
    }
  };

  return (
    <div className='slot'>
      <div className='slotHead'>
        <div className='slotHeadLeft'>
          {renderHeading()}
          <span className='slotChildCount'>{ticketCount}</span>
        </div>
        <div className='slotHeadRight'>
          <img className='PlusIcon' src={plusIcon} alt="plusIcon" />
          <img className='ThreeDotIcon' src={threeDotIcon} alt="threeDotIcon" />
        </div>
      </div>
    </div>
  );
};

export default ListHead;
