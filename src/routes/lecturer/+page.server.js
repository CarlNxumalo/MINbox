import { Lecturer } from '../../lib/lecturer.js'
import { Student } from '../../lib/Student.js';
import { redirect } from '@sveltejs/kit';
/*
Show the lecturer all their messages
cmb to filter by module
*/
export async function load({ locals:{user}, params, cookies }) {
    const User = await user()
    if(User instanceof Lecturer){
        return {
            modules: await User.myModules(),
            messages: await User.seeMessages()
        }
    }
    if(User instanceof Student){
        throw redirect(303, '/student'); 
    }
}
