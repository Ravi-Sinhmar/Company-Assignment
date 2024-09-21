import React from 'react';
import './Card.css';
import userPic from '../../assets/icons_FEtask/userPic.png';
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

const priorityIcons = {
    4: urgentPriorityIcon,
    3: highPriorityIcon,
    2: mediumPriorityIcon,
    1: lowPriorityIcon,
    0: noPriorIcon
  };

  const statusIcon = {
    'In progress':Progress,
    'Backlog': Backlog,
    'Todo': Todo,
    'Done': Done,
    'Cancelled': Cancelled,
  };

const Card = ({ ticket , groupBy }) => {

    const StatusIcon = statusIcon[ticket?.status] // Default to noPriority if not found
  

    const priority = ticket?.priority || 0;
const icon = priorityIcons[priority] || priorityIcons[0]; // Default to noPriority if not found
  return (
    <div className='card'>
      <div className='cardHead'>
        <h6 className='cardName'>{ticket.id}</h6>
        {groupBy !== 'userWise' &&( <div>
          <img src={userPic} alt="" className="userPic" />
        </div>)}
       
      </div>
      <div className='titleBox'>
      {groupBy !== 'statusWise' && (
      <img src={StatusIcon} className='cardStatusIcon' alt='cardStatusIcon' />
    )}
      <h5 className='cardTitle'>{ticket.title}</h5>
      </div>
      <div className="cardFoot">
      {groupBy !== 'priorityWise' && (
                    <div className='cardStatus'>
                        <img src={icon} className='cardStatusIcon' alt='cardStatusIcon' />
                    </div>
                )}
        <div className='featureRequestBox'>
          <div className='round'></div>
          <h6 className='fetureRequestText'>{ticket.tag[0]}</h6>
        </div>
      </div>
    </div>
  );
};

export default Card;
