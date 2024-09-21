import React, { useState, useEffect, useCallback } from "react";
import Navbar from "../Components/Navbar/Navbar";
import Card from "../Components/Card/Card";
import ListHead from "../Components/ListHead/ListHead";
import "./Home.css";

const Home = () => {
  const [tickets, setTickets] = useState([]);
  const [users, setUsers] = useState([]);
  const [groupBy, setGroupBy] = useState("statusWise");
  const [orderBy, setOrderBy] = useState("priorityWise");
  const [selectedValues, setSelectedValues] = useState({ grouping: '', ordering: '' });

  const handleSelectChange = useCallback((values) => {
    setSelectedValues(values);
    if (values.grouping === 'priority') {
      setGroupBy("priorityWise");
    } else if (values.grouping === 'user') {
      setGroupBy("userWise");
    } else {
      setGroupBy("statusWise");
    }
    
    if (values.ordering === 'priority') {
      setOrderBy("priorityWise");
    } else if (values.ordering === 'title') {
      setOrderBy("titleWise");
    }
  }, []);

  useEffect(() => {
    fetch(`https://api.quicksell.co/v1/internal/frontend-assignment`)
      .then((data) => data.json())
      .then((finalData) => {
        setTickets(finalData.tickets);
        setUsers(finalData.users);
        
        const value = localStorage.getItem('userView');
        if (value) {
          const obj = JSON.parse(value);
          // Set state with a timeout to simulate a delay
          setTimeout(() => {
            setGroupBy(obj.groupValue);
            setOrderBy(obj.orderValue);
          }, 2000); // Adjust the delay as needed
        } else {
          setGroupBy('statusWise');
          setOrderBy('priorityWise');
        }
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);

  useEffect(() => {
    const View = {
      groupValue: groupBy,
      orderValue: orderBy,
    };
    localStorage.setItem('userView', JSON.stringify(View));
  }, [groupBy, orderBy]);

  const sortTickets = (tickets, criteria) => {
    return tickets.sort((a, b) => {
      if (criteria === 'priorityWise') {
        return b.priority - a.priority;
      } else if (criteria === 'titleWise') {
        return b.title.length - a.title.length;
      }
      return 0;
    });
  };

  const priorityWise = tickets.reduce((acc, ticket) => {
    const key = ticket.priority;
    if (!acc[key]) acc[key] = [];
    acc[key].push(ticket);
    return acc;
  }, {});

  const statusWise = tickets.reduce((acc, ticket) => {
    const key = ticket.status;
    if (!acc[key]) acc[key] = [];
    acc[key].push(ticket);
    return acc;
  }, {});

  const userWise = tickets.reduce((acc, ticket) => {
    const key = ticket.userId;
    if (!acc[key]) acc[key] = [];
    acc[key].push(ticket);
    return acc;
  }, {});

  for (const key in statusWise) {
    statusWise[key] = sortTickets(statusWise[key], orderBy);
  }

  for (const key in userWise) {
    userWise[key] = sortTickets(userWise[key], orderBy);
  }

  const groupedTickets = {
    priorityWise,
    statusWise,
    userWise,
  }[groupBy];

  return (
    <div>
      <Navbar onSelectChange={handleSelectChange} />
      <section className="allTasks">
        {groupedTickets && Object.keys(groupedTickets).map((key) => (
          <div key={key}>
            <ListHead info={{ tickets: groupedTickets[key], users, groupBy, orderBy }} />
            {groupedTickets[key].map((ticket) => (
              <Card groupBy={groupBy} orderBy={orderBy} key={ticket.id} ticket={ticket} users={users} />
            ))}
          </div>
        ))}
      </section>
    </div>
  );
};

export default Home;
