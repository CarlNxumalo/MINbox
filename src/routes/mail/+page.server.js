import { supabase } from '$lib/supabaseClient.js';
import { redirect } from '@sveltejs/kit';
import { sendMessage } from '$lib/user.js';
//method 

//this is the page a user will see their mail
//we first get the user id if the session is there
// then return their data
//if no session we redirect them to sign in


async function session(){
    const {data} = await supabase.auth.getSession();
    if(!data.session){
        console.log("User is not logged in. \nTaking them to sign up");
        throw redirect(303, '/signin');
    }
    return data.session.user.id; 
    
}

async function getModules(user_id){
    const { data, error } = await supabase
    .from('Modules')
    .select('module_id, module_code, StudentModules!inner()')
    .eq('StudentModules.student_id', user_id);
    const formattedData = data.map(item => ({
        value: item.module_id,
        name: item.module_code
    }));
    console.log(formattedData);
    return formattedData;
}
export async function load({ params, cookies }) {
    let user =  await session();
    const { data, error } = await supabase.rpc('modulemessages', { userid: user});
    if(error){
        //check if param has module code
        console.log("the error"+error); 
    }
    console.log(data);

    return{
        //add module code
        messages: data,
        modules: await getModules(user)
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


