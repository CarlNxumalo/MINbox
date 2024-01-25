import { Student } from '../../../../lib/Student.js';
import { Lecturer } from '../../../../lib/lecturer.js';

export async function load({ locals:{user}, params:{message}, cookies }) {
    const User = await user()
    //console.log(User)
    try {
        if(User instanceof Student)
        { 
            return {
                message: await User.showMessage(parseInt( message, 10))
            }
        }
    } catch (error) {
        return {
            error: "Failed to get message: "+error.message
        }
    }

    if(User instanceof Lecturer){
        throw redirect(303, '/lecturer'); 
    }
    throw redirect(403, '/signin');
}