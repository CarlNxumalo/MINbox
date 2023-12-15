import { supabase } from '$lib/supabaseClient.js';
import { redirect } from '@sveltejs/kit';
import { sendMessage, studentMessages } from '$lib/user.js';
//method 

//this is the page a user will see their mail
//we first get the user id if the session is there
// then return their data
//if no session we redirect them to sign in


async function session(){
    const {data} = await supabase.auth.getSession();
    if(!data.session){
        console.log("User is not logged in. \nTaking them to sign up");
       // throw redirect(303, '/signin');
        return;
    }
    return data.session.user; 
    
}


export async function load({ params, cookies }) {
    //get user
    let user =  await session();
    //if user call userData(id, type) and return

    //Later if param load that module data

    //else return to sign in/home

    if(user){
        if(!user.user_metadata.type){ //student
            return await studentMessages(user.id);
        }
    }
    return{
        //add module code
        messages: [],
        modules: []
    }
}

export const actions = {
	default: async ({ request }) => {
        const formData = await request.formData();
        var module_id = formData.get('module');
        var subject = formData.get('subject');
        var body = formData.get('body');
        const type = (formData.get('private')=='on') ? true:false;
        const user = await session();
        await sendMessage(user, module_id, subject, body, type);
	}
};


