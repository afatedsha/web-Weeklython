import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import { useDispatch, useSelector } from 'react-redux';
import AddObject from '../../AddObject';
import ItemServices from '../../API/ItemService';
import { loadObjectsAction } from '../../store/objectsReducer';
import ShowEvent from '../../ShowEvent';

function TabPanel(props) {
	const { children, value, index, ...other } = props;

	return (
		<div
			role="tabpanel"
			hidden={value !== index}
			id={`vertical-tabpanel-${index}`}
			aria-labelledby={`vertical-tab-${index}`}
			{...other}
		>
			{value === index && (
				<Box sx={{ p: 3 }}>
					<Typography component={'div'}>{children}</Typography>
				</Box>
			)}
		</div>
	);
}

TabPanel.propTypes = {
	children: PropTypes.node,
	index: PropTypes.number.isRequired,
	value: PropTypes.number.isRequired,
};

function a11yProps(index) {
	return {
		id: `vertical-tab-${index}`,
		'aria-controls': `vertical-tabpanel-${index}`,
	};
}

const NovosibirskObjects = ({ city }) => {
	const [value, setValue] = useState(0);
	const [listTime, setListTime] = useState([
		{ id: 1, start_time: '2022-8-21 00:00', end_time: '01:00' },
		{ id: 2, start_time: '2022-8-21 01:00', end_time: '02:00' },
		{ id: 3, start_time: '2022-8-21 02:00', end_time: '03:00' },
		{ id: 4, start_time: '2022-8-21 03:00', end_time: '04:00' },
		{ id: 5, start_time: '2022-8-21 04:00', end_time: '05:00' },
		{ id: 6, start_time: '2022-8-21 05:00', end_time: '06:00' },
		{ id: 7, start_time: '2022-8-21 06:00', end_time: '07:00' },
		{ id: 8, start_time: '2022-8-21 07:00', end_time: '08:00' },
		{ id: 9, start_time: '2022-8-21 08:00', end_time: '09:00' },
		{ id: 10, start_time: '2022-8-21 09:00', end_time: '10:00' },
		{ id: 11, start_time: '2022-8-21 10:00', end_time: '11:00' },
		{ id: 12, start_time: '2022-8-21 11:00', end_time: '12:00' },
		{ id: 13, start_time: '2022-8-21 12:00', end_time: '13:00' },
		{ id: 14, start_time: '2022-8-21 13:00', end_time: '14:00' },
		{ id: 15, start_time: '2022-8-21 14:00', end_time: '15:00' },
		{ id: 16, start_time: '2022-8-21 15:00', end_time: '16:00' },
		{ id: 17, start_time: '2022-8-21 16:00', end_time: '17:00' },
		{ id: 18, start_time: '2022-8-21 17:00', end_time: '18:00' },
		{ id: 19, start_time: '2022-8-21 18:00', end_time: '19:00' },
		{ id: 20, start_time: '2022-8-21 19:00', end_time: '20:00' },
		{ id: 21, start_time: '2022-8-21 20:00', end_time: '21:00' },
		{ id: 22, start_time: '2022-8-21 21:00', end_time: '22:00' },
		{ id: 23, start_time: '2022-8-21 22:00', end_time: '23:00' },
		{ id: 24, start_time: '2022-8-21 23:00', end_time: '00:00' }
	])

	const objectType = useSelector(state => state.objectTypes.objectTypes)
	const objects = useSelector(state => state.objects.objects)
	const events = useSelector(state => state.events.events)
	const dispatch = useDispatch()

	const deletessd = (id) => {
		var status = ItemServices.deleteObject(id);
		dispatch(loadObjectsAction(objects.filter(o => o.id !== id)))
		console.log(status);
	}

	const handleChange = (event, newValue) => {
		setValue(newValue);
	};

	const createObject = (newObject) => {
		const os = [...objects, newObject]
		dispatch(loadObjectsAction(os))
	}

	return (
		<Box
			sx={{ flexGrow: 1, bgcolor: 'background.paper', display: 'flex', height: '100%' }}
		>
			<Tabs
				orientation="vertical"
				variant="scrollable"
				value={value}
				onChange={handleChange}
				aria-label="Vertical tabs example"
				style={{ overflow: "visible" }}
				sx={{ borderRight: 1, borderColor: 'divider' }}
			>
				{objectType.map(type =>
					<Tab key={type.id} label={type.name} {...a11yProps(type.id - 1)} />
				)}
				<AddObject create={createObject} />
			</Tabs>
			{objectType.map(type =>
				<TabPanel key={type.id} id={`vertical-tabPanel-${type.id}`} value={value} index={type.id - 1}>
					{objects.map(object => {
						if (object.campus_id === city.id) {
							if (object.type_id === type.id) {
								return (
									<div key={`vertical-divOrigin-${object.id}`}>
										<h2>{object.name}</h2>
										{object.floor !== "" && <h3>{object.floor} этаж</h3>}
										<h4>{object.description}</h4>
										<Box sx={{ "& button": { m: 0.5 } }}>
											{listTime.map(time => {
												const eve = events.filter(e => e.object_id === object.id).find(e => e.start_time === time.start_time);
												return (
													<ShowEvent key={time.id} time={time} event={eve} object={object} />
												)
											}
											)
											}
										</Box>
										<Button id={`vertical-button-${object.campus_id}`} onClick={() => deletessd(object.id)} variant="outlined" color="error" sx={{ mt: 2 }}>
											Удалить обьект
										</Button>
									</div>
								)
							}
						}
					})}
				</TabPanel>
			)}
		</Box>
	);
}

export default NovosibirskObjects;