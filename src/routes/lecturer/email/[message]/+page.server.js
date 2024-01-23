import { redirect } from '@sveltejs/kit'
import { Lecturer } from '../../../../lib/lecturer.js'
import { Student } from '../../../../lib/Student.js'
/*
get the parameter id 
then load the message via parent 
*/

export async function load({ params: {message}, locals:{user}}) {
    const User = await user()
    if(User instanceof Lecturer){
        //console.log("page: "+message)
        //console.log(await User.seeMessage(message))
        return{
            message: await User.seeMessage(message)
        }
    }
    if(User instanceof Student){
        throw redirect(306,'/student')
    }
    throw redirect(308, '/signin');
    
}

export const actions = {
	reply: async ({ locals:{user}, request, params }) => {
        try{
            const User = await user()
            if(User instanceof Lecturer){
                const formData = await request.formData();
                const reply = formData.get('reply');
                await User.reply(params.message, reply);
            }
        }
        catch(error){
            return {
                feedback:'Reply sent unsuccesfully. '+error.message
            }
        }        
        throw redirect(303, '/lecturer');
	}
};

