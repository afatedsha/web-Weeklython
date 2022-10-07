import * as React from 'react';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import Modal from '@mui/material/Modal';
import TextField from '@mui/material/TextField';
import { InputLabel, MenuItem, Select } from '@mui/material';
import ItemServices from './API/ItemService';

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

export default function AddObject({create}) {
	const [open, setOpen] = React.useState(false);
	const handleOpen = () => setOpen(true);
	const handleClose = () => setOpen(false);

	const [floor, setFloor] = React.useState('');
	const [type, setType] = React.useState(1);
	const [campus, setCampus] = React.useState(1);
	const [name, setName] = React.useState('');
	const [description, setDescription] = React.useState('');
	const [image, setImage] = React.useState('');

	const sendObject = () => {
		const status = ItemServices.postObject(name, type, description, image, campus, floor);
		console.log(status);
		const newObject = {
			id: Date.now(),
			name: name,
			type_id: type,
			campus_id: campus,
			image: image,
			description: description,
			floor: floor
		}
		create(newObject);
		handleClose();
	}

	const handleChangeFloor = (event) => {
		setFloor(event.target.value);
	};
	const handleChangeType = (event) => {
		setType(event.target.value);
	};
	const handleChangeCampus = (event) => {
		setCampus(event.target.value);
	};
	return (
		<div>
			<Button onClick={handleOpen}>Добавить обьект</Button>
			<Modal
				open={open}
				onClose={handleClose}
				aria-labelledby="modal-modal-title"
				aria-describedby="modal-modal-description"
			>
				<Box sx={style}>
					<Typography id="modal-modal-title" variant="h6" component="h2">
						Добавить новый объект
					</Typography>
					<Typography component={'div'} id="modal-modal-description" sx={{ mt: 2, width: "100%" }}>
						<div className='input'>
							<TextField 
								id="standart-name" 
								label="Имя" 
								variant="standard" 
								sx={{ width: "100%" }}
								value={name}
								onChange={e => setName(e.target.value)}
							/>
						</div>
						<div className='input'>
							<TextField 
								id="standard-description" 
								label="Описание" 
								variant="standard" 
								sx={{ width: "100%" }}
								value={description}
								onChange={e => setDescription(e.target.value)}
							/>
						</div>
						<div className='input'>
							<TextField 
								id="standard-image" 
								label="URL Картинки" 
								variant="standard" 
								sx={{ width: "100%" }}
								value={image}
								onChange={e => setImage(e.target.value)}
							/>
						</div>
						<InputLabel id="select-floor" sx={{ mt: 2 }}>Этаж</InputLabel>
						<Select sx={{ width: "100%" }}
							labelId="select-floor"
							id="select-floor"
							value={floor}
							onChange={handleChangeFloor}
							label="Этаж"
						>
							<MenuItem value="">
								<em>None</em>
							</MenuItem>
							<MenuItem value={17}>17 этаж</MenuItem>
							<MenuItem value={18}>18 этаж</MenuItem>
							<MenuItem value={20}>20 этаж</MenuItem>
						</Select>
						<InputLabel id="select-type" sx={{ mt: 2 }}>Тип</InputLabel>
						<Select sx={{ width: "100%" }}
							labelId="select-type"
							id="simple-type"
							value={type}
							onChange={handleChangeType}
							label="Тип"
						>
							<MenuItem value={1}>Переговорка</MenuItem>
							<MenuItem value={2}>Спортивный инвентарь</MenuItem>
							<MenuItem value={3}>Настольная игра</MenuItem>
							<MenuItem value={4}>Кухня</MenuItem>
						</Select>
						<InputLabel id="select-campus" sx={{ mt: 2 }}>Кампус</InputLabel>
						<Select sx={{ width: "100%" }}
							labelId="select-campus"
							id="select-campus"
							value={campus}
							onChange={handleChangeCampus}
							label="Кампус"
						>
							<MenuItem value={1}>Новосибирск</MenuItem>
							<MenuItem value={2}>Казань</MenuItem>
							<MenuItem value={3}>Москва</MenuItem>
						</Select>
						<Button onClick={sendObject} variant="contained" sx={{ mt: 5, width: "100%" }}>Сохранить</Button>
						<Button onClick={handleClose} variant="outlined" sx={{ mt: 2, width: "100%" }}>Отменить</Button>
					</Typography>
				</Box>
			</Modal>
		</div>
	);
}
