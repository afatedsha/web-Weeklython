import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';
import NovosibirskObjects from './Cities/Novosibirsk/NovosibirskObjects';
import ItemServices from './API/ItemService';
import { useDispatch, useSelector } from 'react-redux/es/exports';
import { loadCampusesAction } from './store/campusesReducer';
import { loadObjectsAction } from './store/objectsReducer';
import { loadObjectTypesAction } from './store/objectTypeReducer';
import { loadEventsAction } from './store/eventsReducer';
import { loadUsersAction } from './store/usersReducer';
import ListUsers from './ListUsers';

function TabPanel(props) {
	const { children, value, index, ...other } = props;

	return (
		<div
			role="tabpanel"
			hidden={value !== index-1}
			id={`simple-tabpanel-${index-1}`}
			aria-labelledby={`simple-tab-${index-1}`}
			{...other}
		>
			{value === index-1 && (
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
		id: `simple-tab-${index}`,
		'aria-controls': `simple-tabpanel-${index}`,
	};
}

const ListCities = () => {
	const dispatch = useDispatch()
	const [value, setValue] = useState(0);

	const handleChange = (event, newValue) => {
		setValue(newValue);
	};

	useEffect(() => {
		fetchAll()
	}, [])

	const campuses = useSelector(state => state.campuses.campuses)

	async function fetchAll() {
		const campuses = await ItemServices.getCampuses();
		dispatch(loadCampusesAction(campuses))
		const objects = await ItemServices.getObjects();
		dispatch(loadObjectsAction(objects))
		const object_types = await ItemServices.getObjectTypes();
		dispatch(loadObjectTypesAction(object_types))
		const events = await ItemServices.getEvents();
		dispatch(loadEventsAction(events))
		const users = await ItemServices.getUsers();
		dispatch(loadUsersAction(users))
	}


	return (
		<Box sx={{ width: '100%' }}>
			<Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
				<Tabs value={value} onChange={handleChange} aria-label="basic tabs example">
					{campuses.map(city =>
						<Tab key={city.id} label={city.name} {...a11yProps(city.id)} />
					)}
					<Tab label="Пользователи" {...a11yProps(4)}/>
				</Tabs>
			</Box>
			{campuses.map(city =>
				<TabPanel key={`simple-tabPanel-${city.id}`} value={value} index={city.id}>
					<NovosibirskObjects key={`simple-object-${city.id}`} city={city}/>
				</TabPanel>
			)}
			<TabPanel id={`simple-tabPanel-4`} value={value} index={4}>
				<ListUsers />
			</TabPanel>
		</Box>
	);
}


export default ListCities;