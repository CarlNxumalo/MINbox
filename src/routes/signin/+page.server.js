import { supabase } from '$lib/supabaseClient.js';
import { redirect } from '@sveltejs/kit';


//maybe use an api for validation(wrong password or email)/ stop form defualt behaviuor
export const actions = {
	default: async ({ request }) => {
        const formData = await request.formData();
        const email = formData.get('email');
        const password = formData.get('password');
        const { data, error } = await supabase.auth.signInWithPassword({
            email: email,
            password: password,
        });
        console.log(data);
        console.log(error);
        if(!error){
            throw redirect(303, '/mail');
        }
	}
};
