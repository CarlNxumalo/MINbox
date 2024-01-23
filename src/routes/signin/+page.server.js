import { redirect } from '@sveltejs/kit';
import { Student } from '../../lib/Student.js';
import { Lecturer } from '../../lib/lecturer.js';
export async function load({ locals, params, cookies }) {
    /*
    const email = 'carl.bongani@gmail.com';
        const password = 'carlzozo';
        const { data, error } = await locals.supabase.auth.signInWithPassword({
            email: email,
            password: password,
        });
        console.log(data);
        console.log(error);
        if(!error){
            throw redirect(303, '/mail');
        }
        */
}

//maybe use an api for validation(wrong password or email)/ stop form defualt behaviuor
export const actions = {
	default: async ({ locals, request }) => {
        const formData = await request.formData();
        const email = formData.get('email');
        const password = formData.get('password');
        
        const { data, error } = await locals.supabase.auth.signInWithPassword({
            email: email,
            password: password,
        });

        if(error){
            return{
                message: "Sign in was unsuccesfull.\n"+error.message
            }
        }
        const User = await locals.user()
        if(User instanceof Student){
            throw redirect(303, "/student")
        }
        if(User instanceof Lecturer){
            throw redirect(303, "/lecturer")
        }
	}
};
