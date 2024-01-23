import { redirect } from '@sveltejs/kit';
import { Student } from '../../lib/Student.js';
import { Lecturer } from '../../lib/lecturer.js';
//method 

//this is the page a user will see their mail
//we first get the user id if the session is there
// then return their data
//if no session we redirect them to sign in

export async function load({ locals:{user}, params, cookies }) {
    const User = await user()
    //console.log(User)
    try {
        if(User instanceof Student)
        {
            return {
                modules: await User.myModules(),
                messages: await User.showMessages()
            }
        }        
    } catch (error) {
        return {
            modules: [],
            messages: []
        }
    }

    if(User instanceof Lecturer){
        throw redirect(303, '/lecturer'); 
    }
    throw redirect(303, '/signin'); 

}

export const actions = {
	default: async ({ request, locals: { user } }) => {
        const formData = await request.formData();
        var module_id = formData.get('module');
        var subject = formData.get('subject');
        var body = formData.get('body');
        const type = (formData.get('private')=='on') ? true:false;
        const User = await user()
        if(User instanceof Student){
            await User.sendMessage(module_id, subject, body, type)
        }

        return {
            success: "Sent email"
        }
	}
};


