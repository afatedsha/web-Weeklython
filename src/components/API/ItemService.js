import axios from "axios";

export default class ItemServices {
	static async getCampuses(){
		try{
			const response = await axios.get('http://109.202.17.96:5000/api/BookBot/campus/all')
			return response.data
		} catch (e){
			console.log(e);
		}
	}
	
	static async getObjects(){
		try{
			const response = await axios.get('http://109.202.17.96:5000/api/BookBot/object')
			return response.data
		} catch (e){
			console.log(e);
		}
	}

	static async postObject(name, type_id, description, image, campus_id, floor){
		try{
			const body = {name: name, type_id: type_id, description: description, image: image, campus_id: campus_id, floor: floor}
			const response = await axios.post('http://109.202.17.96:5000/api/BookBot/object', body)
			return response.status
		} catch (e){
			console.log(e);
		}
	}

	static async deleteObject(id){
		try{
			if (id != null) {
				const response = await axios.delete('http://109.202.17.96:5000/api/BookBot/object/' + id)
				return response.status
			} else {
				return "null"
			}
		} catch (e){
			console.log(e);
		}
	}
	
	static async getObjectTypes(){
		try{
			const response = await axios.get('http://109.202.17.96:5000/api/BookBot/object/types')
			return response.data
		} catch (e){
			console.log(e);
		}
	}

	static async getEvents(){
		try{
			const response = await axios.get('http://109.202.17.96:5000/api/BookBot/event')
			return response.data
		} catch (e){
			console.log(e);
		}
	}

	static async deleteEvents(id){
		try{
			const response = await axios.delete('http://109.202.17.96:5000/api/BookBot/objects/book/' + id)
			return response.data
		} catch (e){
			console.log(e);
		}
	}

	static async createEvents(body){
		try{
			const response = await axios.post('http://109.202.17.96:5000/api/BookBot/object/book/', body)
			return response.data
		} catch (e){
			console.log(e);
		}
	}

	static async getUsers(){
		try{
			const response = await axios.get('http://109.202.17.96:5000/api/BookBot/user/all')
			return response.data
		} catch (e){
			console.log(e);
		}
	}
}