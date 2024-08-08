import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

function ReminderApp() {
  const [reminders, setReminders] = useState([]);
  const [completedTasks, setCompletedTasks] = useState([]);
  const [task, setTask] = useState('');
  const [date, setDate] = useState('');
  const [isAdding, setIsAdding] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    const interval = setInterval(() => {
      if (reminders.length > 0) {
        reminders.forEach((reminder) => {
          alert(`Reminder: ${reminder.task} is due on ${reminder.date}`);
        });
      }
    }, 60000); // Check every 60 seconds

    return () => clearInterval(interval);
  }, [reminders]);

  const handleAddReminder = () => {
    if (task && date) {
      setReminders([...reminders, { task, date }]);
      setTask('');
      setDate('');
      setIsAdding(false);
    }
  };

  const handleMarkAsDone = (index) => {
    const taskToComplete = reminders[index];
    setCompletedTasks([...completedTasks, taskToComplete]);
    setReminders(reminders.filter((_, i) => i !== index));
  };

  const handleEditTask = (index) => {
    const taskToEdit = reminders[index];
    setTask(taskToEdit.task);
    setDate(taskToEdit.date);
    setReminders(reminders.filter((_, i) => i !== index));
    setIsAdding(true);
  };

  const handleDeleteTask = (index, isCompleted) => {
    if (isCompleted) {
      setCompletedTasks(completedTasks.filter((_, i) => i !== index));
    } else {
      setReminders(reminders.filter((_, i) => i !== index));
    }
  };

  const handleLogout = () => {
    // Implement your logout logic here
    console.log('Logged out');
    navigate('/');
  };

  return (
    <div className="container">
      <h2>Reminder App</h2>
      <div>
        {!isAdding && (
          <button onClick={() => setIsAdding(true)}>
            Add Reminder
          </button>
        )}
        {isAdding && (
          <div id="reminderForm" style={{ marginTop: '10px' }}>
            <form onSubmit={(e) => { e.preventDefault(); handleAddReminder(); }}>
              <div>
                <label>Task:</label>
                <input
                  type="text"
                  value={task}
                  onChange={(e) => setTask(e.target.value)}
                />
              </div>
              <div>
                <label>Date:</label>
                <input
                  type="date"
                  value={date}
                  onChange={(e) => setDate(e.target.value)}
                />
              </div>
              <button type="submit">Add</button>
            </form>
          </div>
        )}
      </div>
      <h3>Pending Tasks</h3>
      <table>
        <thead>
          <tr>
            <th>Task</th>
            <th>Date</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {reminders.map((reminder, index) => (
            <tr key={index}>
              <td>{reminder.task}</td>
              <td>{reminder.date}</td>
              <td>
                <button onClick={() => handleMarkAsDone(index)} style={{ backgroundColor: 'green', color: 'white' }}>Done</button>
                <button onClick={() => handleEditTask(index)} style={{ backgroundColor: 'blue', color: 'white' }}>Edit</button>
                <button onClick={() => handleDeleteTask(index, false)} style={{ backgroundColor: 'red', color: 'white' }}>Delete</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
      <h3>Completed Tasks</h3>
      <table>
        <thead>
          <tr>
            <th>Task</th>
            <th>Date</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {completedTasks.map((task, index) => (
            <tr key={index}>
              <td>{task.task}</td>
              <td>{task.date}</td>
              <td>
                <button onClick={() => handleDeleteTask(index, true)} style={{ backgroundColor: 'red', color: 'white' }}>Delete</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
      <button onClick={handleLogout} style={{ backgroundColor: 'blue', color: 'white', marginTop: '20px' }}>Logout</button>
    </div>
  );
}

export default ReminderApp;
