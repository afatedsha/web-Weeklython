import { Box, Button, InputLabel, MenuItem, Modal, Select, TextField } from '@mui/material';
import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux/es/exports';
import ItemServices from './API/ItemService';
import { loadEventsAction } from './store/eventsReducer';

const style = {
	position: 'absolute',
	top: '50%',
	left: '50%',
	transform: 'translate(-50%, -50%)',
	width: 400,
	bgcolor: 'background.paper',
	border: '2px solid #000',
	boxShadow: 24,
	p: 4,
};

const ShowEvent = ({ time, event, object }) => {
	const [open, setOpen] = useState(false);
	const [user, setUser] = useState([]);
	const [userId, setUserId] = useState('');
	const [description, setDescription] = useState('');
	const handleOpen = () => setOpen(true);
	const handleClose = () => setOpen(false);
	const events = useSelector(state => state.events.events);
	const dispatch = useDispatch();

	const removeEvent = (id) => {
		var status = ItemServices.deleteEvents(id);
		dispatch(loadEventsAction(events.filter(e => e.id !== id)))
		console.log(status)
		handleClose();
	}

	const createEvent = () => {
		const body = {start_time: time.start_time, end_time: "", description: description, status_id: 1, user_id: userId, object_id: object.id}
		var status = ItemServices.createEvents(body);
		const newEvent = {id: Date.now(), start_time: time.start_time, end_time: "", description: description, status_id: 1, user_id: userId, object_id: object.id}
		const eve = [...events, newEvent];
		dispatch(loadEventsAction(eve))
		console.log(status);
		handleClose();
	};

	const handleChangeUserId = (event) => {
		setUserId(event.target.value);
	};

	const users = useSelector(state => state.users.users)
	useEffect(() => {
		if (typeof event !== 'undefined'){
			setUser(users.find(u => u.id === event.user_id))
		}
	})
	return (
		<div className='divide'>
			{typeof event !== 'undefined'
				?
				<div>
					<Button variant="contained" onClick={handleOpen} color="secondary">
						{time.start_time} - {time.end_time}
					</Button>
					<Modal
						open={open}
						onClose={handleClose}
						aria-labelledby="modal-modal-title"
						aria-describedby="modal-modal-description"
					>
						<Box sx={style}>
							<h1>Мероприятие</h1>
							<p><b>{event.description}</b></p>
							<p>Время начала  <b> {event.start_time}</b></p>
							<p>Забронил юзер: <b>{typeof user !== 'undefined' && user.name}</b></p>
							<Button color="error" variant="outlined" onClick={() => removeEvent(event.id)}>
								Удалить мероприятие
							</Button>
						</Box>
					</Modal>
				</div>
				:
				<div>
					<Button variant="contained" onClick={handleOpen}>
						{time.start_time} - {time.end_time}
					</Button>
					<Modal
						open={open}
						onClose={handleClose}
						aria-labelledby="modal-modal-title"
						aria-describedby="modal-modal-description"
					>
						<Box sx={style}>
							<h1>Мероприятие</h1>
							<p>Время начала<b>{" " + time.start_time}</b></p>
							<p>Объект<b>{" " + object.id}</b></p>
							<TextField
								id="standart-description" 
								label="Зачем" 
								variant="standard" 
								sx={{ width: "100%" }}
								value={description}
								onChange={e => setDescription(e.target.value)}
							/>
							<InputLabel id="select-users" sx={{ mt: 2 }}>Пользователь</InputLabel>
							<Select sx={{ width: "100%" }}
								labelId="select-users"
								id="select-users"
								value={userId}
								onChange={handleChangeUserId}
								label="Пользователь"
							>
								<MenuItem value="">
									<em>None</em>
								</MenuItem>
								{users.map(usr => 
									<MenuItem key={usr.id} value={usr.id}>{usr.name}</MenuItem>
								)}
							</Select>
							<p></p>
							<Button color="secondary" variant="contained" onClick={createEvent}>
								Заброинровать время
							</Button>
						</Box>
					</Modal>
				</div>
			}
		</div>
	)
}

export default ShowEvent;