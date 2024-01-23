import { redirect } from '@sveltejs/kit';
import { Student } from '../../../lib/Student.js';
import { Lecturer } from '../../../lib/lecturer.js';

export async function load({ locals:{user}, params, cookies }) {
    const User = await user()
    //console.log(User)
    if(User instanceof Student)
    {
        return {
            modules: await User.myModules(),
            messages: await User.showMessages()
        }
    }

    if(User instanceof Lecturer){
        throw redirect(303, '/lecturer'); 
    }
}

export const actions = {
	default: async ({ request, locals: { user } }) => {
        try {
            const formData = await request.formData();
            var module_id = parseInt( formData.get('module'), 10);
            var subject = formData.get('subject');
            var body = formData.get('body');
            const type = (formData.get('private')=='on') ? true:false;
            const User = await user()
            
            if(User instanceof Student){
                await User.sendMessage(module_id, subject, body, type)
            }
            
        } catch (error) {
            console.log(error)
            return {
                message: "Failed to send email. "+error.message
            }
        }

        throw redirect(303, '/student');
	}
};