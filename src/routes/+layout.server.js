import { Student } from '../lib/Student.js'
import { Lecturer } from '../lib/lecturer.js'

export async function load({locals:{user}}) {
	const User = await user()
    if(User instanceof Student){
        return{
            user: 'student'
        }
    }
    if(User instanceof Lecturer){
        return {
            user: 'lecturer'
        }
    }
    
}