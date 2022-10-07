import React, { useEffect, useState } from 'react';
import { DataGrid } from '@mui/x-data-grid';
import { useSelector } from 'react-redux/es/exports';

const columns = [
	{ field: 'id', headerName: 'Телеграмм ID', width: 110 },
	{ field: 'name', headerName: 'Имя', width: 130 },
	{ field: 'login', headerName: 'Логин', width: 130 },
	{ 
		field: 'campus', 
		headerName: 'Кампус',
		width: 130,
		valueGetter: (params) => {
			switch(params.row.campus_id) {
				case 1: 
					return "Новосибирск"
				case 2:
					return "Казань"
				case 3:
					return "Москва"
			}
		}
	},
	{ 
		field: 'role', 
		headerName: 'Роль', 
		width: 160,
		valueGetter: (params) => {
			switch(params.row.role_id) {
				case 1: 
					return "Сотрудник"
				case 2:
					return "Студент"
				case 3:
					return "Абитуриент"
				case 4:
					return "Администратор"
			}
		}
	}
];

const ListUsers = () => {
	const users = useSelector(state => state.users.users)

	return (
		<div style={{ height: 580, width: 800 }}>
			<DataGrid
				rows={users}
				columns={columns}
				pageSize={9}
				rowsPerPageOptions={[9]}
				checkboxSelection
			/>
		</div>
	)
}

export default ListUsers;